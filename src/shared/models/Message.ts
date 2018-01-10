export default class Message {
	public id?: number;
	public conversationId?: number;
	public text?: string;
	public time?: number;
	public senderId?: number;
	public senderName?: string;
	public senderAvatarPath?: string;

	public constructor(id?: number, conversationId?: number, text?: string, time?: number, senderId?: number) {
		this.id = id;
		this.conversationId = conversationId;
		this.text = text;
		this.time = time;
		this.senderId = senderId;
	}
}
