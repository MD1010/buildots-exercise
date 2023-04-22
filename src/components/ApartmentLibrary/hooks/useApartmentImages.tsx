import { useEffect, useState } from "react";
import { Apartment, Image } from "types";

export const useApartmentImages = (
  apartments: Apartment[],
  selectedApartment: string | null,
  selectedDate: string | null
) => {
  const [images, setImages] = useState<Image[]>([]);

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

  return images;
};
