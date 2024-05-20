import DrugiPodatki from "./DrugiPodatki"
import FinancnoPoslovanje from "./FinancnoPoslovanje"
import KreditMinilon from "./KreditMinilon"
import OsebniPodatki from "./OsebniPodatki"
import OsnovniKriteriji from "./OsnovniKriteriji"
import ZaposlitevPodatki from "./ZaposlitevPodatki"
import { useContext } from "react"
import { PodatkiContext } from "../../App"
import VnosnoPolje from "./VnosnoPolje"
const VsaVnosna = () => {

    const {setStran} = useContext(PodatkiContext);

    return(
        <div className="vsaVnosna">
        <OsebniPodatki/>
        <OsnovniKriteriji/>
        <KreditMinilon/>
        <ZaposlitevPodatki/>
        <FinancnoPoslovanje/>
        <DrugiPodatki/>
        <div><button onClick={()=>(setStran("Izpisi"))}>Naprej</button></div>
        </div>
    )
}

export default VsaVnosna