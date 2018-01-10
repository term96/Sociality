import Message from './Message';
export default class Conversation {
	public id?: number;
	public name?: string;
	public messages?: Message[];
	public startTime?: number;
	public lastTime?: number;

	public constructor(id?: number, name?: string, messages?: Message[], startTime?: number, lastTime?: number) {
		this.id = id;
		this.name = name;
		this.messages = messages;
		this.startTime = startTime;
		this.lastTime = lastTime;
	}
}
