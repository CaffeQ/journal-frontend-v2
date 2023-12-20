import { useState } from "react";
import CanvasComponent from "./CanvasComponent";
import PictureComponent from "./PicturesComponent";


export default function CanvasPageComponent() {
    const [selectedPicture, setSelectedPicture] = useState(null);
    const [isNewCanvas, setIsNewCanvas] = useState(true);

    const handleSelectPicture = (picture) => {
        setSelectedPicture(picture);
        setIsNewCanvas(false);
    };
  
    return (
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <PictureComponent onSelectPicture={handleSelectPicture}></PictureComponent>
        </div>
        <div>
          <CanvasComponent selectedPicture={selectedPicture} isNewCanvas={isNewCanvas}></CanvasComponent>
        </div>
      </div>
    );
  }