import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "api";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

function SignIn() {
  const [userData, setUserData] = useState({ email: "", user_password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await loginUser(userData);
      localStorage.setItem("token", response.token); // Guardamos el token
      navigate("/dashboard"); // Redirigimos al dashboard
    } catch (err) {
      setError(err.message || "Error signing in");
    }
  };

  return (
    <CoverLayout image={bgImage}>
      <MDBox component="form" onSubmit={handleSubmit} role="form">
        <MDBox mb={2}>
          <MDInput
            type="email"
            name="email"
            label="Email"
            variant="standard"
            fullWidth
            onChange={handleChange}
          />
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            type="password"
            name="user_password"
            label="Password"
            variant="standard"
            fullWidth
            onChange={handleChange}
          />
        </MDBox>
        {error && <MDTypography color="error">{error}</MDTypography>}
        <MDBox mt={4} mb={1}>
          <MDButton variant="gradient" color="info" fullWidth type="submit">
            Sign In
          </MDButton>
        </MDBox>
      </MDBox>
    </CoverLayout>
  );
}

export default SignIn;
