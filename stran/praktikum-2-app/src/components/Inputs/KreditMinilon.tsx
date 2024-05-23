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
            <h2 className="mb-4 text-success fw-bold">Kredit Minilon</h2>
            <div className="vnosnaPolja">
                <div className="mb-3">
                    <label htmlFor="zaproseniKredit" className="form-label">Zaproseni znesek kredita u EUR:</label>
                    <input type="number" className="form-control" name="zaproseniKredit" value={podatkiState.zaproseniKredit} onChange={HandleChange} style={{ borderColor: 'black', color: 'black' }}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="rokVracila" className="form-label">Rok vraćanja kredita u mesecima:</label>
                    <input type="number" className="form-control" name="rokVracila" value={podatkiState.rokVracila} onChange={HandleChange} style={{ borderColor: 'black', color: 'black' }}/>
                </div>
                <div className="mb-3">
                    <p>Mesečna anuiteta: {podatkiState.mesecnaAmuniteta}</p>
                </div>
            </div>
        </div>


    )
}

export default KreditMinilon