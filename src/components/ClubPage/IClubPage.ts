export interface IClubPageProps{

}
interface gameData {
    clubATeam:string;
    clubBTeam:string;
    gameDay:string;
}
export interface IClubPageState{
    firstMatchData?:gameData;

    secondMatchData?:gameData;

    thirdMatchData?:gameData;

    dataClub?:{
        thumbnail:string;
        city:string;
        name:string;
    }
    loading: boolean;
}
