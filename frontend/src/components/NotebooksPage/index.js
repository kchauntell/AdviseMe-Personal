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
          <i className="fas fa-pencil-alt"></i>
          <NavLink to={`/notebooks/${sessionUser.username}/createNotebook`}>Create Notebook</NavLink>
        </button>
        <button>
          <i className="fas fa-fist-raised">
            <NavLink to={`/notebooks/${sessionUser.username}`}>Safe Space</NavLink>
          </i>
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
          // console.log(notebook.User.username)
            return (
              <div key={notebook.id}>
                <NavLink to={`/notebook/public-${notebook.id}`}>
                  {notebook.title}
                </NavLink>
              </div>
            )
        })}
      </div>
    </div>
  )
}

export default NotebooksPage;
