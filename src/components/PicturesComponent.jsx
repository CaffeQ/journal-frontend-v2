import { useEffect, useState } from "react";

const PictureComponent = ()=>{
    const [pictures, setPictures] = useState([])
    useEffect(()=>{
        setPictures(testDataPictures)
    })
    var isError = true


if(pictures!=null){
    return(
        <div>
            <h2 className="text-center">Patient Pictures</h2>
            <table className="table table-striped">
                <tbody>
                    {pictures.map((picture) => (
                        <tr key={picture.id}>
                            <td>{picture.name}</td>
                            <td>{picture.date}</td>
                            <button>Edit</button>
                            <button>Delete</button>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )}else{
        return(
        <div>
            <h2 className="text-center">No found pictures</h2>
        </div>
        );
    }
}

const testDataPictures = [
    { id: 1, imageData: 'base64_encoded_image_data_1', name: 'Picture 1', date: '2023-12-08' },
    { id: 2, imageData: 'base64_encoded_image_data_2', name: 'Picture 2', date: '2023-12-09' },
    { id: 3, imageData: 'base64_encoded_image_data_3', name: 'Picture 3', date: '2023-12-10' },
];

export default PictureComponent;