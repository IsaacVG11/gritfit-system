import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "api"; // Importamos la API
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

function SignUp() {
  const [userData, setUserData] = useState({ name: "", email: "", user_password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await registerUser(userData);
      navigate("/authentication/sign-in"); // Redirigir a inicio de sesión después de registrarse
    } catch (err) {
      setError(err.message || "Error registering user");
    }
  };

  return (
    <CoverLayout image={bgImage}>
      <MDBox component="form" onSubmit={handleSubmit} role="form">
        <MDBox mb={2}>
          <MDInput
            type="text"
            name="name"
            label="Name"
            variant="standard"
            fullWidth
            onChange={handleChange}
          />
        </MDBox>
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
            name="password"
            label="Password"
            variant="standard"
            fullWidth
            onChange={handleChange}
          />
        </MDBox>
        {error && <MDTypography color="error">{error}</MDTypography>}
        <MDBox mt={4} mb={1}>
          <MDButton variant="gradient" color="info" fullWidth type="submit">
            Sign Up
          </MDButton>
        </MDBox>
      </MDBox>
    </CoverLayout>
  );
}

export default SignUp;
