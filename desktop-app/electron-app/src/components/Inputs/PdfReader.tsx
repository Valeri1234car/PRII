/**
 * @file PdfReader.tsx
 * @brief Komponenta za nalaganje in procesiranje PDF datotek
 *
 * @opis Komponenta PdfReader omogoča uporabnikom nalaganje in procesiranje PDF datotek.
 * Podpira funkcionalnosti vleke in spuščanja datotek ter izbiro datotek preko vnosnega polja.
 * Po naložitvi PDF-jev, komponenta iz njih pridobi relevantne podatke z uporabo regularnih izrazov
 * in optičnega prepoznavanja znakov (OCR). Pridobljeni podatki se nato uporabijo za posodobitev
 * stanja aplikacije, ki je dostopno drugim komponentam in funkcionalnostim.
 *
 * @potrebuje react, pdfjs-dist, tesseract.js, react-bootstrap
 * @potrebuje App.tsx (za PodatkiContext)
 * @potrebuje Podatki.ts (za vmesnik Promet)
 *
 * @verzija 1.0.0
 * @since 1.0.0
 */
import React, { useState, useRef, useContext, useEffect } from 'react';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import Tesseract from 'tesseract.js';
import { PodatkiContext } from '../../App';
import { Promet } from '../../interface/Podatki';
import { ProgressBar } from 'react-bootstrap';
import upload from '../../assets/upload.png';


GlobalWorkerOptions.workerSrc = 'pdf.worker.min.js';

const PdfReader: React.FC = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const { setPdfText, setPodatkiState, podatkiState } = useContext(PodatkiContext);
    const [pdfData, setPdfData] = useState<{ [key: string]: any }>({});
    const { setData } = useContext(PodatkiContext);
    const [progress, setProgress] = useState(0);


    //obravnava dogodka, ko datoteke "visijo" (ne vem kak druga rečt) nad območjem za drag and dropa
    const handleDragOver = (event: React.DragEvent) => {
        console.log('Drag over');
        event.preventDefault();
    };

    //bbravnava dogodka, ko se datoteke "spuščene" v območje za drag and drop 
    const handleDrop = (event: React.DragEvent, setFileFunction: React.Dispatch<React.SetStateAction<File[]>>) => {
        console.log('File dropped');
        event.preventDefault();
        const newFiles = Array.from(event.dataTransfer.files);
        setFileFunction((prevFiles) => [...prevFiles, ...newFiles]);
    };

    //obravnava dogodka, ko se datoteke izberejo preko inputa za dodajanje
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, setFileFunction: React.Dispatch<React.SetStateAction<File[]>>) => {
    console.log('File selected');
    const newFiles = event.target.files;
    if (newFiles) {
        setFileFunction((prevFiles) => [...prevFiles, ...Array.from(newFiles)]);
        }
    };

    //odstrani datoteko iz seznama datotek na podlagi indeksa
    const handleRemoveFile = (index: number) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    //obravnava dogodka, ko se klikne gumb za procesiranje datotek
    const handleProcessFiles = async () => {
        if (files.length > 0) {
            processFiles(files);
        } else {
            alert('Napaka pri branju');
        }
    };

    //pretvori število v obliki niza (npr. "1.234,56") v številsko vrednost
    const convertToNumber = (euroFormattedNumber: string): number => {
        return parseFloat(euroFormattedNumber.replace('.', '').replace(',', '.'));
    };

    //z regexom pridobimo osebne podatke
    const extractRelevantInfo = (textContent: string) => {
        console.log("Extracting relevant info from text content");

        const nameRegex = /Ime:\s*(\w+)\s*Priimek:\s*(\w+)/;
        const matchName = textContent.match(nameRegex);
        const name = matchName ? matchName[1] : '';
        const surname = matchName ? matchName[2] : '';
        console.log("Name:", name, "Surname:", surname);

        const naslovRegex = /Kraj:\s*(.+)/i;
        const naslovIme = textContent.match(naslovRegex);
        const naslovNaslov = naslovIme ? naslovIme[1] : '';
        console.log("Naslov:", naslovNaslov);

        const addressRegex = /Ulica in hina 3tevilka:\s*(.+)/i;
        const matchAddress = textContent.match(addressRegex);
        const address = matchAddress ? matchAddress[1] : '';
        console.log("Address:", address);

        const birthDateRegex = /Datum rojstva:\s*(\d{2}\.\d{1,2}\.\d{4})/;
        const matchBirthDate = textContent.match(birthDateRegex);
        const birthDate = matchBirthDate ? matchBirthDate[1] : '';
        console.log("Birth Date:", birthDate);

        const sloveniaCitizenRegex = /Slovensko drzavljanstvo:\s*(\w+)/;
        const matchSloveniaCitizen = textContent.match(sloveniaCitizenRegex);
        const sloveniaCitizen = matchSloveniaCitizen ? matchSloveniaCitizen[1].toLowerCase() === 'da' : false;
        console.log("Slovenia Citizen:", sloveniaCitizen);

        const ageRegex = /Starost:(\d+)/;
        const matchAge = textContent.match(ageRegex);
        const age = matchAge ? parseInt(matchAge[1]) : 0;
        const isAdult = age >= 18;
        console.log("Age:", age, "Is Adult:", isAdult);

        const bankruptcyRegex = /Ste bili ali ste zdaj v postopku osebnega stetaja?\s*:\s*(\w+)/i;
        const matchBankruptcy = textContent.match(bankruptcyRegex);
        const isNotInBankruptcy = matchBankruptcy ? matchBankruptcy[1].toLowerCase() === 'ne' : false;
        console.log("Is Not In Bankruptcy:", isNotInBankruptcy);

        const employmentRegex = /Status zaposlitve:\s*(\w+)/i;
        const matchEmployment = textContent.match(employmentRegex);
        let isEmployedOrRetired = false;
        let isEmployed = false;
        let isRetired = false;

        if (matchEmployment) {
            const employmentStatus = matchEmployment[1].toLowerCase();
            console.log('Employment Status:', employmentStatus);
            if (employmentStatus === 'zaposlen') {
                isEmployed = true;
                isEmployedOrRetired = true;
            } else {
                isRetired = true;
                isEmployedOrRetired = true;
            }
        }

        const loanAmountRegex = /Znesek kredita \(v EUR\):\s*([\d.,]+)\s*EUR/;
        const matchLoanAmount = textContent.match(loanAmountRegex);
        const loanAmount = matchLoanAmount ? convertToNumber(matchLoanAmount[1]) : 0;
        console.log("Loan Amount:", loanAmount);

        const repaymentPeriodRegex = /doba odplatevanja \(v mesecih\):\s*(\d+)\s*mesec/i;
        const matchRepaymentPeriod = textContent.match(repaymentPeriodRegex);
        const repaymentPeriod = matchRepaymentPeriod ? parseInt(matchRepaymentPeriod[1]) : 0;
        console.log("Repayment Period:", repaymentPeriod);

        const stopnjaIzobrazbe1 = /Stopnja izobrazbe:\s*(.+)/i;
        const stopnjaIzobrazbe2 = textContent.match(stopnjaIzobrazbe1);
        const stopnjaIzobrazbe3 = stopnjaIzobrazbe2 ? stopnjaIzobrazbe2[1] : '';
        console.log("Stopnja izobrazbe:", stopnjaIzobrazbe3);

        const steviloClanov1 = /Stevilo vzdrievanih druzinskih élanov:\s*(.+)/;
        const steviloClanov2 = textContent.match(steviloClanov1);
        const steviloClanov3 = steviloClanov2 ? steviloClanov2[1] : '';
        console.log("Stevilo Clanov:", steviloClanov3);

        const relevantInfo = {
            name,
            surname,
            address,
            naslovNaslov,
            birthDate,
            sloveniaCitizen,
            isAdult,
            isNotInBankruptcy,
            isEmployedOrRetired,
            isEmployed,
            isRetired,
            loanAmount,
            repaymentPeriod,
            stopnjaIzobrazbe3,
            steviloClanov3,
        };

        console.log("Relevant Info:", relevantInfo);
        return relevantInfo;
    };

    //z regexom pridobimo še podatke iz izpiskov
    const extractAdditionalInfo = (textContent:any, month:any) => {
        console.log("Extracted text content for month ", month, ":\n", textContent);

        const prometeVBreme = textContent.match(/Promet v breme:\s*([\d.,]+)/)?.[1] || '0';
        const prometeVDobro = textContent.match(/Promet v dobro:\s*([\d.,]+)/)?.[1] || '0';

        const stanjeRegex = /Novo stanje na racunu \(v EUR\):\s*(-?\d{1,3}(?:\.\d{3})*(?:,\d+)?)/;
        const matchStanje = textContent.match(stanjeRegex);
        let stanje = '0';
        if (matchStanje) {
            stanje = matchStanje[1];
            stanje = formatNumber(parseRawNumber(stanje));
        }
        console.log(stanjeRegex);
        console.log(matchStanje);
        console.log("to je stanje: " + stanje);


        const placaRegexes = [
            'PLACA\\s+REDNO\\s+DNALOGO\\d+\\s+(-?\\d+\\.\\d+)',
            /PLACA\s+REDNO\s+DNALOG\d+\s+([\d.,]+)/,
            /PLACA\s+REDNO\s+DNALOGO\d+\s+([\d.,]+)/,
            /Placa\s+\d+\s+([\d.,]+)/,
            /Placa\s+([\d.,]+)/,
            /PLACA\s+\d+\s+REDNO\s+DNALOG\d+\s+([\d.,]+)/,

        ];

        let placa = '0';
        let allMatches = [];

        for (const regex of placaRegexes) {
            const matchPlaca = textContent.match(regex);
            if (matchPlaca) {
                allMatches.push(matchPlaca[1]);
            }
        }

        if (allMatches.length > 0) {
            placa = allMatches[0];
            placa = insertCommaBeforeLastTwoDigits(placa);
        }

        console.log("Sve podudarnosti za placa: ", allMatches);
        console.log("to je placa: " + placa);

        setPdfData((prevData) => {
            const newData = {
                ...prevData,
                [month]: {
                    prometeVBreme,
                    prometeVDobro,
                    stanje,
                    placa,
                },
            };

            setData(newData); // Ovde ažurirate podatke u kontekstu
            console.log(newData)

            // console.log(newData.avgust.prometeVBreme)

            return newData;
        });

        const neki = convertToNumber(prometeVDobro)-convertToNumber(placa);
        console.log(placa)
        console.log(prometeVDobro)
        console.log(neki)



    };

    //pretvorbo niza v številsko vrednost z upoštevanjem decimalnih ločil
    const parseRawNumber = (raw:any) => {
        if (raw.includes(',')) {
            if (raw.lastIndexOf(',') > raw.lastIndexOf('.')) {
                raw = raw.replace(/\./g, '').replace(',', '.');
            } else {
                raw = raw.replace(/,/g, '');
            }
        }
        return parseFloat(raw);
    };

    //formatiranje številske vrednosti v niz z decimalnimi mesti
    const formatNumber = (number:any) => {
        return number.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };
    
    //vstavljanje vejice pred zadnjima dvema decimalskima mestoma v nizu
    const insertCommaBeforeLastTwoDigits = (raw:any) => {
        const len = raw.length;
        const integerPart = raw.substring(0, len - 2);
        const decimalPart = raw.substring(len - 2);
        return integerPart + ',' + decimalPart;
    };

    //asinhrona funkcija za procesiranje seznama PDF datotek
    const processFiles = async (files: File[]) => {
        let textContent = '';
        setLoading(true);
        setProgress(0);
        const monthNames = [
            'januar', 'februar', 'marec', 'april', 'maj', 'junij',
            'julij', 'avgust', 'september', 'oktober', 'november', 'december'
        ];
        const personalInfoFile = files.find(file => file.name.toLowerCase().includes('vloga'));
        if (personalInfoFile) {
            const fileTextContent = await convertPdfToImagesAndExtractText(personalInfoFile);
            console.log(`Text content for personal information PDF:\n${fileTextContent}`);
    
            const relevantInfo = extractRelevantInfo(fileTextContent);
            // const [day, monthNumber, year] = relevantInfo.birthDate.split('.');
            const formattedDate = relevantInfo.birthDate.split('.').reverse().join('-');
            setPodatkiState({
                ...podatkiState,
                ime: relevantInfo.name,
                priimek: relevantInfo.surname,
                naslov: relevantInfo.address + ", " + relevantInfo.naslovNaslov,
                naslovNaslov: relevantInfo.naslovNaslov,
                datumRojstva: formattedDate,
                drzavljanRS: relevantInfo.sloveniaCitizen,
                stecajniPostopekNI: relevantInfo.isNotInBankruptcy,
                zaposlenUpokojenec: relevantInfo.isEmployedOrRetired,
                zaposlen: relevantInfo.isEmployed,
                upokojenec: relevantInfo.isRetired,
                zaproseniKredit: relevantInfo.loanAmount,
                rokVracila: relevantInfo.repaymentPeriod,
                izobrazba: relevantInfo.stopnjaIzobrazbe3,
                stVzdrzevanihDruzinskihClanov: relevantInfo.steviloClanov3,
            });
        }
    
        const promises = files.map(async (file, i) => {
            const fileName = file.name.toLowerCase();
            let month = '';
    
            if (fileName.includes('vloga')) {
                return;
            }
    
            for (const monthName of monthNames) {
                if (fileName.includes(monthName)) {
                    month = monthName;
                    break;
                }
            }
    
            if (!month) {
                console.warn(`Could not determine month from file name "${file.name}"`);
                return;
            }
    
            const fileTextContent = await convertPdfToImagesAndExtractText(file);
            console.log(`Text content for file ${file.name}:\n${fileTextContent}`);
    
            extractAdditionalInfo(fileTextContent, month);
            const progressPercentage = ((i + 1) / files.length) * 100;
            setProgress(progressPercentage);
        });
    
        await Promise.all(promises);
    
        setPdfText(`Full Text Content:\n\n${textContent}`);
        setLoading(false);
        setProgress(100);
    };

    //posodobitev stanja podatkov na podlagi podatkov, pridobljenih iz PDF-jev
    const updatePodatkiState = () => {
        const prometeVBremeValues = Object.values(pdfData).map(data => convertToNumber(data.prometeVBreme));
        const prometeVDobroValues = Object.values(pdfData).map(data => convertToNumber(data.prometeVDobro));
        const stanjeTRRValues = Object.values(pdfData).map(data => convertToNumber(data.stanje));
        const placaValues = Object.values(pdfData).map(data => convertToNumber(data.placa));

        console.log(prometeVBremeValues);
        console.log(prometeVDobroValues);
        console.log(stanjeTRRValues);
        console.log(placaValues);
        console.log(placaValues);
        console.log(placaValues);

        console.log(typeof prometeVDobroValues[0])

        const prometDobro:Promet = { t1: prometeVDobroValues[0], t2: prometeVDobroValues[1], t3: prometeVDobroValues[2],povprecje:0 }
        const prometSlabo:Promet = { t1: prometeVBremeValues[0], t2: prometeVBremeValues[1], t3: prometeVBremeValues[2],povprecje:0 }
        const trr:Promet = { t1: stanjeTRRValues[0], t2: stanjeTRRValues[1], t3: stanjeTRRValues[2],povprecje:0 }
        const placa:Promet = { t1: placaValues[0], t2: placaValues[1], t3: placaValues[2],povprecje:0 }
        console.log(prometDobro);

        setPodatkiState({
            ...podatkiState,
            mesecniPrometDobro: prometDobro,
            mesecniPrometBreme: prometSlabo,
            stanjeTRR: trr,
            znesekPrejemkovPokojnina: placa
        });
    };

    //hook, ki se zažene, ko se spremenijo podatki iz PDF-jev in pokliče 
    useEffect(() => {
        if (Object.keys(pdfData).length > 0) {
            updatePodatkiState();
        }
    }, [pdfData]);

    //pretvorbo PDF datoteke v slike in izvlečenje besedila
    const convertPdfToImagesAndExtractText = async (file: File) => {
        const reader = new FileReader();
        return new Promise<string>((resolve, reject) => {
            reader.onload = async () => {
                if (reader.result) {
                    const typedArray = new Uint8Array(reader.result as ArrayBuffer);
                    const pdf = await getDocument(typedArray).promise;
                    let textContent = '';
                    for (let i = 1; i <= pdf.numPages; i++) {
                        const page = await pdf.getPage(i);
                        const viewport = page.getViewport({ scale: 2.0 });
                        const canvas = document.createElement('canvas');
                        const context = canvas.getContext('2d');
                        canvas.height = viewport.height;
                        canvas.width = viewport.width;

                        const renderContext = {
                            canvasContext: context!,
                            viewport: viewport,
                        };

                        await page.render(renderContext).promise;
                        const imgData = canvas.toDataURL('image/png');
                        const text = await extractTextFromImage(imgData);
                        textContent += text + '\n';
                    }
                    resolve(textContent);
                } else {
                    reject('Failed to read the file');
                }
            };
            reader.readAsArrayBuffer(file);
        });
    };

    //izvleče besedilo iz slikovnih podatkov s pomočjo knjižnice
    const extractTextFromImage = (imgData: string): Promise<string> => {
        return new Promise((resolve, reject) => {
            Tesseract.recognize(
                imgData,
                'eng',
                {
                    logger: (m) => console.log(m),
                }
            ).then(({ data: { text } }) => {
                resolve(text);
            }).catch(reject);
        });
    };
    //komponenta za uporabniški vmesnik
    return (
        <>
            <div className="container">
                <div className="containerOknoDrag">
                    <div
                        className="border border-secondary p-3 border-dashed mx-auto rounded"
                        onDrop={(event) => handleDrop(event, setFiles)}
                        onDragOver={handleDragOver}
                        style={{ maxWidth: '400px' }}
                    >
                        {files.length > 0 ? (
                            files.map((file, index) => (
                                <div key={index} className="text-white d-flex justify-content-between align-items-center">
                                    <p>{file.name}</p>
                                    <button
                                        className="btn btn-sm"
                                        style={{
                                            backgroundColor: '#41424c',
                                            color: '#fff',
                                            border: '1px solid #fff'
                                        }}
                                        onClick={() => handleRemoveFile(index)}
                                    >Odstrani</button>
                                </div>
                            ))
                        ) : (
                            <>
                                <h2 className="mb-4 text-white text-center">Drag and drop</h2>
                                <h2 className="mb-4 text-white text-center">ali</h2>
                            </>
                        )}
                        <input
                            type="file"
                            multiple
                            onChange={(event) => handleFileChange(event, setFiles)}
                            hidden
                            accept="application/pdf"
                            ref={inputRef}
                        />
                        <button className="btn btn-primary w-100 mt-2" onClick={() => inputRef.current?.click()}><img className='upload-logo' src={upload}/>Izberite Datoteke</button>
                        <button className="btn btn-success w-100 mt-2" onClick={handleProcessFiles} disabled={files.length === 0 || loading}>
                            {loading ? 'Obdelovanje...' : 'Začnite z obdelavo'}
                        </button>
                    </div>
                </div>
                {loading && (
                    <div className="w-100 d-flex justify-content-center mt-3">
                        <div className="progress-bar-wrapper" style={{ width: '90%', maxWidth: '600px', padding: '10px', borderRadius: '5px' }}>
                            <ProgressBar now={progress} label={`${progress}%`} />
                        </div>
                    </div>
                )}
            </div>
        </>


    );
};

export default PdfReader;
