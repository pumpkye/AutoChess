import { MessageBase } from "./MessagegBase";

export class MsgReqUserInfo extends MessageBase {
    name = "msgReqUserInfo";
    data: {
        name: string;
    }
}

export class MsgResUserInfo extends MessageBase {
    name = "msgResUserInfo";
    data: {
        id: number;
        name: string;
    }
}