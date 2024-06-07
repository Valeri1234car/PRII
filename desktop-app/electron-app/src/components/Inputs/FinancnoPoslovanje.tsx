/**
 * @file FinancnoPoslovanje.tsx
 * @brief Komponenta za prikaz in upravljanje finančnih podatkov
 *
 * @opis Komponenta FinancnoPoslovanje omogoča uporabnikom vnos in pregled finančnih podatkov v različnih časovnih obdobjih.
 * Komponenta uporablja kontekst za dostop do stanja aplikacije in omogoča uporabnikom posodabljanje vrednosti v več kategorijah.
 * Prav tako izračuna povprečne vrednosti za vsako kategorijo in podpira dodajanje novih vrednosti.
 *
 * @potrebuje react, PodatkiContext iz "../../App", minimalnaPlaca iz "../../interface/ZneskiMesecnihAnuitet"
 *
 * @verzija 1.0.0
 * @since 1.0.0
 */
import { useContext} from "react";
import { PodatkiContext } from "../../App";
const FinancnoPoslovanje = () =>{

    const {podatkiState, setPodatkiState} = useContext(PodatkiContext);

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
    // useEffect(()=>{
    //     let nerubljivDohodek=0;
    //     if(podatkiState.zavezanecNaPrezivnin){
    //         nerubljivDohodek = (minimalnaPlaca *0.5) + parseFloat(podatkiState.znesekMesecnePrezivnine);
    //     }
    //     else{
    //         nerubljivDohodek = (minimalnaPlaca * 0.76);
    //         if(podatkiState.samohranilec){
    //             nerubljivDohodek = nerubljivDohodek + (podatkiState.stVzdrzevanihDruzinskihClanov * 237.29)
    //         }
    //         else{
    //             nerubljivDohodek = nerubljivDohodek + (podatkiState.stVzdrzevanihDruzinskihClanov * (237.29 / 2))
    //         }
    //     }
    //     setPodatkiState({...podatkiState, nerubljivDohodek: nerubljivDohodek})

    // },[podatkiState.znesekMesecnePrezivnine, podatkiState.zavezanecNaPrezivnin, podatkiState.samohranilec,podatkiState.stVzdrzevanihDruzinskihClanov])


//------------rubljiv dohodek-----------------------
    // useEffect(()=>{
    //     let rubljivDohodek = 0;
    //     let izracun = podatkiState.znesekPrejemkovPokojnina.povprecje + podatkiState.znesekDrugihPrejemkov.povprecje - podatkiState.nerubljivDohodek;
    //     if(izracun > 0){
    //         rubljivDohodek =  izracun;
    //     }
    //     setPodatkiState({...podatkiState, rubljivDohodek: rubljivDohodek})


    // },[podatkiState.znesekPrejemkovPokojnina,podatkiState.znesekDrugihPrejemkov, podatkiState.nerubljivDohodek])

//----------------Dohodki po plačilu obstoječih finančnih obveznosti (krediti, Leasing,…) in Dohodki po plačilu obstoječih in novih finančnih obveznosti------------------
    // useEffect(()=>{
    //     let dohodkiPoPlacilu= podatkiState.znesekPrejemkovPokojnina.povprecje + podatkiState.znesekDrugihPrejemkov.povprecje - podatkiState.mesecniZnesekZaOdplacilodrugihKreditov.povprecje;
    //     if(podatkiState.stanjeTRR.povprecje < 0){
    //         dohodkiPoPlacilu += (podatkiState.stanjeTRR.povprecje/12)
    //     }

    //     let ddohodkiPoPlaciluInAmuniteta = dohodkiPoPlacilu - podatkiState.mesecnaAmuniteta;
    //     setPodatkiState({...podatkiState, dohodkiPoPlaciluStarga: dohodkiPoPlacilu, dohodkiPoPlaciluVsega:ddohodkiPoPlaciluInAmuniteta})

    // },[podatkiState.znesekPrejemkovPokojnina,podatkiState.znesekDrugihPrejemkov, podatkiState.mesecnaAmuniteta,podatkiState.stanjeTRR, podatkiState.mesecniZnesekZaOdplacilodrugihKreditov])

    return(
        <div className="vnosItem">
            <h2 className="mb-4 text-info text-dark">Podaci o finansijskom poslovanju u EUR</h2>
            <div className="vnosnaPolja">
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th></th>
                        <th>T-3</th>
                        <th>T-2</th>
                        <th>T-1</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Mesečni promet v dobro:</td>
                        <td><input type="number" className="form-control" name="mesecniPrometDobro.t1" value={podatkiState.mesecniPrometDobro.t1} onChange={HandleChange2}/></td>
                        <td><input type="number" className="form-control" name="mesecniPrometDobro.t2" value={podatkiState.mesecniPrometDobro.t2} onChange={HandleChange2}/></td>
                        <td><input type="number" className="form-control" name="mesecniPrometDobro.t3" value={podatkiState.mesecniPrometDobro.t3} onChange={HandleChange2}/></td>
                    </tr>
                    <tr>
                        <td>Mesečni promet v breme:</td>
                        <td><input type="number" className="form-control" name="mesecniPrometBreme.t1" value={podatkiState.mesecniPrometBreme.t1} onChange={HandleChange2}/></td>
                        <td><input type="number" className="form-control" name="mesecniPrometBreme.t2" value={podatkiState.mesecniPrometBreme.t2} onChange={HandleChange2}/></td>
                        <td><input type="number" className="form-control" name="mesecniPrometBreme.t3" value={podatkiState.mesecniPrometBreme.t3} onChange={HandleChange2}/></td>
                    </tr>
                    <tr>
                        <td>Stanje na TRR:</td>
                        <td><input type="number" className="form-control" name="stanjeTRR.t1" value={podatkiState.stanjeTRR.t1} onChange={HandleChange2}/></td>
                        <td><input type="number" className="form-control" name="stanjeTRR.t2" value={podatkiState.stanjeTRR.t2} onChange={HandleChange2}/></td>
                        <td><input type="number" className="form-control" name="stanjeTRR.t3" value={podatkiState.stanjeTRR.t3} onChange={HandleChange2}/></td>
                    </tr>
                    <tr>
                        <td>Znesek prejemkov iz dela oz. pokojnina:</td>
                        <td><input type="number" className="form-control" name="znesekPrejemkovPokojnina.t1" value={podatkiState.znesekPrejemkovPokojnina.t1} onChange={HandleChange2}/></td>
                        <td><input type="number" className="form-control" name="znesekPrejemkovPokojnina.t2" value={podatkiState.znesekPrejemkovPokojnina.t2} onChange={HandleChange2}/></td>
                        <td><input type="number" className="form-control" name="znesekPrejemkovPokojnina.t3" value={podatkiState.znesekPrejemkovPokojnina.t3} onChange={HandleChange2}/></td>
                    </tr>
                    <tr>
                        <td>Znesek drugih prejemkov:</td>
                        <td><input type="number" className="form-control" name="znesekDrugihPrejemkov.t1" value={podatkiState.znesekDrugihPrejemkov.t1} onChange={HandleChange2}/></td>
                        <td><input type="number" className="form-control" name="znesekDrugihPrejemkov.t2" value={podatkiState.znesekDrugihPrejemkov.t2} onChange={HandleChange2}/></td>
                        <td><input type="number" className="form-control" name="znesekDrugihPrejemkov.t3" value={podatkiState.znesekDrugihPrejemkov.t3} onChange={HandleChange2}/></td>
                    </tr>
                    <tr>
                        <td>Mesečni znesek za odplačilo obstoječih kreditov:</td>
                        <td><input type="number" className="form-control" name="mesecniZnesekZaOdplacilodrugihKreditov.t1" value={podatkiState.mesecniZnesekZaOdplacilodrugihKreditov.t1} onChange={HandleChange2}/></td>
                        <td><input type="number" className="form-control" name="mesecniZnesekZaOdplacilodrugihKreditov.t2" value={podatkiState.mesecniZnesekZaOdplacilodrugihKreditov.t2} onChange={HandleChange2}/></td>
                        <td><input type="number" className="form-control" name="mesecniZnesekZaOdplacilodrugihKreditov.t3" value={podatkiState.mesecniZnesekZaOdplacilodrugihKreditov.t3} onChange={HandleChange2}/></td>
                    </tr>
                    <tr>
                        <td>Število neizvršenih trajnih nalogov:</td>
                        <td><input type="number" className="form-control" name="stNeizvrsenihTrajnihNalogov.t1" value={podatkiState.stNeizvrsenihTrajnihNalogov.t1} onChange={HandleChange2}/></td>
                        <td><input type="number" className="form-control" name="stNeizvrsenihTrajnihNalogov.t2" value={podatkiState.stNeizvrsenihTrajnihNalogov.t2} onChange={HandleChange2}/></td>
                        <td><input type="number" className="form-control" name="stNeizvrsenihTrajnihNalogov.t3" value={podatkiState.stNeizvrsenihTrajnihNalogov.t3} onChange={HandleChange2}/></td>
                    </tr>
                    <tr>
                        <td>Število bančnih pobotov:</td>
                        <td><input type="number" className="form-control" name="stBancnihPobotov.t1" value={podatkiState.stBancnihPobotov.t1} onChange={HandleChange2}/></td>
                        <td><input type="number" className="form-control" name="stBancnihPobotov.t2" value={podatkiState.stBancnihPobotov.t2} onChange={HandleChange2}/></td>
                        <td><input type="number" className="form-control" name="stBancnihPobotov.t3" value={podatkiState.stBancnihPobotov.t3} onChange={HandleChange2}/></td>
                    </tr>
                    <tr>
                        <td>Število izvršb na TRR:</td>
                        <td><input type="number" className="form-control" name="stIzvrsbNaTrr.t1" value={podatkiState.stIzvrsbNaTrr.t1} onChange={HandleChange2}/></td>
                        <td><input type="number" className="form-control" name="stIzvrsbNaTrr.t2" value={podatkiState.stIzvrsbNaTrr.t2} onChange={HandleChange2}/></td>
                        <td><input type="number" className="form-control" name="stIzvrsbNaTrr.t3" value={podatkiState.stIzvrsbNaTrr.t3} onChange={HandleChange2}/></td>
                    </tr>
                    </tbody>
                </table>
                {/* <div className="mb-3">
                <label htmlFor="nerubljivDohodek" className="form-label">Nerubljiv dohodek u EUR:</label>
                <input type="number" className="form-control" name="nerubljivDohodek" value={podatkiState.nerubljivDohodek} onChange={HandleChange} style={{ borderColor: 'black', color: 'black' }}/>
            </div>
            <div className="mb-3">
                <label htmlFor="rubljivDohodek" className="form-label">Rubljiv dohodek u EUR:</label>
                <input type="number" className="form-control" name="rubljivDohodek" value={podatkiState.rubljivDohodek} onChange={HandleChange} style={{ borderColor: 'black', color: 'black' }}/>
            </div>
            <div className="mb-3">
                <label htmlFor="dohodkiPoPlaciluStarga" className="form-label">Dohodci po plaćanju postojećih finansijskih obaveza (krediti, Leasing,…):</label>
                <input type="number" className="form-control" name="dohodkiPoPlaciluStarga" value={podatkiState.dohodkiPoPlaciluStarga} onChange={HandleChange} style={{ borderColor: 'black', color: 'black' }}/>
            </div>
            <div className="mb-3">
                <label htmlFor="dohodkiPoPlaciluVsega" className="form-label">Dohodci po plaćanju postojećih i novih finansijskih obaveza:</label>
                <input type="number" className="form-control" name="dohodkiPoPlaciluVsega" value={podatkiState.dohodkiPoPlaciluVsega} onChange={HandleChange} style={{ borderColor: 'black', color: 'black' }}/>
            </div> */}
            </div>
        </div>
    )
}

export default FinancnoPoslovanje