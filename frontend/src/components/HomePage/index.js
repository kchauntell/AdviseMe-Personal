import React, { useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
// import * as notebookActions from '../../store/notebook';
import { useDispatch, useSelector } from 'react-redux';
import { getNotebooks } from '../../store/notebook';
import './HomePage.css';

function HomePage() {
  return (
    <div id='homepage'>
      <h1>Advise Me!</h1>
      <div id='aboutus'>
        <h2> We Manifest Positivity </h2>
        <p> Advise Me! is founded by kchauntell. Our goal is to help
          build community for ANYBODY that needs to: VENT, CONNECT, or SEEK RESOLTION.
        </p>
      </div>
    </div>
  )
}


export default HomePage;
