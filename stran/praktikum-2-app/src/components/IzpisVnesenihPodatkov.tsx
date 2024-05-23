import { PodatkiContext } from "../App"
import { useContext } from "react";
import BonitetnaOcena from "./BonitetnaOcena";


const IzpisVnesenihPodatkov = () =>{

    const {podatkiState, setPodatkiState, setStran} = useContext(PodatkiContext);
    
    return(
        <>
        <div>
    <h2>Osebni podakti:</h2>
    <p>Ime: {podatkiState.ime}</p>
    <p>Priimek: {podatkiState.priimek}</p>
    <p>Naslov: {podatkiState.naslov}</p>
    <p>Datum rojstva: {podatkiState.datumRojstva}</p>
    <p>Starost: {podatkiState.starost}</p>
    <h2>Osnovni kriteriji</h2>
    <p>Državljan Republike Slovenije: {podatkiState.drzavljanRS ? "Da" : "Ne"}</p>
    <p>Starejši od 18 let: {podatkiState.starost18 ? "Da" : "Ne"}</p>
    <p>Prosilec NI v stečajnem postopku: {podatkiState.stecajniPostopekNI ? "Da" : "Ne"}</p>
    <p>Zaposlen ali upokojenec: {podatkiState.zaposlenUpokojenec ? "Da" : "Ne"}</p>
    <h2>Kredit Minilon</h2>
    <p>Zaprošeni znesek kredita v EUR: {podatkiState.zaproseniKredit}</p>
    <p>Rok vračila v mesecih: {podatkiState.rokVracila}</p>
    <p>Mesečna anuiteta: {podatkiState.mesecnaAmuniteta}</p>
    <h2>Podakti o zaposlitvi</h2>
    <p>Delodajalec: {podatkiState.delodajalec}</p>
    <p>Bonitetna ocena delodajalca: {podatkiState.bonitetnaOcenaDelodajalca}</p>
    <h2>Finančno poslovanje podakti</h2>
    <table>
        <tr>
            <td><b>PODATKI O FINANČNEM POSLOVANJU V EUR</b></td>
            <th>T-3</th>
            <th>T-2</th>
            <th>T-1</th>
            <th>Povprečje</th>
        </tr>
        <tr>
            <td>Mesečni promet v dobro:</td>
            <td>{podatkiState.mesecniPrometDobro.t1}</td>
            <td>{podatkiState.mesecniPrometDobro.t2}</td>
            <td>{podatkiState.mesecniPrometDobro.t3}</td>
            <td>{podatkiState.mesecniPrometDobro.povprecje}</td>
        </tr>
        <tr>
            <td>Mesečni promet v breme:</td>
            <td>{podatkiState.mesecniPrometBreme.t1}</td>
            <td>{podatkiState.mesecniPrometBreme.t2}</td>
            <td>{podatkiState.mesecniPrometBreme.t3}</td>
            <td>{podatkiState.mesecniPrometBreme.povprecje}</td>
        </tr>
        <tr>
            <td>Stanje na TRR:</td>
            <td>{podatkiState.stanjeTRR.t1}</td>
            <td>{podatkiState.stanjeTRR.t2}</td>
            <td>{podatkiState.stanjeTRR.t3}</td>
            <td>{podatkiState.stanjeTRR.povprecje}</td>
        </tr>
        <tr>
            <td>Znesek prejemkov iz dela oz. pokojnina:</td>
            <td>{podatkiState.znesekPrejemkovPokojnina.t1}</td>
            <td>{podatkiState.znesekPrejemkovPokojnina.t2}</td>
            <td>{podatkiState.znesekPrejemkovPokojnina.t3}</td>
            <td>{podatkiState.znesekPrejemkovPokojnina.povprecje}</td>
        </tr>
        <tr>
            <td>Znesek drugih prejemkov:</td>
            <td>{podatkiState.znesekDrugihPrejemkov.t1}</td>
            <td>{podatkiState.znesekDrugihPrejemkov.t2}</td>
            <td>{podatkiState.znesekDrugihPrejemkov.t3}</td>
            <td>{podatkiState.znesekDrugihPrejemkov.povprecje}</td>
        </tr>
        <tr>
            <td>Mesečni znesek za odplačilo obstoječih kreditov:</td>
            <td>{podatkiState.mesecniZnesekZaOdplacilodrugihKreditov.t1}</td>
            <td>{podatkiState.mesecniZnesekZaOdplacilodrugihKreditov.t2}</td>
            <td>{podatkiState.mesecniZnesekZaOdplacilodrugihKreditov.t3}</td>
            <td>{podatkiState.mesecniZnesekZaOdplacilodrugihKreditov.povprecje}</td>
        </tr>
        <tr>
            <td>Število neizvršenih trajnih nalogov:</td>
            <td>{podatkiState.stNeizvrsenihTrajnihNalogov.t1}</td>
            <td>{podatkiState.stNeizvrsenihTrajnihNalogov.t2}</td>
            <td>{podatkiState.stNeizvrsenihTrajnihNalogov.t3}</td>
            <td>{podatkiState.stNeizvrsenihTrajnihNalogov.povprecje}</td>
        </tr>
        <tr>
            <td>Število bančnih pobotov:</td>
            <td>{podatkiState.stBancnihPobotov.t1}</td>
            <td>{podatkiState.stBancnihPobotov.t2}</td>
            <td>{podatkiState.stBancnihPobotov.t3}</td>
            <td>{podatkiState.stBancnihPobotov.povprecje}</td>
        </tr>
        <tr>
            <td>Število izvršb na TRR:</td>
            <td>{podatkiState.stIzvrsbNaTrr.t1}</td>
            <td>{podatkiState.stIzvrsbNaTrr.t2}</td>
            <td>{podatkiState.stIzvrsbNaTrr.t3}</td>
            <td>{podatkiState.stIzvrsbNaTrr.povprecje}</td>
        </tr>
    </table>
    <p>Nerubljiv dohodek v EUR:{podatkiState.nerubljivDohodek}</p>
<p>Rubljivi dohodek v EUR:{podatkiState.rubljivDohodek}</p>
<p>Dohodki po plačilu obstoječih finančnih obveznosti (krediti, Leasing,…):{podatkiState.dohodkiPoPlaciluStarga}</p>
<p>Dohodki po plačilu obstoječih in novih finančnih obveznosti:{podatkiState.dohodkiPoPlaciluVsega}</p>

    <h2>Drugi podatki</h2>
    <p>Izobrazba: {podatkiState.izobrazba}</p>
    <p>(So)Lastništvo nepremičnin: {podatkiState.lastnistnovNepremicnin ? "Da" : "Ne"}</p>
    <p>Število vzdrževanih družinskih članov: {podatkiState.stVzdrzevanihDruzinskihClanov}</p>
    <p>Ali je partner zaposlen?: {podatkiState.partnerZaposlen ? "Da" : "Ne" }</p>
    <p>Samhranilec: {podatkiState.samohranilec  ? "Da" : "Ne"}</p>
    <p>Zavezanec za preživnino: {podatkiState.zavezanecNaPrezivnin ? "Da" : "Ne"}</p>
    <p>Znesek mesečne preživnine: {podatkiState.znesekMesecnePrezivnine}</p>
    <p>Sum na razne oblike odvisnosti, sumljive prakse pri najemanju kredita: {podatkiState.sumljivost ? "Da" : "Ne"}</p>
    <h2>PODATKI SISBON (V EUR)</h2>
        
            <p>SISBON - NEODPLAČAN DEL OBVEZNOSTI: {podatkiState.sisbonNeodplacanDelObvezost}</p>
            <p>SISBON - ZAPADLI DOLG: {podatkiState.sisbonZapadliDolg}</p>
            <p>SISBON - IZTERJAVA: {podatkiState.sisbonIzterjava}</p>
            <p>SISBON - IZVRŠBA: {podatkiState.sisbonIzvrsba}</p>
            <p>SISBON - OMEJITEV UPORABE TRR: {podatkiState.sisbonOmejitevTRR ? "Da" : "Ne"}</p>

 </div>

 <BonitetnaOcena/>
 </>
    )
}

export default IzpisVnesenihPodatkov;