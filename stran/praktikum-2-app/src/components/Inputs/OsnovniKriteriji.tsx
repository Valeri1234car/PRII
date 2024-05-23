import { useContext } from "react";
import { PodatkiContext } from "../../App";

const OsnovniKriteriji = () =>{


    const {podatkiState, setPodatkiState,setStran,HandleChange,HandleChangeInput} = useContext(PodatkiContext);

    

    return(
        <div className="vnosItem">
            <h2 className="mb-4 text-danger fw-bold">Izpolnjevanje osnovnih kriterijev</h2>
            <div className="vnosnaPolja">
                <div className="vnosVrstica">
                    <label htmlFor="drzavljanRS" className="form-label">Državljan Republike Slovenije:</label>
                    <input type="radio" name="drzavljanRS" value="true" checked={podatkiState.drzavljanRS === true} onChange={HandleChangeInput} className="form-check-input mx-2"/>
                    <label htmlFor="da">DA</label>
                    <input type="radio" name="drzavljanRS" value="false" checked={podatkiState.drzavljanRS === false} onChange={HandleChangeInput} className="form-check-input mx-2"/>
                    <label htmlFor="ne">NE</label>
                </div>
                <div className="vnosVrstica">
                    <label htmlFor="starost18" className="form-label">Starejši od 18 godina:</label>
                    <input type="radio" name="starost18" value="true" checked={podatkiState.starost18 === true} onChange={HandleChangeInput} className="form-check-input mx-2"/>
                    <label htmlFor="da">DA</label>
                    <input type="radio" name="starost18" value="false" checked={podatkiState.starost18 === false} onChange={HandleChangeInput} className="form-check-input mx-2"/>
                    <label htmlFor="ne">NE</label>
                </div>
                <div className="vnosVrstica">
                    <label htmlFor="stecajniPostopekNI" className="form-label">Prosilec NI u stečajnom postupku:</label>
                    <input type="radio" name="stecajniPostopekNI" value="true" checked={podatkiState.stecajniPostopekNI === true} onChange={HandleChangeInput} className="form-check-input mx-2"/>
                    <label htmlFor="da">DA</label>
                    <input type="radio" name="stecajniPostopekNI" value="false" checked={podatkiState.stecajniPostopekNI === false} onChange={HandleChangeInput} className="form-check-input mx-2"/>
                    <label htmlFor="ne">NE</label>
                </div>
                <div className="vnosVrstica">
                    <label htmlFor="zaposlenUpokojenec" className="form-label">Zaposlen ili penzioner:</label>
                    <input type="radio" name="zaposlenUpokojenec" value="true" checked={podatkiState.zaposlenUpokojenec === true} onChange={HandleChangeInput} className="form-check-input mx-2"/>
                    <label htmlFor="da">DA</label>
                    <input type="radio" name="zaposlenUpokojenec" value="false" checked={podatkiState.zaposlenUpokojenec === false} onChange={HandleChangeInput} className="form-check-input mx-2"/>
                    <label htmlFor="ne">NE</label>
                </div>
            </div>
        </div>

    )
}

export default OsnovniKriteriji