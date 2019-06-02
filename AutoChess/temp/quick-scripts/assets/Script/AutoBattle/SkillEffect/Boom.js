(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/AutoBattle/SkillEffect/Boom.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '69eecxvksNIYJsLlKRuc0mS', 'Boom', __filename);
// Script/AutoBattle/SkillEffect/Boom.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BaseSkillEffect_1 = require("./BaseSkillEffect");
var SkillEffectEnum_1 = require("./SkillEffectEnum");
var ChessBuff_1 = require("../Model/ChessBuff");
/**
 *  boom，死亡时造成伤害并眩晕[0]秒，伤害数值为其之前造成的伤害的[1]%，该伤害结算会在该单位死亡之前
 */
var Boom = /** @class */ (function (_super) {
    __extends(Boom, _super);
    function Boom() {
        return _super.call(this) || this;
    }
    Object.defineProperty(Boom.prototype, "effectId", {
        get: function () {
            return SkillEffectEnum_1.SkillEffectEnum.boom;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Boom.prototype, "effName", {
        get: function () {
            return "boom";
        },
        enumerable: true,
        configurable: true
    });
    Boom.prototype.play = function (data) {
        _super.prototype.play.call(this, data);
        if (!data.defender || data.defender.isDead) {
            return;
        }
        // let range = data.skillEff.effArr[0];
        var comaTime = data.skillEff.effArr[0];
        var damagePer = data.skillEff.effArr[1];
        data.defender.addAttrChange("boom", new ChessBuff_1.AttrChangeInfo({ comaTime: comaTime, damagePer: damagePer }));
        return true;
    };
    return Boom;
}(BaseSkillEffect_1.BaseSkillEffect));
exports.Boom = Boom;

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
        //# sourceMappingURL=Boom.js.map
        