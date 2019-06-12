import { g_UIManager } from "./UIManager";
import UIChessTable from "./UIChessTable";
import { ChessNpc } from "../AutoBattle/Model/ChessNpc";

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
export default class UISetNpc extends cc.Component {
    @property(cc.EditBox)
    editBox: cc.EditBox = null;
    @property(cc.Label)
    gridText: cc.Label = null;
    @property(cc.Label)
    nameText: cc.Label = null;
    @property(cc.Label)
    hpText: cc.Label = null;
    @property(cc.Label)
    damageText: cc.Label = null;

    gridPos = { x: 0, y: 0 };

    start() {
        this.hpText.string = "hp: 0";
        this.damageText.string = "damage: 0";
    }

    onOkClick() {
        let baseId = Math.floor(Number(this.editBox.string) / 10);
        let level = Number(this.editBox.string) % 10;
        let npcData = new ChessNpc(0, baseId, level, true);
        let chessTable: UIChessTable = g_UIManager.getPanel("UIChessTable");
        if (!chessTable) {
            chessTable = g_UIManager.getPanel("UIGameTable");
        }
        if (chessTable) {
            chessTable.setGridLabel(this.gridPos.x, this.gridPos.y, npcData);
        }
        g_UIManager.closePanel(this);

    }

    onCloseClick() {
        g_UIManager.closePanel(this)
    }
    // update (dt) {}

    setGridPos(x: number, y: number) {
        this.gridPos.x = x;
        this.gridPos.y = y;
        this.gridText.string = `pos:(${x + 1},${y + 1})`;
    }

    refreshInfo() {
        let baseId = Math.floor(Number(this.editBox.string) / 10);
        let level = Number(this.editBox.string) % 10;
        let npcData = new ChessNpc(0, baseId, level, true);
        this.nameText.string = npcData.name;
        this.hpText.string = "hp: " + npcData.hp;
        this.damageText.string = "damage: " + npcData.damage;
    }

}
