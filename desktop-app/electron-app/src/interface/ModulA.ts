export interface ModulA{
    likvidnostNeizvrseniTrajniNalogiRez:number;
    likvidnostBancniPobotiRez:number;
    likvidnostStIzvrsbTRRRez:number;
    razmerjeObveznostiKreditiDohodkiRez:number;
    presezekDohodkovNerubljivRez: number;
    lastnistvoNepremicnineRez:number;
    bonitetaDelodajalcaRez:number;
    zaposlitevPartnerjaRez:number;
    izobrazbaRez:number;

    //----------- tocke
    // likvidnostNeizvrseniTrajniNalogiRez:number;
    // likvidnostBancniPobotiRez:number;
    // likvidnostStIzvrsbTRRRez:number;
    razmerjeObveznostiKreditiDohodki:number;
    presezekDohodkovNerubljiv: number;
    // lastnistvoNepremicnineRez:number;
    // bonitetaDelodajalcaRez:number;
    // zaposlitevPartnerjaRez:number;
    // izobrazbaRez:number;
    //------vse tocke
    skupnoTock:number;
}




export interface SteviloTocke{
stevilo:number;
tocke:number;
}

export interface IzobrazbaTocke{
    izobrazba:string;
    tocke:number;
    }

export const LikvidnostNeizvrseniTrajniNalogi:SteviloTocke[] =[
    {stevilo:0,tocke:10},
    {stevilo:1,tocke:5},
    {stevilo:2,tocke:2},
    {stevilo:3,tocke:1},
    {stevilo:4,tocke:0},
    {stevilo:5,tocke:0},
    {stevilo:6,tocke:0}
]

export const LikvidnostBancniPoboti:SteviloTocke[] =[
    {stevilo:0,tocke:10},
    {stevilo:1,tocke:4},
    {stevilo:2,tocke:2},
    {stevilo:3,tocke:1},
    {stevilo:4,tocke:0},
    {stevilo:5,tocke:0},
    {stevilo:6,tocke:0}
]

export const LikvidnostStIzvrsbTRR:SteviloTocke[] =[
    {stevilo:0,tocke:10},
    {stevilo:1,tocke:4},
    {stevilo:2,tocke:2},
    {stevilo:3,tocke:1},
    {stevilo:4,tocke:0},
    {stevilo:5,tocke:0},
    {stevilo:6,tocke:0}
]

export const RazmerjeDohodkiRubljivi:SteviloTocke[] =[
    {stevilo:-1000,tocke:0},
    {stevilo:100,tocke:2},
    {stevilo:200,tocke:3},
    {stevilo:300,tocke:4},
    {stevilo:400,tocke:5},
    {stevilo:500,tocke:6},
    {stevilo:750,tocke:7},
    {stevilo:1000,tocke:8},
    {stevilo:1500,tocke:9},
    {stevilo:2000,tocke:10}
]

export const BonitetaDelodajalca:SteviloTocke[] =[
    {stevilo:0,tocke:0},
    {stevilo:1,tocke:0},
    {stevilo:2,tocke:0},
    {stevilo:3,tocke:0},
    {stevilo:4,tocke:0},
    {stevilo:5,tocke:0},
    {stevilo:6,tocke:1},
    {stevilo:7,tocke:2},
    {stevilo:8,tocke:3},
    {stevilo:9,tocke:4},
    {stevilo:10,tocke:4}
]

export const Izobrazba:IzobrazbaTocke[] =[
    {izobrazba:"Osnovnosolška ali manj",tocke:0},
    {izobrazba:"Poklicna",tocke:1},
    {izobrazba:"Srednješolska",tocke:1},
    {izobrazba:"Višješolska",tocke:2},
    {izobrazba:"Visokošolska",tocke:2},
]

