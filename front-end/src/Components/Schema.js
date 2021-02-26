import * as yup from  'yup'; 

const Schema = yup.object().shape({
    name: yup.string().required('name is required').min(2, 'name requires more than 2 characters'),
    username:yup.string().required('username is required').min(2, 'username requires more than 2 characters'),
    email:yup.string().email().required('Email is required'),
    password:yup.string().required().min(6,'password must be at least 6 characters long'),
    role:yup.string().required('you must choose a role')
})

export default Schema ; 