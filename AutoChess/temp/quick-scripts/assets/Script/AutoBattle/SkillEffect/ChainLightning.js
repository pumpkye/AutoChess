(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/AutoBattle/SkillEffect/ChainLightning.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ab922mixZ1BfZ1+X0ehlrfL', 'ChainLightning', __filename);
// Script/AutoBattle/SkillEffect/ChainLightning.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BaseSkillEffect_1 = require("./BaseSkillEffect");
var SkillEffectEnum_1 = require("./SkillEffectEnum");
var EffectInfo_1 = require("../Model/EffectInfo");
var InitSkillEffect_1 = require("./InitSkillEffect");
var AutoBattleManager_1 = require("../AutoBattleManager");
var ChessBuff_1 = require("../Model/ChessBuff");
/**
 * 对目标和周边[0]格的[1]个单位造成[2]点伤害，并在随后的[3]秒时间内沉默被击中的目标
 */
var ChainLightning = /** @class */ (function (_super) {
    __extends(ChainLightning, _super);
    function ChainLightning() {
        return _super.call(this) || this;
    }
    Object.defineProperty(ChainLightning.prototype, "effectId", {
        get: function () {
            return SkillEffectEnum_1.SkillEffectEnum.chainLightning;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChainLightning.prototype, "effName", {
        get: function () {
            return "chainLightning";
        },
        enumerable: true,
        configurable: true
    });
    ChainLightning.prototype.play = function (data) {
        _super.prototype.play.call(this, data);
        var range = data.skillEff.effArr[0];
        var count = data.skillEff.effArr[1];
        var damage = data.skillEff.effArr[2];
        var lifeTime = data.skillEff.effArr[3];
        var effInfo = new EffectInfo_1.EffectInfo();
        effInfo.init(SkillEffectEnum_1.SkillEffectEnum.damage, [damage, SkillEffectEnum_1.DamageType.magic]);
        var hitNpc = this.getRandomNpc(AutoBattleManager_1.g_AutoBattleManager.getEnemyList(data.attacker), count, range, { x: data.defender.posX, y: data.defender.posY });
        for (var i = 0; i < hitNpc.length; i++) {
            var defender = hitNpc[i];
            var effData = new EffectInfo_1.EffData(effInfo, data.attacker, defender);
            InitSkillEffect_1.skillEffects[SkillEffectEnum_1.SkillEffectEnum.damage].play(effData);
            //沉默
            var chessBuff = new ChessBuff_1.ChessBuff(lifeTime, 0, defender, null, SkillEffectEnum_1.BuffAndDotState.silent);
            defender.addBuff(chessBuff);
        }
        return true;
    };
    return ChainLightning;
}(BaseSkillEffect_1.BaseSkillEffect));
exports.ChainLightning = ChainLightning;

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
        //# sourceMappingURL=ChainLightning.js.map
        