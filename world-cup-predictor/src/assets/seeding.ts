import {Country} from "./countries.ts";

export const winner: number = 0;
export const runner_up: number = 1;
export const third_place: number = 2;
export const Group = {
    A: 0,
    B: 1,
    C: 2,
    D: 3,
    E: 4,
    F: 5,
    G: 6,
    H: 7,
    I: 8,
    J: 9,
    K: 10,
    L: 11,
} as const;

export class MatchupData {
    home: Country | null;
    away: Country | null;
    home_placeholder: string;
    away_placeholder: string;
    match_number: number;
    date: string;
    winner_location: number[]; // [matchup index][home: 0, away: 1]

    constructor(home: Country | null, away: Country | null, home_placeholder: string, away_placeholder: string, match_number: number, date: string, winner_location: number[]) {
        this.home = home;
        this.away = away;
        this.home_placeholder = home_placeholder;
        this.away_placeholder = away_placeholder;
        this.match_number = match_number;
        this.date = date;
        this.winner_location = winner_location;
    }
}

export const groupDefault: Country[][] = [[], [], [], [], [], [], [], [], [], [], [], []];

export const thirdDefault: (Country | null)[] = [null, null, null, null, null, null, null, null, null, null, null, null];

export const roundOf16Default: MatchupData[] = [
    new MatchupData(null, null, "Winner Match 74", "Winner Match 77", 89, "Saturday, July 4th", [0, 0]),
    new MatchupData(null, null, "Winner Match 73", "Winner Match 75", 90, "Saturday, July 4th", [0, 1]),
    new MatchupData(null, null, "Winner Match 76", "Winner Match 78", 91, "Sunday, July 5th", [2, 0]),
    new MatchupData(null, null, "Winner Match 79", "Winner Match 80", 92, "Sunday, July 5th", [2, 1]),
    new MatchupData(null, null, "Winner Match 83", "Winner Match 84", 93, "Monday, July 6th", [1, 0]),
    new MatchupData(null, null, "Winner Match 81", "Winner Match 82", 94, "Monday, July 6th", [1,1]),
    new MatchupData(null, null, "Winner Match 86", "Winner Match 88", 95, "Tuesday, July 7th", [3, 0]),
    new MatchupData(null, null, "Winner Match 85", "Winner Match 87", 96, "Tuesday, July 7th", [3,1]),
];

export const QFDefault: MatchupData[] = [
    new MatchupData(null, null, "Winner Match 89", "Winner Match 90", 97, "Thursday, July 9th", [0, 0]),
    new MatchupData(null, null, "Winner Match 93", "Winner Match 94", 98, "Friday, July 10th", [0,1]),
    new MatchupData(null, null, "Winner Match 91", "Winner Match 92", 99, "Saturday, July 11th", [1, 0]),
    new MatchupData(null, null, "Winner Match 95", "Winner Match 96", 100, "Saturday, July 11th", [1,1]),
];

export const SFDefault: MatchupData[] = [
    new MatchupData(null, null, "Winner Quarter-final 1", "Winner Quarter-final 2", 101, "Tuesday, July 14th", [0, 0]),
    new MatchupData(null, null, "Winner Quarter-final 3", "Winner Quarter-final 4", 102, "Wednesday, July 15th", [0, 1]),
]

export const finalDefault: MatchupData[] = [
    new MatchupData(null, null, "Winner Semi-final 1", "Winner Semi-final 2", 104, "Sunday, July 19th", [0, 0])
]

export function roundOf16Seeding(match_number: number) {
    let index: number = -1;
    let home: boolean = true;

    switch (match_number) {
        case 73:
            index = 1;
            break;
        case 74:
            index = 0;
            break;
        case 75:
            index = 1;
            home = false;
            break;
        case 76:
            index = 2;
            break;
        case 77:
            index = 0;
            home = false;
            break;
        case 78:
            index = 2;
            home = false;
            break;
        case 79:
            index = 3;
            break;
        case 80:
            index = 3;
            home = false;
            break;
        case 81:
            index = 5;
            break;
        case 82:
            index = 5;
            home = false;
            break;
        case 83:
            index = 4;
            break;
        case 84:
            index = 4;
            home = false;
            break;
        case 85:
            index = 7;
            break;
        case 86:
            index = 6;
            break;
        case 87:
            index = 7;
            home = false;
            break;
        case 88:
            index = 6;
            home = false;
            break;
    }

    return [index, home];
}

export function QFSeeding(match_number: number) {
    let index: number = -1;
    let home: boolean = true;

    switch (match_number) {
        case 89:
            index = 0;
            break;
        case 90:
            index = 0;
            home = false;
            break;
        case 91:
            index = 2;
            break;
        case 92:
            index = 2;
            home = false;
            break;
        case 93:
            index = 1;
            break;
        case 94:
            index = 1;
            home = false;
            break;
        case 95:
            index = 3;
            break;
        case 96:
            index = 3;
            home = false;
            break;
    }
    return [index, home];
}

export function SFSeeding(match_number: number) {
    const index = Math.floor((match_number - 97) / 2); // [0 1] = 0 [2 3] = 1
    const home: boolean = (!((match_number - 97) % 2));
    return [index, home];
}

export function finalSeeding(match_number: number) {
    const index = Math.floor((match_number - 101) / 2); // [0 1] = 0 [2 3] = 1
    const home: boolean = (!((match_number - 101) % 2));
    return [index, home];
}
