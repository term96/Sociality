export default class InputChecker {
	static checkLogin(login: string): boolean {
		return login && login.length > 0;
	}

	static checkPassword(password: string): boolean {
		return password && password.length > 0;
	}

	static checkName(name: string): boolean {
		return name && name.length > 0;
	}

	static checkSurname(surname: string): boolean {
		return surname && surname.length > 0;
	}

	static checkCity(city: string): boolean {
		return city && city.length > 0;
	}

	static checkBirthday(birthday: number): boolean {
		return true;
	}

	static checkAbout(about: string): boolean {
		return about && about.length > 0;
	}
}
