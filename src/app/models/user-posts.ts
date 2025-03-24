import { IUsers } from "./iusers";

export interface UserPosts {
    id:string;
    postContent:string;
    postImg:string;
    isLiked : boolean;
    createdOn : Date;
    userId :number;
    user:IUsers
}
