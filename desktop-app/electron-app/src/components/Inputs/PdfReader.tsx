import React, { useState, useRef, useContext, useEffect } from 'react';
import { PodatkiContext } from '../../App';
import { Promet } from '../../interface/Podatki';
import { ProgressBar } from 'react-bootstrap';
import upload from '../../assets/upload.png';
import sandClock from '../../assets/sand-clock.png';

const arrayProgress:string[] = []

const PdfReader: React.FC = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [pastedText, setPastedText] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);
    const { setPdfText, setPodatkiState, podatkiState } = useContext(PodatkiContext);
    const [pdfData, setPdfData] = useState<{ [key: string]: any }>({});
    const { setData } = useContext(PodatkiContext);
    const [progress, setProgress] = useState(0);
    const [neki, setNeki] = useState(arrayProgress);

    useEffect(() => {
        setProgress((neki.length / (files.length + (pastedText ? 1 : 0))) * 100);
    }, [neki, files.length, pastedText]);

    const handleDragOver = (event: React.DragEvent) => {
        console.log('Drag over');
        event.preventDefault();
    };

    const handleDrop = (event: React.DragEvent, setFileFunction: React.Dispatch<React.SetStateAction<File[]>>) => {
        console.log('File dropped');
        event.preventDefault();
        const newFiles = Array.from(event.dataTransfer.files);
        setFileFunction((prevFiles) => [...prevFiles, ...newFiles]);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, setFileFunction: React.Dispatch<React.SetStateAction<File[]>>) => {
        console.log('File selected');
        const newFiles = event.target.files;
        if (newFiles) {
            setFileFunction((prevFiles) => [...prevFiles, ...Array.from(newFiles)]);
        }
    };

    const handleRemoveFile = (index: number) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const handleProcessFiles = async () => {
        if (files.length > 0 || pastedText) {
            processFiles(files);
        } else {
            alert('Napaka pri branju');
        }
    };

    const extractRelevantInfo = (textContent: string) => {
        console.log("ekstahirani podatki al neki idk");
    
        const extractValue = (key: string): string => {
            const regex = new RegExp(`${key}:\\s*(.+?)(?=\\n|$)`, 'i');
            const match = textContent.match(regex);
            return match ? match[1].trim() : '';
        };
    
        const name = extractValue('Ime');
        const surname = extractValue('Priimek');
        const gender = extractValue('Spol');
        const emso = extractValue('EMŠO');
        const taxNumber = extractValue('Davčna številka');
        const birthDate = extractValue('Datum rojstva');
        const birthPlace = extractValue('Kraj rojstva');
        const birthCountry = extractValue('Država rojstva');
        const sloveniaCitizen = extractValue('Slovensko državljanstvo').toUpperCase();
        const otherCitizen = extractValue('Drugo državljanstvo (navedi katero)');
        const docType = extractValue('Vrsta osebnega dokumenta');
        const docNumber = extractValue('Št. osebnega dokumenta');
        const docIssuer = extractValue('Izdajatelj dokumenta');
        const issueDate = extractValue('Datum izdaje');
        const validUntil = extractValue('Velja do');
        const transactionAccount = extractValue('Transakcijski račun');
        const bankName = extractValue('Odprt pri banki');
        const isPoliticallyExposed = extractValue('Ali ste politično izpostavljena oseba?').toUpperCase();
        const street = extractValue('Ulica in hišna številka');
        const postalCode = extractValue('Poštna številka');
        const city = extractValue('Kraj');
        const temporaryStreet = extractValue('Ulica in hišna številka');
        const temporaryPostalCode = extractValue('Poštna številka');
        const temporaryCity = extractValue('Kraj');
        const mobilePhone = extractValue('Mobilni telefon');
        const homePhone = extractValue('Domači telefon');
        const email = extractValue('E-pošta');
        const residence = extractValue('Bivališče');
        const maritalStatus = extractValue('Zakonski stan');
        const householdMembers = extractValue('Število oseb v gospodinjstvu');
        const employedOrRetiredMembers = extractValue('Število zaposlenih ali upokojenih oseb v gospodinjstvu');
        const dependents = extractValue('Število vzdrževanih družinskih članov');
        const livingExpenses = extractValue('Življenski stroški*');
        const employmentStatus = extractValue('Status zaposlitve');
        const employmentDuration = extractValue('Zaposlitev za');
        const educationLevel = extractValue('Stopnja izobrazbe');
        const employerName = extractValue('Naziv');
        const employerAddress = extractValue('Naslov');
        const employerCountry = extractValue('Država');
        const jobTitle = extractValue('Delovno mesto');
        const workExperience = extractValue('Skupna delovna doba v letih');
        const netIncome = extractValue('Znesek neto plače/pokojnine (v EUR)');
        const bonuses = extractValue('Znesek dodatkov (kilometrina, stimulacija, delovna uspešnost ....; v EUR)');
        const holidayPay = extractValue('Znesek regresa (v EUR)');
        const christmasBonus = extractValue('Znesek božičnice (v EUR)');
        const otherIncome = extractValue('Drugi prihodki');
        const hasLoan = extractValue('Imate bančni kredit/posojilo?').toUpperCase();
        const loanObligations = extractValue('Mesečne obveznosti iz naslova kreditov/posojil (v EUR)');
        const hasOverdraft = extractValue('Imate odobren limit na bančnem računu?').toUpperCase();
        const hasCreditCard = extractValue('Imate kreditno kartico?').toUpperCase();
        const hasLeasing = extractValue('Imate sklenjeno leasing pogodbo?').toUpperCase();
        const hasExecution = extractValue('Ste v zadnjem letu imeli izvršbo ali blokiran bančni račun?').toUpperCase();
        const inBankruptcy = extractValue('Ste bili ali ste zdaj v postopku osebnega stečaja?').toUpperCase();
        const latePayments = extractValue('Ste v zadnji dveh letih zamujali pri izpolnjevanju kreditnih obveznosti?').toUpperCase();
        const loanAmount = extractValue('Znesek kredita');
        const repaymentPeriod = extractValue('doba odplačevanja');
        const consentStatement = extractValue('Privolitvena izjava za obdelavo osebnih podatkov');
        const finalStatement = extractValue('Končna izjava');
    
        const age = calculateAge(birthDate);
        const isAdult = age >= 18;
        const isEmployed = jobTitle.trim().length > 0;
        const isRetired = employmentStatus.toLowerCase().includes('upokojen');
        const isEmployedOrRetired = isEmployed || isRetired;
    
        const relevantInfo = {
            name,
            surname,
            gender,
            emso,
            taxNumber,
            birthDate,
            birthPlace,
            birthCountry,
            sloveniaCitizen,
            otherCitizen,
            docType,
            docNumber,
            docIssuer,
            issueDate,
            validUntil,
            transactionAccount,
            bankName,
            isPoliticallyExposed,
            address: `${street}, ${postalCode} ${city}`.trim(),
            temporaryAddress: `${temporaryStreet}, ${temporaryPostalCode} ${temporaryCity}`.trim(),
            mobilePhone,
            homePhone,
            email,
            residence,
            maritalStatus,
            householdMembers,
            employedOrRetiredMembers,
            dependents,
            livingExpenses,
            employmentStatus,
            employmentDuration,
            educationLevel,
            employerName,
            employerAddress,
            employerCountry,
            jobTitle,
            workExperience,
            netIncome: parseFloat(netIncome.replace(/[^\d,\.]/g, '').replace(',', '.')),
            bonuses: parseFloat(bonuses.replace(/[^\d,\.]/g, '').replace(',', '.')),
            holidayPay: parseFloat(holidayPay.replace(/[^\d,\.]/g, '').replace(',', '.')),
            christmasBonus: parseFloat(christmasBonus.replace(/[^\d,\.]/g, '').replace(',', '.')),
            otherIncome,
            hasLoan,
            loanObligations: parseFloat(loanObligations.replace(/[^\d,\.]/g, '').replace(',', '.')),
            hasOverdraft,
            hasCreditCard,
            hasLeasing,
            hasExecution,
            inBankruptcy,
            latePayments,
            loanAmount: parseFloat(loanAmount.replace(/[^\d,\.]/g, '').replace(',', '.')),
            repaymentPeriod: parseInt(repaymentPeriod.match(/\d+/)?.[0] || '0'),
            consentStatement,
            finalStatement,
            age,
            isAdult,
            isEmployedOrRetired,
            isEmployed,
            isRetired,
        };
    
        console.log("rketsahirana data:", relevantInfo);
        setNeki([...neki, ""]);
        return relevantInfo;
    };
    
    //TO JE CHAT GPT NAREDU! kalkulacijo za starost
    const calculateAge = (birthDateString: string): number => {
        // Clean up the input date string
        const cleanDateString = birthDateString.replace(/\s/g, '');
        console.log('Cleaned Date String:', cleanDateString);
    
        // Split the date string into parts
        const parts = cleanDateString.split(/[.,\/]/).map(Number);
        console.log('Date Parts:', parts);
    
        // Ensure we have exactly 3 parts (day, month, year)
        if (parts.length !== 3 || parts.some(isNaN)) {
            console.error('Invalid date format:', birthDateString);
            return 0;
        }
    
        // Extract day, month, and year
        let [day, month, year] = parts;
    
        // Adjust for 2-digit year
        if (year < 100) {
            year += (year < 50 ? 2000 : 1900);
        }
    
        // Check if the year, month, and day are valid
        const birthDate = new Date(year, month - 1, day);
        if (birthDate.getFullYear() !== year || birthDate.getMonth() !== (month - 1) || birthDate.getDate() !== day) {
            console.error('Invalid date components:', { day, month, year });
            return 0;
        }
    
        // Calculate age
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
    
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
    
        // Ensure age is reasonable
        if (isNaN(age) || age < 0 || age > 120) {
            console.error('Calculated age is invalid:', age, 'for birth date:', birthDateString);
            return 0;
        }
    
        return age;
    };
    

    const processFiles = async (files: File[]) => {
        setLoading(true);
        setProgress(0);
        setNeki([]);

        // Process files
        for (const file of files) {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const text = e.target?.result;
                if (typeof text === 'string') {
                    console.log(`Text content for file ${file.name}:\n${text}`);
                    const relevantInfo = extractRelevantInfo(text);
                    updatePodatkiState(relevantInfo);
                    setNeki(prev => [...prev, "neki"]);
                }
            };
            reader.readAsText(file);
        }

        // Process pasted text
        if (pastedText) {
            console.log("Processing pasted text:");
            const relevantInfo = extractRelevantInfo(pastedText);
            updatePodatkiState(relevantInfo);
            setNeki(prev => [...prev, "neki"]);
        }

        setLoading(false);
        setProgress(100);
    };

    const updatePodatkiState = (relevantInfo: any) => {
        setPodatkiState({
            ...podatkiState,
            ime: relevantInfo.name,
            priimek: relevantInfo.surname,
            spol: relevantInfo.gender,
            emso: relevantInfo.emso,
            davcnaStevilka: relevantInfo.taxNumber,
            datumRojstva: relevantInfo.birthDate,
            krajRojstva: relevantInfo.birthPlace,
            drzavaRojstva: relevantInfo.birthCountry,
            drzavljanRS: relevantInfo.sloveniaCitizen,
            drugoDrzavljanstvo: relevantInfo.otherCitizen,
            vrstaOsebnegaDokumenta: relevantInfo.docType,
            stevilkaOsebnegaDokumenta: relevantInfo.docNumber,
            izdajateljDokumenta: relevantInfo.docIssuer,
            datumIzdaje: relevantInfo.issueDate,
            veljavnostDokumenta: relevantInfo.validUntil,
            transakcijskiRacun: relevantInfo.transactionAccount,
            banka: relevantInfo.bankName,
            politicnoIzpostavljen: relevantInfo.isPoliticallyExposed,
            naslov: relevantInfo.address,
            stalniNaslov: relevantInfo.address,
            zacasniNaslov: relevantInfo.temporaryAddress,
            mobilniTelefon: relevantInfo.mobilePhone,
            domaciTelefon: relevantInfo.homePhone,
            email: relevantInfo.email,
            bivanje: relevantInfo.residence,
            zakonskiStan: relevantInfo.maritalStatus,
            stevilkaOseb: relevantInfo.householdMembers,
            zaposlenUpokojenec: relevantInfo.employedOrRetiredMembers,
            steviloVzdrzevanih: relevantInfo.dependents,
            zivljenskiStroski: relevantInfo.livingExpenses,
            statusZaposlitve: relevantInfo.employmentStatus,
            dolzinaZaposlitve: relevantInfo.employmentDuration,
            stopnjaIzobrazbe: relevantInfo.educationLevel,
            delodajalec: relevantInfo.employerName,
            delodajalecNaslov: relevantInfo.employerAddress,
            delodajalecDrzava: relevantInfo.employerCountry,
            delovnoMesto: relevantInfo.jobTitle,
            delovnaDoba: relevantInfo.workExperience,
            netoPlaca: relevantInfo.netIncome,
            dodatki: relevantInfo.bonuses,
            regres: relevantInfo.holidayPay,
            bozicnica: relevantInfo.christmasBonus,
            drugiPrihodki: relevantInfo.otherIncome,
            bancniKredit: relevantInfo.hasLoan,
            mesecneObveznosti: relevantInfo.loanObligations,
            limitNaBanki: relevantInfo.hasOverdraft,
            kreditnaKartica: relevantInfo.hasCreditCard,
            leasing: relevantInfo.hasLeasing,
            izvrzba: relevantInfo.hasExecution,
            osebniStecaj: relevantInfo.inBankruptcy,
            zamudeKredit: relevantInfo.latePayments,
            zaproseniKredit: relevantInfo.loanAmount,
            rokVracila: relevantInfo.repaymentPeriod,
            privolitvenaIzjava: relevantInfo.consentStatement,
            koncnaIzjava: relevantInfo.finalStatement,
        });
        console.log("Updated PodatkiState:", podatkiState);
    };

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
                            accept="text/plain"
                            ref={inputRef}
                        />
                        {files.length > 0 && (
                            <button 
                                className="btn btn-sm w-100 mt-2"
                                style={{
                                    backgroundColor: '#41424c',
                                    color: '#fff',
                                    border: '1px solid #fff',
                                    fontSize: '1rem'
                                }} 
                                onClick={() => setFiles([])}
                            >
                                Odstrani vse datoteke
                            </button>
                        )}
                        <button className="btn btn-primary w-100 mt-2" onClick={() => inputRef.current?.click()}>
                            <img className='upload-logo' src={upload} alt="Upload"/>
                            Izberite Datoteke
                        </button>
                        <textarea
                            className="form-control mt-2"
                            placeholder="Prilepite besedilo tukaj..."
                            rows={5}
                            value={pastedText}
                            onChange={(e) => setPastedText(e.target.value)}
                        />
                        {!loading && (
                            <button 
                                className="btn btn-success w-100 mt-2" 
                                onClick={handleProcessFiles} 
                                disabled={(files.length === 0 && !pastedText) || loading}
                            >
                                Začnite z obdelavo
                            </button>
                        )}
                        {loading && (
                            <div className='obdelovanjeContainer mt-2'>
                                <button 
                                    className="btn btn-success w-100" 
                                    onClick={handleProcessFiles} 
                                    disabled={(files.length === 0 && !pastedText) || loading}
                                >
                                    Obdelovanje...<img className='sandClock-logo' src={sandClock} alt="Processing"/>
                                </button>
                            </div>
                        )}
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

