/* eslint-disable @next/next/no-img-element */
import React, { useContext } from "react";
import { getData } from "../../utils/request";
import OrderDetail from "../../models/orderItemModel";
import styles from '../../styles/Home.module.css';

interface Type {
    _id: string;
    images: string;
    price: number;
    name: string;
}

interface orderItemIprop {
    product: Type;
    quantity: number;
}

interface orderIdIprop {
    address: string;
    delivered: boolean;
    email: string;
    mobile: string;
    name: string;
    orderItems: [];
    totalPrice: number;
    user: {};
    _id: string;
}

interface ProductIprop {
    product: orderIdIprop;
}

interface Result {
    success: boolean;
    message: ProductIprop;
}

const CheckOutToOrder = ({ res }: { res: Result }) => {
    if (!res.success) {
        return <h4>Not Order</h4>;
    }

    return (
        
        <div className="container">
             <div className={styles.title_heading}>
                <h2 className={styles.title_heading_text}> Order Detail</h2>
            </div>
            <div className="col-md-7 ">
               
                <h4>Shipping</h4>
                <div className="">
                    <p>Name: {res.message.product.name}</p>
                    <p>Email: {res.message.product.email}</p>
                    <p>Address: {res.message.product.address}</p>
                    <p>Mobile: {res.message.product.mobile}</p>
                </div>
                <h4>Deliver</h4>
                <div>
                    <p
                        className={
                            res.message.product.delivered
                                ? "text-success"
                                : "text-danger"
                        }
                    >
                        Deliver: {res.message.product.delivered ? "Yes" : "Not"}
                    </p>
                </div>
                <h4>Order Items</h4>
                <div>
                    {res.message.product.orderItems.map(
                        (orderItem: orderItemIprop, index: number) => (
                            <div key={index} className="d-flex justify-content-between border-bottom mt-2 justify-content-md-between">
                                <div className="font-weight-normal">
                                <img
                                    src={orderItem.product.images[0]}
                                    alt="Image Error"
                                    width="50"
                                    height="50"
                                    className="mr-2"
                                />
                                
                                    {orderItem.product.name}
                                </div>

                                <div className="d-flex align-items-center">
                                    ${orderItem.product.price} x 
                                     {orderItem.quantity}= $
                                    {orderItem.product.price *
                                        orderItem.quantity}
                                </div>
                            </div>
                        )
                    )}

                    <div className="h5 text-secondary float-right mt-3 mb-3">Total :${res.message.product.totalPrice}</div>
                </div>
            </div>
        </div>
    );
};

export default CheckOutToOrder;

export const getServerSideProps = async ({
    params,
    req,
}: {
    params: any;
    req: any;
}) => {
    let cookie = req.cookies.auth;
    const res = await getData(`order/${params.id}`, cookie);
    
    
    return {
        props: { res },
    };
};
