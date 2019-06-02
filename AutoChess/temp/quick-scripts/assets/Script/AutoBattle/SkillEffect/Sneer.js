(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/AutoBattle/SkillEffect/Sneer.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e1402VAxWpGEobYK2xw0k8C', 'Sneer', __filename);
// Script/AutoBattle/SkillEffect/Sneer.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BaseSkillEffect_1 = require("./BaseSkillEffect");
var SkillEffectEnum_1 = require("./SkillEffectEnum");
var EffectInfo_1 = require("../Model/EffectInfo");
var AutoBattleManager_1 = require("../AutoBattleManager");
var ChessBuff_1 = require("../Model/ChessBuff");
var InitSkillEffect_1 = require("./InitSkillEffect");
/**
 * 嘲讽，使得周围[0]范围内的所有目标强制攻击自己[1]秒,同时提升自己的护甲[2]点,被嘲讽的目标期间无法释放技能，若嘲讽者死亡，则被嘲讽效果直接结束
 */
var Sneer = /** @class */ (function (_super) {
    __extends(Sneer, _super);
    function Sneer() {
        return _super.call(this) || this;
    }
    Object.defineProperty(Sneer.prototype, "effectId", {
        get: function () {
            return SkillEffectEnum_1.SkillEffectEnum.sneer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sneer.prototype, "effName", {
        get: function () {
            return "sneer";
        },
        enumerable: true,
        configurable: true
    });
    /**
     * play
     */
    Sneer.prototype.play = function (data) {
        var attacker = data.attacker;
        if (!attacker || attacker.isDead) {
            return false;
        }
        var skillEff = data.skillEff;
        var range = skillEff.effArr[0];
        var lifeTime = skillEff.effArr[1];
        var defence = skillEff.effArr[2];
        //增加自身护甲
        var effInfo = new EffectInfo_1.EffectInfo();
        effInfo.init(SkillEffectEnum_1.SkillEffectEnum.addDefence, [defence, lifeTime]);
        var effData = new EffectInfo_1.EffData(effInfo, attacker, attacker);
        InitSkillEffect_1.skillEffects[SkillEffectEnum_1.SkillEffectEnum.addDefence].play(effData);
        //周围目标被嘲讽
        effInfo = new EffectInfo_1.EffectInfo();
        effInfo.init(SkillEffectEnum_1.SkillEffectEnum.sneer);
        var hitList = this.getRandomNpc(AutoBattleManager_1.g_AutoBattleManager.getEnemyList(attacker), 100, range, { x: attacker.posX, y: attacker.posY });
        for (var i = 0; i < hitList.length; i++) {
            var defender = hitList[i];
            defender.setTarget(attacker);
            var effData_1 = new EffectInfo_1.EffData(effInfo, attacker, defender);
            var chessBuff = new ChessBuff_1.ChessBuff(lifeTime, 0, defender, effData_1, SkillEffectEnum_1.BuffAndDotState.beSneer);
            defender.addBuff(chessBuff);
        }
        return true;
    };
    return Sneer;
}(BaseSkillEffect_1.BaseSkillEffect));
exports.Sneer = Sneer;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Sneer.js.map
        