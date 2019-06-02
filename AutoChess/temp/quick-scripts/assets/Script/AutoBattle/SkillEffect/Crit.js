(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/AutoBattle/SkillEffect/Crit.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '03503qMWjBK3ZEJclr2QKzI', 'Crit', __filename);
// Script/AutoBattle/SkillEffect/Crit.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BaseSkillEffect_1 = require("./BaseSkillEffect");
var SkillEffectEnum_1 = require("./SkillEffectEnum");
var ChessBuff_1 = require("../Model/ChessBuff");
/**
 * 普通攻击有[0]几率造成[1]%的暴击伤害
 */
var Crit = /** @class */ (function (_super) {
    __extends(Crit, _super);
    function Crit() {
        return _super.call(this) || this;
    }
    Object.defineProperty(Crit.prototype, "effectId", {
        get: function () {
            return SkillEffectEnum_1.SkillEffectEnum.crit;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Crit.prototype, "effName", {
        get: function () {
            return "crit";
        },
        enumerable: true,
        configurable: true
    });
    Crit.prototype.play = function (data) {
        _super.prototype.play.call(this, data);
        var defender = data.defender;
        if (!defender || defender.isDead) {
            return false;
        }
        var per = data.skillEff.effArr[0];
        var mul = data.skillEff.effArr[1];
        defender.addAttrChange("crit", new ChessBuff_1.AttrChangeInfo({ per: per, mul: mul }));
        // defender.addBuff(buff);
        return true;
    };
    return Crit;
}(BaseSkillEffect_1.BaseSkillEffect));
exports.Crit = Crit;

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
        //# sourceMappingURL=Crit.js.map
        