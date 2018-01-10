export default class SearchData {
	public name: string;
	public surname: string;
	public city: string;
	public minBirthday: number;
	public maxBirthday: number;
	constructor(name?: string, surname?: string, city?: string, minBirthday?: number, maxBirthday?: number) {
		this.name = name;
		this.surname = surname;
		this.city = city;
		this.minBirthday = minBirthday;
		this.maxBirthday = maxBirthday;
	}
}
