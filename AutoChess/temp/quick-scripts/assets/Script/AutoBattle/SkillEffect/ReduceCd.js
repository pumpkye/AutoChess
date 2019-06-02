(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/AutoBattle/SkillEffect/ReduceCd.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '98679BhI0pMZqG73mum+X9s', 'ReduceCd', __filename);
// Script/AutoBattle/SkillEffect/ReduceCd.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BaseSkillEffect_1 = require("./BaseSkillEffect");
var SkillEffectEnum_1 = require("./SkillEffectEnum");
var ChessBuff_1 = require("../Model/ChessBuff");
/**
 * 减少技能cd[0]%
 */
var ReduceCd = /** @class */ (function (_super) {
    __extends(ReduceCd, _super);
    function ReduceCd() {
        return _super.call(this) || this;
    }
    Object.defineProperty(ReduceCd.prototype, "effectId", {
        get: function () {
            return SkillEffectEnum_1.SkillEffectEnum.reduceCd;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReduceCd.prototype, "effName", {
        get: function () {
            return "reduceCd";
        },
        enumerable: true,
        configurable: true
    });
    ReduceCd.prototype.play = function (data) {
        _super.prototype.play.call(this, data);
        var defender = data.defender;
        if (!defender || defender.isDead) {
            return false;
        }
        var reduceCdPercent = data.skillEff.effArr[0];
        defender.addAttrChange("reduceCD", new ChessBuff_1.AttrChangeInfo(reduceCdPercent));
        return true;
    };
    return ReduceCd;
}(BaseSkillEffect_1.BaseSkillEffect));
exports.ReduceCd = ReduceCd;

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
        //# sourceMappingURL=ReduceCd.js.map
        