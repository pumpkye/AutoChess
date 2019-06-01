(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/AutoBattle/SkillEffect/Banish.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '53257gxa3JHjI3TFaunWUNj', 'Banish', __filename);
// Script/AutoBattle/SkillEffect/Banish.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BaseSkillEffect_1 = require("./BaseSkillEffect");
var SkillEffectEnum_1 = require("./SkillEffectEnum");
var ChessBuff_1 = require("../Model/ChessBuff");
/**
 * 放逐，使当前目标无法攻击，也不会受到物理伤害，但是受到[0]%的魔法伤害，持续[1]秒
 */
var Banish = /** @class */ (function (_super) {
    __extends(Banish, _super);
    function Banish() {
        return _super.call(this) || this;
    }
    Object.defineProperty(Banish.prototype, "effectId", {
        get: function () {
            return SkillEffectEnum_1.SkillEffectEnum.banish;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Banish.prototype, "effName", {
        get: function () {
            return "banish";
        },
        enumerable: true,
        configurable: true
    });
    Banish.prototype.play = function (data) {
        _super.prototype.play.call(this, data);
        if (!data.defender || data.defender.isDead) {
            return;
        }
        var mdPer = data.skillEff.effArr[0];
        var lifeTime = data.skillEff.effArr[1];
        var buff = new ChessBuff_1.ChessBuff(lifeTime, 0, data.defender, null, SkillEffectEnum_1.BuffAndDotState.beBanish);
        buff.setAttrChange("banish", mdPer);
        data.defender.addBuff(buff);
        return true;
    };
    return Banish;
}(BaseSkillEffect_1.BaseSkillEffect));
exports.Banish = Banish;

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
        //# sourceMappingURL=Banish.js.map
        