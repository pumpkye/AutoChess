"use strict";
cc._RF.push(module, '0616a9qT7lEdqkxclrZRrjQ', 'skillBaseData');
// Script/AutoBattle/TbxModel/skillBaseData.ts

Object.defineProperty(exports, "__esModule", { value: true });
var skill_data_1 = require("../Tbx/skill_data");
/**
 * @author  pumpkye
 * @des     技能配置数据的原型
 */
var SkillBaseData = /** @class */ (function () {
    /**
     * @description 通过baseId从配置文件中读取数据
     * @param baseId
     */
    function SkillBaseData(baseId) {
        this.baseId = 0;
        this.name = "";
        this.gcd = 0;
        this.type = 0;
        this.targetType = 0;
        this.des = "";
        this.baseId = baseId;
        var tbxData = skill_data_1.skill_data[baseId];
        if (tbxData) {
            for (var key in tbxData) {
                if (tbxData.hasOwnProperty(key) && this.hasOwnProperty(key)) {
                    this[key] = tbxData[key];
                }
            }
        }
    }
    return SkillBaseData;
}());
exports.SkillBaseData = SkillBaseData;

cc._RF.pop();