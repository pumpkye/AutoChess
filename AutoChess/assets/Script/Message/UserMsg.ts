import { MessageBase } from "./MessagegBase";

/**
 * 默认使用用户名登录，会在服务器创建一个新的用户
 */
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

/**
 * 使用用户Id登录，目前用于断线重连
 */
export class MsgReqLogin extends MessageBase {
    name = "msgReqLogin";
    data: {
        id: number;
    }
}

export class MsgReqLogout extends MessageBase {

}