import { Button, Dialog, DialogContent, DialogTitle, TextField } from "@mui/material"
import { useContext } from "react"
import { useForm } from "react-hook-form"
import { AppContext } from "../App"
import { request } from "../api/Request"

const ChangePasswordDialog = ({ open, setOpen }) => {

    const { register, handleSubmit, formState: { errors }, reset, setError } = useForm()
    const { currentUser, setCurrentUser } = useContext(AppContext)

    const changePassword = async (data) => {
        if (data.newPassword === data.confirmPassword) {
            const result = await request('change-password', 'PUT', { currentUser, oldPassword: data.oldPassword, newPassword: data.newPassword })
            console.log(result);
            if (result.success) {
                reset()
                setCurrentUser(result.data)
                setOpen(false)
            } else {
                setError('oldPassword', { message: 'Old password is not correct' })
            }
        } else {
            setError('newPassword', { message: 'New password does not match' })
            setError('confirmPassword', { message: 'New password does not match' })
        }
    }

    return (
        <Dialog sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', textAlign: 'center' }} open={open} onClose={() => { setOpen(false); reset() }}>
            <DialogTitle>
                Change Password
            </DialogTitle>
            <DialogContent sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <label>Old Password:</label>
                <TextField sx={{
                    "& .MuiOutlinedInput-root": {
                        '& fieldset': {
                            borderColor: 'white',
                        },
                    },
                    height: 60,
                    marginY: 2
                }} {...register('oldPassword', { required: 'Current password is required' })} error={errors.oldPassword && true} />
                {errors.oldPassword && <p style={{ color: '#f44336' }}>{errors.oldPassword.message}</p>}
                <label>New Password:</label>
                <TextField sx={{
                    "& .MuiOutlinedInput-root": {
                        '& fieldset': {
                            borderColor: 'white',
                        },
                    },
                    height: 60,
                    marginY: 2
                }} {...register('newPassword', { required: 'New password is required' })} error={errors.newPassword && true} />
                {errors.newPassword && <p style={{ color: '#f44336' }}>{errors.newPassword.message}</p>}
                <label>Confirm New Password:</label>
                <TextField sx={{
                    "& .MuiOutlinedInput-root": {
                        '& fieldset': {
                            borderColor: 'white',
                        },
                    },
                    height: 60,
                    marginY: 2
                }} {...register('confirmPassword', { required: 'Confirm password is required' })} error={errors.confirmPassword && true} />
                {errors.confirmPassword && <p style={{ color: '#f44336' }}>{errors.confirmPassword.message}</p>}
                <Button onClick={handleSubmit(changePassword)} variant="contained">Change</Button>
            </DialogContent>
        </Dialog>
    )
}

export default ChangePasswordDialog