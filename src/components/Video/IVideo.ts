interface IVideoBase {
    url:string;
}
export interface IVideoState {
    videos?: {
        userStream: string;
    }
}
export type IVideoProps = IVideoBase
