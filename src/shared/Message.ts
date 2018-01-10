export enum Message {
	INTERNAL_ERROR = 'На сервере произошла ошибка, попробуйте ещё раз',
	USER_NOT_FOUND = 'Пользователь не найден',
	LOGIN_IS_IN_USE = 'Такой логин уже занят',
	WRONG_PASSWORD = 'Неверный пароль',
	INVALID_BODY = 'Заполнены не все поля',
	CONNECTION_ERROR = 'Ошибка соединения с сервером, проверьте подключение к Интернету',
	TOKEN_REQUIRED = 'Войдите в систему',
	OK = 'Успешно выполнено',
	FILE_TOO_LARGE = 'Слишком большой файл',
	FILE_TYPE_UNSUPPORTED = 'Тип файла не поддерживается',
	FILE_UPLOAD_ABORTED = 'Загрузка файла прервана'
}
