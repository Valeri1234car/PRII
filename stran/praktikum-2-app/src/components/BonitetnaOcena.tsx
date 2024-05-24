import { useContext, useEffect } from "react";
import { PodatkiContext } from "../App";
// import { Izobrazba } from "../interface/ModulA";
import { ModulA, LikvidnostNeizvrseniTrajniNalogi, LikvidnostBancniPoboti,LikvidnostStIzvrsbTRR,BonitetaDelodajalca, Izobrazba } from '../interface/ModulA';
import { ModulB, SisbonNeoplacanDelObveznosti,SisbonZapadliDolg,SisbonIzterjava,SisbonIzvrsba } from '../interface/ModulB';
import { ModulC } from '../interface/ModulC';


const BonitetnaOcena = () =>{

    const {podatkiState, setPodatkiState, setStran, modulA, setModula, modulB, setModulB, modulC,setModulC} = useContext(PodatkiContext);

    
    //----------------------------------bonitetna ocena------

    useEffect(()=>{

        let likvidnostNeizvrseniTrajniNalogiRez=0
        let likvidnostBancniPobotiRez=0
        let likvidnostStIzvrsbTRRRez=0
        let razmerjeObveznostiKreditiDohodkiRez=0
        let presezekDohodkovNerubljivRez=0
        let lastnistvoNepremicnineRez= podatkiState.lastnistnovNepremicnin ? 6 : 0;
        let bonitetaDelodajalcaRez=0
        let zaposlitevPartnerjaRez=podatkiState.partnerZaposlen ? 3 : 0;
        let izobrazbaRez=0
        let razmerjeObveznostiKreditiDohodki=0
        let presezekDohodkovNerubljiv= podatkiState.znesekPrejemkovPokojnina.povprecje +podatkiState.znesekDrugihPrejemkov.povprecje - podatkiState.nerubljiviDohodek
        

        LikvidnostNeizvrseniTrajniNalogi.forEach(element => {
            if(element.stevilo == podatkiState.stNeizvrsenihTrajnihNalogov.povprecje){
                likvidnostNeizvrseniTrajniNalogiRez = element.tocke;
            }
        });
        LikvidnostBancniPoboti.forEach(element => {
            if(element.stevilo == podatkiState.stBancnihPobotov.povprecje){
                likvidnostBancniPobotiRez = element.tocke;
            }
        });
        LikvidnostStIzvrsbTRR.forEach(element => {
            if(element.stevilo == podatkiState.stIzvrsbNaTrr.povprecje){
                likvidnostStIzvrsbTRRRez = element.tocke;
            }
        });

        BonitetaDelodajalca.forEach(element => {
            if(element.stevilo == podatkiState.bonitetnaOcenaDelodajalca){
                bonitetaDelodajalcaRez = element.tocke;
            }
        });

        Izobrazba.forEach(element => {
            if(element.izobrazba == podatkiState.izobrazba){
                izobrazbaRez = element.tocke;
            }
        });

        
        const skupajTock = (likvidnostNeizvrseniTrajniNalogiRez + likvidnostBancniPobotiRez + likvidnostStIzvrsbTRRRez +razmerjeObveznostiKreditiDohodkiRez
             + presezekDohodkovNerubljivRez + lastnistvoNepremicnineRez + bonitetaDelodajalcaRez + zaposlitevPartnerjaRez + izobrazbaRez)
        


        setModula(
            {
                ...modulA,
                likvidnostNeizvrseniTrajniNalogiRez:likvidnostNeizvrseniTrajniNalogiRez,
                likvidnostBancniPobotiRez:likvidnostBancniPobotiRez,
                likvidnostStIzvrsbTRRRez:likvidnostStIzvrsbTRRRez,
                razmerjeObveznostiKreditiDohodkiRez:razmerjeObveznostiKreditiDohodkiRez,
                presezekDohodkovNerubljivRez: presezekDohodkovNerubljivRez,
                lastnistvoNepremicnineRez:lastnistvoNepremicnineRez,
                bonitetaDelodajalcaRez:bonitetaDelodajalcaRez,
                zaposlitevPartnerjaRez:zaposlitevPartnerjaRez,
                izobrazbaRez:izobrazbaRez,
                razmerjeObveznostiKreditiDohodki:0,  // -----to dvoje se rabim
                presezekDohodkovNerubljiv: 0,     //--------
                skupnoTock:skupajTock,


            }
        )

    },[podatkiState.stNeizvrsenihTrajnihNalogov,podatkiState.stBancnihPobotov, podatkiState.stIzvrsbNaTrr, podatkiState.lastnistnovNepremicnin,podatkiState.bonitetnaOcenaDelodajalca, podatkiState.partnerZaposlen,podatkiState.izobrazba,podatkiState.nerubljiviDohodek, podatkiState.znesekDrugihPrejemkov.povprecje, podatkiState.znesekPrejemkovPokojnina.povprecje])

    useEffect(()=>{
        let neodplacanDel = 0;
        let zapadliDolg = 0;
        let izterjava = 0;
        let izvrsba = 0;

        


    if(podatkiState.rubljiviDohodek != 0){
        if(podatkiState.sisbonNeodplacanDelObvezost != 0){
            neodplacanDel = (podatkiState.sisbonNeodplacanDelObvezost / podatkiState.rubljiviDohodek); //----tole ga neki biksa
        }
        if(podatkiState.sisbonZapadliDolg != 0){
            zapadliDolg = podatkiState.sisbonZapadliDolg / podatkiState.rubljiviDohodek;
        }
        if(podatkiState.sisbonIzterjava != 0){
            izterjava = podatkiState.sisbonIzterjava / podatkiState.rubljiviDohodek;
        }
        if(podatkiState.sisbonIzvrsba != 0){
            izvrsba = podatkiState.sisbonIzvrsba / podatkiState.rubljiviDohodek;
        }
        
    }


    let neodplacanDelRez = 0;
    let zapadliDolgRez = 0;
    let izterjavaRez = 0;
    let izvrsbaRez = 0;

    const omejitevTRRrez = podatkiState.sisbonOmejitevTRR ? 0 : 30; 

    SisbonNeoplacanDelObveznosti.forEach(element => {
        if(element.stevilo <= neodplacanDel){
            neodplacanDelRez = element.tocke;
            
        }
    });

    SisbonZapadliDolg.forEach(element => {
        if(element.stevilo <= zapadliDolg){
            zapadliDolgRez = element.tocke;
        }
    });

    SisbonIzterjava.forEach(element => {
        if(element.stevilo <= izterjava){
            izterjavaRez = element.tocke;
        }
    });

    SisbonIzvrsba.forEach(element => {
        if(element.stevilo <= izvrsba){
            izvrsbaRez = element.tocke;
        }
    });

    const skupaj = ( neodplacanDelRez + zapadliDolgRez + izterjavaRez + izvrsbaRez + omejitevTRRrez)

    setModulB({
        ...modulB,
        SISBONneodplacanDelObveznostiRez:neodplacanDelRez,
        SISBONzapadliDolgRez:zapadliDolgRez,
        SISBONizterjavaRez:izterjavaRez,
        SISBONizvrsbaRez:izvrsbaRez,
        SISBONomejitevUporabeTrrRez:omejitevTRRrez,
        SISBONneodplacanDelObveznosti:neodplacanDel,
        SISBONzapadliDolg:zapadliDolg,
        SISBONizterjava:izterjava,
        SISBONizvrsba:izvrsba,
        skupneTocke:skupaj,
    })


    },[podatkiState.rubljiviDohodek, podatkiState.sisbonIzterjava,podatkiState.sisbonIzvrsba,podatkiState.sisbonNeodplacanDelObvezost, podatkiState.sisbonOmejitevTRR, podatkiState.sisbonZapadliDolg])


    useEffect(()=>{
       setModulC({
        ...modulC,
        skupnoTockovanje: (modulA.skupnoTock * modulC.ponder) + (modulB.skupneTocke * (1 - modulC.ponder))
       }) 
    },[modulA.skupnoTock,modulB.skupneTocke,modulC.ponder])


    return(
        
        
        <div className="container" style={{ borderColor: 'black', color: 'black', background: "white" }}>
            <h1>Bonitetna ocena Tockovanje</h1>
                <div className="moduli" style={{ borderColor: 'black', color: 'black'}}>
                    <div className="modulA">
                        <table className="table table-striped table-dark" style={{ borderColor: 'black'}}>
                        <thead>
                        
                            <tr>
                                <th className="col">MODUL A</th>
                                <th className="col">Vrednost</th>
                                <th className="col">Max</th>
                                <th className="col">Rezultati</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Likvidnost: prihaja do neizvršenih trajnih nalogov</td>
                                <td>{podatkiState.stNeizvrsenihTrajnihNalogov.povprecje}</td>
                                <td>10</td>
                                <td>{modulA.likvidnostNeizvrseniTrajniNalogiRez}</td>
                            </tr>
                            <tr>
                                <td>Likvidnost: prihaja do bančnih pobotov</td>
                                <td>{podatkiState.stBancnihPobotov.povprecje}</td>
                                <td>10</td>
                                <td>{modulA.likvidnostBancniPobotiRez}</td>
                            </tr>
                            <tr>
                                <td>Likvidnost: prihaja do izvršb na TRR</td>
                                <td>{podatkiState.stIzvrsbNaTrr.povprecje}</td>
                                <td>10</td>
                                <td>{modulA.likvidnostStIzvrsbTRRRez}</td>
                            </tr>
                            <tr>
                                <td>Razmerje med mesečnimi obveznostmi za kredite in mesečnimi dohodki</td>
                                <td>{modulA.razmerjeObveznostiKreditiDohodki}</td>
                                <td>30</td>
                                <td>{modulA.razmerjeObveznostiKreditiDohodkiRez}</td>
                            </tr>
                            <tr>
                                <td>Presežek (primanjkljaj) dohodkov nad nerubljivim zneskom</td>
                                <td>{modulA.presezekDohodkovNerubljiv}</td>
                                <td>10</td>
                                <td>{modulA.presezekDohodkovNerubljivRez}</td>
                            </tr>
                            <tr>
                                <td>Lastništvo / solastništvo nepremičnine</td>
                                <td>{podatkiState.lastnistnovNepremicnin ? "DA":"NE"}</td>
                                <td>6</td>
                                <td>{modulA.lastnistvoNepremicnineRez}</td>
                            </tr>
                            <tr>
                                <td>Boniteta delodajalca</td>
                                <td>{podatkiState.bonitetnaOcenaDelodajalca}</td>
                                <td>4</td>
                                <td>{modulA.bonitetaDelodajalcaRez}</td>
                            </tr>
                            <tr>
                                <td>Zaposlitev partnerja</td>
                                <td>{podatkiState.partnerZaposlen ? "DA":"NE"}</td>
                                <td>3</td>
                                <td>{modulA.zaposlitevPartnerjaRez}</td>
                            </tr>
                            <tr>
                                <td>Izobrazba</td>
                                <td>{podatkiState.izobrazba}</td>
                                <td>2</td>
                                <td>{modulA.izobrazbaRez}</td>
                            </tr>
                            <tr>
                                <th>SKUPAJ MODUL A</th>
                                <td></td>
                                <th>85</th>
                                <td>{modulA.skupnoTock}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="modulB">
                    <table className="table table-striped table-dark" style={{ borderColor: 'black', color: 'black'}}>
                    <thead>
                            <tr>
                                <th>MODUL B</th>
                                <th>Vrednost</th>
                                <th>Max</th>
                                <th>Rezultati</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>SISBON - NEODPLAČAN DEL OBVEZNOSTI / Rubljivi dohodki</td>
                                <td>{modulB.SISBONneodplacanDelObveznosti}</td>
                                <td>10</td>
                                <td>{modulB.SISBONneodplacanDelObveznostiRez}</td>
                            </tr>
                            <tr>
                                <td>SISBON - ZAPADLI DOLG / Rubljivi dohodki</td>
                                <td>{modulB.SISBONzapadliDolg}</td>
                                <td>15</td>
                                <td>{modulB.SISBONzapadliDolgRez}</td>
                            </tr>
                            <tr>
                                <td>SISBON - IZTERJAVA / Rubljivi dohodki</td>
                                <td>{modulB.SISBONizterjava}</td>
                                <td>15</td>
                                <td>{modulB.SISBONizterjavaRez}</td>
                            </tr>
                            <tr>
                                <td>SISBON - IZVRŠBA / Rubljivi dohodki</td>
                                <td>{modulB.SISBONizvrsba}</td>
                                <td>15</td>
                                <td>{modulB.SISBONizvrsbaRez}</td>
                            </tr>
                            <tr>
                                <td>SISBON - OMEJITEV UPORABE TRR</td>
                                <td>{podatkiState.sisbonOmejitevTRR ? "DA":"NE"}</td>
                                <td>30</td>
                                <td>{modulB.SISBONomejitevUporabeTrrRez}</td>
                            </tr>
                            <tr>
                                <th>SKUPAJ MODUL B</th>
                                <td></td>
                                <th>85</th>
                                <td>{modulB.skupneTocke}</td>
                            </tr>
                            </tbody>
                            
                        </table>
                    </div>
                     <div className="modulA+B">
                        <table className="table table-striped table-dark">
                            <thead>
                            <tr>
                                <th className="col">MODUL A IN MODUL B (PONDERIRANO)</th>
                                <td className="col">{modulC.ponder}</td>
                                <td className="col"></td>
                                <th className="col">{modulC.skupnoTockovanje}</th>
                            </tr>
                            </thead>
                        </table>
                    </div>
            </div>
            
        </div>
        
    )
}

export default BonitetnaOcena;