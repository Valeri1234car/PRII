import React, { useContext, useEffect } from "react";
import DrugiPodatki from "./DrugiPodatki";
import FinancnoPoslovanje from "./FinancnoPoslovanje";
import KreditMinilon from "./KreditMinilon";
import OsebniPodatki from "./OsebniPodatki";
import OsnovniKriteriji from "./OsnovniKriteriji";
import ZaposlitevPodatki from "./ZaposlitevPodatki";
import { PodatkiContext } from "../../App";
import VnosnoPolje from "./PdfReader";
import SisbonPodatki from "./SisbonPodatki";
import FinancniIzpiski from "./FinancniIzpiski";
import { Podatki } from "../../interface/Podatki";
import { Promet } from "../../interface/Podatki";

const initialPromet: Promet = {
    t1: 0,
    t2: 0,
    t3: 0,
    povprecje: 0
};

const initialPodatki: Podatki = {
    ime: "",
    priimek: "",
    naslov: "",
    datumRojstva: new Date(),
    starost: 0,
    drzavljanRS: false,
    starost18: false,
    stecajniPostopekNI: false,
    zaposlenUpokojenec: false,
    zaproseniKredit: 0,
    rokVracila: 0,
    mesecnaAmuniteta: 0,
    delodajalec: "",
    bonitetnaOcenaDelodajalca: 0,
    mesecniPrometDobro: { ...initialPromet },
    mesecniPrometBreme: { ...initialPromet },
    stanjeTRR: { ...initialPromet },
    znesekPrejemkovPokojnina: { ...initialPromet },
    znesekDrugihPrejemkov: { ...initialPromet },
    mesecniZnesekZaOdplacilodrugihKreditov: { ...initialPromet },
    stNeizvrsenihTrajnihNalogov: { ...initialPromet },
    stBancnihPobotov: { ...initialPromet },
    stIzvrsbNaTrr: { ...initialPromet },
    rubljiviDohodek: 0,
    nerubljiviDohodek: 0,
    dohodkiPoPlaciluStarga: 0,
    dohodkiPoPlaciluVsega: 0,
    izobrazba: "",
    lastnistnovNepremicnin: false,
    stVzdrzevanihDruzinskihClanov: 0,
    partnerZaposlen: false,
    samohranilec: false,
    zavezanecNaPrezivnin: false,
    znesekMesecnePrezivnine: 0,
    sumljivost: false,
    sisbonNeodplacanDelObvezost: 0,
    sisbonZapadliDolg: 0,
    sisbonIzterjava: 0,
    sisbonIzvrsba: 0,
    sisbonOmejitevTRR: false,
};

const VsaVnosna: React.FC = () => {

        const {setStran, podatkiState, setPodatkiState} = useContext(PodatkiContext);
        
        const HandleClick = () =>{
            
            setPodatkiState(initialPodatki);
        }
    

    return (
        <div className="vsaVnosna">
            <div className="izbrisiGumbContainer mb-4">
                <div className="izbrisiGumb" id="neki" onClick={HandleClick}>Remove inputs</div>
            </div>
            <div className="pravougaonik">
                <OsebniPodatki />
            </div>
            <div className="container123">
                <div className="pravougaonik1">
                    <OsnovniKriteriji />
                </div>
                <div className="pravougaonik2">
                    <KreditMinilon />
                </div>
                <div className="pravougaonik1">
                    <ZaposlitevPodatki />
                </div>
            </div>
            <div className="pravougaonik">
                <FinancnoPoslovanje />
            </div>
            <div className="pravougaonik">
                <DrugiPodatki />
            </div>
            <div className="pravougaonik">
            <SisbonPodatki />
            </div>
            {/* <div className="pravougaonik">
                <FinancniIzpiski />
            </div> */}
            <div className="buttonContainer">
                <button className="btn btn-primary" onClick={() => setStran("Izpisi")}>
                    Naprej
                </button>
            </div>
        </div>
    );
};

export default VsaVnosna;
