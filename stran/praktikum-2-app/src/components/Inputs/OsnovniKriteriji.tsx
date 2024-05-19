import { useContext } from "react";
import { PodatkiContext } from "../../App";

const OsnovniKriteriji = () =>{


    const {podatkiState, setPodatkiState,setStran,HandleChange} = useContext(PodatkiContext);

    const HandleChangeInput = (e:any) => {
        const { name, value } = e.target;
        setPodatkiState((prevState:any) => ({
            ...prevState,
            [name]: value === 'true' 
        }));
    };

    return(
        <div className="vnosItem">
        <h2>Izpolnjevanje osnvnih kriterijev</h2>
            <div className="vnosnaPolja">
    <div className="vnosVrstica">
        <label htmlFor="drzavljanRS">Državljan Republike Slovenije:</label>
        <input type="radio" name="drzavljanRS" value="true" checked={podatkiState.drzavljanRS === true} onChange={HandleChangeInput}/>DA
        <input type="radio" name="drzavljanRS" value="false" checked={podatkiState.drzavljanRS === false} onChange={HandleChangeInput}/>NE
    </div>
    <div className="vnosVrstica">
        <label htmlFor="starost18">Starejši od 18 let:</label>
        <input type="radio" name="starost18" value="true" checked={podatkiState.starost18 === true} onChange={HandleChangeInput}/>DA
        <input type="radio" name="starost18" value="false" checked={podatkiState.starost18 === false} onChange={HandleChangeInput}/>NE
    </div>
    <div className="vnosVrstica">
        <label htmlFor="stecajniPostopekNI">Prosilec NI v stečajnem postopku:</label>
        <input type="radio" name="stecajniPostopekNI" value="true" checked={podatkiState.stecajniPostopekNI === true} onChange={HandleChangeInput}/>DA
        <input type="radio" name="stecajniPostopekNI" value="false" checked={podatkiState.stecajniPostopekNI === false} onChange={HandleChangeInput}/>NE
    </div>
    <div className="vnosVrstica">
        <label htmlFor="zaposlenUpokojenec">Zaposlen ali upokojenec:</label>
        <input type="radio" name="zaposlenUpokojenec" value="true" checked={podatkiState.zaposlenUpokojenec === true} onChange={HandleChangeInput}/>DA
        <input type="radio" name="zaposlenUpokojenec" value="false" checked={podatkiState.zaposlenUpokojenec === false} onChange={HandleChangeInput}/>NE
    </div>
    </div>
    </div>
    )
}

export default OsnovniKriteriji