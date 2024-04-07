import {
  Alert,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import JobFormProvider from "../components/form/JobFormProvider";
import JobFormTextField from "../components/form/JobFormTextField";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/auth/AuthProvider";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useContext(AuthContext);
  const from = location.state?.from?.pathname || -1;
  const [showPassword, setShowPassword] = useState(false);

  const defaultValues: FieldValues = {
    username: "",
    password: "",
  };

  const methods = useForm<FieldValues>({ defaultValues });
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(location);
    auth.signin(data.username, data.password, () =>
      navigate(from, {
        replace: true,
        state: { backgroundLocation: location.state?.backgroundLocation },
      })
    );
  };

  return (
    <div>
      <Typography variant="h3" textAlign="center" mb={3}>
        Login to view more contents
      </Typography>
      <JobFormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {!!errors.afterSubmit && (
            <Alert severity="error">
              {typeof errors.afterSubmit.message === "string"
                ? errors.afterSubmit.message
                : ""}
            </Alert>
          )}
          <JobFormTextField name="username" label="Username" required />
          <JobFormTextField
            required
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Login
          </LoadingButton>
        </Stack>
      </JobFormProvider>
    </div>
  );
}
