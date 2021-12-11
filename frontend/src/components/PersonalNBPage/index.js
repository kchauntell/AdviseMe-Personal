import { getNotebooks, getNotebook, removeNotebook } from '../../store/notebook';
import { useDispatch, useSelector } from 'react-redux';
import CreateNotebookPage from '../CreateNotebookPage';
import EditNotebookForm from '../EditNotebookForm';
// import * as notebookActions from '../../store/notebook';
import { Redirect, Route, NavLink, useHistory, useParams } from 'react-router-dom';
import './PersonalNB.css';
import React, { useEffect, useState } from 'react';
import Fab from '../Fab';
import EditFab from '../EditFab';

function PersonalNBPage () {
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false)
  const sessionUser = useSelector(state => state.session.user);
  const {notebookId} = useParams();
  const dispatch = useDispatch();
  const notebooks = useSelector(state => {
    return Object.values(state.notebook);
  });
  // const notebook = useSelector(state => {

  //   return state.notebook[notebookId];
  // });
  const history = useHistory();
  console.log(notebookId);

  useEffect(() => {
    dispatch(getNotebooks());
  }, []);

  useEffect(() => {
    dispatch(getNotebook(notebookId));
  }, [dispatch]);

  const handleDelete = async (e) => {
    e.preventDefault();

    if(!notebookId) {return}

    await dispatch(removeNotebook(notebookId));
    // await dispatch(getNotebooks());
    history.push(`/notebooks/${sessionUser.username}`)
  }

  return (
    <div>
      <h1>Welcome to your Safe Space: {sessionUser.username}</h1>
        <Fab hidden={showForm} onClick={() => setShowForm(true)}/>
      {notebooks.map(notebook => {
        // console.log(notebook.userId)
        if(sessionUser.id === notebook.userId) {
          // console.log(notebook.id)
          return (
            <div key={notebook.id}>
              <div>
                <NavLink to={`/notebooks/${sessionUser.username}/notebook/${notebook.id}`}>{notebook.title}</NavLink>
                <EditFab key={notebook.id} hidden={showEditForm} onClick={() => setShowEditForm(true)} />
                  {/* <i className="far fa-edit"></i> */}
                <button
                onClick={handleDelete}
                >
                  <i className="fas fa-eraser"></i>
                </button>
              </div>
            </div>
          )
        }
        return null;
      })}
      {showForm ? (
        <CreateNotebookPage hideForm={() => setShowForm(false)} />
      ) :
      (
        <Route path="/notebook/:username/createNotebook">
          {/* <PokemonDetail /> */}
        </Route>
      )
      }
      {showEditForm ? (
        <EditNotebookForm hideForm={() => setShowEditForm(false)} />
      ) :
        (
          <Route path="/notebook/:username/editNotebook">
            {/* <PokemonDetail /> */}
          </Route>
        )
      }
    </div>
  )
}




export default PersonalNBPage;
