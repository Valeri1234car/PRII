import { useContext } from "react";
import { PodatkiContext } from "../../App";
const SisbonPodatki = () => {

    const {podatkiState, setPodatkiState,setStran,HandleChange, HandleChangeInput} = useContext(PodatkiContext);

    return (
        <div className="vnosItem">
            <h2 className="mb-4 text-success text-dark">PODATKI SISBON (V EUR)</h2>
            <div className="vnosnaPolja">
                <div className="mb-3">
                    <label htmlFor="sisbonNeodplacanDelObvezost" className="form-label">SISBON - NEODPLAČAN DEL OBVEZNOSTI:</label>
                    <input type="text" className="form-control" name="sisbonNeodplacanDelObvezost" value={podatkiState.sisbonNeodplacanDelObvezost} onChange={HandleChange} style={{ borderColor: 'black', color: 'black' }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="sisbonZapadliDolg" className="form-label">SISBON - ZAPADLI DOLG:</label>
                    <input type="text" className="form-control" name="sisbonZapadliDolg" value={podatkiState.sisbonZapadliDolg} onChange={HandleChange} style={{ borderColor: 'black', color: 'black' }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="sisbonIzterjava" className="form-label">SISBON - IZTERJAVA:</label>
                    <input type="text" className="form-control" name="sisbonIzterjava" value={podatkiState.sisbonIzterjava} onChange={HandleChange} style={{ borderColor: 'black', color: 'black' }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="sisbonIzvrsba" className="form-label">SISBON - IZVRŠBA:</label>
                    <input type="text" className="form-control" name="sisbonIzvrsba" value={podatkiState.sisbonIzvrsba} onChange={HandleChange} style={{ borderColor: 'black', color: 'black' }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="sisbonOmejitevTRR" className="form-label">Sum na razne oblike odvisnosti, sumljive prakse pri najemanju kredita:</label>
                    <div className="form-check form-check-inline">
                        <input type="radio" className="form-check-input" id="sisbonOmejitevTRRTrue" name="sisbonOmejitevTRR" value="true" checked={podatkiState.sisbonOmejitevTRR === true} onChange={HandleChangeInput} />
                        <label className="form-check-label mx-2" htmlFor="sisbonOmejitevTRRTrue">DA</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input type="radio" className="form-check-input" id="sisbonOmejitevTRRFalse" name="sisbonOmejitevTRR" value="false" checked={podatkiState.sisbonOmejitevTRR === false} onChange={HandleChangeInput} />
                        <label className="form-check-label mx-2" htmlFor="sisbonOmejitevTRRFalse">NE</label>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default SisbonPodatki