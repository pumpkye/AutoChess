(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/AutoBattle/SkillEffect/Tenacity.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a08b9pSd7BHKZIXWiWPc49u', 'Tenacity', __filename);
// Script/AutoBattle/SkillEffect/Tenacity.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BaseSkillEffect_1 = require("./BaseSkillEffect");
var SkillEffectEnum_1 = require("./SkillEffectEnum");
var EffectInfo_1 = require("../Model/EffectInfo");
var ChessBuff_1 = require("../Model/ChessBuff");
/**
 * 增加状态抗性[0]%,增加回血每[1]秒[2]点
 */
var Tenacity = /** @class */ (function (_super) {
    __extends(Tenacity, _super);
    function Tenacity() {
        return _super.call(this) || this;
    }
    Object.defineProperty(Tenacity.prototype, "effectId", {
        get: function () {
            return SkillEffectEnum_1.SkillEffectEnum.tenacity;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tenacity.prototype, "effName", {
        get: function () {
            return "tenacity";
        },
        enumerable: true,
        configurable: true
    });
    Tenacity.prototype.play = function (data) {
        _super.prototype.play.call(this, data);
        var defender = data.defender;
        if (!defender || defender.isDead) {
            return false;
        }
        var rhp = data.skillEff.effArr[2];
        var rhpt = data.skillEff.effArr[1];
        var reduceDebuffPer = data.skillEff.effArr[0];
        var effInfo = new EffectInfo_1.EffectInfo();
        effInfo.init(SkillEffectEnum_1.SkillEffectEnum.recoverHp, [rhp]);
        var effData = new EffectInfo_1.EffData(effInfo, data.attacker, data.defender);
        var buff = new ChessBuff_1.ChessBuff(0, rhpt, data.defender, effData);
        buff.setAttrChange("reduceDebuffTime", reduceDebuffPer);
        data.defender.addBuff(buff);
        return true;
    };
    return Tenacity;
}(BaseSkillEffect_1.BaseSkillEffect));
exports.Tenacity = Tenacity;

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
        //# sourceMappingURL=Tenacity.js.map
        