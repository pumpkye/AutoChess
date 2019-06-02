(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/AutoBattle/SkillEffect/BigFireBall.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'dea6fQrQQlNSLLW4R5RtoJi', 'BigFireBall', __filename);
// Script/AutoBattle/SkillEffect/BigFireBall.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BaseSkillEffect_1 = require("./BaseSkillEffect");
var SkillEffectEnum_1 = require("./SkillEffectEnum");
var EffectInfo_1 = require("../model/EffectInfo");
var AutoBattleManager_1 = require("../AutoBattleManager");
var InitSkillEffect_1 = require("./InitSkillEffect");
var ChessBuff_1 = require("../Model/ChessBuff");
/**
 * 炎爆，对目标和周围[0]格单位造成[1]点伤害[2]秒眩晕
 */
var BigFireBall = /** @class */ (function (_super) {
    __extends(BigFireBall, _super);
    function BigFireBall() {
        return _super.call(this) || this;
    }
    Object.defineProperty(BigFireBall.prototype, "effectId", {
        get: function () {
            return SkillEffectEnum_1.SkillEffectEnum.bigFireBall;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BigFireBall.prototype, "effName", {
        get: function () {
            return "bigFireBall";
        },
        enumerable: true,
        configurable: true
    });
    BigFireBall.prototype.play = function (data) {
        _super.prototype.play.call(this, data);
        var range = data.skillEff.effArr[0];
        var damage = data.skillEff.effArr[1];
        var lifeTime = data.skillEff.effArr[2];
        var effInfo = new EffectInfo_1.EffectInfo();
        effInfo.init(SkillEffectEnum_1.SkillEffectEnum.damage, [damage, SkillEffectEnum_1.DamageType.magic]);
        var hitNpc = this.getRandomNpc(AutoBattleManager_1.g_AutoBattleManager.getEnemyList(data.attacker), 100, range, { x: data.defender.posX, y: data.defender.posY });
        for (var i = 0; i < hitNpc.length; i++) {
            var defender = hitNpc[i];
            var effData = new EffectInfo_1.EffData(effInfo, data.attacker, defender);
            InitSkillEffect_1.skillEffects[SkillEffectEnum_1.SkillEffectEnum.damage].play(effData);
            // 眩晕
            var buff = new ChessBuff_1.ChessBuff(lifeTime, 0, defender, null, SkillEffectEnum_1.BuffAndDotState.coma);
            defender.addBuff(buff);
        }
        return true;
    };
    return BigFireBall;
}(BaseSkillEffect_1.BaseSkillEffect));
exports.BigFireBall = BigFireBall;

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
        //# sourceMappingURL=BigFireBall.js.map
        