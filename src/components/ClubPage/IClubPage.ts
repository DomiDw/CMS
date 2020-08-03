export interface IClubPageProps{
}
interface gameData {
    clubATeam:string;
    clubBTeam:string;
    gameDay:string;
}
export interface IClubPageState{
    pastFirstMatchData?:gameData;

    pastSecondMatchData?:gameData;

    pastThirdMatchData?:gameData;

    futureFirstMatchData?:gameData;

    futureSecondMatchData?:gameData;

    futureThirdMatchData?:gameData;

    dataClub?:{
        thumbnail:string;
        city:string;
        name:string;
        location:string;
    }
    loading: boolean;
    checked: boolean;
    squadArray: any;
    background: string;
}
