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
            <h2 className="mb-4 text-success fw-bold">Drugi podatki</h2>
            <div className="vnosnaPolja">
                <div className="mb-3">
                    <label htmlFor="izobrazba" className="form-label">Izobrazba:</label>
                    <input type="text" className="form-control" name="izobrazba" value={podatkiState.izobrazba} onChange={HandleChange} style={{ borderColor: 'navy', color: 'navy' }} />
                </div>
                <div className="mb-3">
                    <label className="form-label">(So)Lastništvo nepremičnin:</label>
                    <div className="form-check form-check-inline">
                        <input type="radio" className="form-check-input" id="lastnistnovNepremicninTrue" name="lastnistnovNepremicnin" value="true" checked={podatkiState.lastnistnovNepremicnin === true} onChange={HandleChangeInput} />
                        <label className="form-check-label mx-2" htmlFor="lastnistnovNepremicninTrue">DA</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input type="radio" className="form-check-input" id="lastnistnovNepremicninFalse" name="lastnistnovNepremicnin" value="false" checked={podatkiState.lastnistnovNepremicnin === false} onChange={HandleChangeInput} />
                        <label className="form-check-label mx-2" htmlFor="lastnistnovNepremicninFalse">NE</label>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="stVzdrzevanihDruzinskihClanov" className="form-label">Število vzdrževanih družinskih članov:</label>
                    <input type="number" className="form-control" name="stVzdrzevanihDruzinskihClanov" value={podatkiState.stVzdrzevanihDruzinskihClanov} onChange={HandleChange} style={{ borderColor: 'navy', color: 'navy' }} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Ali je partner zaposlen?:</label>
                    <div className="form-check form-check-inline">
                        <input type="radio" className="form-check-input" id="partnerZaposlenTrue" name="partnerZaposlen" value="true" checked={podatkiState.partnerZaposlen === true} onChange={HandleChangeInput} />
                        <label className="form-check-label mx-2" htmlFor="partnerZaposlenTrue">DA</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input type="radio" className="form-check-input" id="partnerZaposlenFalse" name="partnerZaposlen" value="false" checked={podatkiState.partnerZaposlen === false} onChange={HandleChangeInput} />
                        <label className="form-check-label mx-2" htmlFor="partnerZaposlenFalse">NE</label>
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Samohranilec:</label>
                    <div className="form-check form-check-inline">
                        <input type="radio" className="form-check-input" id="samohranilecTrue" name="samohranilec" value="true" checked={podatkiState.samohranilec === true} onChange={HandleChangeInput} />
                        <label className="form-check-label mx-2" htmlFor="samohranilecTrue">DA</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input type="radio" className="form-check-input" id="samohranilecFalse" name="samohranilec" value="false" checked={podatkiState.samohranilec === false} onChange={HandleChangeInput} />
                        <label className="form-check-label mx-2" htmlFor="samohranilecFalse">NE</label>
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Zavezanec za preživnino:</label>
                    <div className="form-check form-check-inline">
                        <input type="radio" className="form-check-input" id="zavezanecNaPrezivninTrue" name="zavezanecNaPrezivnin" value="true" checked={podatkiState.zavezanecNaPrezivnin === true} onChange={HandleChangeInput} />
                        <label className="form-check-label mx-2" htmlFor="zavezanecNaPrezivninTrue">DA</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input type="radio" className="form-check-input" id="zavezanecNaPrezivninFalse" name="zavezanecNaPrezivnin" value="false" checked={podatkiState.zavezanecNaPrezivnin === false} onChange={HandleChangeInput} />
                        <label className="form-check-label mx-2" htmlFor="zavezanecNaPrezivninFalse">NE</label>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="znesekMesecnePrezivnine" className="form-label">Znesek mesečne preživnine:</label>
                    <input type="number" className="form-control" name="znesekMesecnePrezivnine" value={podatkiState.znesekMesecnePrezivnine} onChange={HandleChange} style={{ borderColor: 'navy', color: 'navy' }} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Sum na razne oblike odvisnosti, sumljive prakse pri najemanju kredita:</label>
                    <div className="form-check form-check-inline">
                        <input type="radio" className="form-check-input" id="sumljivostTrue" name="sumljivost" value="true" checked={podatkiState.sumljivost === true} onChange={HandleChangeInput} />
                        <label className="form-check-label mx-2" htmlFor="sumljivostTrue">DA</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input type="radio" className="form-check-input" id="sumljivostFalse" name="sumljivost" value="false" checked={podatkiState.sumljivost === false} onChange={HandleChangeInput} />
                        <label className="form-check-label mx-2" htmlFor="sumljivostFalse">NE</label>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default DrugiPodatki