export interface Promet{
    t1:number;
    t2:number;
    t3:number;
    povprecje:number;
}

export interface Podatki{
    //------Osebni podatki---------------
    ime:string;
    priimek:string;
    naslov:string;
    datumRojstva:Date;
    starost:number;
    // ------ Izpolnjevanje osnvnih kriterijev--------
    drzavljanRS: boolean;
    starost18:boolean;
    stecajniPostopekNI:boolean;
    zaposlenUpokojenec:boolean;
    //---------Kredit---minilon
    zaproseniKredit:number;
    rokVracila:number;
    mesecnaAmuniteta:number;
    //------------------------podatki o zaposlitiv
    delodajalec:string;
    bonitetnaOcenaDelodajalca:number;
    //----financnipodatki-----
    mesecniPrometDobro:Promet;
    mesecniPrometBreme:Promet;
    stanjeTRR:Promet;
    znesekPrejemkovPokojnina:Promet;
    znesekDrugihPrejemkov:Promet;
    mesecniZnesekZaOdplacilodrugihKreditov:Promet;
    stNeizvrsenihTrajnihNalogov:Promet;
    stBancnihPobotov:Promet;
    stIzvrsbNaTrr:Promet;
    rubljiviDohodek:number;
    nerubljiviDohodek:number;
    dohodkiPoPlaciluStarga:number;
    dohodkiPoPlaciluVsega:number;
    //-------drugi podatki ------
    izobrazba:string;
    lastnistnovNepremicnin: boolean;
    stVzdrzevanihDruzinskihClanov:number;
    partnerZaposlen:boolean;
    samohranilec:boolean;
    zavezanecNaPrezivnin:boolean;
    znesekMesecnePrezivnine:number;
    sumljivost:boolean;

    //-----podatkiSisbon-----

    sisbonNeodplacanDelObvezost:number;
    sisbonZapadliDolg:number;
    sisbonIzterjava:number;
    sisbonIzvrsba:number;
    sisbonOmejitevTRR:boolean;
}

