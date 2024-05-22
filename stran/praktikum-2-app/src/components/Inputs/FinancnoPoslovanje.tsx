import { useContext, useEffect } from "react";
import { PodatkiContext } from "../../App";
import { minimalnaPlaca } from "../../interface/ZneskiMesecnihAnuitet";
const FinancnoPoslovanje = () =>{
    
    const {podatkiState, setPodatkiState, setStran, HandleChange} = useContext(PodatkiContext);

    const HandleChange2 = (e:any) => {
        const { name, value } = e.target;
        const newValue = parseFloat(value) || 0;  
        
        
        const [category, property] = name.split('.');
    
        setPodatkiState((prevState:any) => {
            
            const categoryState = { ...prevState[category] };
    
            
            categoryState[property] = newValue;
    
            
            const average = (categoryState.t1 + categoryState.t2 + categoryState.t3) / 3;
            categoryState.povprecje = parseFloat(average.toFixed(2));  
    
            return {
                ...prevState,
                [category]: categoryState
            };
        });
    };

//-------------nerubljiv dohodek ------------------------------
    useEffect(()=>{
        let nerubljivDohodek=0;
        if(podatkiState.zavezanecNaPrezivnin){
            nerubljivDohodek = (minimalnaPlaca *0.5) + parseFloat(podatkiState.znesekMesecnePrezivnine);
        }
        else{
            nerubljivDohodek = (minimalnaPlaca * 0.76);
            if(podatkiState.samohranilec){
                nerubljivDohodek = nerubljivDohodek + (podatkiState.stVzdrzevanihDruzinskihClanov * 237.29)
            }
            else{
                nerubljivDohodek = nerubljivDohodek + (podatkiState.stVzdrzevanihDruzinskihClanov * (237.29 / 2))
            }
        }
        setPodatkiState({...podatkiState, nerubljivDohodek: nerubljivDohodek})
        
    },[podatkiState.znesekMesecnePrezivnine, podatkiState.zavezanecNaPrezivnin, podatkiState.samohranilec,podatkiState.stVzdrzevanihDruzinskihClanov])


//------------rubljiv dohodek-----------------------
    useEffect(()=>{
        let rubljivDohodek = 0;
        let izracun = podatkiState.znesekPrejemkovPokojnina.povprecje + podatkiState.znesekDrugihPrejemkov.povprecje - podatkiState.nerubljivDohodek;
        if(izracun > 0){
            rubljivDohodek =  izracun;
        }
        setPodatkiState({...podatkiState, rubljivDohodek: rubljivDohodek})


    },[podatkiState.znesekPrejemkovPokojnina,podatkiState.znesekDrugihPrejemkov, podatkiState.nerubljivDohodek])

//----------------Dohodki po plačilu obstoječih finančnih obveznosti (krediti, Leasing,…) in Dohodki po plačilu obstoječih in novih finančnih obveznosti------------------
    useEffect(()=>{
        let dohodkiPoPlacilu= podatkiState.znesekPrejemkovPokojnina.povprecje + podatkiState.znesekDrugihPrejemkov.povprecje - podatkiState.mesecniZnesekZaOdplacilodrugihKreditov.povprecje;
        if(podatkiState.stanjeTRR.povprecje < 0){
            dohodkiPoPlacilu += (podatkiState.stanjeTRR.povprecje/12)
        }

        let ddohodkiPoPlaciluInAmuniteta = dohodkiPoPlacilu - podatkiState.mesecnaAmuniteta;
        setPodatkiState({...podatkiState, dohodkiPoPlaciluStarga: dohodkiPoPlacilu, dohodkiPoPlaciluVsega:ddohodkiPoPlaciluInAmuniteta})

    },[podatkiState.znesekPrejemkovPokojnina,podatkiState.znesekDrugihPrejemkov, podatkiState.mesecnaAmuniteta,podatkiState.stanjeTRR])

    return(
        <div className="vnosItem">
        <h2>Podatki o finančnem poslovanju v EUR</h2>
        <div className="vnosnaPolja">
        <table>
    <tr>
        <td></td>
        <th>T-3</th>
        <th>T-2</th>
        <th>T-1</th>
        <th>Povprečje</th>
    </tr>
    <tr>
        <td>Mesečni promet v dobro:</td>
        <td><input type="number" name="mesecniPrometDobro.t1" value={podatkiState.mesecniPrometDobro.t1} onChange={HandleChange2}/></td>
        <td><input type="number" name="mesecniPrometDobro.t2" value={podatkiState.mesecniPrometDobro.t2} onChange={HandleChange2}/></td>
        <td><input type="number" name="mesecniPrometDobro.t3" value={podatkiState.mesecniPrometDobro.t3} onChange={HandleChange2}/></td>
        <td>{podatkiState.mesecniPrometDobro.povprecje}</td>
    </tr>
    <tr>
        <td>Mesečni promet v breme:</td>
        <td><input type="number" name="mesecniPrometBreme.t1" value={podatkiState.mesecniPrometBreme.t1} onChange={HandleChange2}/></td>
        <td><input type="number" name="mesecniPrometBreme.t2" value={podatkiState.mesecniPrometBreme.t2} onChange={HandleChange2}/></td>
        <td><input type="number" name="mesecniPrometBreme.t3" value={podatkiState.mesecniPrometBreme.t3} onChange={HandleChange2}/></td>
        <td>{podatkiState.mesecniPrometBreme.povprecje}</td>
    </tr>
    <tr>
        <td>Stanje na TRR:</td>
        <td><input type="number" name="stanjeTRR.t1" value={podatkiState.stanjeTRR.t1} onChange={HandleChange2}/></td>
        <td><input type="number" name="stanjeTRR.t2" value={podatkiState.stanjeTRR.t2} onChange={HandleChange2}/></td>
        <td><input type="number" name="stanjeTRR.t3" value={podatkiState.stanjeTRR.t3} onChange={HandleChange2}/></td>
        <td>{podatkiState.stanjeTRR.povprecje}</td>
    </tr>
    <tr>
        <td>Znesek prejemkov iz dela oz. pokojnina:</td>
        <td><input type="number" name="znesekPrejemkovPokojnina.t1" value={podatkiState.znesekPrejemkovPokojnina.t1} onChange={HandleChange2}/></td>
        <td><input type="number" name="znesekPrejemkovPokojnina.t2" value={podatkiState.znesekPrejemkovPokojnina.t2} onChange={HandleChange2}/></td>
        <td><input type="number" name="znesekPrejemkovPokojnina.t3" value={podatkiState.znesekPrejemkovPokojnina.t3} onChange={HandleChange2}/></td>
        <td>{podatkiState.znesekPrejemkovPokojnina.povprecje}</td>
    </tr>
    <tr>
        <td>Znesek drugih prejemkov:</td>
        <td><input type="number" name="znesekDrugihPrejemkov.t1" value={podatkiState.znesekDrugihPrejemkov.t1} onChange={HandleChange2}/></td>
        <td><input type="number" name="znesekDrugihPrejemkov.t2" value={podatkiState.znesekDrugihPrejemkov.t2} onChange={HandleChange2}/></td>
        <td><input type="number" name="znesekDrugihPrejemkov.t3" value={podatkiState.znesekDrugihPrejemkov.t3} onChange={HandleChange2}/></td>
        <td>{podatkiState.znesekDrugihPrejemkov.povprecje}</td>
    </tr>
    <tr>
        <td>Mesečni znesek za odplačilo obstoječih kreditov:</td>
        <td><input type="number" name="mesecniZnesekZaOdplacilodrugihKreditov.t1" value={podatkiState.mesecniZnesekZaOdplacilodrugihKreditov.t1} onChange={HandleChange2}/></td>
        <td><input type="number" name="mesecniZnesekZaOdplacilodrugihKreditov.t2" value={podatkiState.mesecniZnesekZaOdplacilodrugihKreditov.t2} onChange={HandleChange2}/></td>
        <td><input type="number" name="mesecniZnesekZaOdplacilodrugihKreditov.t3" value={podatkiState.mesecniZnesekZaOdplacilodrugihKreditov.t3} onChange={HandleChange2}/></td>
        <td>{podatkiState.mesecniZnesekZaOdplacilodrugihKreditov.povprecje}</td>
    </tr>
    <tr>
        <td>Število neizvršenih trajnih nalogov:</td>
        <td><input type="number" name="stNeizvrsenihTrajnihNalogov.t1" value={podatkiState.stNeizvrsenihTrajnihNalogov.t1} onChange={HandleChange2}/></td>
        <td><input type="number" name="stNeizvrsenihTrajnihNalogov.t2" value={podatkiState.stNeizvrsenihTrajnihNalogov.t2} onChange={HandleChange2}/></td>
        <td><input type="number" name="stNeizvrsenihTrajnihNalogov.t3" value={podatkiState.stNeizvrsenihTrajnihNalogov.t3} onChange={HandleChange2}/></td>
        <td>{podatkiState.stNeizvrsenihTrajnihNalogov.povprecje}</td>
    </tr>
    <tr>
        <td>Število bančnih pobotov:</td>
        <td><input type="number" name="stBancnihPobotov.t1" value={podatkiState.stBancnihPobotov.t1} onChange={HandleChange2}/></td>
        <td><input type="number" name="stBancnihPobotov.t2" value={podatkiState.stBancnihPobotov.t2} onChange={HandleChange2}/></td>
        <td><input type="number" name="stBancnihPobotov.t3" value={podatkiState.stBancnihPobotov.t3} onChange={HandleChange2}/></td>
        <td>{podatkiState.stBancnihPobotov.povprecje}</td>
    </tr>
    <tr>
        <td>Število izvršb na TRR:</td>
        <td><input type="number" name="stIzvrsbNaTrr.t1" value={podatkiState.stIzvrsbNaTrr.t1} onChange={HandleChange2}/></td>
        <td><input type="number" name="stIzvrsbNaTrr.t2" value={podatkiState.stIzvrsbNaTrr.t2} onChange={HandleChange2}/></td>
        <td><input type="number" name="stIzvrsbNaTrr.t3" value={podatkiState.stIzvrsbNaTrr.t3} onChange={HandleChange2}/></td>
        <td>{podatkiState.stIzvrsbNaTrr.povprecje}</td>
    </tr>
</table>
<div><label htmlFor="nerubljivDohodek">Nerubljiv dohodek v EUR:</label><input type="number"name="nerubljivDohodek" value={podatkiState.nerubljivDohodek} onChange={HandleChange}/></div>
<div><label htmlFor="rubljivDohodek">Rubljivi dohodek v EUR:</label><input type="number"name="rubljivDohodek" value={podatkiState.rubljivDohodek} onChange={HandleChange}/></div>
<div><label htmlFor="dohodkiPoPlaciluStarga">Dohodki po plačilu obstoječih finančnih obveznosti (krediti, Leasing,…):</label><input type="number"name="dohodkiPoPlaciluStarga" value={podatkiState.dohodkiPoPlaciluStarga} onChange={HandleChange}/></div>
<div><label htmlFor="dohodkiPoPlaciluVsega">Dohodki po plačilu obstoječih in novih finančnih obveznosti:</label><input type="number"name="dohodkiPoPlaciluVsega" value={podatkiState.dohodkiPoPlaciluVsega} onChange={HandleChange}/></div>

</div>


        </div>
    )
}

export default FinancnoPoslovanje