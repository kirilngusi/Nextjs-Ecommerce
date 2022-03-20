import React, { useContext, useState , useEffect } from "react";
import { ProductContext } from "../contexts/productContext";
import Link from "next/link";
const ProductCart = () => {
    const { state , dispatch , ascendingProduct, descendingProduct, CancelProduct} = useContext(ProductContext);

    const { cart } = state;

    const total = (): number => {
        var sum = 0;
        cart.forEach((item) => {
            sum += item.price * item.quantity
        })

        return sum;
    }
    const initTotal = total;

    const [subtotal, setSubTotal] = useState(initTotal);
    


   
    useEffect(() => {
        setSubTotal(initTotal)
    }, [cart])



    

    return (
        <div>
            <h2>My Cart</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Product</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((item, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.name}</td>

                            <td>
                                <input type="button" value="-" onClick={() => dispatch(descendingProduct(cart,item._id))}/>
                                {item.quantity}
                                <input type="button" value="+" onClick={() => dispatch(ascendingProduct(cart,item._id))}/>
                            </td>
                            <td>{item.price*item.quantity}</td>

                            <td>
                                <input type="button" onClick={() => dispatch(CancelProduct(cart,item._id))} value="Remove"/> 
                            </td>
                        </tr>
                    ))}
                </tbody>

                <div>Subtotal: {subtotal} </div>
            </table>

            <Link href="/checkout">
                <a> CheckOut </a>
            </Link>
        </div>
    );
};

export default ProductCart;
