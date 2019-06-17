import { g_MsgHandler } from "../Connect/MsgHandler";
import { MsgReqUserInfo, MsgResUserInfo, MsgReqLogin } from "../Message/UserMsg";
import { g_UIManager } from "../Gui/UIManager";

class LoginData {
    id: number;
    userName: string;

    constructor() {
        this.userName = "棋手" + (new Date().getTime() % 1000).toString();
    }

    async login(userName?: string) {
        if (userName) {
            this.userName = userName;
        }
        //连接服务器
        let ret = await g_MsgHandler.connectToServer();
        if (ret) {
            //获取用户名
            this.reqUserInfo();
        }
    }

    reqUserInfo() {
        let msg = new MsgReqUserInfo();
        msg.data.name = this.userName;
        g_MsgHandler.sendMsg(msg);
    }

    reqUserInfoById() {
        let msg = new MsgReqLogin();
        msg.data.id = this.id;
        g_MsgHandler.sendMsg(msg);
    }

    /**
     * 登录成功
     * @param msg 
     */
    msgResUserInfo(msg: MsgResUserInfo["data"]) {
        this.id = msg.id;
        this.userName = msg.name;
        console.log(`set loginData:: userId:${this.id},userName:${this.userName}`);
        g_UIManager.closePanel("UILogin");
        this.switchToGameUI();
    }

    switchToGameUI() {
        g_UIManager.closeAllDataUI();
        let panel = g_UIManager.getOrCreatePanel("UILobby");
        if (panel) {
            panel.setName(this.userName);
        }
        // g_UIManager.getOrCreatePanel("UIGameTable");
        // let uiMain: UIGameMain = g_UIManager.getOrCreatePanel("UIGameMain");
        // uiMain.setName(this.userName);
    }
}

export const g_LoginData = new LoginData();