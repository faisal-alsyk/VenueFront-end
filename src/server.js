import axios from 'axios';

export const adminLogin = (data) => {
    return axios.post('admin/login', data)
}

export const verifyAdminCode = (data, token) => {
    return axios.post('admin/verifycode', data, {headers:{Authorization: token}})
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

export const resetUserPassword = (payload) => {
    return axios.patch('users/changepassword',payload);
}

export const createBooking = (payload) => {
    return axios.post('bookings/', payload)
}

export const updateBoking = (id, payload) =>{
    return axios.patch(`bookings/${id}`, payload)
}

export const deleteBooking = (id) =>{
    return axios.delete(`bookings/${id}`)

}

export const getbookingbyId = (id) => {
    return axios.get(`bookings/${id}`)
}

export const getbooking = (filter) => {
    let bookingFilter = filter || "";
    return axios.get(`bookings?role=${bookingFilter}`)
}

export const getbookingByAdmin = (role) => {
    return axios.get(`bookings?role=Admin`)
}

export const AddCsv = (payload) => {
    return axios.post('bookings/bulkbooking', payload)
}

export const priorityBooking = (payload) => {
    return axios.post('bookings/prioritybooking', payload)
}
export const deletePublicBooking = (id, payload) =>{
    return axios.post(`bookings/${id}`, payload)
}
export const createPublicBooking = (payload) => {
    return axios.post('bookings/public', payload)
}
