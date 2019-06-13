import { ChessNpcInfo } from "../Message/RoomMsg";
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
export default class UITableGrid extends cc.Component {

    @property(cc.Label)
    nameLabel: cc.Label = null;

    @property(cc.Node)
    selectSp: cc.Node = null;

    @property(cc.Node)
    bg: cc.Node = null;

    pos: {
        x: number,
        y: number,
    }

    npcInfo: ChessNpcInfo;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        this.selectSp.active = false;
    }

    setNpcInfo(npcInfo?: ChessNpcInfo) {
        this.npcInfo = npcInfo;
        if (!npcInfo) {
            this.nameLabel.string = "";
            console.log("clear npcInfo")
            return;
        }
        console.log("set npc name")
        let baseData = new ChessNpcBaseData(npcInfo.baseId);
        this.nameLabel.string = baseData.name + "\n Lv." + npcInfo.level;
    }

    setSelect(vis: boolean) {
        this.selectSp.active = vis;
    }

    setColor(color: cc.Color) {
        // #E6E6E6
        // #A3A3A3
        this.bg.color = color;
    }

    // update (dt) {}
}
