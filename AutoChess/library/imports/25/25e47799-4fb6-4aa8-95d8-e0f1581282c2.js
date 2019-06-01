"use strict";
cc._RF.push(module, '25e47eZT7ZKqJXY4PFYEoLC', 'Printer');
// Script/AutoBattle/OutPut/Printer.ts

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 用于控制打印日志信息
 */
var pTag;
(function (pTag) {
    pTag[pTag["default"] = 0] = "default";
    pTag[pTag["battle"] = 1] = "battle";
})(pTag = exports.pTag || (exports.pTag = {}));
var pBattleAction;
(function (pBattleAction) {
    pBattleAction[pBattleAction["default"] = 0] = "default";
    pBattleAction[pBattleAction["prepare"] = 1] = "prepare";
    pBattleAction[pBattleAction["select"] = 2] = "select";
    pBattleAction[pBattleAction["move"] = 3] = "move";
    pBattleAction[pBattleAction["tryAttack"] = 4] = "tryAttack";
    pBattleAction[pBattleAction["attack"] = 5] = "attack";
    pBattleAction[pBattleAction["damage"] = 6] = "damage";
    pBattleAction[pBattleAction["doSkillEffect"] = 7] = "doSkillEffect";
    pBattleAction[pBattleAction["playSkill"] = 8] = "playSkill";
    pBattleAction[pBattleAction["initSkill"] = 9] = "initSkill";
    pBattleAction[pBattleAction["recoverHp"] = 10] = "recoverHp";
    pBattleAction[pBattleAction["coma"] = 11] = "coma";
    pBattleAction[pBattleAction["crit"] = 12] = "crit";
    pBattleAction[pBattleAction["warCry"] = 13] = "warCry";
    pBattleAction[pBattleAction["recoverMp"] = 14] = "recoverMp";
    pBattleAction[pBattleAction["critSilent"] = 15] = "critSilent";
    pBattleAction[pBattleAction["banish"] = 16] = "banish";
    pBattleAction[pBattleAction["miss"] = 17] = "miss";
    pBattleAction[pBattleAction["cdTime"] = 18] = "cdTime";
    pBattleAction[pBattleAction["addDebuff"] = 19] = "addDebuff";
    pBattleAction[pBattleAction["addDamage"] = 20] = "addDamage";
    pBattleAction[pBattleAction["missDamage"] = 21] = "missDamage";
    pBattleAction[pBattleAction["bloodSacrificeRecoverHp"] = 22] = "bloodSacrificeRecoverHp";
    pBattleAction[pBattleAction["bkb"] = 23] = "bkb";
})(pBattleAction = exports.pBattleAction || (exports.pBattleAction = {}));
var pErrTag;
(function (pErrTag) {
    pErrTag[pErrTag["default"] = 0] = "default";
    pErrTag[pErrTag["inputNull"] = 1] = "inputNull";
    pErrTag[pErrTag["randomNum"] = 2] = "randomNum";
})(pErrTag = exports.pErrTag || (exports.pErrTag = {}));
var filterActionTag = [
    pBattleAction.initSkill,
    pBattleAction.select,
    pBattleAction.tryAttack,
];
function printDefault(msg) {
    return;
    console.log(msg);
}
exports.printDefault = printDefault;
function printChessTable(msg) {
    return;
    console.log(msg);
}
exports.printChessTable = printChessTable;
/**
 * 打印异常信息
 */
function printErrMsg(tag, msg) {
    var content = "";
    switch (tag) {
        case pErrTag.inputNull:
            content = "\u6CA1\u6709\u6709\u6548\u7684\u5BF9\u5C40\u4FE1\u606F";
            break;
        case pErrTag.randomNum:
            content = "\u65E0\u6548\u7684\u968F\u673A\u6570 max:" + msg.max + ", rad:" + msg.rad;
            break;
        default:
            content = msg;
            break;
    }
    console.log(content);
}
exports.printErrMsg = printErrMsg;
function printBattleMsg(tag, action, msg) {
    return;
    for (var i = 0; i < filterActionTag.length; i++) {
        var tag_1 = filterActionTag[i];
        if (action == tag_1) {
            return;
        }
    }
    var content = "";
    switch (tag) {
        case pTag.battle:
            switch (action) {
                case pBattleAction.default:
                    content = msg;
                    break;
                case pBattleAction.prepare:
                    content = msg;
                    break;
                case pBattleAction.select:
                    if (msg.target) {
                        content = msg.npc.printName + " \u9009\u62E9\u4E86\u76EE\u6807: " + msg.target.printName;
                    }
                    else {
                        content = msg.npc.printName + " \u53D6\u6D88\u4E86\u5BF9\u5F53\u524D\u76EE\u6807\u7684\u9009\u4E2D";
                    }
                    break;
                case pBattleAction.move:
                    content = msg.npc.printName + " \u79FB\u52A8\u5230 (" + msg.pos.x + "," + msg.pos.y + ")";
                    break;
                case pBattleAction.tryAttack:
                    content = msg.npc.printName + " \u5C1D\u8BD5\u653B\u51FB";
                    break;
                case pBattleAction.damage:
                    content = msg.attacker.printName + " \u5BF9 " + msg.defender.printName + " \u9020\u6210 " + msg.damage + " \u4F24\u5BB3";
                    break;
                case pBattleAction.playSkill:
                    if (msg.attacker && msg.defender) {
                        content = msg.attacker.printName + " \u5BF9 " + msg.defender.printName + " \u91CA\u653E\u6280\u80FD " + msg.skillName;
                    }
                    else if (msg.attacker) {
                        content = msg.attacker.printName + " \u91CA\u653E\u6280\u80FD " + msg.skill;
                    }
                    else {
                        content = "\u91CA\u653E\u6280\u80FD " + msg.skill;
                    }
                    break;
                case pBattleAction.initSkill:
                    content = "\u521D\u59CB\u5316\u6280\u80FD " + msg.skillName;
                    break;
                case pBattleAction.doSkillEffect:
                    content = "play " + msg;
                    break;
                case pBattleAction.attack:
                    break;
                case pBattleAction.recoverHp:
                    content = msg.attacker.name + " \u4E3A " + msg.defender.printName + " \u56DE\u590D\u8840\u91CF " + msg.hp;
                    break;
                case pBattleAction.coma:
                    content = msg.npc.printName + " \u7729\u6655\u4E2D";
                    break;
                case pBattleAction.crit:
                    content = msg.npc.printName + " \u89E6\u53D1\u4E86\u66B4\u51FB\uFF0C\u66B4\u51FB\u4F24\u5BB3(\u672A\u51CF\u514D)\uFF1A" + msg.damage;
                    break;
                case pBattleAction.warCry:
                    if (msg.per == 1) {
                        return;
                    }
                    content = msg.npc.printName + " \u6218\u543C\u6548\u679C\u51CF\u4F24 " + (1 - msg.per) * 100;
                    break;
                case pBattleAction.recoverMp:
                    content = msg.npc.printName + " \u56DE\u590D\u9B54\u6CD5 " + msg.mp;
                    break;
                case pBattleAction.critSilent:
                    content = msg.attacker.printName + " \u7684\u66B4\u51FB\u6C89\u9ED8\u4E86 " + msg.defender.printName + " " + msg.time + "\u79D2";
                    break;
                case pBattleAction.addDebuff:
                    content = "\u8D1F\u9762\u6548\u679C\u6301\u7EED\u65F6\u95F4" + msg.time;
                    break;
                case pBattleAction.addDamage:
                    content = "\u62A4\u76FE\u589E\u52A0\u653B\u51FB\u529B" + msg.des + msg.damage;
                    break;
                case pBattleAction.missDamage:
                    content = '护盾抵挡伤害';
                    break;
                case pBattleAction.bloodSacrificeRecoverHp:
                    content = "\u8840\u4E4B\u796D\u7940\u6062\u590D\u8840\u91CF" + msg.hp;
                    break;
                case pBattleAction.banish:
                    break;
                case pBattleAction.miss:
                    content = msg.defender.printName + " \u95EA\u907F\u4E86 " + msg.attacker.printName + " \u7684\u653B\u51FB";
                    break;
                case pBattleAction.cdTime:
                    content = msg.skillName + " \u6280\u80FDcd\uFF1A" + msg.cd;
                    break;
                case pBattleAction.bkb:
                    content = msg.defender.printName + " \u5BF9\u6280\u80FD\u514D\u75AB";
                    break;
                default:
                    break;
            }
            break;
        default:
            break;
    }
    console.log(content);
}
exports.printBattleMsg = printBattleMsg;

cc._RF.pop();