import { Pannellum } from "pannellum-react";
import "./PanoramaViewer.scss";
export const PanoramaViewer = () => {
  const loadPrevImage = () => {};

  const loadNextImage = () => {};
  return (
    <>
      <div className="container">
        <div className="arrow left" onClick={loadPrevImage}></div>
        <div className="arrow right" onClick={loadNextImage}></div>
        <Pannellum
          height={600}
          width={800}
          image={"https://c1.staticflickr.com/5/4810/45784853101_75fca223e4_k.jpg"}
          autoLoad
          onLoad={() => {
            console.log("panorama loaded");
          }}
        />
      </div>
    </>
  );
};
