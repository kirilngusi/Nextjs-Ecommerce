import React , {useContext} from 'react'
import Toast from './Toast';

import { ProductContext } from '../contexts/productContext';

 const Notify = () => {

    const {state , dispatch} = useContext(ProductContext);

    const {notify} = state;

    if(notify.error) {
        setTimeout(() => {
            dispatch({type: "Notify", payload: {}})
        },2000)
    }

    return (
        <div>
            {notify.error && <Toast bgColor={"bg-danger"} msg={{msg: notify.error , title: 'Error'}} handleClose={() => dispatch({type: "Notify", payload: {}}) }/>}
        </div>
  )
}

export default Notify;