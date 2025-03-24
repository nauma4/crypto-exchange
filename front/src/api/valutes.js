import { API_URL } from "."

export function getValuteList () {
  return fetch(API_URL + '/valutes')
    .then(response => response.json())
}

export function getValuteForms (id, type) {
  return fetch(API_URL + '/valutes/' + id + '?type=' + type)
    .then(response => response.json())
}

export function getValuteReserve () {
  return fetch(API_URL + '/reserve')
    .then(response => response.json())
}