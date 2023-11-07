import { API_URL } from "."

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
