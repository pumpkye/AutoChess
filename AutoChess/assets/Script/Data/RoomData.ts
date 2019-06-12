import { MsgResEnterRoom, PlayerInfo, MsgRefreshRoomPlayer, MsgResStartGame } from "../Message/RoomMsg";
import { g_UIManager } from "../Gui/UIManager";

class RoomData {
    roomId: number;
    /**
     * {playerId:playerInfo}
     */
    playerList: { [index: number]: PlayerInfo };
    constructor() {
        this.playerList = {};
    }

    /**
     * 加入房间
     * @param msg 
     */
    msgResEnterRoom(msg: MsgResEnterRoom['data']) {
        this.roomId = msg.roomId;
        g_UIManager.closePanel("UILobby");
        g_UIManager.getOrCreatePanel("UIRoom");
    }

    msgResStartGame(msg: MsgResStartGame['data']) {
        if (msg.isStart) {
            let panel = g_UIManager.getPanel("UIRoom")
            if (panel) {
                panel.closePanel();
            }
            g_UIManager.getOrCreatePanel("UIGameTable");
            panel = g_UIManager.getOrCreatePanel("UIGameMain");
        }
    }

    msgRefreshRoomPlayer(msg: MsgRefreshRoomPlayer['data']) {
        if (msg.refreshAll) {
            this.playerList = {};
            for (let i = 0; i < msg.playerList.length; i++) {
                const playerInfo = msg.playerList[i];
                this.playerList[playerInfo.id] = playerInfo;
            }
        } else {
            for (let i = 0; i < msg.playerList.length; i++) {
                const playerInfo = msg.playerList[i];
                this.playerList[playerInfo.id] = playerInfo;
            }
        }
        let panel = g_UIManager.getPanel("UIRoom")
        if (panel) {
            panel.refreshPlayerList();
        }
    }
}

export const g_RoomData = new RoomData();