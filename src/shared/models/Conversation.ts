import Message from './Message';
export default class Conversation {
	public id?: number;
	public name?: string;
	public messages?: Message[];

	public constructor(id?: number, name?: string, messages?: Message[]) {
		this.id = id;
		this.name = name;
		this.messages = messages;
	}
}
