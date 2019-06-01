(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/AutoBattle/SkillEffect/ThunderClap.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b641csxdnpCnbw2Fw/GEBI5', 'ThunderClap', __filename);
// Script/AutoBattle/SkillEffect/ThunderClap.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BaseSkillEffect_1 = require("./BaseSkillEffect");
var SkillEffectEnum_1 = require("./SkillEffectEnum");
var EffectInfo_1 = require("../Model/EffectInfo");
var AutoBattleManager_1 = require("../AutoBattleManager");
var InitSkillEffect_1 = require("./InitSkillEffect");
var ChessBuff_1 = require("../Model/ChessBuff");
/**
 *  雷霆一击, 对周围[0]格单位造成[1]点伤害，并降低[2]点攻速，持续[3]秒
 */
var ThunderClap = /** @class */ (function (_super) {
    __extends(ThunderClap, _super);
    function ThunderClap() {
        return _super.call(this) || this;
    }
    Object.defineProperty(ThunderClap.prototype, "effectId", {
        get: function () {
            return SkillEffectEnum_1.SkillEffectEnum.thunderClap;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ThunderClap.prototype, "effName", {
        get: function () {
            return "thunderClap";
        },
        enumerable: true,
        configurable: true
    });
    ThunderClap.prototype.play = function (data) {
        _super.prototype.play.call(this, data);
        var range = data.skillEff.effArr[0];
        var damage = data.skillEff.effArr[1];
        var attaSpeed = data.skillEff.effArr[2];
        var lifeTime = data.skillEff.effArr[3];
        var effectInfo = new EffectInfo_1.EffectInfo();
        effectInfo.init(SkillEffectEnum_1.SkillEffectEnum.damage, [damage, SkillEffectEnum_1.DamageType.magic]);
        var hitNpc = this.getRandomNpc(AutoBattleManager_1.g_AutoBattleManager.getEnemyList(data.attacker), 100, range, { x: data.attacker.posX, y: data.attacker.posY });
        for (var i = 0; i < hitNpc.length; i++) {
            var defender = hitNpc[i];
            var effdata = new EffectInfo_1.EffData(effectInfo, data.attacker, defender);
            InitSkillEffect_1.skillEffects[SkillEffectEnum_1.SkillEffectEnum.damage].play(effdata);
            var buff = new ChessBuff_1.ChessBuff(lifeTime, 0, defender);
            buff.setAttrChange("attackSpeed", -attaSpeed);
            defender.addBuff(buff);
        }
        return true;
    };
    return ThunderClap;
}(BaseSkillEffect_1.BaseSkillEffect));
exports.ThunderClap = ThunderClap;

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
        //# sourceMappingURL=ThunderClap.js.map
        