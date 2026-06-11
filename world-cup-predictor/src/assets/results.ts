import { Country } from "./countries.ts";
import { MatchupData } from "./seeding.ts";

export class BracketRow {
    name: string;
    group_stage: Country[][];         // 12 groups, each [1st, 2nd, 3rd, 4th]
    round_of_32: MatchupData[];  // 12 slots, nulls where team didn't advance
    round_of_16: MatchupData[];
    quarterfinals: MatchupData[];
    semifinals: MatchupData[];
    finals: MatchupData;
    champion: Country;
    golden_boot: string | null;

    constructor(
        name: string,
        group_stage: Country[][],         // 12 groups, each [1st, 2nd, 3rd, 4th]
        round_of_32: MatchupData[],  // 12 slots, nulls where team didn't advance
        round_of_16: MatchupData[],
        quarterfinals: MatchupData[],
        semifinals: MatchupData[],
        finals: MatchupData,
        champion: Country,
        golden_boot: string | null,
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
    }
}