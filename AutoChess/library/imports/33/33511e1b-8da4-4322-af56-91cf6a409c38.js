"use strict";
cc._RF.push(module, '335114bjaRDIq9Wkc9qQJw4', 'EffectInfo');
// Script/AutoBattle/Model/EffectInfo.ts

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 技能的效果字段
 */
var EffectInfo = /** @class */ (function () {
    function EffectInfo() {
        this._effId = 0;
    }
    /**
     * 使用效果字符串初始化
     * @param effStr 效果字段
     */
    EffectInfo.prototype.initByStr = function (effStr) {
        var strs = effStr.split(",");
        this._effId = Number(strs[0]);
        this._effArr = new Array();
        for (var i = 1; i < strs.length; i++) {
            var e = Number(strs[i]);
            this._effArr.push(e);
        }
    };
    /**
     * 使用具体参数初始化
     * @param effId
     * @param effArr
     */
    EffectInfo.prototype.init = function (effId, effArr) {
        this._effId = effId;
        this.effArr = effArr;
    };
    Object.defineProperty(EffectInfo.prototype, "effId", {
        /**
         * 技能效果Id
         */
        get: function () {
            return this._effId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EffectInfo.prototype, "effArr", {
        get: function () {
            return this._effArr;
        },
        /**
         * 效果字段
         */
        set: function (v) {
            this._effArr = v;
        },
        enumerable: true,
        configurable: true
    });
    return EffectInfo;
}());
exports.EffectInfo = EffectInfo;
/**
 * 为skillEffect提供输入,包含effectInfo和attacker
 */
var EffData = /** @class */ (function () {
    function EffData(skillEff, attacker, defender) {
        this.race = 0;
        this.career = 0;
        this.skillEff = skillEff;
        this.attacker = attacker;
        this.defender = defender;
    }
    return EffData;
}());
exports.EffData = EffData;

cc._RF.pop();