import React from 'react'
import {getData} from '../../utils/request';
const ProductDetail =  ({res}) => {
    // console.log(params.id);


    console.log(res);

  return (
    <div>ProductDetail</div>
  )
}

export default ProductDetail;


export const getServerSideProps = async ({ params }) => {
    // const country = await getCountry(params.id);
   
    const res = await getData(`product/${params.id}`)
    return {
      props: { res },
    };
  };