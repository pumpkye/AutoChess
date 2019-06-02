(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/AutoBattle/SkillEffect/MulDamage.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '730c2nktghAUYJgbz5xBE4P', 'MulDamage', __filename);
// Script/AutoBattle/SkillEffect/MulDamage.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BaseSkillEffect_1 = require("./BaseSkillEffect");
var SkillEffectEnum_1 = require("./SkillEffectEnum");
var ChessBuff_1 = require("../Model/ChessBuff");
/**
 * 增加[0]%攻击力，持续[1]秒
 */
var MulDamage = /** @class */ (function (_super) {
    __extends(MulDamage, _super);
    function MulDamage() {
        return _super.call(this) || this;
    }
    Object.defineProperty(MulDamage.prototype, "effectId", {
        get: function () {
            return SkillEffectEnum_1.SkillEffectEnum.mulDamage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MulDamage.prototype, "effName", {
        get: function () {
            return "mulDamage";
        },
        enumerable: true,
        configurable: true
    });
    MulDamage.prototype.play = function (data) {
        _super.prototype.play.call(this, data);
        var defender = data.defender;
        if (!defender || defender.isDead) {
            return false;
        }
        var damage = data.skillEff.effArr[0] * defender.damage / 100;
        var lifeTime = data.skillEff.effArr[1];
        if (lifeTime != 0) {
            var buff = new ChessBuff_1.ChessBuff(lifeTime, 0, defender);
            buff.setAttrChange("damage", damage);
            defender.addBuff(buff);
        }
        else {
            defender.addAttrChange("damage", new ChessBuff_1.AttrChangeInfo(damage));
        }
        return true;
    };
    return MulDamage;
}(BaseSkillEffect_1.BaseSkillEffect));
exports.MulDamage = MulDamage;

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
        //# sourceMappingURL=MulDamage.js.map
        