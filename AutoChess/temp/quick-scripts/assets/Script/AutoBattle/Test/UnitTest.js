(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/AutoBattle/Test/UnitTest.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '9953ffXTLVILa14rmlKXaeM', 'UnitTest', __filename);
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
        //# sourceMappingURL=UnitTest.js.map
        