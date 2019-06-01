(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/AutoBattle/SkillEffect/AddDefence.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '1d3fagaCa5CrZIc84bSfrh+', 'AddDefence', __filename);
// Script/AutoBattle/SkillEffect/AddDefence.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BaseSkillEffect_1 = require("./BaseSkillEffect");
var SkillEffectEnum_1 = require("./SkillEffectEnum");
var ChessBuff_1 = require("../Model/ChessBuff");
/**
 * 增加护甲[0]点，持续[1]秒
 */
var AddDefence = /** @class */ (function (_super) {
    __extends(AddDefence, _super);
    function AddDefence() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AddDefence.prototype, "effectId", {
        get: function () {
            return SkillEffectEnum_1.SkillEffectEnum.addDefence;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddDefence.prototype, "effName", {
        get: function () {
            return "addDefence";
        },
        enumerable: true,
        configurable: true
    });
    /**
     * play
     */
    AddDefence.prototype.play = function (data) {
        var defender = data.defender;
        if (!defender || defender.isDead) {
            return false;
        }
        var addDefence = data.skillEff.effArr[0];
        var lifeTime = data.skillEff.effArr[1];
        if (lifeTime != 0) {
            var buff = new ChessBuff_1.ChessBuff(lifeTime, 0, defender);
            buff.setAttrChange("defence", addDefence);
            defender.addBuff(buff);
        }
        else {
            defender.addAttrChange("defence", new ChessBuff_1.AttrChangeInfo(addDefence));
        }
        return true;
    };
    return AddDefence;
}(BaseSkillEffect_1.BaseSkillEffect));
exports.AddDefence = AddDefence;

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
        //# sourceMappingURL=AddDefence.js.map
        