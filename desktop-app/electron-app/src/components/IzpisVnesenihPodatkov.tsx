import { PodatkiContext } from "../App"
import { useContext } from "react";
import BonitetnaOcena from "./BonitetnaOcena";


const IzpisVnesenihPodatkov = () =>{

    const {podatkiState, setPodatkiState, setStran} = useContext(PodatkiContext);
    
    return(
        <>
        <div className="container" style={{ borderColor: 'black', color: 'black', background: "white" }}>
            <h2>Osebni podakti:</h2>
            <p className="mb-3">Ime: {podatkiState.ime}</p>
            <p className="mb-3">Priimek: {podatkiState.priimek}</p>
            <p className="mb-3">Naslov: {podatkiState.naslov}</p>
            <p className="mb-3">Datum rojstva: {podatkiState.datumRojstva}</p>
            <p className="mb-3">Starost: {podatkiState.starost}</p>
            <h2>Osnovni kriteriji</h2>
            <p className="mb-3">Državljan Republike Slovenije: {podatkiState.drzavljanRS ? "Da" : "Ne"}</p>
            <p className="mb-3">Starejši od 18 let: {podatkiState.starost18 ? "Da" : "Ne"}</p>
            <p className="mb-3">Prosilec NI v stečajnem postopku: {podatkiState.stecajniPostopekNI ? "Da" : "Ne"}</p>
            <p className="mb-3">Zaposlen ali upokojenec: {podatkiState.zaposlenUpokojenec ? "Da" : "Ne"}</p>
            <h2>Kredit Minilon</h2>
            <p className="mb-3">Zaprošeni znesek kredita v EUR: {podatkiState.zaproseniKredit}</p>
            <p className="mb-3">Rok vračila v mesecih: {podatkiState.rokVracila}</p>
            <p className="mb-3">Mesečna anuiteta: {podatkiState.mesecnaAmuniteta}</p>
            <h2>Podakti o zaposlitvi</h2>
            <p className="mb-3">Delodajalec: {podatkiState.delodajalec}</p>
            <p className="mb-3">Bonitetna ocena delodajalca: {podatkiState.bonitetnaOcenaDelodajalca}</p>
            <h2>Finančno poslovanje podakti</h2>
             <table className="table table-striped table-secondary" style={{ borderColor: 'secondary'}}>
                <thead>
                <tr>
                    <th scope="col"><b>PODATKI O FINANČNEM POSLOVANJU V EUR</b></th>
                    <th scope="col">T-3</th>
                    <th scope="col">T-2</th>
                    <th scope="col">T-1</th>
                    <th scope="col">Povprečje</th>
                </tr>
                </thead>
                <tbody>
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
                </tbody>
            </table>

            <div className="container">
                <p className="mb-0">Nerubljiv dohodek v EUR: {podatkiState.nerubljivDohodek}</p>
                <p className="mb-0">Rubljivi dohodek v EUR: {podatkiState.rubljivDohodek}</p>
                <p className="mb-0">Dohodki po plačilu obstoječih finančnih obveznosti (krediti, Leasing,…): {podatkiState.dohodkiPoPlaciluStarga}</p>
                <p className="mb-0">Dohodki po plačilu obstoječih in novih finančnih obveznosti: {podatkiState.dohodkiPoPlaciluVsega}</p>

                <h2>Drugi podatki</h2>
                <p className="mb-0">Izobrazba: {podatkiState.izobrazba}</p>
                <p className="mb-0">(So)Lastništvo nepremičnin: {podatkiState.lastnistnovNepremicnin ? "Da" : "Ne"}</p>
                <p className="mb-0">Število vzdrževanih družinskih članov: {podatkiState.stVzdrzevanihDruzinskihClanov}</p>
                <p className="mb-0">Ali je partner zaposlen?: {podatkiState.partnerZaposlen ? "Da" : "Ne" }</p>
                <p className="mb-0">Samhranilec: {podatkiState.samohranilec  ? "Da" : "Ne"}</p>
                <p className="mb-0">Zavezanec za preživnino: {podatkiState.zavezanecNaPrezivnin ? "Da" : "Ne"}</p>
                <p className="mb-0">Znesek mesečne preživnine: {podatkiState.znesekMesecnePrezivnine}</p>
                <p className="mb-0">Sum na razne oblike odvisnosti, sumljive prakse pri najemanju kredita: {podatkiState.sumljivost ? "Da" : "Ne"}</p>
                <h2>PODATKI SISBON (V EUR)</h2>

                <p className="mb-0">SISBON - NEODPLAČAN DEL OBVEZNOSTI: {podatkiState.sisbonNeodplacanDelObvezost}</p>
                <p className="mb-0">SISBON - ZAPADLI DOLG: {podatkiState.sisbonZapadliDolg}</p>
                <p className="mb-0">SISBON - IZTERJAVA: {podatkiState.sisbonIzterjava}</p>
                <p className="mb-0">SISBON - IZVRŠBA: {podatkiState.sisbonIzvrsba}</p>
                <p className="mb-0">SISBON - OMEJITEV UPORABE TRR: {podatkiState.sisbonOmejitevTRR ? "Da" : "Ne"}</p>
            </div>
 </div>

 <BonitetnaOcena/>
 </>
    )
}

export default IzpisVnesenihPodatkov;