import { ADD_CONTACT, DELETE_CONTACT, EDIT_CONTACT } from "../constant";

export function addContact(payload) {
    return {
        type: ADD_CONTACT,
        payload: payload
    }
}

export function editContact(payload) {
    return {
        type: EDIT_CONTACT,
        payload: payload
    }
}

export function deleteContact(payload) {
    return {
        type: DELETE_CONTACT,
        payload: payload
    }
}
