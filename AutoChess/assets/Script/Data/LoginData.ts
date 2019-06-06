import { g_MsgHandler } from "../Connect/MsgHandler";
import { MsgReqUserInfo, MsgResUserInfo } from "../Message/UserMsg";

class LoginData {
    id: number;
    userName: string;

    constructor() {
        this.userName = (new Date().getTime() % 1000).toString();
    }

    async login() {
        //连接服务器
        await g_MsgHandler.connectToServer();
        //获取用户名
        this.reqUserInfo();
    }

    reqUserInfo() {
        let msg = new MsgReqUserInfo();
        msg.data.name = this.userName;
        g_MsgHandler.sendMsg(msg);
    }

    msgResUserInfo(msg: MsgResUserInfo["data"]) {
        this.id = msg.id;
        this.userName = msg.name;
        console.log(`set loginData:: userId:${this.id},userName:${this.userName}`);
    }
}

export const g_LoginData = new LoginData();