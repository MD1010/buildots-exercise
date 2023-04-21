import { Pannellum } from "pannellum-react";
import "./PanoramaViewer.scss";
export const PanoramaViewer = () => {
  const loadPrevImage = () => {
    console.log("prev");
  };

  const loadNextImage = () => {
    console.log("next");
  };
  return (
    <>
      <div className="container">
        <div className="arrow left" onClick={loadPrevImage}></div>
        <div className="arrow right" onClick={loadNextImage}></div>
        <Pannellum
          height={"600px"}
          width={"800px"}
          image={"https://c1.staticflickr.com/5/4810/45784853101_75fca223e4_k.jpg"}
          autoLoad
          pitch={10}
          yaw={180}
          hfov={110}
        />
      </div>
    </>
  );
};
