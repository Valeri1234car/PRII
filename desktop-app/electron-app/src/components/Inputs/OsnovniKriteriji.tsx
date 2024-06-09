/**
 * @file OsnovniKriteriji.tsx
 * @brief Komponenta za preverjanje osnovnih kriterijev uporabnika
 *
 * @opis Komponenta OsnovniKriteriji omogoča uporabnikom, da vnesejo osnovne podatke, ki določajo njihovo upravičenost za kredit.
 * Komponenta uporablja kontekst za dostop do stanja aplikacije in omogoča uporabnikom, da posodabljajo vrednosti z radijskimi gumbi.
 *
 * @potrebuje react, useContext iz "react", PodatkiContext iz "../../App"
 *
 * @verzija 1.0.0
 * @since 1.0.0
 */
import { useContext } from "react";
import { PodatkiContext } from "../../App";

const OsnovniKriteriji = () => {
    const { podatkiState,  HandleChangeInput } = useContext(PodatkiContext);

    // const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = event.target;
    //     const booleanValue = value === 'true';
    //     setPodatkiState((prevState: any) => ({
    //         ...prevState,
    //         [name]: booleanValue
    //     }));
    // };

    return (
        <div className="vnosItem">
            <h2 className="mb-4 text-primary text-dark">Izpolnjevanje osnovnih kriterijev</h2>
            <div className="vnosnaPolja">
                <div className="vnosVrstica">
                    <label htmlFor="drzavljanRS">Državljan Republike Slovenije:</label>
                    <input type="radio" className="form-check-input" name="drzavljanRS" value="true" checked={podatkiState.drzavljanRS === true} onChange={HandleChangeInput}/>DA
                    <input type="radio" className="form-check-input" name="drzavljanRS" value="false" checked={podatkiState.drzavljanRS === false} onChange={HandleChangeInput}/>NE
                </div>
                <div className="vnosVrstica">
                    <label htmlFor="starost18">Starejši od 18 let:</label>
                    <input type="radio" className="form-check-input" name="starost18" value="true" checked={podatkiState.starost18 === true} onChange={HandleChangeInput}/>DA
                    <input type="radio" className="form-check-input" name="starost18" value="false" checked={podatkiState.starost18 === false} onChange={HandleChangeInput}/>NE
                </div>
                <div className="vnosVrstica">
                    <label htmlFor="stecajniPostopekNI">Prosilec NI v stečajnem postopku:</label>
                    <input type="radio" className="form-check-input" name="stecajniPostopekNI" value="true" checked={podatkiState.stecajniPostopekNI === true} onChange={HandleChangeInput}/>DA
                    <input type="radio" className="form-check-input" name="stecajniPostopekNI" value="false" checked={podatkiState.stecajniPostopekNI === false} onChange={HandleChangeInput}/>NE
                </div>
                <div className="vnosVrstica">
                    <label htmlFor="zaposlen">Zaposlen:</label>
                    <input className="form-check-input"
                           type="radio"
                           name="zaposlenUpokojenec"
                           value="true"
                           checked={podatkiState.zaposlenUpokojenec === true}
                           onChange={HandleChangeInput}
                    />DA
                    <input className="form-check-input"
                           type="radio"
                           name="zaposlenUpokojenec"
                           value="false"
                           checked={podatkiState.zaposlenUpokojenec === false}
                           onChange={HandleChangeInput}
                    />NE
                </div>
            </div>
        </div>
    );
}

export default OsnovniKriteriji;
