export interface IMatchPageProps {

}
export interface IMatchPageState {
    metaDataVideo?:{
        userStream: string;
        scoreA: string;
        scoreB: string;
        clubAId: string;
        clubBId: string;
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
