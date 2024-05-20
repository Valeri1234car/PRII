import { createContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Menu from './components/Menu/Menu'
import OsebniPodatki from './components/Inputs/OsebniPodatki'
import { Podatki } from './interface/Podatki'
import BonitetnaOcena from './components/BonitetnaOcena'
import { Promet } from './interface/Podatki'
import VsaVnosna from './components/Inputs/VsaVnosna'
import VnosnoPolje from './components/Inputs/VnosnoPolje'

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
  rubljiviDohodek:0,
  nerubljiviDohodek: 0,
  dohodkiPoPlaciluStarga: 0,
  dohodkiPoPlaciluVsega: 0,
  izobrazba:"",
  lastnistnovNepremicnin: false,
  stVzdrzevanihDruzinskihClanov:0,
  partnerZaposlen:false,
  samohranilec:false,
  zavezanecNaPrezivnin:false,
  znesekMesecnePrezivnine:0,
  sumljivost:false,
  sisbonNeodplacanDelObvezost:0,
  sisbonZapadliDolg:0,
  sisbonIzterjava:0,
  sisbonIzvrsba:0,
  sisbonOmejitevTRR:false,
};

function App() {

  const[stran, setStran] = useState("Domov");

  const [podatkiState, setPodatkiState] = useState(initialPodatki)

  const HandleChange = (e:any) =>{
    const {name,value} = e.target;

    setPodatkiState((prevState:any) => ({
        ...prevState,
        [name]:value,
    }))
}
  
const HandleChangeInput = (e:any) => {
  const { name, value } = e.target;
  setPodatkiState((prevState:any) => ({
      ...prevState,
      [name]: value === 'true' 
  }));
};

  return (
    <>
    <PodatkiContext.Provider value={{podatkiState,setPodatkiState,setStran,HandleChange,HandleChangeInput}}>
      <Menu/>
    <div className='oknoDrag'>
    <VnosnoPolje/>
    </div>
      <div className="main">
        {stran =="Domov" && <VsaVnosna/>}
        {stran =="Izpisi" && (<><BonitetnaOcena/><button onClick={()=>(setStran("Domov"))}>Nazaj</button></>)}
      </div>
    </PodatkiContext.Provider>
    </>
  )
}

export default App
