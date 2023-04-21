import { Apartment } from "types";
import { formatDate } from "utils/date";

export const formatApartmentImageDates = (apartments: Apartment[]) => {
  return apartments.map(({ name, images }) => {
    return {
      name,
      images: images.map((image) => ({ ...image, date: formatDate(image.date) })),
    };
  });
};
