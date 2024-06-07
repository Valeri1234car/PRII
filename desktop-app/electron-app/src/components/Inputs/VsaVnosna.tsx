/**
 * @file VsaVnosna.tsx
 * @brief Glavna komponenta za vnos vseh podatkov
 *
 * @opis Komponenta VsaVnosna omogoča uporabnikom vnos in urejanje vseh podatkov, povezanih z uporabnikom.
 * Vključuje več manjših komponent, ki omogočajo vnos osebnih podatkov, osnovnih kriterijev, finančnih podatkov,
 * podatkov o kreditu, zaposlitvi, SISBON podatkov itd.
 * Prav tako omogoča izbris vseh vnosov z enim klikom.
 *
 * @potrebuje react, useContext iz "react", PodatkiContext iz "../../App", DrugiPodatki, FinancnoPoslovanje,
 * KreditMinilon, OsebniPodatki, OsnovniKriteriji, ZaposlitevPodatki, SisbonPodatki, FinancniIzpiski, ExcelDownload
 *
 * @verzija 1.0.0
 * @since 1.0.0
 */
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
// import FinancniIzpiski from "./FinancniIzpiski";
import { Podatki } from "../../interface/Podatki";
import { Promet } from "../../interface/Podatki";
import ExcelDownload from "../ExcelDownload.tsx";

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

const objectsAreEqual = (obj1:any, obj2:any) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (let key of keys1) {
        const val1 = obj1[key];
        const val2 = obj2[key];
        const areObjects = isObject(val1) && isObject(val2);
        if (
            areObjects && !objectsAreEqual(val1, val2) ||
            !areObjects && val1 !== val2
        ) {
            return false;
        }
    }
    return true;
};

const isObject = (object:any) => {
    return object != null && typeof object === 'object';
};

const VsaVnosna: React.FC = () => {

    const {setStran, podatkiState, setPodatkiState} = useContext(PodatkiContext);

    const HandleClick = () =>{

        setPodatkiState(initialPodatki);
    }

    const changedState:boolean = !objectsAreEqual(initialPodatki, podatkiState);

    return(
        <div className="vsaVnosna">
            {changedState && (
                <div className="izbrisiGumbContainer mb-4">
                <div className="izbrisiGumb" id="neki" onClick={HandleClick}>X Odstranite vnose</div>
                </div>
            )}
            
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
        <ExcelDownload/>
        </div>
    )
}

export default VsaVnosna