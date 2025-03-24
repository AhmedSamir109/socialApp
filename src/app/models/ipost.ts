import { IUsers } from "./iusers";

export interface IPost {
    id:string;
    postContent:string;
    postImg:string;
    isLiked : boolean;
    createdOn : Date;
    userId :number;
}

