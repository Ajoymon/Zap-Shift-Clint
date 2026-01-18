import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);
  const { signinuser } = useAuth();
  const handleLogin = data => {
    console.log(data);
    signinuser(data.email, data.password)
      .then(reselt => {
        console.log(reselt.user);
        navigate(location.state || '/');
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
      <h3 className="text-3xl text-center font-bold">Welcome Back</h3>
      <p className="text-center">Login with ZapShift</p>
      <form className="card-body" onSubmit={handleSubmit(handleLogin)}>
        <fieldset className="fieldset">
          {/* Email */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register('email', { required: true })}
            className="input"
            placeholder="Email"
          />

          {errors.email?.type === 'required' && (
            <p className="text-red-600">first name is required</p>
          )}
          {/* password */}
          <label className="label">Password</label>
          <input
            type="password"
            {...register('password', {
              required: true,
              minLength: 6,
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            })}
            className="input"
            placeholder="Password"
          />
          {errors.password?.type === 'required' && (
            <p className="text-red-600"> Password is required</p>
          )}
          {errors.password?.type === 'minLength' && (
            <p className="text-red-600">
              Password must be 6 characters or longer
            </p>
          )}

          {errors.password?.type === 'pattern' && (
            <p className="text-red-600">
              password mast have at least one uppercase, at laeast one
              lowercase,at laeart one numbar and at last one special characters
            </p>
          )}

          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>

          <button className="btn btn-neutral mt-4">Login</button>
          <p>
            Don’t have any account?{' '}
            <Link className="text-primary" to="/register">
              Register
            </Link>
          </p>
        </fieldset>
      </form>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Login;
