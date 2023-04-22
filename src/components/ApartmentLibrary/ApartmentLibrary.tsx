import axios from "axios";
import { PanoramaViewer } from "baseUI/PanoramaViewer/PanoramaViewer";
import { Filter, NavigationBar } from "components/NavigationBar";
import { useEffect, useState } from "react";
import { Apartment, Image } from "types";
import { getLatestDateString } from "utils/date";
import { formatApartmentImageDates } from "./helpers";

export const ApartmentLibrary = () => {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [images, setImages] = useState<Image[]>([]);
  const [navigationFilters, setNavigationFilters] = useState<Filter[]>([]);
  const [selectedApartment, setSelectedApartment] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const onApartmentChange = (value: string) => {
    setSelectedApartment(value);
  };

  const onDateChange = (value: string) => {
    const availableDates = getFormattedDatesOptions();
    let date: string;
    if (value === "Latest") {
      date = getLatestDateString(availableDates);
    } else {
      date = value;
    }

    setSelectedDate(date);
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
      { label: "Apartment", options: getApartmentsOptions(), onChange: onApartmentChange, enabled: true },
      { label: "Date", options: getFormattedDatesOptions(), onChange: onDateChange, enabled: !!selectedApartment },
    ] as Filter[];
  };

  const fetchData = async () => {
    try {
      const { data } = await axios.get<{ apartments: Apartment[] }>("/api");
      const apartments = formatApartmentImageDates(data.apartments);

      setApartments(apartments);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let filteredImages: Image[] = [];
    if (selectedApartment) {
      const apartmentImages = apartments.find((apartment) => apartment.name === selectedApartment)?.images || [];
      filteredImages = apartmentImages;
    }

    if (selectedDate) {
      filteredImages = filteredImages?.filter((image) => image.date === selectedDate);
    }
    setImages(filteredImages);
  }, [selectedApartment, selectedDate]);

  useEffect(() => {
    if (apartments.length) {
      setNavigationFilters(getNavigationFilters());
      selectedDate && setSelectedDate(getFormattedDatesOptions()[0]);
    }
  }, [apartments, selectedApartment]);

  return (
    <>
      <NavigationBar filters={navigationFilters} />
      <PanoramaViewer images={images} />
    </>
  );
};
