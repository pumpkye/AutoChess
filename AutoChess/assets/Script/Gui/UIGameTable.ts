import { ChessNpcInfo } from "../AutoBattle/Input/InputCache";
import { g_UIManager } from "./UIManager";
import { ChessNpc } from "../AutoBattle/Model/ChessNpc";
import { npc_data } from "../AutoBattle/Tbx/npc_data";
import UIMain from "./UIMain";
import UIcardList from "./UICardList";
import { MsgPutNpcToBoard } from "../Message/RoomMsg";
import { g_MsgHandler } from "../Connect/MsgHandler";
import { g_RoomData } from "../Data/RoomData";
import { ChessNpcBaseData } from "../AutoBattle/TbxModel/ChessNpcBaseData";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class UIGameTable extends cc.Component {
    gridArr = new Array<cc.Node>();

    layout: Array<ChessNpcInfo>;

    /**
     * 当前棋盘上被选中的npc
     */
    currentSelectedNpc: ChessNpcInfo;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        let lines = this.node.children;
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            let grids = line.children;
            for (let j = 0; j < grids.length; j++) {
                const grid = grids[j];
                grid.name = `grid${j}${i}`;
                grid.on('click', this.onGridClick, this);
                this.gridArr.push(grid);
                let label = cc.find("Background/npcName", grid).getComponent(cc.Label);
                label.string = "";
            }
        }
        this.layout = new Array<ChessNpcInfo>();
    }

    clear() {
        this.layout = new Array();
        for (let i = 0; i < this.gridArr.length; i++) {
            const node = this.gridArr[i];
            let label = cc.find("Background/npcName", node).getComponent(cc.Label);
            label.string = "";
        }
    }

    onGridClick(event) {
        let gridName: string = event.target.parent.name;
        let x = Number(gridName.substr(4, 1));
        let y = Number(gridName.substr(5, 1));
        let idx = y * 8 + x;
        if (this.layout[idx]) {
            console.log("选中了一个棋盘上的npc")
            return;
        }
        let handListPanel: UIcardList = g_UIManager.getPanel("UICardList")
        if (handListPanel) {
            let selectInHand = handListPanel.currentSelectedNpcInfo;
            if (selectInHand) {
                let msg = new MsgPutNpcToBoard();
                msg.data.thisId = selectInHand.thisId;
                msg.data.pos = { x, y };
                g_MsgHandler.sendMsg(msg);
            }
        }

    }

    refreshLayout() {
        this.clear();
        let playerInfo = g_RoomData.getMainPlayerInfo();
        if (!playerInfo) {
            return;
        }
        let npcList = playerInfo.layoutList;
        for (let i = 0; i < npcList.length; i++) {
            const npcInfo = npcList[i];
            let idx = npcInfo.pos.y * 8 + npcInfo.pos.x;
            let node = this.gridArr[idx];
            let label = cc.find("Background/npcName", node).getComponent(cc.Label);
            let baseData = new ChessNpcBaseData(npcInfo.baseId);
            label.string = baseData.name;
            this.layout[idx] = npcInfo;
        }
        let panel = g_UIManager.getPanel("UIGameMain");
        if (panel) {
            panel.refreshCostBuff();
        }
    }

    setGridLabel(x: number, y: number, npc: ChessNpc) {
        console.log(npc);
        let idx = y * 8 + x;
        let node = this.gridArr[idx];
        if (y > 3) {
            x = 7 - x;
            y = 7 - y;
        }
        if (!npc.baseId) {
            delete (this.layout[idx]);
        } else if (npc_data[npc.baseId]) {
            let label = cc.find("Background/npcName", node).getComponent(cc.Label);
            label.string = npc.name;
            let chessNpcInfo = new ChessNpcInfo(0, npc.baseId, npc.level, { x: x, y: y })
            console.log(chessNpcInfo);
            this.layout[idx] = chessNpcInfo;
        }
        let panel: UIMain = g_UIManager.getPanel("UIMain")
        if (panel) {
            panel.refreshCostBuff();
        }
    }
    // update (dt) {}
}
