import { getNotebooks, getNotebook, removeNotebook } from '../../store/notebook';
import { useDispatch, useSelector } from 'react-redux';
// import * as notebookActions from '../../store/notebook';
import { NavLink, useHistory } from 'react-router-dom';
import './PersonalNB.css';
import React, { useEffect } from 'react';

function PersonalNBPage () {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const notebooks = useSelector(state => {
    return Object.values(state.notebook);
  });
  const notebook = useSelector(state => {
    let notebooks = Object.values(state.notebook);
    let notebook = notebooks.map(notebook => notebook.id);
    return notebook;
  })

  const history = useHistory();
  console.log(notebook)

  useEffect(() => {
    dispatch(getNotebooks());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getNotebook());
  }, [dispatch]);

  const handleDelete = (e) => {
    e.preventDefault();

    notebook.map(async (book) => {
    await dispatch(removeNotebook(book))
  });
  
  history.push(`/notebooks/${sessionUser.username}`)
  }

  return (
    <div>
      <h1>Welcome to your Safe Space: {sessionUser.username}</h1>
      <button>
        <i className="fas fa-pencil-alt"></i>
        <NavLink to={`/notebooks/${sessionUser.username}/createNotebook`}>Create Notebook</NavLink>
      </button>
      {notebooks.map(notebook => {
        // console.log(notebook.userId)
        if(sessionUser.id === notebook.userId) {
          // console.log(notebook.id)
          return (
            <div key={notebook.id}>
              <NavLink to={`/notebook/${notebook.id}`}>{notebook.title}</NavLink>
              <button>
                <i className="far fa-edit"></i>
              </button>
              <button
              onClick={handleDelete}
              >
                <i className="fas fa-eraser"></i>
              </button>
            </div>
          )
        }
        return null;
      })}
    </div>
  )
}




export default PersonalNBPage;
