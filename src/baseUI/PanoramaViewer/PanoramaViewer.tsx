import { Pannellum } from "pannellum-react";
import { FC, useEffect, useState } from "react";
import { Image } from "types";
import "./PanoramaViewer.scss";

type Props = {
  images: Image[];
};
export const PanoramaViewer: FC<Props> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  console.log(123123123123, images);

  const loadPrevImage = () => {
    const newIndex = currentImageIndex - 1 < 0 ? 0 : currentImageIndex - 1;
    setCurrentImageIndex(newIndex);
  };

  const loadNextImage = () => {
    const newIndex = currentImageIndex + 1 === images.length ? images.length - 1 : currentImageIndex + 1;
    setCurrentImageIndex(newIndex);
  };

  useEffect(() => {
    if (images.length) {
      setCurrentImageIndex(0);
    }
  }, [images]);

  return (
    <>
      {!!images.length && (
        <div className="container">
          {images.length > 1 && (
            <>
              <div className="arrow left" onClick={loadPrevImage}></div>
              <div className="arrow right" onClick={loadNextImage}></div>
            </>
          )}
          <Pannellum
            height={"600px"}
            width={"800px"}
            image={images[currentImageIndex]?.url}
            autoLoad
            pitch={10}
            yaw={180}
            hfov={110}
          />
        </div>
      )}
    </>
  );
};
