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
    ["/flags/mx.svg", "/flags/kr.svg", "/flags/za.svg", "/flags/cz.svg"],
    ["/flags/ca.svg", "/flags/ch.svg", "/flags/qa.svg", "/flags/ba.svg"],
    ["/flags/br.svg", "/flags/ma.svg", "/flags/gb-sct.svg", "/flags/ht.svg"],
    ["/flags/us.svg", "/flags/py.svg", "/flags/au.svg", "/flags/tr.svg"],
    ["/flags/de.svg", "/flags/ec.svg", "/flags/ci.svg", "/flags/cw.svg"],
    ["/flags/nl.svg", "/flags/jp.svg", "/flags/tn.svg", "/flags/se.svg"],
    ["/flags/be.svg", "/flags/ir.svg", "/flags/eg.svg", "/flags/nz.svg"],
    ["/flags/es.svg", "/flags/uy.svg", "/flags/sa.svg", "/flags/cv.svg"],
    ["/flags/fr.svg", "/flags/sn.svg", "/flags/no.svg", "/flags/iq.svg"],
    ["/flags/ar.svg", "/flags/at.svg", "/flags/dz.svg", "/flags/jo.svg"],
    ["/flags/pt.svg", "/flags/co.svg", "/flags/uz.svg", "/flags/cd.svg"],
    ["/flags/gb-eng.svg", "/flags/cr.svg", "/flags/pa.svg", "/flags/gh.svg"]
];