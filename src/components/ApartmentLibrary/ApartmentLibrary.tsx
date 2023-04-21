import axios from "axios";
import { PanoramaViewer } from "baseUI/PanoramaViewer/PanoramaViewer";
import { useEffect, useState } from "react";
import { Apartment, Image } from "types";

export const ApartmentLibrary = () => {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [images, setImages] = useState<Image[]>([]);

  const fetchData = async () => {
    console.log(444);
    try {
      const { data } = await axios.get<{ apartments: Apartment[] }>("/api");
      setApartments(data.apartments);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (apartments.length) {
      setImages(apartments[0].images);
    }
  }, [apartments]);

  return <>{<PanoramaViewer images={images} />}</>;
};
