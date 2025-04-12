import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Alert from "react-bootstrap/Alert";

const Login = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [passwordIcon, setPasswordIcon] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const { email, password } = formData;
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!email) newErrors.email = "Email is required";
    else if (!emailRegex.test(email)) newErrors.email = "Invalid email format";

    if (!password) newErrors.password = "Password is required";
    else if (!passwordRegex.test(password)) {
      newErrors.password =
        "Enter valid password";
    }
    return newErrors;
  };

  useEffect(() => {
    if (localStorage.getItem('token') && localStorage.getItem('token') !== undefined) {
      navigate('/dashboard')
    }
  }, [navigate])

  const login = async (e) => {
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return; // Stop execution if validation errors exist
    }
    e.preventDefault();
    try {
      const response = await fetch("https://blogit-0mif.onrender.com/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!formData.email || !formData.password) {
        setMessage("Please fill all fields");
        return;
      }
      const data = await response.json();
      console.log(data);
      if (response.status === 200) {
        setMessage("Login successfull");
        setFormData({ email: "", password: "" });
        localStorage.setItem('user', JSON.stringify(data?.user))
        localStorage.setItem('token', data?.token)
        // Redirect to dashboard after successful login
        navigate("/dashboard");
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to Login");
    }
  };

  return (
    <div className="container-fluid p-2 m-2 border rounded border-black p-4" style={{ width: '40%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
      {/* <div className="w-25 border border-black p-3 rounded"> */}
      <h2 >Login</h2>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="name@example.com"
            name="email"
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Label htmlFor="inputPassword5">Password</Form.Label>
        <div className="position-relative">
          <Form.Control
            type="password"
            id="inputPassword5"
            aria-describedby="passwordHelpBlock"
            value={formData.password}
            onChange={handleChange}
            name="password"
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </div>
      </Form>
      <div className="d-flex align-items-center mt-3 gap-2">
        <Button onClick={login} variant="primary">
          Login
        </Button>
        <Link to='/register' className='text-decoration-none text-primary'>Dont have an account? Register</Link>
      </div>
      {message && (
        <Alert
          variant={
            message.toLowerCase().includes("success") ? "success" : "danger"
          }
          className="text-center mt-3"
        >
          {message}
        </Alert>
      )}
    </div>
    // </div>
  );
};

export default Login;
