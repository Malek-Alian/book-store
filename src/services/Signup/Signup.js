import { Box, Button, Card, TextField, Typography } from "@mui/material"
import { useContext } from "react"
import { useForm } from "react-hook-form"
import { AppContext } from "../../App"
import { useNavigate } from "react-router-dom"
import { request } from "../../api/Request"

const Signup = () => {

    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, setError } = useForm()
    const { xs, setIsSigned, setCurrentUser } = useContext(AppContext)

    const signup = async (data) => {
        const result = await request('add-user', 'POST', data)
        if (result.status === 407) {
            setError('email', { message: result.errorMessage })
        } else {
            setIsSigned(true)
            setCurrentUser(result.data)
            localStorage.setItem('token', result.token)
            navigate('/home')
        }
    }

    return (
        <Box backgroundColor={'background.default'} width={'100vw'} height={'100vh'} display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Card sx={{ width: xs ? 450 : 350, height: 600, display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
                <h1>Signup</h1>
                <form onSubmit={handleSubmit(signup)} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 13, width: '80%' }}>
                    <label style={{ color: errors.username && 'error.main' }}>Username</label>
                    <TextField sx={{
                        "& .MuiOutlinedInput-root": {
                            '& fieldset': {
                                borderColor: 'white',
                            },
                        },
                        height: 60,
                    }} type="text" {...register('username', { required: 'Username is required' })} error={errors.username && true} />
                    {errors.username && <Typography color={'error.main'}>{errors.username?.message}</Typography>}
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
                    <Button sx={{ height: 60 }} variant="contained" type="submit">Register</Button>
                </form>
                <Box display={"flex"}>
                    <p>Already have account?</p>
                    <Button onClick={() => { navigate('/login') }}>Login</Button>
                </Box>
            </Card>
        </Box>
    )
}

export default Signup