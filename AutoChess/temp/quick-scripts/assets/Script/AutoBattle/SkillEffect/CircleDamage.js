(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/AutoBattle/SkillEffect/CircleDamage.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ca665U8SAlGJpGr4WB9yOUG', 'CircleDamage', __filename);
// Script/AutoBattle/SkillEffect/CircleDamage.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BaseSkillEffect_1 = require("./BaseSkillEffect");
var SkillEffectEnum_1 = require("./SkillEffectEnum");
var EffectInfo_1 = require("../Model/EffectInfo");
var AutoBattleManager_1 = require("../AutoBattleManager");
var InitSkillEffect_1 = require("./InitSkillEffect");
/**
 * 对[0]范围内[1]个目标造成[2]点魔法伤害
 */
var CircleDamage = /** @class */ (function (_super) {
    __extends(CircleDamage, _super);
    function CircleDamage() {
        return _super.call(this) || this;
    }
    Object.defineProperty(CircleDamage.prototype, "effectId", {
        get: function () {
            return SkillEffectEnum_1.SkillEffectEnum.circleDamage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CircleDamage.prototype, "effName", {
        get: function () {
            return "circleDamage";
        },
        enumerable: true,
        configurable: true
    });
    /**
     * play
     */
    CircleDamage.prototype.play = function (data) {
        _super.prototype.play.call(this, data);
        var skillEff = data.skillEff;
        var range = skillEff.effArr[0];
        var count = skillEff.effArr[1];
        var damage = skillEff.effArr[2];
        var effInfo = new EffectInfo_1.EffectInfo();
        effInfo.init(SkillEffectEnum_1.SkillEffectEnum.damage, [damage, SkillEffectEnum_1.DamageType.magic]);
        var hitNpc = this.getRandomNpc(AutoBattleManager_1.g_AutoBattleManager.getEnemyList(data.attacker), count, range, { x: data.defender.posX, y: data.defender.posY });
        for (var i = 0; i < hitNpc.length; i++) {
            var defender = hitNpc[i];
            var effData = new EffectInfo_1.EffData(effInfo, data.attacker, defender);
            InitSkillEffect_1.skillEffects[SkillEffectEnum_1.SkillEffectEnum.damage].play(effData);
        }
        return true;
    };
    return CircleDamage;
}(BaseSkillEffect_1.BaseSkillEffect));
exports.CircleDamage = CircleDamage;

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
        //# sourceMappingURL=CircleDamage.js.map
        