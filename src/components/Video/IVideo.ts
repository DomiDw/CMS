interface IVideoBase {
    url:string | undefined;
}
export interface IVideoState {
    date: any;
    videos?: {
        userStream: string;
    }
}
export type IVideoProps = IVideoBase
