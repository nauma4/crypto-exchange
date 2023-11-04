// const API_URL = "http://192.168.10.105:8080/api";
const API_URL = "http://localhost:8080/api";

export function addTransaction(body) {
	return fetch(API_URL + "/transactions", {
		method: "put",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body),
	}).then((response) => response.json());
}

export function getTransaction(id) {
	return fetch(API_URL + "/transactions/" + id).then((response) =>
		response.json()
	);
}
