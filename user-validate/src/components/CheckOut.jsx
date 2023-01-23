import React,{ useState,useEffect } from 'react'
import StripeCheckout from 'react-stripe-checkout';
import './profile.css'
import {useNavigate } from 'react-router-dom'
function CheckOut() {
  const nav = useNavigate()
  const [stripetoken,setstripetoken] = useState(null)
  const onToken = (token)=>{
    setstripetoken(token)
  }
  useEffect(() => {
    const checkOut = async () =>{
    try{
      const response = await fetch("http://localhost:5500/api/checkout",{
        tokenId: stripetoken.id,
        amount: 140,
      })
      console.log(response.data);
      nav('/home');
    }catch(error){
      console.log(error)
    }
  }
  stripetoken && checkOut()
  },[stripetoken])
  return (
    // {stripetoken ? (<span>Proccessi</span>) :('')}
    <StripeCheckout name="Cedrick Netflix" image='https://i.pinimg.com/736x/db/70/dc/db70dc468af8c93749d1f587d74dcb08.jpg'
    billingAddress
    shippingAddress
    description='Get First Class Movies $140/month'
    amount={140}
    token={onToken}
    stripeKey="pk_test_51KtVabD0pePG6tLqW7ALREysOvQ9jrFIT9mrCN2jxjkd1of6emMcJ533F0kboV1Kk34ZwnuUkeCrrARqvok5OrHV00tkvXE7O6"
    >
    <button style={{
    'height': '7vh',
    'width': '20vw',
    'background-color': 'red',
    'color': 'white',
    'margin': '4em 5em',
    'border': 'none',
    'fontWeight': 'bold',
    'outline': 'none',
    'cursor': 'pointer'
      }}>Subscribe</button>
    </StripeCheckout>
  )
}

export default CheckOut