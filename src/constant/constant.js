
const DEV_URL = `http://localhost:4000/`
const PROD_URL = `http://localhost:4000/`


export const BASE_URL = DEV_URL

export const ApiRoutes = {
    login: BASE_URL + 'auth/login',
    register: BASE_URL + 'auth/register',
    getTask: BASE_URL + 'task',
    postTask: BASE_URL + 'task',
    // deleteTask: BASE_URL + 'task',
    // editTask: BASE_URL + 'task',
    verify: BASE_URL + 'auth/verifyEmail'
}