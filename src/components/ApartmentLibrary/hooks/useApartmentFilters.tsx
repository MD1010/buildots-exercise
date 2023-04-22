import { useCallback, useEffect, useMemo, useState } from "react";
import { Apartment } from "types";
import { getLatestDateString } from "utils/date";

export const useApartmentFilters = (apartments: Apartment[]) => {
  const [selectedApartment, setSelectedApartment] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const apartmentOptions = useMemo(() => apartments.map((apartment) => apartment.name), [apartments]);

  const formattedDatesOptions = useMemo(() => {
    const dates = [];
    if (selectedApartment) {
      const apartmentToDisplay = apartments.find((a) => a.name === selectedApartment);
      dates.push(...apartmentToDisplay!.images.map((image) => image.date));
      dates.length > 1 && dates.push(`Latest - ${getLatestDateString(dates)}`);
    }
    return dates;
  }, [selectedApartment, apartments]);

  const onApartmentChange = useCallback((value: string) => {
    setSelectedApartment(value);
  }, []);

  const onDateChange = useCallback(
    (value: string) => {
      let date: string;
      if (value.includes("Latest")) {
        date = getLatestDateString(formattedDatesOptions);
      } else {
        date = value;
      }
      setSelectedDate(date);
    },
    [formattedDatesOptions]
  );

  const navigationFilters = useMemo(() => {
    return [
      { label: "Apartment", options: apartmentOptions, onChange: onApartmentChange, enabled: true },
      { label: "Date", options: formattedDatesOptions, onChange: onDateChange, enabled: !!selectedApartment },
    ];
  }, [apartmentOptions, formattedDatesOptions, selectedApartment]);

  useEffect(() => {
    if (apartments.length) {
      selectedDate && setSelectedDate(formattedDatesOptions[0]);
    }
  }, [apartments, selectedApartment]);

  return { navigationFilters, selectedApartment, selectedDate };
};
