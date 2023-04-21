import { ApartmentLibrary } from "components/ApartmentLibrary/ApartmentLibrary";
import "./App.css";
import { PanoramaViewer } from "./baseUI/PanoramaViewer/PanoramaViewer";

function App() {
  return (
    <>
      {/* <NavigationBar /> */}
      <PanoramaViewer />;
      <ApartmentLibrary />
    </>
  );
}

export default App;
