export interface IMatchPageProps {
    location?: any;
}
export interface IMatchPageState {
    metaDataVideo?: {
        userStream: string;
        scoreA: string;
        scoreB: string;
        clubAId: string;
        clubBId: string;
    }
    metaDataClubHome?: {
        name:string;
        thumbnail:string;
        location:string;
    }
    metaDataClubGuest?: {
        name:string;
        thumbnail:string;
    }
    loading: boolean;
    checked: boolean;
}
