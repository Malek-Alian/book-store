import { Box, Button, Card, TextField } from "@mui/material"
import { useForm } from "react-hook-form"

const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm()

    const login = (data) => {
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log(error));
    }

    return (
        <Box width={'100vw'} height={'100vh'} display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Card elevation={5} sx={{ width: '25%', height: '60%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
                <h1>Login</h1>
                <form onSubmit={handleSubmit(login)} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '80%', height: errors.email || errors.password ? '50%' : '40%' }}>
                    <label style={{ marginBottom: errors.email ? 5 : -10, color: errors.email && 'red' }}>Email</label>
                    <TextField type="email" {...register('email', { required: 'Email is required' })} error={errors.email && true} />
                    {errors.email && <p style={{ color: 'red' }}>{errors.email?.message}</p>}
                    <label style={{ marginBottom: errors.password ? 5 : -10, color: errors.password && 'red' }}>Password</label>
                    <TextField type="password" {...register('password', { required: 'Password is required' })} error={errors.password && true} />
                    {errors.password && <p style={{ color: 'red' }}>{errors.password?.message}</p>}
                    <Button variant="contained" type="submit">Login</Button>
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