export class Country {
    name: string;
    abbreviation: string;
    flag: string;
    active: boolean;

    constructor(name: string, abbreviation: string, flag: string) {
        this.name = name;
        this.abbreviation = abbreviation;
        this.flag = flag;
        this.active = false;
    }
}

export const letters: string[] = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'
];

export const groups: string[][] = [
    ["Mexico", "South Korea", "South Africa", "Czech Republic"],
    ["Canada", "Switzerland", "Qatar", "Bosnia-Herzegovina"],
    ["Brazil", "Morocco", "Scotland", "Haiti"],
    ["United States", "Paraguay", "Australia", "Turkey"],
    ["Germany", "Ecuador", "Ivory Coast", "Curacao"],
    ["Netherlands", "Japan", "Tunisia", "Sweden"],
    ["Belgium", "Iran", "Egypt", "New Zealand"],
    ["Spain", "Uruguay", "Saudi Arabia", "Cape Verde"],
    ["France", "Senegal", "Norway", "Iraq"],
    ["Argentina", "Austria", "Algeria", "Jordan"],
    ["Portugal", "Colombia", "Uzbekistan", "DR Congo"],
    ["England", "Croatia", "Panama", "Ghana"]
];

export const abbreviations: string[][] = [
    ["MEX", "KOR", "RSA", "CZE"],
    ["CAN", "SUI", "QAT", "BIH"],
    ["BRA", "MOR", "SCO", "HAI"],
    ["USA", "PAR", "AUS", "TUR"],
    ["GER", "ECU", "CIV", "CUW"],
    ["NED", "JPN", "TUN", "SWE"],
    ["BEL", "IRN", "EGY", "NZL"],
    ["SPA", "URU", "SAU", "CPV"],
    ["FRA", "SEN", "NOR", "IRQ"],
    ["ARG", "AUT", "ALG", "JOR"],
    ["POR", "COL", "UZB", "COD"],
    ["ENG", "CRO", "PAN", "GHA"]
];

export const flags: string[][] = [
    ["../src/assets/flags/mx.svg", "../src/assets/flags/kr.svg", "../src/assets/flags/za.svg", "../src/assets/flags/cz.svg"],
    ["../src/assets/flags/ca.svg", "../src/assets/flags/ch.svg", "../src/assets/flags/qa.svg", "../src/assets/flags/ba.svg"],
    ["../src/assets/flags/br.svg", "../src/assets/flags/ma.svg", "../src/assets/flags/gb-sct.svg", "../src/assets/flags/ht.svg"],
    ["../src/assets/flags/us.svg", "../src/assets/flags/py.svg", "../src/assets/flags/au.svg", "../src/assets/flags/tr.svg"],
    ["../src/assets/flags/de.svg", "../src/assets/flags/ec.svg", "../src/assets/flags/ci.svg", "../src/assets/flags/cw.svg"],
    ["../src/assets/flags/nl.svg", "../src/assets/flags/jp.svg", "../src/assets/flags/tn.svg", "../src/assets/flags/se.svg"],
    ["../src/assets/flags/be.svg", "../src/assets/flags/ir.svg", "../src/assets/flags/eg.svg", "../src/assets/flags/nz.svg"],
    ["../src/assets/flags/es.svg", "../src/assets/flags/uy.svg", "../src/assets/flags/sa.svg", "../src/assets/flags/cv.svg"],
    ["../src/assets/flags/fr.svg", "../src/assets/flags/sn.svg", "../src/assets/flags/no.svg", "../src/assets/flags/iq.svg"],
    ["../src/assets/flags/ar.svg", "../src/assets/flags/at.svg", "../src/assets/flags/dz.svg", "../src/assets/flags/jo.svg"],
    ["../src/assets/flags/pt.svg", "../src/assets/flags/co.svg", "../src/assets/flags/uz.svg", "../src/assets/flags/cd.svg"],
    ["../src/assets/flags/gb-eng.svg", "../src/assets/flags/cr.svg", "../src/assets/flags/pa.svg", "../src/assets/flags/gh.svg"]
];