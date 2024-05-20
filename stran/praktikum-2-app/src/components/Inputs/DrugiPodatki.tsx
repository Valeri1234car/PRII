import { useContext } from "react";
import { PodatkiContext } from "../../App";

const DrugiPodatki = () => {

    const {podatkiState, setPodatkiState,setStran,HandleChange,HandleChangeInput} = useContext(PodatkiContext);

    // const HandleChangeInput = (e:any) => {
    //     const { name, value } = e.target;
    //     setPodatkiState((prevState:any) => ({
    //         ...prevState,
    //         [name]: value === 'true' 
    //     }));
    // };

    return(
        <div className="vnosItem">
        <h2>Drugi podatki</h2>
        <div className="vnosnaPolja">
            <div><label htmlFor="izobrazba">Izobrazba: </label><input type="text" name="izobrazba" value={podatkiState.izobrazba} onChange={HandleChange}/></div>
            <div className="vnosVrstica">
                <label htmlFor="lastnistnovNepremicnin">(So)Lastništvo nepremičnin:</label>
                <input type="radio" name="lastnistnovNepremicnin" value="true" checked={podatkiState.lastnistnovNepremicnin === true} onChange={HandleChangeInput}/>DA
                <input type="radio" name="lastnistnovNepremicnin" value="false" checked={podatkiState.lastnistnovNepremicnin === false} onChange={HandleChangeInput}/>NE
            </div>
            <div><label htmlFor="stVzdrzevanihDruzinskihClanov">Število vzdrževanih družinskih članov: </label><input type="number" name="stVzdrzevanihDruzinskihClanov" value={podatkiState.stVzdrzevanihDruzinskihClanov} onChange={HandleChange}/></div>
            <div className="vnosVrstica">
                <label htmlFor="partnerZaposlen">Ali je partner zaposlen?:</label>
                <input type="radio" name="partnerZaposlen" value="true" checked={podatkiState.partnerZaposlen === true} onChange={HandleChangeInput}/>DA
                <input type="radio" name="partnerZaposlen" value="false" checked={podatkiState.partnerZaposlen === false} onChange={HandleChangeInput}/>NE
            </div>
            <div className="vnosVrstica">
                <label htmlFor="samohranilec">Samohranilec:</label>
                <input type="radio" name="samohranilec" value="true" checked={podatkiState.samohranilec === true} onChange={HandleChangeInput}/>DA
                <input type="radio" name="samohranilec" value="false" checked={podatkiState.samohranilec === false} onChange={HandleChangeInput}/>NE
            </div>
            <div className="vnosVrstica">
                <label htmlFor="zavezanecNaPrezivnin">Zavezanec za preživnino:</label>
                <input type="radio" name="zavezanecNaPrezivnin" value="true" checked={podatkiState.zavezanecNaPrezivnin === true} onChange={HandleChangeInput}/>DA
                <input type="radio" name="zavezanecNaPrezivnin" value="false" checked={podatkiState.zavezanecNaPrezivnin === false} onChange={HandleChangeInput}/>NE
            </div>
            <div><label htmlFor="znesekMesecnePrezivnine">Znesek mesečne preživnine: </label><input type="number" name="znesekMesecnePrezivnine" value={podatkiState.znesekMesecnePrezivnine} onChange={HandleChange}/></div>

            <div className="vnosVrstica">
                <label htmlFor="sumljivost">Sum na razne oblike odvisnosti, sumljive prakse pri najemanju kredita:</label>
                <input type="radio" name="sumljivost" value="true" checked={podatkiState.sumljivost === true} onChange={HandleChangeInput}/>DA
                <input type="radio" name="sumljivost" value="false" checked={podatkiState.sumljivost === false} onChange={HandleChangeInput}/>NE
            </div>

        </div>
            
            
        </div>
    )
}

export default DrugiPodatki