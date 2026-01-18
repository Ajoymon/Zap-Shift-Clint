import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import axios from 'axios';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser, updateUserProfile } = useAuth();
  const handleRegister = data => {
    console.log(data.photo[0]);
    const profileImg = data.photo[0];
    registerUser(data.email, data.password)
      .then(result => {
        console.log(result.user);
        //store the image and get the photo url
        const formdta = new FormData();
        formdta.append('image', profileImg);
        const imageApiUrl = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host
        }`;
        axios.post(imageApiUrl, formdta).then(res => {
          console.log(res.data.data.url);
          //update user profile
          const userProfile = {
            displayName: data.name,
            photoURL: res.data.data.url,
          };
          updateUserProfile(userProfile)
            .then(() => {
              console.log('user profile updetad');
            })
            .catch(error => {
              console.log(error);
            });
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
        <h3 className="text-3xl text-center font-bold">Create an Account</h3>
        <p className="text-center">Register with ZapShift</p>
        <form className="card-body" onSubmit={handleSubmit(handleRegister)}>
          <fieldset className="fieldset">
            {/* Name */}
            <label className="label">Name</label>
            <input
              type="text"
              {...register('name', { required: true })}
              className="input"
              placeholder="Your name"
            />
            {errors.name?.type === 'required' && (
              <p role="alert" className="text-red-600">
                First name is required
              </p>
            )}
            {/* poto */}
            <label className="label">Photo</label>
            {/* <input type="file" className="file-input" /> */}
            <input
              type="file"
              {...register('photo', { required: true })}
              className="file-input"
              placeholder="Your photo"
            />
            {errors.photo?.type === 'required' && (
              <p role="alert" className="text-red-600">
                First photo is required
              </p>
            )}
            {/* Email */}
            <label className="label">Email</label>
            <input
              type="email"
              {...register('email', { required: true })}
              className="input"
              placeholder="Email"
            />
            {errors.email?.type === 'required' && (
              <p role="alert" className="text-red-600">
                First email is required
              </p>
            )}
            {/* Password */}
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
              <p className="text-red-600">Password is required</p>
            )}
            {errors.password?.type === 'minLength' && (
              <p className="text-red-600">
                Password must be 6 characters or longer
              </p>
            )}
            {errors.password?.type === 'pattern' && (
              <p className="text-red-600">
                password mast have at least one uppercase, at laeast one
                lowercase,at laeart one numbar and at last one special
                characters
              </p>
            )}

            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-neutral mt-4">Register</button>
            <p>
              Don’t have any account?{' '}
              <Link className="text-primary" to="/login">
                Login
              </Link>
            </p>
          </fieldset>
        </form>
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Register;
