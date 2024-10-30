import axios from "axios"
const registerNewUser = (email, phone, username, password) => {
    return axios.post("http://localhost:8080/api/v1/register", {
        email, phone, username, password
    })
}

const loginUser = (valueLogin, password) => {
    return axios.post("http://localhost:8080/api/v1/login", {
        valueLogin, password
    })
}

const fetchAllUsers = (page, limit) => {
    console.log("Căm thù thằng Trần Hoàng Tuân");
    return axios.get(`http://localhost:8080/api/v1/user/read?page=${page}&limit=${limit}`)
}

const deleteUser = (user) => {
    return axios.delete("http://localhost:8080/api/v1/user/delete", {
        data: {
            id: user.id
        }
    });
}

export {
    registerNewUser, loginUser, fetchAllUsers, deleteUser
}