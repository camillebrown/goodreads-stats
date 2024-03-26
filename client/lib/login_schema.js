import * as Yup from 'yup'
export const loginSchema = Yup.object().shape({
  email: Yup.string().email().required('Required'),
  password: Yup.string().required('Required').min(8, 'Password must be at least 8 characters'),
})