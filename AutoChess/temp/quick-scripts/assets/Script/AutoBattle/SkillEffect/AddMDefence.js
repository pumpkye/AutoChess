(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/AutoBattle/SkillEffect/AddMDefence.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '550dcifzz1IB5JczWwBdqQs', 'AddMDefence', __filename);
// Script/AutoBattle/SkillEffect/AddMDefence.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BaseSkillEffect_1 = require("./BaseSkillEffect");
var SkillEffectEnum_1 = require("./SkillEffectEnum");
var ChessBuff_1 = require("../Model/ChessBuff");
/**
 * 增加魔抗[0]点，持续[1]秒
 */
var AddMDefence = /** @class */ (function (_super) {
    __extends(AddMDefence, _super);
    function AddMDefence() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AddMDefence.prototype, "effectId", {
        get: function () {
            return SkillEffectEnum_1.SkillEffectEnum.addMDefence;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddMDefence.prototype, "effName", {
        get: function () {
            return "addMDefence";
        },
        enumerable: true,
        configurable: true
    });
    AddMDefence.prototype.play = function (data) {
        var defender = data.defender;
        if (!defender || defender.isDead) {
            return false;
        }
        var addMDefence = data.skillEff.effArr[0];
        var lifeTime = data.skillEff.effArr[1];
        if (lifeTime != 0) {
            var buff = new ChessBuff_1.ChessBuff(lifeTime, 0, defender);
            buff.setAttrChange("mDefence", addMDefence);
            defender.addBuff(buff);
        }
        else {
            defender.addAttrChange("mDefence", new ChessBuff_1.AttrChangeInfo(addMDefence));
        }
        return true;
    };
    return AddMDefence;
}(BaseSkillEffect_1.BaseSkillEffect));
exports.AddMDefence = AddMDefence;

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
        //# sourceMappingURL=AddMDefence.js.map
        