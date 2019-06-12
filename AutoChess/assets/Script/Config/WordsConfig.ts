import { RoundState } from "../Message/RoomMsg";

export const WorsConfig = {
    battleState: {
        [RoundState.none]: "",
        [RoundState.layout]: "布局阶段",
        [RoundState.prepare]: "战斗倒计时",
        [RoundState.battle]: "战斗中",
        [RoundState.battleEnd]: "战斗结束",
    }
}