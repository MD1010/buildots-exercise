import { useEffect, useState } from "react";
import { Image } from "types";
import { useApartmentFilters } from "./useApartmentFilters";
import { useApartments } from "./useApartments";

export const useApartmentLibrary = () => {
  const apartments = useApartments(0);
  const [images, setImages] = useState<Image[]>([]);
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
