import { SteviloTocke } from "./ModulA";


export interface ModulB{
    SISBONneodplacanDelObveznostiRez:number;
    SISBONzapadliDolgRez:number;
    SISBONizterjavaRez:number;
    SISBONizvrsbaRez:number;
    SISBONomejitevUporabeTrrRez:number;
    SISBONneodplacanDelObveznosti:number;
    SISBONzapadliDolg:number;
    SISBONizterjava:number;
    SISBONizvrsba:number;
    skupneTocke:number;
}

export const SisbonNeoplacanDelObveznosti: SteviloTocke[] = [
    { stevilo: 0, tocke: 10 },
    { stevilo: 2, tocke: 9 },
    { stevilo: 4, tocke: 8 },
    { stevilo: 6, tocke: 7 },
    { stevilo: 8, tocke: 6 },
    { stevilo: 10, tocke: 5 },
    { stevilo: 15, tocke: 4 },
    { stevilo: 20, tocke: 3 },
    { stevilo: 25, tocke: 2 },
    { stevilo: 30, tocke: 1 },
    { stevilo: 35, tocke: 0 }
];

// SISBON - ZAPADLI DOLG / Rubljivi dohodki
export const SisbonZapadliDolg: SteviloTocke[] = [
    { stevilo: 0, tocke: 15 },
    { stevilo: 1, tocke: 10 },
    { stevilo: 2, tocke: 8 },
    { stevilo: 3, tocke: 6 },
    { stevilo: 4, tocke: 4 },
    { stevilo: 5, tocke: 3 },
    { stevilo: 6, tocke: 2 },
    { stevilo: 7, tocke: 1 },
    { stevilo: 8, tocke: 0 },
    { stevilo: 9, tocke: 0 },
    { stevilo: 10, tocke: 0 }
];

// SISBON - IZTERJAVA / Rubljivi dohodki
export const SisbonIzterjava: SteviloTocke[] = [
    { stevilo: 0, tocke: 15 },
    { stevilo: 1, tocke: 10 },
    { stevilo: 2, tocke: 8 },
    { stevilo: 3, tocke: 6 },
    { stevilo: 4, tocke: 4 },
    { stevilo: 5, tocke: 3 },
    { stevilo: 6, tocke: 2 },
    { stevilo: 7, tocke: 1 },
    { stevilo: 8, tocke: 0 },
    { stevilo: 9, tocke: 0 },
    { stevilo: 10, tocke: 0 }
];

// SISBON - IZVRŠBA / Rubljivi dohodki
export const SisbonIzvrsba: SteviloTocke[] = [
    { stevilo: 0, tocke: 15 },
    { stevilo: 1, tocke: 10 },
    { stevilo: 2, tocke: 8 },
    { stevilo: 3, tocke: 6 },
    { stevilo: 4, tocke: 4 },
    { stevilo: 5, tocke: 3 },
    { stevilo: 6, tocke: 2 },
    { stevilo: 7, tocke: 1 },
    { stevilo: 8, tocke: 0 },
    { stevilo: 9, tocke: 0 },
    { stevilo: 10, tocke: 0 }
];