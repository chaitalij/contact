import { ADD_CONTACT, EDIT_CONTACT, DELETE_CONTACT } from "../constant";

let initialState = {
    contactList: []
}
const contactReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CONTACT:
            let contactList = state.contactList
            let payload = action.payload
            let id = contactList && contactList.length > 0 ? contactList[contactList.length - 1].id + 1: 1
            let contact = {
                id: id,
                firstName: payload.firstName,
                lastName: payload.lastName,
                email: payload.email,
                phnNo: payload.phnNo,
                status: "active"
            }
            contactList.push(contact)
            state.contactList = contactList
            return state
            
        case EDIT_CONTACT:
            return {
                ...state,
                contactList: state.contactList.map(item => item.id === action.payload.id ? {...item, firstName: action.payload.firstName, lastName: action.payload.lastName, email: action.payload.email, phnNo: action.payload.phnNo} : item)
            }

        case DELETE_CONTACT:
            return {
                ...state,
                contactList: state.contactList.map(item => item.id === action.payload ? {...item,status : "inactive"} : item)
            }
 
        default:
            return state
    }
}

export default contactReducer;