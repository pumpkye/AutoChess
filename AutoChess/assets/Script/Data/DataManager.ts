import { g_UserData } from "./UserData";
import { MessageBase } from "../Message/MessagegBase";
import { g_LoginData } from "./LoginData";
import { g_RoomData } from "./RoomData";


class DataManager {
    /**
     * 需要注册的data列表
     */
    readonly dataList = [
        g_LoginData,
        g_UserData,
        g_RoomData,
    ];
    constructor() {

    }

    dispatchMsg(msg: MessageBase) {
        for (let i = 0; i < this.dataList.length; i++) {
            const data = this.dataList[i];
            if (typeof (data[msg.name]) === "function") {
                data[msg.name](msg.data);
            }
        }
    }
}

export const g_DataManager = new DataManager();