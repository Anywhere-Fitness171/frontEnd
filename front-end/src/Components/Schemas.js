import * as yup from  'yup'; 

const UserSchema = yup.object().shape({
    name: yup.string().required('name is required').min(2, 'name requires more than 2 characters'),
    username:yup.string().required('username is required').min(2, 'username requires more than 2 characters'),
    email:yup.string().email().required('Email is required'),
    password:yup.string().required().min(6,'password must be at least 6 characters long'),
    role:yup.string().required('you must choose a role')
})

const ClassSchema = yup.object().shape({
    name:yup.string().required('name is required').min(2, 'name requires more than 2 characters'),
    type:yup.string().required('type is required'),
    date_time:yup.string().required('date & time is required'),
    duration:yup.string().required('duration is required'),
    intensity:yup.string().required('intensity is required'),
    location:yup.string().required('location is required'),
    max_size:yup.string().required('max size is required')
})

const LoginSchema = yup.object().shape({
    username:yup.string().required('username is required').min(2, 'username requires more than 2 characters'),
    password:yup.string().required().min(6,'password must be at least 6 characters long')
})


export{
    UserSchema,
    ClassSchema,
    LoginSchema
}