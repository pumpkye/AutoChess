import { ChessNpcInfo } from "../AutoBattle/Input/InputCache";
import { g_UIManager } from "./UIManager";
import { ChessNpc } from "../AutoBattle/Model/ChessNpc";
import { npc_data } from "../AutoBattle/Tbx/npc_data";
import UIMain from "./UIMain";
import UIcardList from "./UICardList";
import { MsgPutNpcToBoard, MsgMoveNpc } from "../Message/RoomMsg";
import { g_MsgHandler } from "../Connect/MsgHandler";
import { g_RoomData } from "../Data/RoomData";
import { ChessNpcBaseData } from "../AutoBattle/TbxModel/ChessNpcBaseData";
import UITableGrid from "./UITableGrid";

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
    @property(cc.Node)
    lineNode: cc.Node = null;

    gridArr = new Array<UITableGrid>();

    layout: Array<ChessNpcInfo>;

    /**
     * 当前棋盘上被选中的npc
     */
    currentSelectedNpc: ChessNpcInfo;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        this.initGrid();
        this.layout = new Array<ChessNpcInfo>();
    }

    initGrid() {
        let lines = this.lineNode.children;
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            for (let j = 0; j < 8; j++) {
                let grid: UITableGrid = g_UIManager.createPanelOnly("UITableGrid");
                if (grid) {
                    grid.pos = { x: j, y: i };
                    grid.setNpcInfo();
                    let color: cc.Color;
                    if ((i + j) % 2 == 0) {
                        color = new cc.Color(0xA3, 0xA3, 0xA3);
                    } else {
                        color = new cc.Color(0xE6, 0xE6, 0xE6);
                    }
                    grid.setColor(color);
                    grid.node.x = -700 + 200 * j;
                    grid.node.parent = line;

                    grid.node.on('click', function (event) {
                        let idx = grid.pos.y * 8 + grid.pos.x;
                        let handListPanel: UIcardList = g_UIManager.getPanel("UICardList");
                        if (this.layout[idx]) {
                            console.log("选中了一个棋盘上的npc", this.layout[idx]);
                            this.selectItem(this.layout[idx]);
                            // this.currentSelectedNpc = this.layout[idx];
                            if (handListPanel) {
                                handListPanel.selectItem();
                            }
                            return;
                        } else if (this.currentSelectedNpc) {
                            //移动棋子
                            let msg = new MsgMoveNpc();
                            msg.data.thisId = this.currentSelectedNpc.thisId;
                            msg.data.pos = grid.pos;
                            g_MsgHandler.sendMsg(msg);
                            return;
                        }
                        if (handListPanel) {
                            let selectInHand = handListPanel.currentSelectedNpcInfo;
                            if (selectInHand) {
                                let msg = new MsgPutNpcToBoard();
                                msg.data.thisId = selectInHand.thisId;
                                msg.data.pos = grid.pos;
                                g_MsgHandler.sendMsg(msg);
                            }
                        }
                    }, this);
                    grid.node.on('mouseenter', function (event) {
                        grid.setColor(new cc.Color(255, 255, 255));
                    }, this);
                    grid.node.on('mouseleave', function (event) {
                        grid.setColor(color);
                    }, this);
                    this.gridArr.push(grid);
                }

            }
        }
    }

    clear() {
        this.layout = new Array();
        for (let i = 0; i < this.gridArr.length; i++) {
            const grid = this.gridArr[i];
            grid.setNpcInfo();
        }
        this.selectItem();
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
            let grid = this.gridArr[idx];
            grid.setNpcInfo(npcInfo);
            this.layout[idx] = npcInfo;
            this.layout[idx].thisId = npcInfo.thisId;
        }
        let panel = g_UIManager.getPanel("UIGameMain");
        if (panel) {
            panel.refreshCostBuff();
        }
    }

    selectItem(npcInfo?: ChessNpcInfo) {
        if (this.currentSelectedNpc && npcInfo && this.currentSelectedNpc.thisId == npcInfo.thisId) {
            this.currentSelectedNpc = null;
        } else {
            this.currentSelectedNpc = npcInfo;
        }
        for (let i = 0; i < this.gridArr.length; i++) {
            const grid = this.gridArr[i];
            if (grid.npcInfo && this.currentSelectedNpc && grid.npcInfo.thisId == this.currentSelectedNpc.thisId) {
                grid.setSelect(true);
            } else {
                grid.setSelect(false);
            }
        }
    }
    // update (dt) {}
}
