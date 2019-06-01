import { g_InputCache } from "./AutoBattle/Input/InputCache";
import { g_AutoBattle } from "./AutoBattle/AutoBattle";
import { testSkillBaseData, testNpcBaseData, testSkillLevelData } from "./AutoBattle/Test/UnitTest";
import { g_UIManager } from "./Gui/UIManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;

    // @property
    // text: string = 'hello';

    start() {
        // init logic
        // this.label.string = this.text;
        g_UIManager.init();
        // g_InputCache.testLoadJson();
        // g_AutoBattle.test();
    }
}
