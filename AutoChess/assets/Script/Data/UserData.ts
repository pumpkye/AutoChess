import { MsgResUserInfo } from "../Message/UserMsg";
import { BaseData } from "./BaseData";

class UserData extends BaseData {
    id: number;
    name: string;

    constructor() {
        super();
    }

    msgResUserInfo(msg: MsgResUserInfo["data"]) {
        this.id = msg.id;
        this.name = msg.name;
        console.log(`set UserData:: userId:${this.id},userName:${this.name}`);
    }
}

export const g_UserData = new UserData();