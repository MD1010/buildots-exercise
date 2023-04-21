import axios from "axios";
import { useEffect, useState } from "react";
import { Apartment } from "types";

export const ApartmentLibrary = () => {
  const [apartments, setApartments] = useState<Apartment[]>([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get("/api/apartments");
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <></>;
};
