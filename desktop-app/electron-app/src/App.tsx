import React, { createContext, useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Menu from './components/Menu/Menu';
import OsebniPodatki from './components/Inputs/OsebniPodatki';
import { Podatki } from './interface/Podatki';
import BonitetnaOcena from './components/IzpisVnesenihPodatkov';
import { Promet } from './interface/Podatki';
import VsaVnosna from './components/Inputs/VsaVnosna';
import VnosnoPolje from './components/Inputs/PdfReader';
import PdfBesedilo from './components/Inputs/PdfBesedilo';
import IzpisVnesenihPodatkov from './components/IzpisVnesenihPodatkov';
import { ModulA, LikvidnostNeizvrseniTrajniNalogi, LikvidnostBancniPoboti,LikvidnostStIzvrsbTRR,BonitetaDelodajalca, Izobrazba } from './interface/ModulA';
import { ModulB, SisbonNeoplacanDelObveznosti,SisbonZapadliDolg,SisbonIzterjava,SisbonIzvrsba } from './interface/ModulB';
import { ModulC } from './interface/ModulC';

export const PodatkiContext = createContext<any>(null);




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

const initialModulA:ModulA={
    likvidnostNeizvrseniTrajniNalogiRez:0,
    likvidnostBancniPobotiRez:0,
    likvidnostStIzvrsbTRRRez:0,
    razmerjeObveznostiKreditiDohodkiRez:0,
    presezekDohodkovNerubljivRez: 0,
    lastnistvoNepremicnineRez:0,
    bonitetaDelodajalcaRez:0,
    zaposlitevPartnerjaRez:0,
    izobrazbaRez:0,
    // likvidnostNeizvrseniTrajniNalogiRez:0,
    // likvidnostBancniPobotiRez:0,
    // likvidnostStIzvrsbTRRRez:0,
    razmerjeObveznostiKreditiDohodki:0,
    presezekDohodkovNerubljiv: 0,
    // lastnistvoNepremicnineRez:0,
    // bonitetaDelodajalcaRez:0,
    // zaposlitevPartnerjaRez:0,
    // izobrazbaRez:0,
    skupnoTock:0,

}
const initialModulB:ModulB={

    SISBONneodplacanDelObveznostiRez:0,
    SISBONzapadliDolgRez:0,
    SISBONizterjavaRez:0,
    SISBONizvrsbaRez:0,
    SISBONomejitevUporabeTrrRez:0,
    SISBONneodplacanDelObveznosti:0,
    SISBONzapadliDolg:0,
    SISBONizterjava:0,
    SISBONizvrsba:0,
    skupneTocke:0,

}

const initialModulC:ModulC = {
    ponder:0.5,
    skupnoTockovanje:0
}

function App() {
    const [stran, setStran] = useState("Domov");
    const [podatkiState, setPodatkiState] = useState(initialPodatki);
    const [pdfText, setPdfText] = useState("");
    const [modulA, setModula] = useState(initialModulA);
    const[modulB, setModulB] = useState(initialModulB);
    const[modulC, setModulC] = useState(initialModulC);

    const HandleChange = (e: any) => {
        const { name, value } = e.target;
        setPodatkiState((prevState: any) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const HandleChangeInput = (e: any) => {
        const { name, value } = e.target;
        setPodatkiState((prevState: any) => ({
            ...prevState,
            [name]: value === 'true'
        }));
    };


    const [data, setData] = useState({
        mesecniPrometDobro: { t1: 0, t2: 0, t3: 0 },
        mesecniPrometBreme: { t1: 0, t2: 0, t3: 0 },
        stanjeTRR: { t1: 0, t2: 0, t3: 0 },
        znesekPrejemkovPokojnina: { t1: 0, t2: 0, t3: 0 },
    });




    return (
        <>
            <PodatkiContext.Provider value={{ podatkiState, setPodatkiState, setStran, HandleChange, HandleChangeInput, pdfText, setPdfText, modulA, setModula,modulB, setModulB, modulC, setModulC,data, setData }}>
                <Menu />
                {stran =="Domov" && <div className='oknoDrag'><VnosnoPolje /></div>}

                {/* <div className='pdfBesedilo'><PdfBesedilo /></div> */}
                <div className="main">
                    {stran === "Domov" && <VsaVnosna />}
                    {stran === "Izpisi" && (<><IzpisVnesenihPodatkov /><button className="btn btn-primary" onClick={() => setStran("Domov")}>Nazaj</button>
                    </>)}
                </div>
            </PodatkiContext.Provider>
        </>
    );
}

export default App;
