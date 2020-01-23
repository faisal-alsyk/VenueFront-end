import axios from 'axios';

export const adminLogin = (data) => {
    axios
        .post('/api/users/login', data)
        .then(response => {
           return response;
        });
}

export const verifyAdminCode = (data) => {
    axios
        .post('/api/admin/verifycode', data)
        .then(response => {
            return response;
        });
}

export const userLogin = (data) => {
    axios
        .post('/api/admin/login', data)
        .then(response => {
            return response;
        });
}

export const venueList = (token) => {
    axios
        .post('/api/admin/login', {headers: {Authorization: token} })
        .then(response => {
            return response;
        });
}
