// import { ChessNpcBaseData } from "../AutoBattle/TbxModel/ChessNpcBaseData";
// import { WorsConfig } from "../AutoBattle/Config/WordsConfig";
import { npc_data } from "../AutoBattle/Tbx/npc_data";
import { WorsConfig } from "../AutoBattle/Config/WordsConfig";

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

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    setData(baseId: number) {
        // let npcBaseData = new ChessNpcBaseData(baseId);
        let npcBaseData = npc_data[baseId];
        this.nameLabel.string = npcBaseData.name;
        let careerStr = WorsConfig.career[npcBaseData.career];
        let raceStr = WorsConfig.race[npcBaseData.race];
        this.careerRaceLabel.string = raceStr + "·" + careerStr;
        this.costLabel.string = "cost: " + npcBaseData.quality;
    }

    // update (dt) {}
}
