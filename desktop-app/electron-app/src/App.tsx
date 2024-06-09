/**
 * @file App.tsx
 * @brief Glavna komponenta aplikacije
 *
 * @opis Komponenta App je glavna komponenta aplikacije, ki vsebuje osnovno strukturo in usmerja uporabnika glede na izbrano stran.
 *
 * @verzija 1.0.0
 * @since 1.0.0
 */
import { createContext,  useState, useEffect } from 'react';

import './App.css';
import Menu from './components/Menu/Menu';
import { Podatki } from './interface/Podatki';
import { Promet } from './interface/Podatki';
import VsaVnosna from './components/Inputs/VsaVnosna';
import VnosnoPolje from './components/Inputs/PdfReader';
import IzpisVnesenihPodatkov from './components/IzpisVnesenihPodatkov';
import { ModulA, } from './interface/ModulA';
import { ModulB,  } from './interface/ModulB';
import { ModulC } from './interface/ModulC';
// import { zneskiMesecnihAnuitet } from './interface/ZneskiMesecnihAnuitet';

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


    useEffect(() => {
        function calculateAge(dateOfBirth: Date) {
            const today = new Date();
            const dob = new Date(dateOfBirth);
            let age = today.getFullYear() - dob.getFullYear();
            const monthDiff = today.getMonth() - dob.getMonth();

            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
                age--;
            }
            return age;
        }

        const age = calculateAge(podatkiState.datumRojstva);

        if (age >= 18) {
            setPodatkiState({ ...podatkiState, starost: age, starost18: true });
        } else {
            setPodatkiState({ ...podatkiState, starost: age, starost18: false });
        }
    }, [podatkiState.datumRojstva]);


    



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
