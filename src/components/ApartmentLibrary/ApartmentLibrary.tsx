import axios from "axios";
import { PanoramaViewer } from "baseUI/PanoramaViewer/PanoramaViewer";
import { Filter, NavigationBar } from "components/NavigationBar";
import { useEffect, useRef, useState } from "react";
import { Apartment, Image } from "types";
import { getLatestDateString } from "utils/date";
import { formatApartmentImageDates } from "./helpers";

export const ApartmentLibrary = () => {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [images, setImages] = useState<Image[]>([]);
  const [navigationFilters, setNavigationFilters] = useState<Filter[]>([]);
  const [selectedApartment, setSelectedApartment] = useState<string | null>(null);

  const filterByApartment = (value: string) => {
    setSelectedApartment(value);
  };

  const filterByDate = (value: string) => {
    const availableDates = getFormattedDatesOptions();
    let date: string;
    if (value === "Latest") {
      date = getLatestDateString(availableDates);
    } else {
      date = value;
    }
    const filteredImages = images.filter((image) => image.date === date);
    setImages(filteredImages);
  };

  const getFormattedDatesOptions = () => {
    const dates = [];
    if (selectedApartment) {
      const apartmentToDisplay = apartments.find((a) => a.name === selectedApartment);
      dates.push(...apartmentToDisplay!.images.map((image) => image.date));
      dates.push("Latest");
    }
    return dates;
  };

  const getApartmentsOptions = () => {
    return apartments.map((apartment) => apartment.name);
  };

  const getNavigationFilters = () => {
    return [
      { label: "Apartment", options: getApartmentsOptions(), onChange: filterByApartment, enabled: true },
      { label: "Date", options: getFormattedDatesOptions(), onChange: filterByDate, enabled: !!selectedApartment },
    ] as Filter[];
  };

  const fetchData = async () => {
    try {
      const { data } = await axios.get<{ apartments: Apartment[] }>("/api");
      const apartments = formatApartmentImageDates(data.apartments);
      console.log(apartments);

      setApartments(apartments);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (apartments.length) {
      const apartmentImages = apartments.find((apartment) => apartment.name === selectedApartment)?.images || [];
      console.log(apartmentImages);

      setImages(apartmentImages);
      setNavigationFilters(getNavigationFilters());
    }
  }, [apartments, selectedApartment]);

  return (
    <>
      <NavigationBar filters={navigationFilters} />
      <PanoramaViewer images={images} />
    </>
  );
};
