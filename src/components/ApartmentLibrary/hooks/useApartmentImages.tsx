import { useEffect, useState } from "react";
import { Image } from "types";
import { useApartmentFilters } from "./useApartmentFilters";
import { useApartments } from "./useApartments";
import { REFETCH_AFTER } from "../consts";

export const useApartmentLibrary = () => {
  const [images, setImages] = useState<Image[]>([]);

  const apartments = useApartments(REFETCH_AFTER);
  const { selectedApartment, selectedDate, navigationFilters } = useApartmentFilters(apartments);

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

  return { images, navigationFilters };
};
