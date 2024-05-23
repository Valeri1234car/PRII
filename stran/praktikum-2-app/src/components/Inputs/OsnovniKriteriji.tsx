import { useContext } from "react";
import { PodatkiContext } from "../../App";

const OsnovniKriteriji = () => {
    const { podatkiState, setPodatkiState, HandleChangeInput } = useContext(PodatkiContext);

    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const booleanValue = value === 'true'; 
        setPodatkiState((prevState: any) => ({
            ...prevState,
            [name]: booleanValue
        }));
    };

    return (
        <div className="vnosItem">
            <h2>Izpolnjevanje osnovnih kriterijev</h2>
            <div className="vnosnaPolja">
                <div className="vnosVrstica">
                    <label htmlFor="drzavljanRS">Državljan Republike Slovenije:</label>
                    <input
                        type="radio"
                        name="drzavljanRS"
                        value="true"
                        checked={podatkiState.drzavljanRS === true}
                        onChange={handleChangeInput}
                    />DA
                    <input
                        type="radio"
                        name="drzavljanRS"
                        value="false"
                        checked={podatkiState.drzavljanRS === false}
                        onChange={handleChangeInput}
                    />NE
                </div>
                <div className="vnosVrstica">
                    <label htmlFor="starost18">Starejši od 18 let:</label>
                    <input
                        type="radio"
                        name="starost18"
                        value="true"
                        checked={podatkiState.starost18 === true}
                        onChange={handleChangeInput}
                    />DA
                    <input
                        type="radio"
                        name="starost18"
                        value="false"
                        checked={podatkiState.starost18 === false}
                        onChange={handleChangeInput}
                    />NE
                </div>
                <div className="vnosVrstica">
                    <label htmlFor="stecajniPostopekNI">Prosilec NI v stečajnem postopku:</label>
                    <input
                        type="radio"
                        name="stecajniPostopekNI"
                        value="true"
                        checked={podatkiState.stecajniPostopekNI === true}
                        onChange={handleChangeInput}
                    />DA
                    <input
                        type="radio"
                        name="stecajniPostopekNI"
                        value="false"
                        checked={podatkiState.stecajniPostopekNI === false}
                        onChange={handleChangeInput}
                    />NE
                </div>
                <div className="vnosVrstica">
                    <label htmlFor="zaposlen">Zaposlen:</label>
                    <input
                        type="radio"
                        name="zaposlen"
                        value="true"
                        checked={podatkiState.zaposlen === true}
                        onChange={handleChangeInput}
                    />DA
                    <input
                        type="radio"
                        name="zaposlen"
                        value="false"
                        checked={podatkiState.zaposlen === false}
                        onChange={handleChangeInput}
                    />NE
                </div>
                <div className="vnosVrstica">
                    <label htmlFor="upokojenec">Upokojenec:</label>
                    <input
                        type="radio"
                        name="upokojenec"
                        value="true"
                        checked={podatkiState.upokojenec === true}
                        onChange={handleChangeInput}
                    />DA
                    <input
                        type="radio"
                        name="upokojenec"
                        value="false"
                        checked={podatkiState.upokojenec === false}
                        onChange={handleChangeInput}
                    />NE
                </div>
            </div>
        </div>
    );
};

export default OsnovniKriteriji;
