import { MessageBase } from "./MessagegBase";

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

    connectToServer() {
        this.ws = new WebSocket(this.formatUrl(this.path));
        this.ws.onopen = function (event) {
            console.log("connect opened");
        }
        this.ws.onerror = function (event) {
            console.log("connect error");
        }
        this.ws.onclose = function (event) {
            console.log("connect close");
        }

        this.ws.onmessage = function (event) {
            console.log("receive server message");
            g_MsgHandler.dispatchMsg(event.data);
        }
    }

    sendMsg(msg: MessageBase) {
        if (this.ws.readyState !== WebSocket.OPEN) {
            console.log("WebSocket instance wasn't ready...");
        }
        this.ws.send(JSON.stringify(msg));
    }

    dispatchMsg(data: any) {

    }

    formatUrl(path: string) {
        //ws://localhost:3001/test
        return this.url + ":" + this.port + path;
    }
}

export const g_MsgHandler = new MsgHandler();