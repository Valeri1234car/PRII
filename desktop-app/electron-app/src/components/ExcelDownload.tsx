import { useContext} from "react";
import { PodatkiContext } from "../App";
import Excel from 'exceljs';
import { saveAs } from 'file-saver';
import excelFileUrl from '../assets/bonitetna-ocena-template.xlsx';
import excelLogo from '../assets/excel-logo.png';

const ExcelDownload = () => {
    
    


    const {podatkiState} = useContext(PodatkiContext);
    
    const HandleClick = async ():Promise<void> => {

        // const response = await fetch('/bonitetna-ocena-template.xlsx');
        const response = await fetch(excelFileUrl);
        const arrayBuffer = await response.arrayBuffer();

        const workbook = new Excel.Workbook();
        await workbook.xlsx.load(arrayBuffer);

        const worksheet = workbook.getWorksheet("BONITETA");


        const excelPolja =[
            {cell:'C6',value: podatkiState.priimek + " " + podatkiState.ime },
            {cell:'C7',value: podatkiState.naslov },
            {cell:'C8',value: podatkiState.datumRojstva },
            {cell:'C11',value: podatkiState.drzavljanRS ? "DA" : "NE"},
            {cell:'C11',value: podatkiState.starost18 ? "DA" : "NE"},
            {cell:'C11',value: podatkiState.stecajniPostopekNI ? "DA" : "NE"},
            {cell:'C11',value: podatkiState.zaposlenUpokojenec ? "DA" : "NE"},
            {cell:'C17',value: podatkiState.zaproseniKredit},
            {cell:'C18',value: podatkiState.rokVracila},
            {cell:'C22',value: podatkiState.delodajalec},
            {cell:'C23',value: podatkiState.bonitetnaOcenaDelodajalca},
            {cell:'C26',value: podatkiState.mesecniPrometDobro.t1},
            {cell:'D26',value: podatkiState.mesecniPrometDobro.t2},
            {cell:'E26',value: podatkiState.mesecniPrometDobro.t3},
            {cell:'C27',value: podatkiState.mesecniPrometBreme.t1},
            {cell:'D27',value: podatkiState.mesecniPrometBreme.t2},
            {cell:'E27',value: podatkiState.mesecniPrometBreme.t3},
            {cell:'C28',value: podatkiState.stanjeTRR.t1},
            {cell:'D28',value: podatkiState.stanjeTRR.t2},
            {cell:'E28',value: podatkiState.stanjeTRR.t3},
            {cell:'C29',value: podatkiState.znesekPrejemkovPokojnina.t1},
            {cell:'D29',value: podatkiState.znesekPrejemkovPokojnina.t2},
            {cell:'E29',value: podatkiState.znesekPrejemkovPokojnina.t3},
            {cell:'C30',value: podatkiState.znesekDrugihPrejemkov.t1},
            {cell:'D30',value: podatkiState.znesekDrugihPrejemkov.t2},
            {cell:'E30',value: podatkiState.znesekDrugihPrejemkov.t3},
            {cell:'C31',value: podatkiState.mesecniZnesekZaOdplacilodrugihKreditov.t1},
            {cell:'D31',value: podatkiState.mesecniZnesekZaOdplacilodrugihKreditov.t2},
            {cell:'E31',value: podatkiState.mesecniZnesekZaOdplacilodrugihKreditov.t3},
            {cell:'C32',value: podatkiState.stNeizvrsenihTrajnihNalogov.t1},
            {cell:'D32',value: podatkiState.stNeizvrsenihTrajnihNalogov.t2},
            {cell:'E32',value: podatkiState.stNeizvrsenihTrajnihNalogov.t3},
            {cell:'C33',value: podatkiState.stBancnihPobotov.t1},
            {cell:'D33',value: podatkiState.stBancnihPobotov.t2},
            {cell:'E33',value: podatkiState.stBancnihPobotov.t3},
            {cell:'C34',value: podatkiState.stIzvrsbNaTrr.t1},
            {cell:'D34',value: podatkiState.stIzvrsbNaTrr.t2},
            {cell:'E34',value: podatkiState.stIzvrsbNaTrr.t3},
            {cell:'C41',value: podatkiState.izobrazba},
            {cell:'C42',value: podatkiState.lastnistnovNepremicnin ? "DA" : "NE"},
            {cell:'C43',value: podatkiState.stVzdrzevanihDruzinskihClanov},
            {cell:'C44',value: podatkiState.partnerZaposlen ? "DA" : "NE"},
            {cell:'C45',value: podatkiState.samohranilec ? "DA" : "NE"},
            {cell:'C46',value: podatkiState.zavezanecNaPrezivnin ? "DA" : "NE"},
            {cell:'C47',value: podatkiState.znesekMesecnePrezivnine},
            {cell:'C48',value: podatkiState.sumljivost ? "DA" : "NE"},
            {cell:'C51',value: podatkiState.sisbonNeodplacanDelObvezost},
            {cell:'C52',value: podatkiState.sisbonZapadliDolg},
            {cell:'C53',value: podatkiState.sisbonIzterjava},
            {cell:'C54',value: podatkiState.sisbonIzvrsba},
            {cell:'C55',value: podatkiState.sisbonOmejitevTRR ? "DA" : "NE"},
        ]
   
        
            excelPolja.forEach(field => {

            if (!worksheet) {
                 console.error('Worksheet not found.');
                return; 
                }
                const cell = worksheet.getCell(field.cell);
                cell.value = field.value;
              });
            
             
              const buffer = await workbook.xlsx.writeBuffer();
              const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            
              saveAs(blob, podatkiState.priimek +'_'+ podatkiState.ime +  '_bonitetnaOcena.xlsx');
    }

    

    return(
        <div className="downloadExcel">
            <button className="btn btn-success" onClick={HandleClick}><img className="upload-logo" src={excelLogo}/>Izdelaj bonitetno oceno</button>
        </div>
    )
}

export default ExcelDownload