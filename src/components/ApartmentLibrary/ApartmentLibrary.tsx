import { PanoramaViewer } from "baseUI/PanoramaViewer/PanoramaViewer";
import { Filter, NavigationBar } from "components/NavigationBar";
import { useEffect, useState } from "react";
import { Image } from "types";
import { getLatestDateString } from "utils/date";
import { useApartments } from "./hooks/useApartments";
import { REFETCH_AFTER } from "./consts";

export const ApartmentLibrary = () => {
  const apartments = useApartments({ fetch: true, refetchAfterMs: REFETCH_AFTER });
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
    if (value.includes("Latest")) {
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
      dates.length > 1 && dates.push(`Latest - ${getLatestDateString(dates)}`);
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
