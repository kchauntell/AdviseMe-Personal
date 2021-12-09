import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
// import * as notebookActions from '../../store/notebook';
import { useDispatch, useSelector } from 'react-redux';
import { getNotebooks } from '../../store/notebook';
import './Notebooks.css';

function NotebooksPage() {
  const sessionUser = useSelector(state => state.session.user);
  // const history = useHistory();
  const dispatch = useDispatch();
  const notebooks = useSelector(state => {
    return Object.values(state.notebook);
  });

  let loggedInButtons;


  if(sessionUser) {
    loggedInButtons = (
      <div>
        <button>
          <NavLink to={`/notebooks/${sessionUser.username}/createNotebook`}>Create Notebook</NavLink>
        </button>
        <button>
          <NavLink to={`/notebooks/${sessionUser.username}`}>Personal Collection</NavLink>
        </button>
      </div>
    )
  };


  useEffect(() => {
    dispatch(getNotebooks());
  }, [dispatch])

  return (
    <div>
      <h1> NoteBooks Library! </h1>
      <h2>Public Notebook Library</h2>
      <div>
        {loggedInButtons}
        {notebooks.map((notebook) => {
          // console.log(notebook)
            return (
              <div key={notebook.id}>
                <NavLink to={`/notebook/public-${notebook.id}`}>
                  {notebook.title}
                </NavLink>
                <div>
                  {notebook.Notes.map(note => {
                    // if(notebook.hidden === false) {
                    return (
                      <span key={note.id}>
                        <p>{note.title}</p>
                        <p> Posted By: {notebook.User.username}</p>
                      </span>
                    )
                    // }
                  })}
                </div>
              </div>
            )
        })}
      </div>
    </div>
  )
}

export default NotebooksPage;
