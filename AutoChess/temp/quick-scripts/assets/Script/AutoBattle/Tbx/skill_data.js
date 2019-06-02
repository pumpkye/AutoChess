(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/AutoBattle/Tbx/skill_data.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '18a87KB46RPFr2MQoB0tOUn', 'skill_data', __filename);
// Script/AutoBattle/Tbx/skill_data.ts

Object.defineProperty(exports, "__esModule", { value: true });
exports.skill_data = {
    "1": { "name": "测试技能", "gcd": 1000, "type": 1, "targetType": 0, "des": "用于测试数据读取" },
    "994": { "name": "近战普攻", "gcd": 1000, "type": 0, "targetType": 0, "des": "" },
    "995": { "name": "远程普攻", "gcd": 1000, "type": 0, "targetType": 0, "des": "" },
    "1001": { "name": "嘲讽", "gcd": 500, "type": 1, "targetType": 1, "des": "强制周围单位攻击自己" },
    "1002": { "name": "旋风斩", "gcd": 1000, "type": 1, "targetType": 1, "des": "魔免，每秒对周围单位造成aoe伤害" },
    "1003": { "name": "治疗链", "gcd": 1000, "type": 1, "targetType": 1, "des": "百分比治疗己方血量最低的几个单位" },
    "1004": { "name": "闪电风暴", "gcd": 1000, "type": 1, "targetType": 0, "des": "对敌方目标和周围单位造成持续的魔法伤害和沉默" },
    "1005": { "name": "狼灵伙伴", "gcd": 1000, "type": 1, "targetType": 1, "des": "召唤两只狼" },
    "1006": { "name": "撕裂", "gcd": 1000, "type": 1, "targetType": 0, "des": "降低目标攻速并造成持续伤害" },
    "1007": { "name": "横扫", "gcd": 1000, "type": 1, "targetType": 0, "des": "对目标造成3倍普攻伤害，对目标周围单位造成1倍aoe" },
    "1008": { "name": "咆哮", "gcd": 1000, "type": 1, "targetType": 1, "des": "眩晕周围单位并造成伤害" },
    "1009": { "name": "战吼", "gcd": 1000, "type": 1, "targetType": 1, "des": "为自己和周围单位减伤" },
    "1010": { "name": "闷棍", "gcd": 1000, "type": 1, "targetType": 0, "des": "眩晕" },
    "1011": { "name": "炎爆术", "gcd": 1000, "type": 1, "targetType": 0, "des": "引导施法，对目标及周围单位造成巨大伤害和眩晕" },
    "1012": { "name": "奥术光环", "gcd": 1000, "type": 2, "targetType": 1, "des": "回蓝光环" },
    "1013": { "name": "沉默", "gcd": 1000, "type": 2, "targetType": 1, "des": "触发暴击时沉默目标" },
    "1014": { "name": "法力燃烧", "gcd": 1000, "type": 2, "targetType": 1, "des": "攻击附带削蓝" },
    "1015": { "name": "火凤凰", "gcd": 1000, "type": 1, "targetType": 1, "des": "召唤一个火凤凰，火凤凰魔法攻击附带溅射；二星火凤凰获得凤舞九天技能，死亡时化出9只小凤凰，小凤凰物理攻击；三星火凤凰获得凤凰涅槃技能，死后变蛋，持续5s，需要七次攻击才能击碎，击碎后触发凤舞九天，凤舞九天小凤凰变成魔法攻击，若持续时间内未击碎则会重生。" },
    "1016": { "name": "放逐", "gcd": 1000, "type": 1, "targetType": 0, "des": "目标单位无法攻击，对物理伤害免疫，受到的魔法伤害翻倍" },
    "1017": { "name": "天神下凡", "gcd": 1000, "type": 1, "targetType": 1, "des": "技能免疫并增加攻击力和血量，二星获得额外的血量回复，三星狂暴，增加120点攻速" },
    "1018": { "name": "雷霆一击", "gcd": 1000, "type": 1, "targetType": 1, "des": "aoe伤害并降低周围单位攻速" },
    "1019": { "name": "折光", "gcd": 1000, "type": 1, "targetType": 1, "des": "接下来的几次攻击增加攻击力，免疫接下来受到的几次攻击" },
    "1020": { "name": "石化", "gcd": 1000, "type": 1, "targetType": 0, "des": "眩晕一个单位，并且该单位受到额外的伤害" },
    "1021": { "name": "巨魔血统", "gcd": 0, "type": 2, "targetType": 1, "des": "血量越低，攻速越高，并获得额外的魔抗" },
    "1022": { "name": "嗜血之矛", "gcd": 0, "type": 2, "targetType": 1, "des": "以自身生命为代价为每次攻击附加可叠加的持续纯粹伤害，该伤害生效时会为自己恢复生命值" },
    "1023": { "name": "血之祭祀", "gcd": 1000, "type": 1, "targetType": 0, "des": "冲向一个敌人，对敌我造成最大生命百分比的伤害，普攻触发暴击时会为自己恢复血量；二星技能损失的生命值减半；三星技能不损失生命值" },
    "1024": { "name": "濒死一击", "gcd": 1000, "type": 2, "targetType": 1, "des": "死亡时造成aoe和眩晕，aoe伤害和眩晕时间取决于其之前造成的伤害，该伤害结算会在该单位死亡之前" },
    "1101": { "name": "小狼暴击", "gcd": 0, "type": 2, "targetType": 1, "des": "有b % 造成c倍暴击伤害" },
    "1102": { "name": "溅射攻击", "gcd": 0, "type": 2, "targetType": 1, "des": "攻击附带a格b % 溅射" },
    "2011": { "name": "盾墙3", "gcd": 0, "type": 4, "targetType": 11, "des": "本方a职业增加b点护甲" },
    "2012": { "name": "盾墙6", "gcd": 0, "type": 4, "targetType": 11, "des": "本方a职业增加b点护甲" },
    "2021": { "name": "魔法易伤3", "gcd": 0, "type": 4, "targetType": 14, "des": "对方所有单位减少a点魔抗" },
    "2022": { "name": "魔法易伤6", "gcd": 0, "type": 4, "targetType": 14, "des": "对方所有单位减少a点魔抗" },
    "2031": { "name": "暴击3", "gcd": 0, "type": 4, "targetType": 11, "des": "本方a职业的普通攻击有b%造成c倍暴击伤害" },
    "2032": { "name": "暴击6", "gcd": 0, "type": 4, "targetType": 11, "des": "本方a职业的普通攻击有b%造成c倍暴击伤害" },
    "3011": { "name": "兽人体质2", "gcd": 0, "type": 3, "targetType": 12, "des": "本方a种族增加b点生命值" },
    "3012": { "name": "兽人体质4", "gcd": 0, "type": 3, "targetType": 12, "des": "本方a种族增加b点生命值" },
    "3021": { "name": "野兽呼唤2", "gcd": 0, "type": 3, "targetType": 12, "des": "本方a种族增加b%攻击力" },
    "3022": { "name": "野兽呼唤4", "gcd": 0, "type": 3, "targetType": 12, "des": "本方a种族增加b%攻击力" },
    "3031": { "name": "魔法研究2", "gcd": 0, "type": 3, "targetType": 13, "des": "本方所有单位技能cd减少a%" },
    "3032": { "name": "魔法研究4", "gcd": 0, "type": 3, "targetType": 13, "des": "本方所有单位技能cd减少a%" },
    "3041": { "name": "吞噬魔法2", "gcd": 0, "type": 3, "targetType": 13, "des": "本方增加b点魔抗" },
    "3042": { "name": "吞噬魔法4", "gcd": 0, "type": 3, "targetType": 13, "des": "本方增加b点魔抗" },
    "3051": { "name": "坚韧2", "gcd": 0, "type": 3, "targetType": 12, "des": "本方a种族受到的负面效果持续时间减少b%，并获得c点血量回复" },
    "3052": { "name": "坚韧4", "gcd": 0, "type": 3, "targetType": 12, "des": "本方a种族受到的负面效果持续时间减少b%，并获得c点血量回复" },
    "3061": { "name": "狂热2", "gcd": 0, "type": 3, "targetType": 12, "des": "本方a种族增加b点攻速" },
    "3062": { "name": "狂热4", "gcd": 0, "type": 3, "targetType": 12, "des": "本方a种族增加b点攻速" },
};

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
        //# sourceMappingURL=skill_data.js.map
        