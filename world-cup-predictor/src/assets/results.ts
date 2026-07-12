import { Country } from "./countries.ts";
import { MatchupData } from "./seeding.ts";
import { countries } from "../Routes/MakePicks.tsx"

const groupA: Country[] = countries[0];
const groupB: Country[] = countries[1];
const groupC: Country[] = countries[2];
const groupD: Country[] = countries[3];
const groupE: Country[] = countries[4];
const groupF: Country[] = countries[5];
const groupG: Country[] = countries[6];
const groupH: Country[] = countries[7];
const groupI: Country[] = countries[8];
const groupJ: Country[] = countries[9];
const groupK: Country[] = countries[10];
const groupL: Country[] = countries[11];
const fakeCountry: Country = new Country("placeholder", "B3D", "Peter");

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
    group_stage_points: [number, number];
    round_of_32_points: [number, number];
    round_of_16_points: [number, number];
    quarterfinals_points: [number, number];
    semifinals_points: [number, number];
    champion_points: [number, number];
    golden_boot_points: [number, number];
    total_points: number;
    max_points: number;
    point_details: Map<string, number>;

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
        this.group_stage_points = [0,0];
        this.round_of_32_points = [0,0];
        this.round_of_16_points = [0,0];
        this.quarterfinals_points = [0,0];
        this.semifinals_points = [0,0];
        this.champion_points = [0,0];
        this.golden_boot_points = [0,0];
        this.total_points = 0;
        this.max_points = 452;
        this.point_details = new Map<string, number>();
    }

    score_bracket(): void {

        this.group_stage_points = score_group_stage(this.group_stage, this.round_of_32, this.name, this.point_details);
        this.round_of_32_points = score_round_of_32(this.round_of_16, this.name);
        this.round_of_16_points = score_round_of_16(this.quarterfinals);
        this.quarterfinals_points = score_quarterfinals(this.semifinals);
        this.semifinals_points = score_semifinals(this.finals);
        this.champion_points = score_champion(this.champion);
        this.golden_boot_points = score_golden_boot(this.golden_boot);

        this.total_points = this.group_stage_points[0] + this.round_of_32_points[0] + this.round_of_16_points[0] + this.quarterfinals_points[0] + this.semifinals_points[0] + this.champion_points[0] + this.golden_boot_points[0];
        this.max_points = 452 - this.group_stage_points[1] - this.round_of_32_points[1] - this.round_of_16_points[1] - this.quarterfinals_points[1] - this.semifinals_points[1] - this.champion_points[1] - this.golden_boot_points[1];
    }
}

const groupStageResults: Country[][] = [
    [groupA[0], groupA[2], groupA[1], groupA[3]],
    [groupB[1], groupB[0], groupB[3], groupB[2]],
    [groupC[0], groupC[1], groupC[2], groupC[3]],
    [groupD[0], groupD[2], groupD[1], groupD[3]],
    [groupE[0], groupE[2], groupE[1], groupE[3]],
    [groupF[0], groupF[1], groupF[3], groupF[2]],
    [groupG[0], groupG[2], groupG[1], groupG[3]],
    [groupH[0], groupH[3], groupH[1], groupH[2]],
    [groupI[0], groupI[2], groupI[1], groupI[3]],
    [groupJ[0], groupJ[1], groupJ[2], groupJ[3]],
    [groupK[1], groupK[0], groupK[3], groupK[2]],
    [groupL[0], groupL[1], groupL[3], groupL[2]],
];

const advancingThird: Country[] = [
    groupB[3], groupE[1], groupF[3], groupD[1], groupI[1], groupL[3], groupK[3], groupJ[2]
]

const eliminated = [groupStageResults.map(c => c[3]), [groupH[1], groupC[2], groupA[1], groupG[1]]].flat();

function score_group_stage(gs: Country[][], ro32: MatchupData[], name: string, details: Map<string, number>): [number, number] {
    let total_points: number = 0;
    let max_point_deduction: number = 0;
    const third_place_countries: Country[] = [
        ro32[1].away!, ro32[4].away!, ro32[6].away!, ro32[7].away!, ro32[8].away!, ro32[9].away!, ro32[12].away!, ro32[14].away!
    ];

    for (const [i,group] of groupStageResults.entries()) {
        const top_2: Country[] = group.slice(0,2);

        for (const [j,country] of top_2.entries()) { // for top two actual
            if (country.name === "placeholder") continue; // not implemented yet

            if (country.name === gs[i][j].name) { // if nation in correct spot, add 4 points!
                total_points += 4;
                if (name === "Bryan") {console.log(`${country.name} +4`)}
                details.set(country.name, 4);
            } else if (country.name === gs[i][Number(!j)].name) { // nation in top 2 but wrong spot
                total_points += 2;
                max_point_deduction += 2;
                details.set(country.name, 2);
                if (name === "Bryan") {console.log(`${country.name} +2, -2, right nation wrong spot`)}
            } else if (third_place_countries.some(c => c.name === country.name)) { // projected third place nation advancing in top 2
                total_points += 2;
                max_point_deduction += 2
                if (name === "Bryan") {console.log(`${country.name} +2, -2, proj. third place nation finished top 2`)}
                details.set(country.name, 2);
            } else { // eliminated nation advancing
                details.set(country.name, 0);
            }
        }
    }

    for (const country of advancingThird) {
        if (country.name == "placeholder") continue;

        if (gs.map(c => [c[0], c[1]]).flat().some(c => c.name === country.name)) { // nation predicted to finish top two finished third, but advance
            total_points += 2;
            max_point_deduction += 2;
            if (name === "Bryan") {console.log(`${country.name} +2, -2, predicted top two was third`)}
            details.set(country.name, 2);
        } else if (third_place_countries.some(c => c.name === country.name)) { //nation correctly predicted as third place
            total_points += 2;
            if (name === "Bryan") {console.log(`${country.name} +2, right third place`)}
            details.set(country.name, 3);
        } else { // eliminated nation advancing as a third place team
            details.set(country.name, 0);
        }
    }

    for (const country of eliminated) {
        if (country.name == "placeholder") continue;
        if (gs.map(c => [c[0], c[1]]).flat().some(c => c.name === country.name)) { // nation predicted to finish top two was eliminated
            max_point_deduction += 4;
            if (name === "Bryan") {console.log(`${country.name} -4 eliminated top 2`)}
            details.set(country.name, -4);
        } else if (third_place_countries.some(c => c.name === country.name)) { //nation predicted to advance as a third place team was eliminated
            max_point_deduction += 2;
            if (name === "Bryan") {console.log(`${country.name} -2 eliminated third`)}
            details.set(country.name, -2);
        } else {
            details.set(country.name, 0);
        }

    }
    return([total_points, max_point_deduction]);
}

export const winners_round_of_32: Country[] = [
    groupB[0], groupC[0], groupD[1], groupC[1], groupI[2], groupI[0], groupA[0], groupG[0], groupL[0], groupD[0], groupH[0], groupK[0], groupB[1], groupG[2], groupJ[0], groupK[1]
]

export const losers_round_of_32: Country[] = [
    groupA[2], groupF[1], groupE[0], groupF[0], groupE[2], groupF[3], groupE[1], groupI[1], groupK[3], groupB[3], groupJ[1], groupL[1], groupJ[2], groupD[2], groupH[3], groupL[3]
]

function score_round_of_32(ro16: MatchupData[], name: string): [number, number] {
    const selectedCountries: Country[] = ro16.map(m => [m.home!, m.away!]).flat();
    let total_score: number = 0;
    let max_point_deduction: number = 0;

    for (const country of winners_round_of_32) {
        if (country.name === "placeholder") continue; // if not implemented dont try

        if (selectedCountries.some(c => c.name === country.name)) { // if your nation correctly moves on, you get points
            total_score += 5;
            if (name === "Bryan") {console.log( country.name + " +5" )}
        }
    }

    for (const country of losers_round_of_32) {
        if (country.name === "placeholder") continue;

        if (selectedCountries.some(c => c.name === country.name)) { // if your nation doesn't move on, you get deducted points
            max_point_deduction += 5;
            if (name === "Bryan") {console.log( country.name + " -5" )}
        }
    }

    for (const country of eliminated) {
        if (country.name === "placeholder") continue;

        if (selectedCountries.some(c => c.name === country.name)) { // if a selected country was eliminated in the group stage
            max_point_deduction += 5;
        }
    }


    return([total_score, max_point_deduction]);
}

export const eliminated_ro32: Country[] = [eliminated, losers_round_of_32].flat();
export const winners_round_of_16: Country[] = [
    groupC[1], groupI[0], groupI[2], groupL[0], groupH[0], groupG[0], groupJ[0], groupB[1]
]
export const losers_round_of_16: Country[] = [
    groupB[0], groupD[1], groupC[0], groupA[0], groupK[0], groupD[0], groupG[2], groupK[1]
]

function score_round_of_16(qf: MatchupData[]): [number, number] {
    const selectedCountries: Country[] = qf.map(m => [m.home!, m.away!]).flat();
    let total_score: number = 0;
    let max_point_deduction: number = 0;

    for (const country of winners_round_of_16) {
        if (country.name === "placeholder") continue;

        if (selectedCountries.some(c => c.name === country.name)) { // if your nation correctly moves on, you get points
            total_score += 10;
        }
    }

    for (const country of losers_round_of_16) {
        if (country.name === "placeholder") continue;

        if (selectedCountries.some(c => c.name === country.name)) { // if your nation incorrectly moves on, you get deducted points
            max_point_deduction += 10;
        }
    }

    for (const country of eliminated_ro32) {
        if (country.name === "placeholder") continue;

        if (selectedCountries.some(c => c.name === country.name)) {
            max_point_deduction += 10;
        }
    }

    return[total_score, max_point_deduction];
}

export const winners_qf: Country[] = [
    groupI[0], groupH[0], groupL[0], groupJ[0]
]
export const losers_qf: Country[] = [
    groupC[1], groupG[0], groupI[2], groupB[1]
]
export const eliminated_ro16: Country[] = [eliminated_ro32, losers_round_of_16].flat();

function score_quarterfinals(sf: MatchupData[]): [number, number] {
    const selectedCountries: Country[] = sf.map(m => [m.home!, m.away!]).flat();
    let total_score: number = 0;
    let max_point_deduction: number = 0;

    for (const country of winners_qf) {
        if (country.name === "placeholder") continue;

        if (selectedCountries.some(c => c.name === country.name)) { // if your nation correctly moves on, you get points
            total_score += 15;
        }
    }

    for (const country of losers_qf) {
        if (country.name === "placeholder") continue;

        if (selectedCountries.some(c => c.name === country.name)) { // if your nation incorrectly moves on, you get deducted points
            max_point_deduction += 15;
        }
    }

    for (const country of eliminated_ro16) {
        if (country.name === "placeholder") continue;

        if (selectedCountries.some(c => c.name === country.name)) {
            max_point_deduction += 15;
        }
    }
    return([total_score, max_point_deduction]);
}

export const winners_sf: Country[] = [
    fakeCountry, fakeCountry
]

export const losers_sf: Country[] = [
    fakeCountry, fakeCountry
]

export const eliminated_qf: Country[] = [eliminated_ro16, losers_qf].flat();

function score_semifinals(f: MatchupData): [number, number] {
    const selectedCountries: Country[] = [f.home!, f.away!]
    let total_score: number = 0;
    let max_point_deduction: number = 0;

    for (const country of winners_sf) {
        if (country.name === "placeholder") continue;

        if (selectedCountries.some(c => c.name === country.name)) { // if your nation correctly moves on, you get points
            total_score += 25;
        }
    }

    for (const country of losers_sf) {
        if (country.name === "placeholder") continue;

        if (selectedCountries.some(c => c.name === country.name)) { // if your nation incorrectly moves on, you get deducted points
            max_point_deduction += 25;
        }
    }

    for (const country of eliminated_qf) {
        if (country.name === "placeholder") continue;

        if (selectedCountries.some(c => c.name === country.name)) {
            max_point_deduction += 25;
        }
    }
    return([total_score, max_point_deduction]);
}

export const champion: Country = fakeCountry;
export const runner_up: Country = fakeCountry;
export const eliminated_sf: Country[] = [eliminated_qf, losers_sf].flat();

function score_champion(c: Country): [number, number] {
    if (c.name === champion.name) { // if your nation correctly moves on, you get points
        return [50, 0];
    } else if (c.name === runner_up.name || eliminated_sf.some(el_c => el_c.name === c.name)) { // runner-up or eliminated nation
        return [0, 50];
    } else {
        return [0, 0]; // placeholder
    }
}

const golden_boot: string = "Bryan Wheeler";

function score_golden_boot(gb: string): [number, number] {
    if (gb === golden_boot) { // if your nation correctly moves on, you get points
        return [20, 0];
    } else if (gb === "Kai Havertz" || gb === "Zinedine Zidane" || gb === "Christian Pulisic" || gb === "Folarin Balogun") {
        return [0, 20];
    } else if (gb === "Jalen Brunson") {
        return [10, 10];
    } else if (golden_boot === "Bryan Wheeler") { // placeholder
        return [0, 0];
    } else {
        return [0, 20]; // incorrect
    }
}
