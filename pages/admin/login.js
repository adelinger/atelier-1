import React, { useRef, useState } from "react";
import { withPublic } from "../../auth/hook/route"
import Link from "next/link";
import Auth from 'layouts/Auth'
import { CircularProgress } from "@mui/material";

function Login({ auth, pathname }) {
  const email = useRef();
  const password = useRef();
  const [showLoader, setShowLoader] = useState();

  const {
    signInUserWithEmailAndPassword,
    error,
  } = auth;

  const logUser = async (e) => {
    setShowLoader(true);

    e.preventDefault();

     await signInUserWithEmailAndPassword(
      email.current.value,
      password.current.value
    );

    setShowLoader(false);
  };

  return (
    <Auth>
      <div>
        {error?.[pathname] && <h4 style={{ color: "red" }}>{error[pathname]}</h4>}
        <>
          <div className="container mx-auto px-4 h">
            <div className="flex content-center items-center justify-center place-items-center h-full">
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <div className="text-blueGray-400 text-center mb-3 font-bold">
                      <small>Sign in with credentials</small>
                    </div>
                    <form onSubmit={logUser}>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Username
                        </label>
                        <input
                          type="text"
                          ref={email}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Username"
                        />
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          ref={password}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Password"
                        />
                      </div>

                      <div className="text-center mt-6">
                        <button

                          className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                          type="submit"
                        >
                          Sign In
                        </button>
                      </div>
                      {error?.[pathname] && !showLoader && <h4 style={{ color: "red" }}>{error[pathname]}</h4>}
                    </form>

                    {showLoader &&
                      <div className="mt-10 text-center">
                        <CircularProgress />
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      </div>
    </Auth>
  );
}

export default withPublic(Login);