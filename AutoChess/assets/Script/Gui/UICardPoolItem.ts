// import { npc_data } from "../AutoBattle/Tbx/npc_data";
import { WorsConfig } from "../AutoBattle/Config/WordsConfig";
import { ChessNpcBaseData } from "../AutoBattle/TbxModel/ChessNpcBaseData";
import { MsgBuyCard } from "../Message/RoomMsg";
import { g_MsgHandler } from "../Connect/MsgHandler";

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
export default class UICardPoolItem extends cc.Component {

    @property(cc.Label)
    nameLabel: cc.Label = null;

    @property(cc.Label)
    careerRaceLabel: cc.Label = null;

    @property(cc.Label)
    costLabel: cc.Label = null;

    idx = -1;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        this.node.on('touchstart', function (event) {

        }, this);

        this.node.on('touchend', function (event) {
            this.buyCard();
        }, this);
    }

    setData(baseId: number, idx: number) {
        this.idx = idx;
        let npcBaseData = new ChessNpcBaseData(baseId);
        // let npcBaseData = npc_data[baseId];
        this.nameLabel.string = npcBaseData.name;
        let careerStr = WorsConfig.career[npcBaseData.career];
        let raceStr = WorsConfig.race[npcBaseData.race];
        this.careerRaceLabel.string = raceStr + "·" + careerStr;
        this.costLabel.string = "cost: " + npcBaseData.quality;
    }

    buyCard() {
        console.log("buyCard");
        let msg = new MsgBuyCard();
        msg.data.idx = this.idx;
        g_MsgHandler.sendMsg(msg);
    }

    // update (dt) {}
}
