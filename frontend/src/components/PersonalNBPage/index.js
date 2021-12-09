import { getNotebooks } from '../../store/notebook';
import { useDispatch, useSelector } from 'react-redux'; //add useDispatch
// import React, { useEffect } from 'react';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import './PersonalNB.css';
import { useEffect } from 'react';

function PersonalNBPage () {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const notebooks = useSelector(state => {
    return Object.values(state.notebook);
  });
  const history = useHistory();
  const {notebookId} = useParams();

  // console.log(notebookId)

  useEffect(() => {
    dispatch(getNotebooks())
  }, [dispatch])

  // console.log(sessionUser.id);
  // console.log(notebooks)

  return (
    <div>
      <h1>Welcome to your Safe Space: {sessionUser.username}</h1>
      <button>
        <i class="fas fa-pencil-alt"></i>
        <NavLink to={`/notebooks/${sessionUser.username}/createNotebook`}>Create Notebook</NavLink>
      </button>
      {notebooks.map(notebook => {
        // console.log(notebook.userId)
        if(sessionUser.id === notebook.userId) {
          return (
            <div key={notebook.id}>
              <NavLink to={`/notebooks/${notebook.id}`}>{notebook.title}</NavLink>
              <button>
                <i class="far fa-edit"></i>
              </button>
              <button>
                <i class="fas fa-eraser"></i>
              </button>
            </div>
          )
        }
      })}
    </div>
  )
}




export default PersonalNBPage;
