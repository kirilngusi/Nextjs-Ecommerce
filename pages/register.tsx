import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { AuthContext } from "../contexts/AuthContext";
const Register = () => {
    const router = useRouter();

    const [registerForm, setRegisterForm] = useState({
        username: "",
        password: "",
    });

    const { regisUser } = useContext(AuthContext);

    const onChangeRegisForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
    };

    const { username, password } = registerForm;

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        try {
            await regisUser(registerForm);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <section className="">
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card-body p-md-5">
                            <div className="row justify-content-center">
                                <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                                        Sign up
                                    </p>

                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="username">
                                                Username
                                            </label>
                                            <input
                                                className="form-control"
                                                placeholder="Enter Username"
                                                id="username"
                                                value={username}
                                                name="username"
                                                onChange={onChangeRegisForm}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="pwd">
                                                Password:
                                            </label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="Enter password"
                                                id="pwd"
                                                value={password}
                                                name="password"
                                                onChange={onChangeRegisForm}
                                            />
                                        </div>
                                        <div className="form-group ">
                                            Have account ?{" "}
                                            <Link href="/login">
                                                <span className="text-info">
                                                    Login
                                                </span>
                                            </Link>
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                        >
                                            Submit
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;
