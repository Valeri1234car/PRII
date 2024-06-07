/**
 * @file IzpisVnesenihPodatkov.tsx
 * @brief Komponenta za prikaz vnesenih podatkov in njihov izvoz v Excel datoteko
 *
 * @opis Komponenta IzpisVnesenihPodatkov omogoča prikaz vnesenih podatkov v tabeli ter izvoz teh podatkov v Excel datoteko.
 * Podatki se generirajo na podlagi stanja v PodatkiContext-u.
 *
 * @potrebuje react, PodatkiContext iz "../App" in knjižnico XLSX za izvoz v Excel format
 *
 * @verzija 1.0.0
 * @since 1.0.0
 */
import React, { useContext, useState } from "react";
import { PodatkiContext } from "../App";
import BonitetnaOcena from "./BonitetnaOcena";
import * as XLSX from 'xlsx';

const IzpisVnesenihPodatkov = () => {
    const { podatkiState } = useContext(PodatkiContext);
    const [tableData, setTableData] = useState([]);

    const generateExcelData = () => {
        const data = [
            ["Osebni podakti"],
            ["Ime", podatkiState.ime],
            ["Priimek", podatkiState.priimek],
            ["Naslov", podatkiState.naslov],
            ["Datum rojstva", podatkiState.datumRojstva],
            ["Starost", podatkiState.starost],
            [],
            ["Osnovni kriteriji"],
            ["Državljan Republike Slovenije", podatkiState.drzavljanRS ? "Da" : "Ne"],
            ["Starejši od 18 let", podatkiState.starost18 ? "Da" : "Ne"],
            ["Prosilec NI v stečajnem postopku", podatkiState.stecajniPostopekNI ? "Da" : "Ne"],
            ["Zaposlen ali upokojenec", podatkiState.zaposlenUpokojenec ? "Da" : "Ne"],
            [],
            ["Kredit Minilon"],
            ["Zaprošeni znesek kredita v EUR", podatkiState.zaproseniKredit],
            ["Rok vračila v mesecih", podatkiState.rokVracila],
            ["Mesečna anuiteta", podatkiState.mesecnaAmuniteta],
            [],
            ["Podakti o zaposlitvi"],
            ["Delodajalec", podatkiState.delodajalec],
            ["Bonitetna ocena delodajalca", podatkiState.bonitetnaOcenaDelodajalca],
            [],
            ["Finančno poslovanje podakti"],
            ["PODATKI O FINANČNEM POSLOVANJU V EUR", "T-3", "T-2", "T-1"],
            ["Mesečni promet v dobro", podatkiState.mesecniPrometDobro.t1, podatkiState.mesecniPrometDobro.t2, podatkiState.mesecniPrometDobro.t3],
            ["Mesečni promet v breme", podatkiState.mesecniPrometBreme.t1, podatkiState.mesecniPrometBreme.t2, podatkiState.mesecniPrometBreme.t3],
            ["Stanje na TRR", podatkiState.stanjeTRR.t1, podatkiState.stanjeTRR.t2, podatkiState.stanjeTRR.t3],
            ["Znesek prejemkov iz dela oz. pokojnina", podatkiState.znesekPrejemkovPokojnina.t1, podatkiState.znesekPrejemkovPokojnina.t2, podatkiState.znesekPrejemkovPokojnina.t3],
            ["Znesek drugih prejemkov", podatkiState.znesekDrugihPrejemkov.t1, podatkiState.znesekDrugihPrejemkov.t2, podatkiState.znesekDrugihPrejemkov.t3],
            ["Mesečni znesek za odplačilo obstoječih kreditov", podatkiState.mesecniZnesekZaOdplacilodrugihKreditov.t1, podatkiState.mesecniZnesekZaOdplacilodrugihKreditov.t2, podatkiState.mesecniZnesekZaOdplacilodrugihKreditov.t3],
            ["Število neizvršenih trajnih nalogov", podatkiState.stNeizvrsenihTrajnihNalogov.t1, podatkiState.stNeizvrsenihTrajnihNalogov.t2, podatkiState.stNeizvrsenihTrajnihNalogov.t3],
            ["Število bančnih pobotov", podatkiState.stBancnihPobotov.t1, podatkiState.stBancnihPobotov.t2, podatkiState.stBancnihPobotov.t3],
            ["Število izvršb na TRR", podatkiState.stIzvrsbNaTrr.t1, podatkiState.stIzvrsbNaTrr.t2, podatkiState.stIzvrsbNaTrr.t3],
            [],
            // ["Nerubljiv dohodek v EUR", podatkiState.nerubljivDohodek],
            // ["Rubljivi dohodek v EUR", podatkiState.rubljivDohodek],
            // ["Dohodki po plačilu obstoječih finančnih obveznosti", podatkiState.dohodkiPoPlaciluStarga],
            // ["Dohodki po plačilu obstoječih in novih finančnih obveznosti", podatkiState.dohodkiPoPlaciluVsega],
            // [],
            ["Drugi podatki"],
            ["Izobrazba", podatkiState.izobrazba],
            ["(So)Lastništvo nepremičnin", podatkiState.lastnistnovNepremicnin ? "Da" : "Ne"],
            ["Število vzdrževanih družinskih članov", podatkiState.stVzdrzevanihDruzinskihClanov],
            ["Ali je partner zaposlen?", podatkiState.partnerZaposlen ? "Da" : "Ne"],
            ["Samohranilec", podatkiState.samohranilec ? "Da" : "Ne"],
            ["Zavezanec za preživnino", podatkiState.zavezanecNaPrezivnin ? "Da" : "Ne"],
            ["Znesek mesečne preživnine", podatkiState.znesekMesecnePrezivnine],
            ["Sum na razne oblike odvisnosti", podatkiState.sumljivost ? "Da" : "Ne"],
            [],
            ["PODATKI SISBON (V EUR)"],
            ["SISBON - NEODPLAČAN DEL OBVEZNOSTI", podatkiState.sisbonNeodplacanDelObvezost],
            ["SISBON - ZAPADLI DOLG", podatkiState.sisbonZapadliDolg],
            ["SISBON - IZTERJAVA", podatkiState.sisbonIzterjava],
            ["SISBON - IZVRŠBA", podatkiState.sisbonIzvrsba],
            ["SISBON - OMEJITEV UPORABE TRR", podatkiState.sisbonOmejitevTRR ? "Da" : "Ne"]
        ];

        setTableData(data);
    };

    return (
        <>
            <div className="container" style={{ borderColor: 'black', color: 'black', background: "white" }}>
                <div className="d-flex justify-content-center mb-3">
                    <button onClick={generateExcelData} className="btn btn-primary">Prikaz podatkov v Excel-u</button>
                </div>
                <h2>Prikaz Excel podataka</h2>
                {tableData.length > 0 && (
                    <table className="table table-bordered   mb-4">
                        <tbody>
                        {tableData.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex}>{cell}</td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>

            <BonitetnaOcena />
        </>
    );
};

export default IzpisVnesenihPodatkov;
