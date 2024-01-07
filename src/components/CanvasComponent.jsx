import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import ImageService from "../services/ImageService";

const CanvasComponent = ({ selectedPicture, isNewCanvas }) => {
  console.log("isNewCanvas="+isNewCanvas)
  const canvasRef = useRef(null);
  const [canvasTitle, setCanvasTitle] = useState("Canvas");
  const [canvasDataURL, setCanvasDataURL] = useState("");

  useEffect(() => {
    const initializeCanvas = () => {
      if (!canvasRef.current) {
        console.error('Canvas reference is null.');
        return;
      }

      try {
        const newCanvas = new fabric.Canvas(canvasRef.current, {
          backgroundColor: 'white',
          width: 600,
          height: 400,
        });

        if (!isNewCanvas && selectedPicture) {
          loadPictureOnCanvas(selectedPicture.image, newCanvas);
        } else {
          loadBasicCanvas(newCanvas);
        }

        const pencilBrush = new fabric.PencilBrush(newCanvas);
        pencilBrush.color = 'black';
        pencilBrush.width = 2;
        newCanvas.freeDrawingBrush = pencilBrush;

        newCanvas.on('mouse:down', function (event) {
          const pointer = newCanvas.getPointer(event.e);

          if (event.e.shiftKey) {
            newCanvas.isDrawingMode = false;
            const text = new fabric.IText('Hello, Text!', {
              left: pointer.x,
              top: pointer.y,
              fontFamily: 'Arial',
              fontSize: 20,
              fill: 'black',
            });

            newCanvas.add(text);
          }
          if (event.e.ctrlKey) {
            newCanvas.isDrawingMode = true;
          }
        });

        newCanvas.on('object:added', function () {
          setCanvasDataURL(newCanvas.toDataURL());
        });
      } catch (error) {
        console.error('Error initializing canvas:', error);
      }
    };

    const loadBasicCanvas = (canvas) => {
      const rect = new fabric.Rect({
        left: 50,
        top: 50,
        width: 100,
        height: 50,
        fill: 'blue',
      });

      canvas.add(rect);
    };

    initializeCanvas();
  }, [selectedPicture, isNewCanvas]);


  const handleOnSave = () => {
    if (canvasRef.current) {
      if(isNewCanvas){
        const base64String = canvasDataURL; 
        console.log("Base64 image=",base64String)
        ImageService.postImage(base64String )
          .then((res) => {
            console.log("Saved picture:", res);
          })
          .catch((err) => {
            console.log("Failed to save picture, err=", err);
          });
      }else{
        if(!selectedPicture)
          console.log("Selected picture is null!")
        const base64String = canvasDataURL; 
        console.log("Base64 image=",base64String)
        ImageService.putImage(base64String,selectedPicture.id)
          .then((res) => {
            console.log("Updated picture:", res);
          })
          .catch((err) => {
            console.log("Failed to update picture, err=", err);
          });
      }
    }
  };
  const loadPictureOnCanvas = (base64String, canvas) => {
    console.log("Loading base64Image=" + base64String);
    console.log("Type of base64Image=" + typeof base64String);
  
    try {
      canvas.clear();
  
      fabric.Image.fromURL(base64String, function (img) {
        console.log('Image loaded successfully');
        canvas.add(img);
        setCanvasDataURL(canvas.toDataURL());
        canvas.renderAll(); // Force canvas redraw
      });
    } catch (error) {
      console.error('Error during image loading:', error);
    }
  };
  
  return (
    <div>
      <div>
        <h2 className="text-center">
          <input
            type="text"
            value={canvasTitle}
            onChange={(e) => setCanvasTitle(e.target.value)}
            style={{ 
              border: 'none',
              outline: 'none',
              background: 'transparent',
              textAlign: 'center', 
              lineHeight: '2rem', 
            }}
          />
        </h2>
        <button onClick={handleOnSave}>Save</button>
      </div>
      <div style={{ border: '1px solid grey', display: 'inline-block', padding: '10px' }}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};

export default CanvasComponent;
