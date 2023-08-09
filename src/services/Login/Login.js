import { Box, Button, Card, TextField, Typography } from "@mui/material"
import { useContext } from "react"
import { useForm } from "react-hook-form"
import { AppContext } from "../../App"
import { request } from "../../api/Request"
import { useNavigate } from "react-router-dom"

const Login = () => {

    const { register, handleSubmit, formState: { errors }, setError } = useForm()
    const { setIsSigned, setCurrentUser, xs } = useContext(AppContext)
    const navigate = useNavigate()

    const login = async (data) => {
        let result = await request('login', 'POST', data)
        if (result.status === false) {
            if (result.errorMessage) {
                setError('email')
                setError('password', { message: 'Email or Password is not currect' })
            }
        } else {
            localStorage.setItem('token', result.token)
            setCurrentUser(result.data)
            navigate('/home')
            setIsSigned(true)
        }
    }

    return (
        <Box backgroundColor={'background.default'} width={'100vw'} height={'100vh'} display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Card sx={{ width: xs ? 450 : 350, height: 600, display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
                <h1>Login</h1>
                <form onSubmit={handleSubmit(login)} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 13, width: '80%' }}>
                    <label style={{ color: errors.email && 'error.main' }}>Email</label>
                    <TextField sx={{
                        "& .MuiOutlinedInput-root": {
                            '& fieldset': {
                                borderColor: 'white',
                            },
                        },
                        height: 60,
                    }} type="email" {...register('email', { required: 'Email is required' })} error={errors.email && true} />
                    {errors.email && <Typography color={'error.main'}>{errors.email?.message}</Typography>}
                    <label style={{ color: errors.password && 'error.main' }}>Password</label>
                    <TextField sx={{
                        "& .MuiOutlinedInput-root": {
                            '& fieldset': {
                                borderColor: 'white',
                            },
                        },
                        height: 60
                    }} type="password" {...register('password', { required: 'Password is required' })} error={errors.password && true} />
                    {errors.password && <Typography color={'error.main'}>{errors.password?.message}</Typography>}
                    <Button sx={{ height: 60 }} variant="contained" type="submit">Login</Button>
                </form>
                <Box display={"flex"}>
                    <p>Don't have account?</p>
                    <Button sx={{ height: 54 }}>Register</Button>
                </Box>
            </Card>
        </Box>
    )
}

export default Login