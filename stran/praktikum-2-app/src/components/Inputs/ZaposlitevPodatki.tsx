import { useContext } from "react";
import { PodatkiContext } from "../../App";

const ZaposlitevPodatki = () => {

    const {podatkiState, setPodatkiState,setStran,HandleChange} = useContext(PodatkiContext);

    return(
        <div className="vnosItem">
         <h2>Podatki o zaposlitvi</h2>
            <div className="vnosnaPolja">
            
                <div><label htmlFor="delodajalec">Delodajalec:</label>
                <input type="text" name="delodajalec" value={podatkiState.delodajalec} onChange={HandleChange}/></div>
                <div><label htmlFor="bonitetnaOcenaD">Bonitetna ocena delodajalca:</label>
                <input type="number" name="bonitetnaOcenaDelodajalca" value={podatkiState.bonitetnaOcenaDelodajalca} onChange={HandleChange}/></div>
            </div>
        </div>
    )
}

export default ZaposlitevPodatki