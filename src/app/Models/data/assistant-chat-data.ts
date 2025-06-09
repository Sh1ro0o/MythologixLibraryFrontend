import { SenderTypeEnum } from "../../shared/enums/sender-type.enum";

export class AssistantChatData {
    recordId?: number;
    message: string;
    senderType: SenderTypeEnum;

    constructor(message: string, senderType: SenderTypeEnum) {
        this.message = message;
        this.senderType = senderType;
    }
}