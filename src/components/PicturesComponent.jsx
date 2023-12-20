import { useEffect, useState } from "react";
import ImageService from "../services/ImageService";

const PictureComponent = ({ onSelectPicture }) => {
    const [pictures, setPictures] = useState([]);
    const [isError, setIsError] = useState(false);
  
    useEffect(() => {
      ImageService.getAllImages()
        .then((res) => {
          setPictures(res);
          console.log("Setting pictures:", res);
          setIsError(false);
        })
        .catch((err) => {
          setIsError(true);
        });
    }, []);
  
    useEffect(() => {
      console.log("Pictures", pictures);
    }, [pictures]);
  
    const handleEditClick = (picture) => {
        console.log("Image="+picture.image)
        onSelectPicture(picture);
      };
    
      if (pictures.length > 0) {
        return (
          <div>
            <h2 className="text-center">Patient Pictures</h2>
            <table className="table table-striped">
              <tbody>
                {pictures.map((picture) => (
                  <tr key={picture.id}>
                    <td>{picture.date}</td>
                    <td>
                      <button onClick={() => handleEditClick(picture)}>Edit</button>
                    </td>
                    <td>
                      <button>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      } else {
        return (
          <div>
            <h2 className="text-center">No found pictures</h2>
          </div>
        );
      }
    };
  

export default PictureComponent;