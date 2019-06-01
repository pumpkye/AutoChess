(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/AutoBattle/SkillEffect/WarFever.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '8305dKU0HtF0biwGe4tyAI1', 'WarFever', __filename);
// Script/AutoBattle/SkillEffect/WarFever.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BaseSkillEffect_1 = require("./BaseSkillEffect");
var SkillEffectEnum_1 = require("./SkillEffectEnum");
var ChessBuff_1 = require("../Model/ChessBuff");
/**
 * 每百分之一的血量损失提供[0]点的攻速提升和[1]点的魔抗
 */
var WarFever = /** @class */ (function (_super) {
    __extends(WarFever, _super);
    function WarFever() {
        return _super.call(this) || this;
    }
    Object.defineProperty(WarFever.prototype, "effectId", {
        get: function () {
            return SkillEffectEnum_1.SkillEffectEnum.warFever;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WarFever.prototype, "effName", {
        get: function () {
            return "warFever";
        },
        enumerable: true,
        configurable: true
    });
    WarFever.prototype.play = function (data) {
        _super.prototype.play.call(this, data);
        if (!data.defender || data.defender.isDead) {
            return;
        }
        var attackSpeed = data.skillEff.effArr[0];
        var mDefence = data.skillEff.effArr[1];
        data.defender.addAttrChange("warFever", new ChessBuff_1.AttrChangeInfo({ attackSpeed: attackSpeed, mDefence: mDefence }));
        return true;
    };
    return WarFever;
}(BaseSkillEffect_1.BaseSkillEffect));
exports.WarFever = WarFever;

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
        //# sourceMappingURL=WarFever.js.map
        