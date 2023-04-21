import "./App.css";
import { PanoramaViewer } from "./baseUI/PanoramaViewer/PanoramaViewer";
import { NavigationBar } from "./components/NavigationBar";

function App() {
  return (
    <>
      <NavigationBar />
      <PanoramaViewer />;
    </>
  );
}

export default App;
