export interface IMatchPageProps {

}
export interface IMatchPageState {
    metaDataVideo?:{
        userStream: string;
        scoreA: string;
        scoreB: string;
    }
    metaDataClubHome?: {
        name:string;
        thumbnail:string;
    }
    metaDataClubGuest?: {
        name:string;
        thumbnail:string;
    }
}