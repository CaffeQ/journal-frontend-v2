import SearchComponent from "./SearchComponent";
import SearchQuarkusComponent from "./SearchQuarkusComp";


export default function SearchPageComponent(){
    return(
        <div>
            <h2 className="text-center">Search</h2>
            <SearchComponent/>
            <SearchQuarkusComponent/>
        </div>
    );
}