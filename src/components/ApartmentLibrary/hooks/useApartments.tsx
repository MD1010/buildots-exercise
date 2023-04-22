import axios from "axios";
import { useEffect, useState } from "react";
import { Apartment } from "types";
import { formatDate } from "utils/date";

const formatApartmentImageDates = (apartments: Apartment[]) => {
  return apartments.map(({ name, images }) => {
    return {
      name,
      images: images.map((image) => ({ ...image, date: formatDate(image.date) })),
    };
  });
};

export const useApartments = (refetchAfterMs: number = 0) => {
  const [apartments, setApartments] = useState<Apartment[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timer;
    const fetchApartments = async () => {
      try {
        const { data } = await axios.get<{ apartments: Apartment[] }>("/api");
        const apartments = formatApartmentImageDates(data.apartments);
        setApartments(apartments);
      } catch (e) {
        console.error(e);
      }
    };

    fetchApartments();
    if (!!refetchAfterMs) {
      interval = setInterval(fetchApartments, refetchAfterMs);
    }

    return () => clearInterval(interval);
  }, []);

  return apartments;
};
