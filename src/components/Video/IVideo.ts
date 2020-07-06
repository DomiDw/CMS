interface IVideoBase {
    url:string | undefined;
}
export interface IVideoState {
    videos?: {
        userStream: string;
    }
}
export type IVideoProps = IVideoBase
