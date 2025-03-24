import { API_URL } from "."

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
