import React from 'react'
import { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { HiOutlineEye } from "react-icons/hi2";
import { HiOutlineEyeOff } from "react-icons/hi";
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  // const [image, setImage] = useState('');
  const [profile, setProfile] = useState({})
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()
  const [passwordIcon, setPasswordIcon] = useState(false);
  const [confirmPasswordIcon, setConfirmPasswordIcon] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token') && localStorage.getItem('token') !== undefined) {
      navigate('/dashboard')
    }
  }, [navigate]);

  const validate = () => {
    const { name, email, password, confirmPassword } = profile;
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    else if (!emailRegex.test(email)) newErrors.email = "Invalid email format";

    if (!password) newErrors.password = "Password is required";
    else if (!passwordRegex.test(password)) {
      newErrors.password =
        "Password must be 8+ characters with uppercase, lowercase, number, and special character";
    }
    // checks if password is empty or not
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const registerUser = async () => {
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return; // Stop execution if validation errors exist
    }

    const { name, email, password, profilePic } = profile


    try {
      const response = await fetch('https://blogit-0mif.onrender.com/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password, profilePic })
      })

      const data = await response.json()
      console.log('response', data)
      localStorage.setItem('user', JSON.stringify(data?.newUser))
      localStorage.setItem('token', data?.token)
      navigate('/dashboard')
    } catch (error) {
      console.log(error)
      // alert('Error while registering user')

    }
  }


  const handleChange = (e) => {
    const { name, value } = e.target
    setProfile({ ...profile, [name]: value })
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setProfile({ ...profile, profilePic: reader.result })
        console.log('render-image', reader.result)// base64 string
      };
      reader.readAsDataURL(file); // converts file to base64
    }
  };

  return (
    <div className="container-fluid p-2 m-2 border rounded border-black p-4" style={{ width: '50%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
      <h2>Register yourself</h2>
      <div className="d-flex flex-column align-items-center gap-2 ">

        {profile?.profilePic && (
          <div style={{}} className='rounded-circle'>
            <img className='rounded-circle' src={profile?.profilePic} alt="Preview" style={{ width: '200px', height: '200px' }} />
          </div>
        )}
        <Form.Group className="d-flex" controlId="formImage">
          {/* <div className="d-flex"> */}

          <Form.Label className='btn btn-primary btn-sm'> {!profile?.profilePic ? 'Upload ProfilePic' : 'Update'} </Form.Label>
          <input
            style={{ display: 'none' }}
            id='formImage'
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          {/* </div> */}

        </Form.Group>
      </div>
      <Form>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={profile?.name || ""}
            name="name"
            onChange={handleChange}
            type="text"
            placeholder="Enter Name"
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={profile?.email || ""}
            name="email"
            onChange={handleChange}
            type="email"
            placeholder="Enter email"
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Label>Password</Form.Label>
          <div className="position-relative">
          <Form.Control
            value={profile?.password || ""}
            name="password"
            onChange={handleChange}
            type={passwordIcon ? "text" : "password"}
            placeholder="Password"
            isInvalid={!!errors.password}
          />
          <span
            className="position-absolute top-50 end-0 translate-middle-y pe-3"
            style={{ cursor: "pointer" }}
            onClick={() => setPasswordIcon(!passwordIcon)}
          >
            {passwordIcon ? <HiOutlineEyeOff /> : <HiOutlineEye />}
          </span>
          </div>

          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <div className="position-relative">
          <Form.Control
            value={profile?.confirmPassword || ""}
            name="confirmPassword"
            onChange={handleChange}
            type={confirmPasswordIcon ? "text" : "password"}
            placeholder="Re-enter your password"
            isInvalid={!!errors.confirmPassword}
          />
          <span
            className="position-absolute top-50 end-0 translate-middle-y pe-3"
            style={{ cursor: "pointer" }}
            onClick={() => setConfirmPasswordIcon(!confirmPasswordIcon)}
          >
            {confirmPasswordIcon ? <HiOutlineEyeOff /> : <HiOutlineEye />}
          </span>
          </div>
          <Form.Control.Feedback type="invalid">
            {errors.confirmPassword}
          </Form.Control.Feedback>
        </Form.Group>
        <div className="d-flex gap-2 align-items-center justify-content-center">
          <Button variant="primary" onClick={registerUser}>
            Create Account
          </Button>
          <Link to='/login' className='text-decoration-none text-primary'>Already have an account? Login</Link>
        </div>
      </Form>
    </div>
  )
}

export default SignUp
