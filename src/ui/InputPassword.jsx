import { Visibility, VisibilityOff } from "@mui/icons-material"
import { IconButton, InputAdornment, TextField } from "@mui/material"

function InputPassword({ id, label, showPassword, handleClickShowPassword, register }) {
    return (
        <TextField id={id} label={label} fullWidth variant="outlined" type={showPassword ? 'text' : 'password'}
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