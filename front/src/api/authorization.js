// const API_URL = "http://192.168.10.105:8080/api";
const API_URL = "http://localhost:8080/api";

export function login(email, password) {
	return fetch(API_URL + "/login", {
		method: "post",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email, password }),
	}).then((response) => response.json());
}

export function register(email, password, referal) {
	return fetch(API_URL + "/register", {
		method: "post",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email, password, referal }),
	}).then((response) => response.json());
}
