interface ITeamHome {
    name: string | undefined;
    thumbnail: string | undefined;
}
interface ITeamGuest {
    name: string | undefined;
    thumbnail: string | undefined;
}
interface IScore {
    home: string | undefined;
    guest: string | undefined;
}

interface ITeamBase {
    home: ITeamHome;
    guest?: ITeamGuest;
    score?: IScore;
}

export type ITeamProps = ITeamBase
