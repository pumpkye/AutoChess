(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/AutoBattle/SkillEffect/ManaBurn.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd6417lqSJBDK44GINdhjMzI', 'ManaBurn', __filename);
// Script/AutoBattle/SkillEffect/ManaBurn.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BaseSkillEffect_1 = require("./BaseSkillEffect");
var SkillEffectEnum_1 = require("./SkillEffectEnum");
var ChessBuff_1 = require("../Model/ChessBuff");
/**
 *  法力燃烧，每次普攻都会削减目标[0]点魔法，并且造成削减魔法量[1]%的伤害
 */
var ManaBurn = /** @class */ (function (_super) {
    __extends(ManaBurn, _super);
    function ManaBurn() {
        return _super.call(this) || this;
    }
    Object.defineProperty(ManaBurn.prototype, "effectId", {
        get: function () {
            return SkillEffectEnum_1.SkillEffectEnum.manaBurn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ManaBurn.prototype, "effName", {
        get: function () {
            return "manaBurn";
        },
        enumerable: true,
        configurable: true
    });
    ManaBurn.prototype.play = function (data) {
        _super.prototype.play.call(this, data);
        if (!data.defender || data.defender.isDead) {
            return;
        }
        var mana = data.skillEff.effArr[0];
        var damagePer = data.skillEff.effArr[1];
        data.defender.addAttrChange("manaBurn", new ChessBuff_1.AttrChangeInfo({ mana: mana, damagePer: damagePer }));
        return true;
    };
    return ManaBurn;
}(BaseSkillEffect_1.BaseSkillEffect));
exports.ManaBurn = ManaBurn;

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
        //# sourceMappingURL=ManaBurn.js.map
        