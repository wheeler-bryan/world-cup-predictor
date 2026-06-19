import { Country } from "./countries.ts";
import { MatchupData } from "./seeding.ts";
import { countries } from "../Routes/MakePicks.tsx"

const groupA: Country[] = countries[0];
// const groupB: Country[] = countries[1];
// const groupC: Country[] = countries[2];
// const groupD: Country[] = countries[3];
// const groupE: Country[] = countries[4];
// const groupF: Country[] = countries[5];
// const groupG: Country[] = countries[6];
// const groupH: Country[] = countries[7];
// const groupI: Country[] = countries[8];
// const groupJ: Country[] = countries[9];
// const groupK: Country[] = countries[10];
// const groupL: Country[] = countries[11];
const fakeCountry: Country = new Country("Fake ahh", "B3D", "Peter");

export class BracketRow {
    name: string;
    group_stage: Country[][];         // 12 groups, each [1st, 2nd, 3rd, 4th]
    round_of_32: MatchupData[];  // 12 slots, nulls where team didn't advance
    round_of_16: MatchupData[];
    quarterfinals: MatchupData[];
    semifinals: MatchupData[];
    finals: MatchupData;
    champion: Country;
    golden_boot: string;
    group_stage_points: number;
    round_of_32_points: number;
    round_of_16_points: number;
    quarterfinals_points: number;
    semifinals_points: number;
    champion_points: number;
    golden_boot_points: number;
    total_points: number;

    constructor(
        name: string,
        group_stage: Country[][],         // 12 groups, each [1st, 2nd, 3rd, 4th]
        round_of_32: MatchupData[],  // 12 slots, nulls where team didn't advance
        round_of_16: MatchupData[],
        quarterfinals: MatchupData[],
        semifinals: MatchupData[],
        finals: MatchupData,
        champion: Country,
        golden_boot: string,
    ) {
        this.name = name;
        this.group_stage = group_stage;
        this.round_of_32 = round_of_32;
        this.round_of_16 = round_of_16;
        this.quarterfinals = quarterfinals;
        this.semifinals = semifinals;
        this.finals = finals;
        this.champion = champion;
        this.golden_boot = golden_boot;
        this.group_stage_points = 0;
        this.round_of_32_points = 0;
        this.round_of_16_points = 0;
        this.quarterfinals_points = 0;
        this.semifinals_points = 0;
        this.champion_points = 0;
        this.golden_boot_points = 0;
        this.total_points = 0;
    }

    score_bracket(): void {
        this.group_stage_points = score_group_stage(this.group_stage, this.round_of_32);
        this.round_of_32_points = score_round_of_32(this.round_of_16);
        this.round_of_16_points = score_round_of_16(this.quarterfinals);
        this.quarterfinals_points = score_quarterfinals(this.semifinals);
        this.semifinals_points = score_semifinals(this.finals);
        this.champion_points = score_champion(this.champion);
        this.golden_boot_points = score_golden_boot(this.golden_boot);
        this.total_points = this.group_stage_points + this.round_of_32_points + this.round_of_16_points + this.quarterfinals_points + this.semifinals_points + this.champion_points + this.golden_boot_points;
    }
}

export const groupStageResults: Country[][] = [
    [groupA[0], fakeCountry, fakeCountry, fakeCountry],
    [fakeCountry, fakeCountry, fakeCountry, fakeCountry],
    [fakeCountry, fakeCountry, fakeCountry, fakeCountry],
    [fakeCountry, fakeCountry, fakeCountry, fakeCountry],
    [fakeCountry, fakeCountry, fakeCountry, fakeCountry],
    [fakeCountry, fakeCountry, fakeCountry, fakeCountry],
    [fakeCountry, fakeCountry, fakeCountry, fakeCountry],
    [fakeCountry, fakeCountry, fakeCountry, fakeCountry],
    [fakeCountry, fakeCountry, fakeCountry, fakeCountry],
    [fakeCountry, fakeCountry, fakeCountry, fakeCountry],
    [fakeCountry, fakeCountry, fakeCountry, fakeCountry],
    [fakeCountry, fakeCountry, fakeCountry, fakeCountry],
];

export const advancingThird: Country[] = [
    fakeCountry, fakeCountry, fakeCountry, fakeCountry, fakeCountry, fakeCountry, fakeCountry, fakeCountry
]

function score_third_place(ro32: MatchupData[]): number {
    let total_score: number = 0;

    const third_place_countries: Country[] = [
      ro32[1].away!, ro32[4].away!, ro32[6].away!, ro32[7].away!, ro32[8].away!, ro32[9].away!, ro32[12].away!, ro32[14].away!
    ];
    for (const country of third_place_countries) {
        const inAdvancingThird = advancingThird.some(c => c.name === country.name); // check if correctly third
        const inTop2 = groupStageResults.some(c => // check if performed better
            c[0].name === country.name || c[1].name === country.name
        );
        if (inAdvancingThird || inTop2) { // if either grant points
            total_score += 2;
        }
    }
    return(total_score);
}

function score_group_stage(gs: Country[][], ro32: MatchupData[]): number {
    let total_points: number = 0;

    for (const [i,group] of gs.entries()) {
        const top_2: Country[] = group.slice(0,2);

        for (const [j,country] of top_2.entries()) { // for top two selected countries

            if (country.name == groupStageResults[i][j].name) { // if nation in correct spot, add 4 points!
                total_points += 4
            } else if (top_2[1 - j].name === groupStageResults[i][j].name) { // nation in top 2 but wrong spot
                console.log(groupStageResults[i][1 - j].name + " WR")
                total_points += 2;
            } else if (advancingThird.some(c => c.name === country.name)) {
                total_points += 2;
            }
        }
    }
    return(total_points + score_third_place(ro32));
}

const winners_round_of_32: Country[] = [
    fakeCountry, fakeCountry, fakeCountry, fakeCountry, fakeCountry, fakeCountry, fakeCountry, fakeCountry, fakeCountry, fakeCountry, fakeCountry, fakeCountry, fakeCountry, fakeCountry, fakeCountry, fakeCountry
]

function score_round_of_32(ro16: MatchupData[]): number {
    const selectedCountries: Country[] = ro16.map(m => [m.home!, m.away!]).flat();
    let total_score: number = 0;
    for (const country of selectedCountries) {
        if (winners_round_of_32.some(c => c.name === country.name)) {
            total_score += 5;
        }
    }
    return(total_score);
}

const winners_round_of_16: Country[] = [
    fakeCountry, fakeCountry, fakeCountry, fakeCountry, fakeCountry, fakeCountry, fakeCountry, fakeCountry
]

function score_round_of_16(qf: MatchupData[]): number {
    const selectedCountries: Country[] = qf.map(m => [m.home!, m.away!]).flat();
    let total_score: number = 0;
    for (const country of selectedCountries) {
        if (winners_round_of_16.some(c => c.name === country.name)) {
            total_score += 10;
        }
    }
    return(total_score);
}

const winners_qf: Country[] = [
    fakeCountry, fakeCountry, fakeCountry, fakeCountry
]

function score_quarterfinals(sf: MatchupData[]): number {
    const selectedCountries: Country[] = sf.map(m => [m.home!, m.away!]).flat();
    let total_score: number = 0;
    for (const country of selectedCountries) {
        if (winners_qf.some(c => c.name === country.name)) {
            total_score += 15;
        }
    }
    return(total_score);
}

const winners_sf: Country[] = [
    fakeCountry, fakeCountry
]

function score_semifinals(f: MatchupData): number {
    const selectedCountries: Country[] = [f.home!, f.away!]
    let total_score: number = 0;
    for (const country of selectedCountries) {
        if (winners_sf.some(c => c.name === country.name)) {
            total_score += 25;
        }
    }
    return(total_score);
}

const champion: Country = fakeCountry;

function score_champion(c: Country): number {
    let total_score: number = 0;
    if (champion.name === c.name) {
        total_score = 50;
    }
    return(total_score);
}

const golden_boot: string = "Bryan Wheeler";

function score_golden_boot(gb: string): number {
    let total_score: number = 0;
    if (golden_boot === gb) {
        total_score = 20;
    }
    return(total_score);
}
