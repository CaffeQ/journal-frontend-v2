import CanvasComponent from "./CanvasComponent";
import PictureComponent from "./PicturesComponent";


export default function CanvasPageComponent(){
    return(
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
                <PictureComponent></PictureComponent>
            </div>
            <div>
                <CanvasComponent></CanvasComponent>
            </div>
        </div>
    );
}