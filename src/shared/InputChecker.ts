export default class InputChecker {
	static checkLogin(login: string): boolean {
		return login.length > 0;
	}

	static checkPassword(password: string): boolean {
		return password.length > 0;
	}

	static checkName(name: string): boolean {
		return name.length > 0;
	}

	static checkSurname(surname: string): boolean {
		return surname.length > 0;
	}
};
