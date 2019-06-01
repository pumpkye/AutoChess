"use strict";
cc._RF.push(module, '7c856+YWwJGAbIQ44vPyiA+', 'UnitTest');
// Script/AutoBattle/Test/UnitTest.ts

Object.defineProperty(exports, "__esModule", { value: true });
var SkillBaseData_1 = require("../TbxModel/SkillBaseData");
var ChessNpcBaseData_1 = require("../TbxModel/ChessNpcBaseData");
var SkillLevelData_1 = require("../TbxModel/SkillLevelData");
function testSkillBaseData() {
    var skillBase = new SkillBaseData_1.SkillBaseData(1);
    console.log(skillBase);
}
exports.testSkillBaseData = testSkillBaseData;
function testNpcBaseData() {
    var data = new ChessNpcBaseData_1.ChessNpcBaseData(1);
    console.log(data);
}
exports.testNpcBaseData = testNpcBaseData;
function testSkillLevelData() {
    var data = new SkillLevelData_1.skillLevelData(101);
    console.log(data);
}
exports.testSkillLevelData = testSkillLevelData;

cc._RF.pop();