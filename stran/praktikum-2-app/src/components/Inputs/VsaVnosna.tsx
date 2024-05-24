import DrugiPodatki from "./DrugiPodatki"
import FinancnoPoslovanje from "./FinancnoPoslovanje"
import KreditMinilon from "./KreditMinilon"
import OsebniPodatki from "./OsebniPodatki"
import OsnovniKriteriji from "./OsnovniKriteriji"
import ZaposlitevPodatki from "./ZaposlitevPodatki"
import { useContext } from "react"
import { PodatkiContext } from "../../App"
import VnosnoPolje from "./PdfReader"
import SisbonPodatki from "./SisbonPodatki"
const VsaVnosna = () => {

    const {setStran} = useContext(PodatkiContext);

    return(
        <div className="vsaVnosna">
        <OsebniPodatki/>
        <div className="skupiKreZap">
        <OsnovniKriteriji/>
        <KreditMinilon/>
        <ZaposlitevPodatki/>
        </div>
        <FinancnoPoslovanje/>
        <DrugiPodatki/>
        <SisbonPodatki/>
        <div><button className="btn btn-primary" onClick={()=>(setStran("Izpisi"))}>Naprej</button></div>
        </div>
    )
}

export default VsaVnosna