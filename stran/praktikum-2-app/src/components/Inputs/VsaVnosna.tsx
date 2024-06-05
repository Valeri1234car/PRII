import React, { useContext } from "react";
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

const VsaVnosna: React.FC = () => {
    const { setStran } = useContext(PodatkiContext);

    return (
        <div className="vsaVnosna">
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
