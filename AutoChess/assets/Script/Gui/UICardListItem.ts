import { ChessNpcInfo } from "../Message/RoomMsg";
import { ChessNpcBaseData } from "../AutoBattle/TbxModel/ChessNpcBaseData";
import { WorsConfig } from "../AutoBattle/Config/WordsConfig";
import { g_UIManager } from "./UIManager";
import UIcardList from "./UICardList";

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
export default class UICardListItem extends cc.Component {

    @property(cc.Label)
    nameLabel: cc.Label = null;

    @property(cc.Label)
    raceLabel: cc.Label = null;

    @property(cc.Label)
    careerLabel: cc.Label = null;

    @property(cc.Label)
    costLevelLabel: cc.Label = null;

    @property(cc.Node)
    selectBg: cc.Node = null;

    npcInfo: ChessNpcInfo;
    idx = 0;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        this.selectBg.active = false;
        this.node.on('touchend', function (event) {
            let panel: UIcardList = g_UIManager.getPanel("UICardList");
            if (panel) {
                panel.selectItem(this.npcInfo);
            }
        }, this);
    }

    setData(npcInfo: ChessNpcInfo, idx: number) {
        this.idx = idx;
        this.npcInfo = npcInfo;
        let baseData = new ChessNpcBaseData(npcInfo.baseId);
        this.nameLabel.string = baseData.name;
        this.raceLabel.string = WorsConfig.race[baseData.race];
        this.careerLabel.string = WorsConfig.career[baseData.career];
        this.costLevelLabel.string = "cost:" + baseData.quality + " Lv." + npcInfo.level;
    }

    setSelected(vis: boolean) {
        this.selectBg.active = vis;
    }
    // update (dt) {}
}
