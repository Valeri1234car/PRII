import { useContext } from "react";
import { PodatkiContext } from "../../App";

const ZaposlitevPodatki = () => {

    const {podatkiState, setPodatkiState,setStran,HandleChange} = useContext(PodatkiContext);

    return(
        <div className="vnosItem">
            <h2 className="text-primary text-dark">Podatki o zaposlenem</h2>
            <div className="vnosnaPolja">
                <div className="mb-3">
                    <label htmlFor="delodajalec" className="form-label">Delodajalec:</label>
                    <input type="text" className="form-control" name="delodajalec" value={podatkiState.delodajalec} onChange={HandleChange} style={{ borderColor: 'black', color: 'black' }}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="bonitetnaOcenaDelodajalca" className="form-label">Bonitetna ocena delodajalca:</label>
                    <input type="number" className="form-control" name="bonitetnaOcenaDelodajalca" value={podatkiState.bonitetnaOcenaDelodajalca} onChange={HandleChange} style={{ borderColor: 'black', color: 'black' }}/>
                </div>
            </div>
        </div>

    )
}

export default ZaposlitevPodatki