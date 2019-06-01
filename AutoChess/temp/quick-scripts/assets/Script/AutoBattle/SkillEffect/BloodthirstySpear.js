(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/AutoBattle/SkillEffect/BloodthirstySpear.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '30bd4RfKOlHdqHziBQBqS2U', 'BloodthirstySpear', __filename);
// Script/AutoBattle/SkillEffect/BloodthirstySpear.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BaseSkillEffect_1 = require("./BaseSkillEffect");
var SkillEffectEnum_1 = require("./SkillEffectEnum");
var ChessBuff_1 = require("../Model/ChessBuff");
/**
 * 嗜血之矛,每次攻击时消耗自身[0]点生命值，对目标造成每秒[1]点纯粹伤害，持续[2]秒，该伤害可以叠加，该伤害生效时会为自己恢复生命值
 */
var BloodthirstySpear = /** @class */ (function (_super) {
    __extends(BloodthirstySpear, _super);
    function BloodthirstySpear() {
        return _super.call(this) || this;
    }
    Object.defineProperty(BloodthirstySpear.prototype, "effectId", {
        get: function () {
            return SkillEffectEnum_1.SkillEffectEnum.bloodthirstySpear;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BloodthirstySpear.prototype, "effName", {
        get: function () {
            return "bloodthirstySpear";
        },
        enumerable: true,
        configurable: true
    });
    BloodthirstySpear.prototype.play = function (data) {
        _super.prototype.play.call(this, data);
        if (!data.defender || data.defender.isDead) {
            return;
        }
        var hpReduce = data.skillEff.effArr[0];
        var damage = data.skillEff.effArr[1];
        var lifeTime = data.skillEff.effArr[2];
        data.defender.addAttrChange("bloodthirstySpear", new ChessBuff_1.AttrChangeInfo({ hpReduce: hpReduce, damage: damage, lifeTime: lifeTime }));
        return true;
    };
    return BloodthirstySpear;
}(BaseSkillEffect_1.BaseSkillEffect));
exports.BloodthirstySpear = BloodthirstySpear;

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
        //# sourceMappingURL=BloodthirstySpear.js.map
        