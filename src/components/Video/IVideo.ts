interface IVideoBase {
    url:string;
}
export interface IVideoState {
    videos?: {
        RowKey: string;
        userStream: string;
    }
}
export type IVideoProps = IVideoBase
