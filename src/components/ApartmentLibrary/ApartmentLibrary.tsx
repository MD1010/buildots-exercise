import { PanoramaViewer } from "baseUI/PanoramaViewer/PanoramaViewer";
import { NavigationBar } from "components/NavigationBar";
import { REFETCH_AFTER } from "./consts";
import { useApartmentFilters } from "./hooks/useApartmentFilters";
import { useApartmentImages } from "./hooks/useApartmentImages";
import { useApartments } from "./hooks/useApartments";

export const ApartmentLibrary = () => {
  const apartments = useApartments(REFETCH_AFTER);
  const { navigationFilters, selectedApartment, selectedDate } = useApartmentFilters(apartments);
  const images = useApartmentImages(apartments, selectedApartment, selectedDate);

  return (
    <>
      <NavigationBar filters={navigationFilters} />
      <PanoramaViewer images={images} />
    </>
  );
};
