import React, { useState, useRef, useContext } from 'react';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import Tesseract from 'tesseract.js';
import { PodatkiContext } from '../../App';

GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.0.279/pdf.worker.min.js`;

const PdfReader: React.FC = () => {
    const [files, setFiles] = useState<FileList | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const { setPdfText, setPodatkiState, podatkiState } = useContext(PodatkiContext);

    const handleDragOver = (event: React.DragEvent) => {
        event.preventDefault();
    };

    const handleDrop = (event: React.DragEvent) => {
        event.preventDefault();
        setFiles(event.dataTransfer.files);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            setFiles(files);
            processFiles(files);
        }
    };

    const convertToNumber = (euroFormattedNumber: string): number => {
        return parseFloat(euroFormattedNumber.replace('.', '').replace(',', '.'));
    };

    const extractRelevantInfo = (textContent: string) => {
        const nameRegex = /Ime:\s*(\w+)\s*Priimek:\s*(\w+)/;
        const matchName = textContent.match(nameRegex);
        const name = matchName ? matchName[1] : '';
        const surname = matchName ? matchName[2] : '';

        const naslovRegex = /Kraj:\s*(.+)/i;
        const naslovIme = textContent.match(naslovRegex)
        const naslovNaslov = naslovIme ? naslovIme[1] : '';
        console.log(naslovNaslov)

        const addressRegex = /Ulica in hina 3tevilka:\s*(.+)/i;
        const matchAddress = textContent.match(addressRegex);
        const address = matchAddress ? matchAddress[1] : '';
        console.log(addressRegex)
        console.log("adress" +matchAddress)

        const birthDateRegex = /Datum rojstva:\s*(\d{2}\.\d{1,2}\.\d{4})/;
        const matchBirthDate = textContent.match(birthDateRegex);
        const birthDate = matchBirthDate ? matchBirthDate[1] : '';

        const sloveniaCitizenRegex = /Slovensko drzavljanstvo:\s*(\w+)/;
        const matchSloveniaCitizen = textContent.match(sloveniaCitizenRegex);
        const sloveniaCitizen = matchSloveniaCitizen ? matchSloveniaCitizen[1].toLowerCase() === 'da' : false;

        const ageRegex = /Starost:(\d+)/;
        const matchAge = textContent.match(ageRegex);
        const age = matchAge ? parseInt(matchAge[1]) : 0;
        const isAdult = age >= 18;

        const bankruptcyRegex = /Ste bili ali ste zdaj v postopku osebnega stetaja?\s*:\s*(\w+)/i;
        const matchBankruptcy = textContent.match(bankruptcyRegex);
        const isNotInBankruptcy = matchBankruptcy ? matchBankruptcy[1].toLowerCase() === 'ne' : false;

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

    const repaymentPeriodRegex = /doba odplatevanja \(v mesecih\):\s*(\d+)\s*mesec/i;
    const matchRepaymentPeriod = textContent.match(repaymentPeriodRegex);
    const repaymentPeriod = matchRepaymentPeriod ? parseInt(matchRepaymentPeriod[1]) : 0;

    const stopnjaIzobrazbe1 = /Stopnja izobrazbe:\s*(.+)/i;
    const stopnjaIzobrazbe2 = textContent.match(stopnjaIzobrazbe1);
    const stopnjaIzobrazbe3 = stopnjaIzobrazbe2 ? stopnjaIzobrazbe2[1] : '';
    console.log("izobrazba"+ stopnjaIzobrazbe2)
    
    const steviloClanov1 = /Stevilo vzdrievanih druzinskih élanov:\s*(.+)/; 
    const steviloClanov2 = textContent.match(steviloClanov1);
    const steviloClanov3 = steviloClanov2 ? steviloClanov2[1] : '';
    console.log("izobrazba"+ steviloClanov2)
    
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


        return relevantInfo;
    };

    const processFiles = async (files: FileList) => {
        setLoading(true);
        let textContent = '';
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            textContent += await convertPdfToImagesAndExtractText(file);
        }

        setPdfText(`Full Text Content:\n\n${textContent}`);

        const relevantInfo = extractRelevantInfo(textContent);
        const [day, month, year] = relevantInfo.birthDate.split('.');
        const formattedDate = `${year}-${month}-${day}`;
        setPodatkiState({
            ...podatkiState,
            ime: relevantInfo.name,
            priimek: relevantInfo.surname,
            naslov: relevantInfo.address + ", " +relevantInfo.naslovNaslov,
            naslovNaslov: relevantInfo.naslovNaslov,
            datumRojstva: formattedDate,
            drzavljanRS: relevantInfo.sloveniaCitizen,
            // starost18: relevantInfo.isAdult,
            stecajniPostopekNI: relevantInfo.isNotInBankruptcy,
        zaposlenUpokojenec: relevantInfo.isEmployedOrRetired,
        zaposlen: relevantInfo.isEmployed,
        upokojenec: relevantInfo.isRetired,
        zaproseniKredit: relevantInfo.loanAmount,
        rokVracila: relevantInfo.repaymentPeriod,
        izobrazba: relevantInfo.stopnjaIzobrazbe3,
        stVzdrzevanihDruzinskihClanov: relevantInfo.steviloClanov3,
    });

        setLoading(false);
    };

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
                }
            };
            reader.readAsArrayBuffer(file);
        });
    };

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


    if (files) return (
        <div className="uploads">
            <ul>
                {Array.from(files).map((file, idx) => <li key={idx}>{file.name}</li>)}
            </ul>
            <div className="actions">
                <button className="btn btn-primary" onClick={() => setFiles(null)}>Cancel</button>
            </div>
            {loading && <p>Processing...</p>}
        </div>
    );

    return (
        <>
            <div className="container mt-5">
                <div
                    className="border border-primary p-3 text-center border-dashed mx-auto"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    style={{ maxWidth: '400px' }}
                >
                    <h1 className="mb-4 text-white">Drag and drop</h1>
                    <h1 className="mb-4 text-white">or</h1>
                    <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        hidden
                        accept="application/pdf"
                        ref={inputRef}
                    />
                    <button className="btn btn-primary" onClick={() => inputRef.current?.click()}>Select Files</button>
                </div>
            </div>
        </>
    );
};

export default PdfReader;
