import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function Checkout() {
  const [login, setLogin] = useState(false);  // set up login
  const [data, setData] = useState({});   // set up fb data 
  const [picture, setPicture] = useState('');   // set up fb profile image 

  const responseFacebook = (response) => {
    console.log(response);
    setData(response);
    setPicture(response.picture.data.url);
    if (response.accessToken) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }

  return (
    <div className="container">
      <Card style={{ width: "800px" }} className="mx-auto mt-5">
        <Card.Header className="pb-4">
        <h1>{login ? 'Check Out' : 'Sign In'}</h1> {/* Change heading based on login */}
        </Card.Header>
        <Card.Body>
          <Card.Text className="align-left"> {/* Added class to align content */}
            {!login && 
            <React.Fragment>
              <h3>Please login using one of the following:</h3>
              {/* SignIn Form  */}
              <SignInForm />
              {/* FB Login Button */}
              <FacebookLogin 
                appId="7558807887518299"
                autoLoad={false}
                fields="name,email,picture"
                scope="public_profile"
                callback={responseFacebook}
                icon="fa-facebook"
              />
            </React.Fragment>
            }

            {login && 
              <CheckoutHome fbpic={picture} fbdata={data} />
            }
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}

// Login Form component
function SignInForm() {
  return (
    <form className="border mt-3 mb-5 p-3 bg-white">
      <label className="m-2">Name:</label>
      <input type="text" name="name" placeholder="Your name" />
      <label className="m-2">Email:</label>
      <input type="email" name="email" placeholder="Your Email" />
      <input type="submit" value="Login" className="btn bg-success text-white my-3" />
    </form>
  )
}

function CheckoutHome({fbpic,fbdata}) {
  return(
    <React.Fragment>
      <img src={fbpic} alt={fbdata.name} />
      <h3 className="d-inline text-success mx-2">
        Welcome back {fbdata.name}!
      </h3>
      <p className="my-5">Time to check out?</p>
    </React.Fragment>
  )
}

export default Checkout;