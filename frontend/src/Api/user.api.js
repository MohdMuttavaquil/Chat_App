import axiosinstance from './axiosinstance'

const singinApi = async (data) =>{
    const res = await axiosinstance.post('/user/singin', data)
    return res.data.success ? res.data : alert(res.data.message)
}

const loginApi = async (data) =>{
    const res = await axiosinstance.post('/user/login', data)
    return res.data.success ? res.data : alert(res.data.message)
}

const findUserApi = async (search)=>{
    const res = await axiosinstance.post('/contect/search', { search })
    return res.data.success ? res.data.foundUser :  alert(res.data.message)
}

const addUserApi = async (foundUser, userToken)=>{
    const res = await axiosinstance.post('contect/add', { foundUser }, { headers: { userToken } })
    return res.data.success ? res.data.userContect : alert(res.data.message)
}


export { loginApi, singinApi, findUserApi, addUserApi }