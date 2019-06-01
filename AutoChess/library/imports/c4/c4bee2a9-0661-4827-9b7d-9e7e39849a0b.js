"use strict";
cc._RF.push(module, 'c4beeKpBmFIJ5t9nn45hJoL', 'LineDamage');
// Script/AutoBattle/SkillEffect/LineDamage.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BaseSkillEffect_1 = require("./BaseSkillEffect");
var SkillEffectEnum_1 = require("./SkillEffectEnum");
var EffectInfo_1 = require("../Model/EffectInfo");
var AutoBattleConfig_1 = require("../Config/AutoBattleConfig");
var AutoBattleManager_1 = require("../AutoBattleManager");
var Util_1 = require("../Util");
var InitSkillEffect_1 = require("./InitSkillEffect");
/**
 * 对当前方向一条长度为[0],宽度为[1]的直线上的目标造成[2]点魔法伤害
 */
var LineDamage = /** @class */ (function (_super) {
    __extends(LineDamage, _super);
    function LineDamage() {
        return _super.call(this) || this;
    }
    Object.defineProperty(LineDamage.prototype, "effectId", {
        get: function () {
            return SkillEffectEnum_1.SkillEffectEnum.lineDamage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineDamage.prototype, "effName", {
        get: function () {
            return "lineDamage";
        },
        enumerable: true,
        configurable: true
    });
    /**
     * play
     */
    LineDamage.prototype.play = function (data) {
        _super.prototype.play.call(this, data);
        var skillEff = data.skillEff;
        var length = skillEff.effArr[0];
        var width = skillEff.effArr[1];
        var damage = skillEff.effArr[2];
        var effArr = new Array();
        effArr.push(damage);
        effArr.push(SkillEffectEnum_1.DamageType.magic);
        var effInfo = new EffectInfo_1.EffectInfo();
        effInfo.init(SkillEffectEnum_1.SkillEffectEnum.damage, effArr);
        var linePos = new Array();
        var dirT = AutoBattleConfig_1.dirConfig[data.attacker.dir];
        for (var i = 0; i < length; i++) {
            var posX = data.attacker.posX + dirT.x * i;
            var posY = data.attacker.posY + dirT.y * i;
            if (posX > -1 && posX < 8 && posY > -1 && posY < 8) {
                linePos.push({ x: posX, y: posY });
            }
            else {
                break;
            }
        }
        var hitNpc = new Array();
        for (var i = 0; i < AutoBattleManager_1.g_AutoBattleManager.getEnemyList(data.attacker).length; i++) {
            var npc = AutoBattleManager_1.g_AutoBattleManager.getEnemyList(data.attacker)[i];
            for (var j = 0; j < linePos.length; j++) {
                var center = linePos[j];
                if (Util_1.g_Util.checkPosShortInRange(center.x, center.y, npc.posX, npc.posY, width)) {
                    hitNpc.push(npc);
                    break;
                }
            }
        }
        for (var i = 0; i < hitNpc.length; i++) {
            var defender = hitNpc[i];
            var effData = new EffectInfo_1.EffData(effInfo, data.attacker, defender);
            InitSkillEffect_1.skillEffects[SkillEffectEnum_1.SkillEffectEnum.damage].play(effData);
        }
        return true;
    };
    return LineDamage;
}(BaseSkillEffect_1.BaseSkillEffect));
exports.LineDamage = LineDamage;

cc._RF.pop();