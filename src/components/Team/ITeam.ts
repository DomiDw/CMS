interface ITeamHome {
    name: string;
    logo: string;
}
interface ITeamGuest {
    name: string;
    logo: string;
}
interface IScore {
    home: string;
    guest: string;
}
interface ISize {
    xs: number;
    sm?: number;
    md?: number;
    lg?: number;
}

interface ITeamBase {
    home: ITeamHome;
    guest?: ITeamGuest;
    score?: IScore;
    size?: ISize;
}

export type ITeamProps = ITeamBase
