import { MessageBase } from "../Message/MessagegBase";
import { g_DataManager } from "../Data/DataManager";
import { g_UIManager } from "../Gui/UIManager";

/**
 * socket连接
 */
class MsgHandler {
    readonly url = "ws://localhost";
    readonly port = "3001";
    readonly path = "/lobby";

    ws: WebSocket;
    // sendMsgArr = new Array<MessageBase>();
    // receiveMsgArr = new Array<MessageBase>();

    constructor() {

    }

    async connectToServer() {
        if (this.ws && this.ws.readyState == WebSocket.OPEN) {
            console.log("已连接");
            return true;
        }
        let ret: any = await this.createWsConnect();
        console.log(`connect ${ret}`);
        if (ret.success) {
            this.ws = ret.ws;
            return true;
        }
        return false;
    }

    createWsConnect() {
        let ws = new WebSocket(this.formatUrl(this.path));
        ws.onclose = function (event) {
            console.log("connect close");
        }
        ws.onmessage = function (event) {
            console.log("receive server message");
            g_MsgHandler.dispatchMsg(event.data);
        }
        return new Promise((resolve, reject) => {
            ws.onopen = function (event) {
                console.log("connect opened");
                resolve({ success: true, ws });
            }
            ws.onerror = function (event) {
                console.log("connect error");
                reject({ success: false, ws });
            }

        })
    }

    sendMsg(msg: MessageBase) {
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
            console.log("WebSocket instance wasn't ready...");
            return;
        }
        console.log(`sendMsg:${msg}`);
        this.ws.send(JSON.stringify(msg));
    }

    dispatchMsg(data: any) {
        console.log(`dispatchMsg msg:${data}`);
        let msg = JSON.parse(data);
        //先分发给DataManager
        g_DataManager.dispatchMsg(msg);
        //再分发给UIManager
        g_UIManager.dispatchMsg(msg);
    }

    formatUrl(path: string) {
        //ws://localhost:3001/test
        return this.url + ":" + this.port + path;
    }
}

export const g_MsgHandler = new MsgHandler();