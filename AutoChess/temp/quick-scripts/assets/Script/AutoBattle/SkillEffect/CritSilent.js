(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/AutoBattle/SkillEffect/CritSilent.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e4647Yc2htJAoI2hRsXbK7f', 'CritSilent', __filename);
// Script/AutoBattle/SkillEffect/CritSilent.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BaseSkillEffect_1 = require("./BaseSkillEffect");
var SkillEffectEnum_1 = require("./SkillEffectEnum");
var ChessBuff_1 = require("../Model/ChessBuff");
/**
 * 暴击时触发效果，沉默当前目标[0]秒
 */
var CritSilent = /** @class */ (function (_super) {
    __extends(CritSilent, _super);
    function CritSilent() {
        return _super.call(this) || this;
    }
    Object.defineProperty(CritSilent.prototype, "effectId", {
        get: function () {
            return SkillEffectEnum_1.SkillEffectEnum.critSilent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CritSilent.prototype, "effName", {
        get: function () {
            return "critSilent";
        },
        enumerable: true,
        configurable: true
    });
    CritSilent.prototype.play = function (data) {
        _super.prototype.play.call(this, data);
        if (!data.defender || data.defender.isDead) {
            return false;
        }
        var silentTime = data.skillEff.effArr[0];
        data.defender.addAttrChange("critSilent", new ChessBuff_1.AttrChangeInfo(silentTime));
        return true;
    };
    return CritSilent;
}(BaseSkillEffect_1.BaseSkillEffect));
exports.CritSilent = CritSilent;

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
        //# sourceMappingURL=CritSilent.js.map
        