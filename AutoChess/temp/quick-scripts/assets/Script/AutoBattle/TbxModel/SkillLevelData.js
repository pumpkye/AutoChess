(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/AutoBattle/TbxModel/SkillLevelData.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '0685aC8jeNL1ppsVsslYEs2', 'SkillLevelData', __filename);
// Script/AutoBattle/TbxModel/SkillLevelData.ts

Object.defineProperty(exports, "__esModule", { value: true });
var skill_level_data_1 = require("../Tbx/skill_level_data");
/**
 * @author pumpkye
 * @des 技能等级相关数据
 */
var skillLevelData = /** @class */ (function () {
    function skillLevelData(id) {
        this.id = 0;
        this.level = 0;
        this.cd = 0;
        this.mp = 0;
        this.range = 0;
        this.status = "";
        this.id = id;
        var tbxData = skill_level_data_1.skill_level_data[id];
        if (tbxData) {
            for (var key in tbxData) {
                if (tbxData.hasOwnProperty(key) && this.hasOwnProperty(key)) {
                    this[key] = tbxData[key];
                }
            }
        }
    }
    return skillLevelData;
}());
exports.skillLevelData = skillLevelData;

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
        //# sourceMappingURL=SkillLevelData.js.map
        