import axios from 'axios';

export const adminLogin = (data) => {
    return axios.post('admin/login', data)
}

export const verifyAdminCode = (data) => {
    return axios.post('admin/verifycode', data)
}

export const userLogin = (data) => {
    return axios.post('users/login', data)
}
export const getUser = (id) => {
    return axios.get(`admin/${id}`)
}
export const UpdateUser = (id, payload) => {
    return axios.patch(`users/${id}`, payload)
}

export const VenueList = () => {
    return axios.get('venues/')
}

export const createNewUser = (payload) => {
    return axios.post('users/create', payload)
}

export const CurrentUser = (id) => {
    return axios.get(`users/${id}`)
}

export const UserList = () => {
    return axios.get('users/')
}

export const CreateNewVenue = (payload) => {
    return axios.post('venues/create', payload)
}

export const DeleteUser = (id) => {
    return axios.delete(`users/${id}`)
}

export const UpdateVenue = (id, payload) =>{
    return axios.patch(`venues/${id}`, payload)
}

export const DeleteVenue = (id) =>{
    return axios.delete(`venues/${id}`)

}

export const getVenue = (id) => {
    return axios.get(`venues/${id}`)
}
