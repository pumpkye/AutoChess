import { g_NetUtil } from "./NetUtil";
import { ChessNpcInfo } from "../AutoBattle/Input/InputCache";

class LayoutMessage {
    protected url = '/layout';
    constructor() {
        this.url = g_NetUtil.formatUrl(this.url);
    }

    /**
     * 拉取所有layout
     */
    async listAllLayout(): Promise<{
        success: boolean,
        layoutList: Array<{
            id: number,
            name: string
        }>
    }> {
        let ret: any = await g_NetUtil.sendHttpRequest(this.url, "GET");
        let res = {
            success: ret.success,
            layoutList: new Array<{ id: number, name: string }>(),
        }
        for (let i = 0; i < ret.ret.length; i++) {
            const e = ret.ret[i];
            res.layoutList.push({ id: e.id, name: e.name });
        }
        return res;
    }

    /**
     * 通过Id拉取某个layout详情
     */
    async getLayout(id: number): Promise<{
        success: boolean,
        layout: {
            id: number,
            name: string,
            npcList: Array<ChessNpcInfo>
        }
    }> {
        let url = this.url + '/' + id;
        let ret: any = await g_NetUtil.sendHttpRequest(url, "GET");
        console.log(ret);
        let res = {
            success: ret.success,
            layout: {
                id: ret.ret.id,
                name: ret.ret.name,
                npcList: new Array(),
            }
        }
        let layoutObj = JSON.parse(ret.ret.layout_str);
        for (let i = 0; i < layoutObj.length; i++) {
            const npc = layoutObj[i];
            res.layout.npcList.push(new ChessNpcInfo(npc.thisId, npc.baseId, npc.level, { x: npc.pos.x, y: npc.pos.y }));

        }
        return res;
    }

    /**
     * 保存layout
     */
    async saveLayout(name: string, npcList: Array<ChessNpcInfo>) {
        let jsonObj = {
            name: name,
            layout: npcList,
        }
        let body = JSON.stringify(jsonObj);
        let ret = await g_NetUtil.sendHttpRequest(this.url, "POST", body);
        console.log(ret);
        return ret;
    }

    /**
     * 删除layout
     * @param id 
     */
    async deleteLayout(id: number) {
        let url = this.url + '/' + id;
        return await g_NetUtil.sendHttpRequest(url, "DELETE");
    }

}

export const g_layoutMessage = new LayoutMessage();