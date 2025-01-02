import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface IPasswordInputWithEyeIcon{
  textLabel: string,
  name: string,
  password ?: string,
  handlePasswordChange: () => void
}

const PasswordInputWithEyeIcon = ({textLabel, name, password, handlePasswordChange}: IPasswordInputWithEyeIcon) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <TextField
      label={textLabel}
      name={name}
      type={showPassword ? "text" : "password"}
      variant="outlined"
      fullWidth
      placeholder="Enter your password"
      value={password}
      onChange={handlePasswordChange}
      onInput={handlePasswordChange}
      sx={{ mt: 1, mb: 1.8 }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={handleTogglePasswordVisibility}
              edge="end"
              aria-label="toggle password visibility"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordInputWithEyeIcon;
