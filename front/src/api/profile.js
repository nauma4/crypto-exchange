// const API_URL = "http://192.168.10.105:8080/api";
const API_URL = "http://localhost:8080/api";

export function getProfile(token) {
	return fetch(API_URL + "/profile", {
		method: "get",
		headers: { "Content-Type": "application/json", token },
	}).then((response) => response.json());
}

export function editProfile(token, payload) {
	return fetch(API_URL + "/profile", {
		method: "post",
		headers: { "Content-Type": "application/json", token },
		body: JSON.stringify(payload),
	}).then((response) => response.json());
}

export function editPassword(token, payload) {
	return fetch(API_URL + "/profile/password", {
		method: "post",
		headers: { "Content-Type": "application/json", token },
		body: JSON.stringify(payload),
	}).then((response) => response.json());
}
