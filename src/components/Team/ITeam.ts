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

interface ITeamBase {
    home: ITeamHome;
    guest?: ITeamGuest;
    score?: IScore;
}

export type ITeamProps = ITeamBase
