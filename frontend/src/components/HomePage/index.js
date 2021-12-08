import React, { useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
// import * as notebookActions from '../../store/notebook';
import { useDispatch, useSelector } from 'react-redux';
import { getNotebooks } from '../../store/notebook';

function HomePage() {
  return (
    <div>
      <h1>Welcome to Advice Me!</h1>
    </div>
  )
}


export default HomePage;
