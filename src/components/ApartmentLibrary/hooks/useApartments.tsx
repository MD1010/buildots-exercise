import axios from "axios";
import { useEffect, useState } from "react";
import { Apartment } from "types";
import { formatDate } from "utils/date";

type FetchConfig = {
  fetch: boolean;
  refetchAfterMs: number;
};

const formatApartmentImageDates = (apartments: Apartment[]) => {
  return apartments.map(({ name, images }) => {
    return {
      name,
      images: images.map((image) => ({ ...image, date: formatDate(image.date) })),
    };
  });
};

export const useApartments = (config: FetchConfig) => {
  const { fetch, refetchAfterMs } = config;
  const [apartments, setApartments] = useState<Apartment[]>([]);
  useEffect(() => {
    const fetchApartment = async () => {
      try {
        const { data } = await axios.get<{ apartments: Apartment[] }>("/api");
        const apartments = formatApartmentImageDates(data.apartments);
        setApartments(apartments);
      } catch (e) {
        console.error(e);
      }
    };
    if (fetch) {
      fetchApartment();
      if (!!refetchAfterMs) {
        setInterval(fetchApartment, refetchAfterMs);
      }
    }
  }, []);

  return apartments;
};
