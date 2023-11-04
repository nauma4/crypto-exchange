// const API_URL = "http://192.168.10.105:8080/api";
const API_URL = 'http://localhost:8080/api'

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