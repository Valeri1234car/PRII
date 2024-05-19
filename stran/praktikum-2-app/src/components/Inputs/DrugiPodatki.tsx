import { useContext } from "react";
import { PodatkiContext } from "../../App";

const DrugiPodatki = () => {

    const {podatkiState, setPodatkiState,setStran,HandleChange} = useContext(PodatkiContext);

    return(
        <div className="vnosItem">
        <h2>Drugi podatki</h2>
            <div className="vnosnaPolja">
            </div>
            
        </div>
    )
}

export default DrugiPodatki