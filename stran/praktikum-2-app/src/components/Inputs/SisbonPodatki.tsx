import { useContext } from "react";
import { PodatkiContext } from "../../App";
const SisbonPodatki = () => {

    const {podatkiState, setPodatkiState,setStran,HandleChange, HandleChangeInput} = useContext(PodatkiContext);

    return (
        <div className="vnosItem">
        <h2>PODATKI SISBON (V EUR)</h2>
        <div className="vnosnaPolja">
            <div><label htmlFor="sisbonNeodplacanDelObvezost">SISBON - NEODPLAČAN DEL OBVEZNOSTI: </label><input type="text" name="sisbonNeodplacanDelObvezost" value={podatkiState.sisbonNeodplacanDelObvezost} onChange={HandleChange}/></div>
            <div><label htmlFor="sisbonZapadliDolg">SISBON - ZAPADLI DOLG: </label><input type="text" name="sisbonZapadliDolg" value={podatkiState.sisbonZapadliDolg} onChange={HandleChange}/></div>
            <div><label htmlFor="sisbonIzterjava">SISBON - IZTERJAVA: </label><input type="text" name="sisbonIzterjava" value={podatkiState.sisbonIzterjava} onChange={HandleChange}/></div>
            <div><label htmlFor="sisbonIzvrsba">SISBON - IZVRŠBA: </label><input type="text" name="sisbonIzvrsba" value={podatkiState.sisbonIzvrsba} onChange={HandleChange}/></div>

            <div className="vnosVrstica">
                <label htmlFor="sisbonOmejitevTRR">Sum na razne oblike odvisnosti, sumljive prakse pri najemanju kredita:</label>
                <input type="radio" name="sisbonOmejitevTRR" value="true" checked={podatkiState.sisbonOmejitevTRR === true} onChange={HandleChangeInput}/>DA
                <input type="radio" name="sisbonOmejitevTRR" value="false" checked={podatkiState.sisbonOmejitevTRR === false} onChange={HandleChangeInput}/>NE
            </div>

        </div>
            
            
        </div>
    )
}

export default SisbonPodatki