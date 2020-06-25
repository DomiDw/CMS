interface ITeamHome {
    name: string;
    thumbnail: string;
}
interface ITeamGuest {
    name: string;
    thumbnail: string;
}
interface IScore {
    home: string;
    guest: string;
}
// interface ISize {
//     xs: number;
//     sm?: number;
//     md?: number;
//     lg?: number;
// }

interface ITeamBase {
    home: ITeamHome;
    guest?: ITeamGuest;
    score?: IScore;
    // size?: ISize;
}

export type ITeamProps = ITeamBase
