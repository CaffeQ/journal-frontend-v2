import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';

const CanvasComponent = () => {
  const canvasRef = useRef(null);
  const [canvasTitle, setCanvasTitle] = useState("Canvas");
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

     
        const rect = new fabric.Rect({
          left: 50,
          top: 50,
          width: 100,
          height: 50,
          fill: 'blue',
        });

        newCanvas.add(rect);

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
      } catch (error) {
        console.error('Error initializing canvas:', error);
      }
    };

    initializeCanvas();
  }, []);

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
              textAlign: 'center', // Center horizontally
              lineHeight: '2rem', // Adjust the line height for vertical centering
            }}
          />
        </h2>
      </div>
      <div style={{ border: '1px solid grey', display: 'inline-block', padding: '10px' }}>
        <canvas ref={canvasRef} />
      </div>
  
    </div>
  );
};

export default CanvasComponent;
