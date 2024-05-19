import { useContext, useEffect } from "react";
import { PodatkiContext } from "../../App";
import { zneskiMesecnihAnuitet } from "../../interface/ZneskiMesecnihAnuitet";

const KreditMinilon = () =>{

    const {podatkiState, setPodatkiState,setStran,HandleChange} = useContext(PodatkiContext);


    useEffect(()=>{
        let enako = false;
        zneskiMesecnihAnuitet.forEach(element => {
            if(element.znesekKredita == podatkiState.zaproseniKredit && element.rocnostVMescih == podatkiState.rokVracila){
                setPodatkiState({...podatkiState,mesecnaAmuniteta: element.znesekMesecneAnuitete})
                enako = true;
            }
        });
        if(!enako){
            setPodatkiState({...podatkiState,mesecnaAmuniteta:0})
        }

    },[podatkiState.zaproseniKredit, podatkiState.rokVracila])

    return(
        <div className="vnosItem">
        <h2>Kredit Minilon</h2>
            <div className="vnosnaPolja">
            
                <div><label htmlFor="zaproseniKredit">Zaprošeni znesek kredita v EUR:</label>
                <input type="number" name="zaproseniKredit" value={podatkiState.zaproseniKredit} onChange={HandleChange}/></div>
                <div><label htmlFor="rokVracila">Rok vračila kredita v mesecih:</label>
                <input type="number" name="rokVracila" value={podatkiState.rokVracila} onChange={HandleChange}/></div>
                <div>
                    {/* <label htmlFor="mesecnaAmuniteta">Mesecna amuniteta:</label>
                <input type="number" name="mesecnaAmuniteta" value={podatkiState.mesecnaAmuniteta} onChange={HandleChange}/> */}
                <p>Mesecna anuiteta: {podatkiState.mesecnaAmuniteta}</p>
                </div>
            </div>
        </div>
    )
}

export default KreditMinilon