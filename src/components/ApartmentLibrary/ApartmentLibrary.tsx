import { PanoramaViewer } from "baseUI/PanoramaViewer/PanoramaViewer";
import { NavigationBar } from "components/ApartmentLibrary/NavigationBar";
import { useApartmentLibrary } from "./hooks/useApartmentImages";

export const ApartmentLibrary = () => {
  const { images, navigationFilters } = useApartmentLibrary();

  return (
    <>
      <NavigationBar filters={navigationFilters} />
      <PanoramaViewer images={images} />
    </>
  );
};
