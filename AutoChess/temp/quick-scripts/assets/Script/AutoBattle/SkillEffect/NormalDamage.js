(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/AutoBattle/SkillEffect/NormalDamage.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f5b8fUQjtxG6rJh1QdV9lJb', 'NormalDamage', __filename);
// Script/AutoBattle/SkillEffect/NormalDamage.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BaseSkillEffect_1 = require("./BaseSkillEffect");
var SkillEffectEnum_1 = require("./SkillEffectEnum");
var NormalDamage = /** @class */ (function (_super) {
    __extends(NormalDamage, _super);
    function NormalDamage() {
        return _super.call(this) || this;
    }
    Object.defineProperty(NormalDamage.prototype, "effectId", {
        get: function () {
            return SkillEffectEnum_1.SkillEffectEnum.damage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NormalDamage.prototype, "effName", {
        get: function () {
            return "normalDamage";
        },
        enumerable: true,
        configurable: true
    });
    /**
     * play
     */
    NormalDamage.prototype.play = function (data) {
        return true;
    };
    return NormalDamage;
}(BaseSkillEffect_1.BaseSkillEffect));
exports.NormalDamage = NormalDamage;

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
        //# sourceMappingURL=NormalDamage.js.map
        