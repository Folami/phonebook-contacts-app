import axios from 'axios'

const baseUrl = '/api/persons'

const getAllContacts = async () => {
    const request = axios.get(baseUrl)
    const response = await request
    return response.data
}

const createContact = async (newContact) => {
    const request = axios.post(baseUrl, newContact)
    const response = await request
    return response.data
}

const updateContact = async (updatedContact) => {
    const request = axios.put(`${baseUrl}/${updatedContact.id}`, updatedContact);
    const response = await request
    return response.data
}

const deleteContact = async (id) => { 
    const request = axios.delete(`${baseUrl}/${id}`)
    const response = await request
    return response.data
}

export default { 
    getAllContacts: getAllContacts, 
    createContact: createContact, 
    updateContact: updateContact,
    deleteContact: deleteContact 
}