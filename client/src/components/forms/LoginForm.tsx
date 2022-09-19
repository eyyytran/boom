<<<<<<< HEAD
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../server/firebase";
import Component from "../Component";
=======
import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../server/firebase'
import Component from '../Component'
>>>>>>> parent of da4d84e (added username to redux)

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const login = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log("clicked");
    signInWithEmailAndPassword(auth, email, password)
      .then(() => console.log("User logged in"))
      .catch((error) => console.log(error));
  };

<<<<<<< HEAD
  return (
    <Component id="Column">
      <div
        className="flex flex-col items-center justify-flex-start px-6 py-8 mx-auto md:h-screen lg:py-0"
        // style={{ height: "100%", width: "100%" }}
      >
        <div
          className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0"
          style={{ height: "auto", width: "100%", marginTop: "100px" }}
        >
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Welcome Back
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={login}>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  required={true}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required={true}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <small>{errorMessage}</small>
              <button
                type="submit"
                className="w-full text-white bg-indigo-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </Component>
  );
};

export default LoginForm;
=======
    const login = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        console.log('clicked')
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                alert('success')
                navigate('/')
            })
            .catch(error => console.log(error))
    }

    return (
        <Component id='Column'>
            <div
                className='flex flex-col items-center justify-flex-start px-6 py-8 mx-auto md:h-screen lg:py-0'
                // style={{ height: "100%", width: "100%" }}
            >
                <div
                    className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0'
                    style={{
                        height: 'auto',
                        width: '100%',
                        marginTop: '100px',
                    }}
                >
                    <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                        <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl '>
                            Welcome Back
                        </h1>
                        <form
                            className='space-y-4 md:space-y-6'
                            onSubmit={login}
                        >
                            <div>
                                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                                    Your email
                                </label>
                                <input
                                    type='email'
                                    name='email'
                                    id='email'
                                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                                    placeholder='name@company.com'
                                    required={true}
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                                    Password
                                </label>
                                <input
                                    type='password'
                                    name='password'
                                    id='password'
                                    placeholder='••••••••'
                                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                                    required={true}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                            <small>{errorMessage}</small>
                            <button
                                type='submit'
                                className='w-full text-white bg-indigo-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                            >
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Component>
    )
}

export default LoginForm
>>>>>>> parent of da4d84e (added username to redux)
