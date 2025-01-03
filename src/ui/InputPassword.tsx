import { Visibility, VisibilityOff } from "@mui/icons-material"
import { IconButton, InputAdornment, TextField } from "@mui/material"

function InputPassword({ id, label, showPassword, handleClickShowPassword, register, size = 'normal', isLoading = false }) {
    return (
        <TextField id={id} label={label} fullWidth variant="outlined" size={size}
            disabled={isLoading}
            type={showPassword ? 'text' : 'password'}
            {...register(id, { required: true })}
            slotProps={{
                input: {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={handleClickShowPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }
            }}
        >
        </TextField>
    )
}

export default InputPassword