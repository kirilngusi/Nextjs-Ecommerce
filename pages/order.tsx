import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useContext } from "react";

import { getData } from "../utils/request";
import { AuthContext } from "../contexts/AuthContext";

const Profile = ({ res }) => {
    const router = useRouter();
    const { changePassWord , authState } = useContext(AuthContext);
    const [newpassword, setNewPassword] = useState("");

    const {authUser : {username}} = authState;

    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassword(e.target.value);
    };

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        try {
            const result = await changePassWord(newpassword);

            if (result.success) {
                router.push("/");
            }
            return result;
        } catch (e) {
            console.log(e);
        }
    };
   


    if(username === 'admin') {
        return (
            <div className="container-fluid">
                <div className="row">
                    
                    <div className=" table-responsive">
                        <h5 className="text-center mt-4 mb-4">MY ALL ORDER</h5>
                        <table className="table table-striped ">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">ID</th>
                                    <th scope="col">Customer</th>
                                    <th scope="col">Phone Number</th>
                                    <th scope="col">DATE</th>
                                    <th scope="col">TOTAL</th>
                                    <th scope="col">ADDRESS</th>
                                    <th scope="col">DELIVERED</th>
                                </tr>
                            </thead>
                            <tbody>
                                {res.message.userId.map((item, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index}</th>
                                        <td>
                                            {/* <Link href={`order/${item._id}`}> */}
                                                {item._id}
                                            {/* </Link> */}
                                        </td>
                                        <td>{item.name}</td>
                                        <td>{item.mobile}</td>
                                        <td>Null</td>
                                        <td>{item.totalPrice}</td>
                                        <td>{item.address}</td>
                                        <td>{item.delivered ? "Yes" : "No"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h5 className="text-center mt-4 mb-4">CHANGE PASSWORD</h5>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    aria-describedby="emailHelp"
                                    placeholder="Username"
                                    disabled
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    aria-describedby="emailHelp"
                                    placeholder="Name"
                                    disabled
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    aria-describedby="emailHelp"
                                    placeholder="Email"
                                    disabled
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="newpassword">New Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="newpassword"
                                    placeholder="New Password"
                                    value={newpassword}
                                    onChange={onChangePassword}
                                    name="newpassword"
                                />
                            </div>
    
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </form>
                    </div>
                    <div className="col-md-8 table-responsive">
                        <h5 className="text-center mt-4 mb-4">MY ALL ORDER</h5>
                        <table className="table table-striped ">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">ID</th>
                                    <th scope="col">DATE</th>
                                    <th scope="col">TOTAL</th>
                                    <th scope="col">DELIVERED</th>
                                </tr>
                            </thead>
                            <tbody>
                                {res.message.userId.map((item, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index}</th>
                                        <td>
                                            <Link href={`order/${item._id}`}>
                                                {item._id}
                                            </Link>
                                        </td>
                                        <td>Null</td>
                                        <td>{item.totalPrice}</td>
                                        <td>{item.delivered ? "Yes" : "No"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
   
};

export default Profile;

export const getServerSideProps: GetServerSideProps = async ({
    req,
}: {
    req: any;
}) => {
    let cookie = req.cookies.auth;
    const res = await getData("/order/allOrder", cookie);
    return {
        props: { res },
    };
};
