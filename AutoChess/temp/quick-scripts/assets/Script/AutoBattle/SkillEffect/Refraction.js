(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/AutoBattle/SkillEffect/Refraction.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '012f1SiaSRKJre68kcpzpKd', 'Refraction', __filename);
// Script/AutoBattle/SkillEffect/Refraction.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BaseSkillEffect_1 = require("./BaseSkillEffect");
var SkillEffectEnum_1 = require("./SkillEffectEnum");
var ChessBuff_1 = require("../Model/ChessBuff");
/**
 * 折光，接下来的[0]次攻击增加[1]点伤害，并免疫接下来的[2]次攻击,持续[3]秒
 */
var Refraction = /** @class */ (function (_super) {
    __extends(Refraction, _super);
    function Refraction() {
        return _super.call(this) || this;
    }
    Object.defineProperty(Refraction.prototype, "effectId", {
        get: function () {
            return SkillEffectEnum_1.SkillEffectEnum.refraction;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Refraction.prototype, "effName", {
        get: function () {
            return "refraction";
        },
        enumerable: true,
        configurable: true
    });
    Refraction.prototype.play = function (data) {
        _super.prototype.play.call(this, data);
        var defender = data.defender;
        if (!defender || defender.isDead) {
            return false;
        }
        var skillEff = data.skillEff.effArr;
        var aTime = skillEff[0];
        var damage = skillEff[1];
        var mTime = skillEff[2];
        var lifeTime = skillEff[3];
        var shield = new ChessBuff_1.AddDamageShield(lifeTime, aTime, defender, damage);
        defender.addShield(shield);
        shield = new ChessBuff_1.MissDamageShield(lifeTime, mTime, defender, null);
        defender.addShield(shield);
        return true;
    };
    return Refraction;
}(BaseSkillEffect_1.BaseSkillEffect));
exports.Refraction = Refraction;

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
        //# sourceMappingURL=Refraction.js.map
        