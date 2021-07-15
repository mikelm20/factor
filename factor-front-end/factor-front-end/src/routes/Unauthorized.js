import React from 'react';
import NotLogged from "../components/NoLog";

const Unauthorized = () => {
  return (
    <div className='container'>
            <NotLogged/>
      <div className="message">
        <h1>403 - You Shall Not Pass</h1>
        <p>Uh oh, Gandalf is blocking the way!<br />Maybe you have a typo in the url? Or you meant to go to a different location? Like...Hobbiton?</p>
      </div>
    </div>
  )
}

export default Unauthorized;