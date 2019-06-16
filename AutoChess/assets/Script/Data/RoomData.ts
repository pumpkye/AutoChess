import { MsgResEnterRoom, PlayerInfo, MsgRefreshRoomPlayer, MsgResStartGame, MsgRoundState, RoundState, MsgRefreshCardPool, MsgGameOver } from "../Message/RoomMsg";
import { g_UIManager } from "../Gui/UIManager";
import { g_UserData } from "./UserData";
import UICardPool from "../Gui/UICardPool";
import UIGameOver from "../Gui/UIGameOver";

class RoomData {
    roomId: number;
    /**
     * {playerId:playerInfo}
     */
    playerList: { [index: number]: PlayerInfo };
    /**
     * {idx:baseId}
     */
    cardPool: Array<{ idx: number, baseId: number }>;

    gameStart: boolean;
    roundIdx: number;
    roundState: RoundState;
    curStateFinishTime: number;

    constructor() {
        this.playerList = {};
        this.cardPool = new Array();
    }

    clearGameInfo() {
        this.gameStart = false;
        this.roundIdx = 0;
        this.roundState = 0;
        this.curStateFinishTime = 0;
    }

    getMainPlayerInfo() {
        let id = g_UserData.id;
        return this.playerList[id];
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

    /**
     * 开始游戏
     * @param msg 
     */
    msgResStartGame(msg: MsgResStartGame['data']) {
        if (msg.isStart) {
            let panel = g_UIManager.getPanel("UIRoom")
            if (panel) {
                panel.closePanel();
            }
            this.clearGameInfo();
            this.gameStart = true;
            g_UIManager.getOrCreatePanel("UIGameTable");
            g_UIManager.getOrCreatePanel("UIGameMain");
            g_UIManager.getOrCreatePanel("UICardList");
        }
    }

    msgRoundState(msg: MsgRoundState['data']) {
        this.roundIdx = msg.roundIdx;
        this.roundState = msg.state;
        this.curStateFinishTime = msg.finishTime;
        let panel = g_UIManager.getPanel("UIGameMain")
        if (panel) {
            panel.refreshRoundInfo();
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
        console.log(this.playerList);
        let panel = g_UIManager.getPanel("UIRoom");
        if (panel) {
            panel.refreshPlayerList();
        }
        panel = g_UIManager.getPanel("UIGameMain");
        if (panel) {
            panel.refreshPlayerInfo();
        }

        panel = g_UIManager.getPanel("UICardList");
        if (panel) {
            panel.refreshList();
        }

        panel = g_UIManager.getPanel("UIGameTable");
        if (panel) {
            panel.refreshLayout();
        }
    }

    msgRefreshCardPool(msg: MsgRefreshCardPool['data']) {
        if (g_UserData.id == msg.userId) {
            this.cardPool = msg.cardPool;
        }
        let panel: UICardPool = g_UIManager.getOrCreatePanel("UICardPool");
        if (panel) {
            panel.refreshPool();
        }
    }

    msgGameOver(msg: MsgGameOver['data']) {
        let panel: UIGameOver = g_UIManager.getOrCreatePanel('UIGameOver');
        if (panel) {
            if (msg.winnerId == g_UserData.id) {
                panel.setResult("Win!");
            } else {
                panel.setResult("Game over...");
            }
        }
    }

}

export const g_RoomData = new RoomData();