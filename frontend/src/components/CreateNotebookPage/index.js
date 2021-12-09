import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import * as notebookActions from '../../store/notebook';
import { useDispatch, useSelector } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import { getNotebooks } from '../../store/notebook';
import './CreateNotebook.css';

const genres = [
  'General Relationships',
  'Platonic Relationships',
  'School/Environment',
  'Work Environment/Relationships'
]


function CreateNotebookPage () {
  const dispatch = useDispatch();
  const {notebookId} = useParams();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);

  const [title, setTitle] = useState("")
  const [genre, setGenre] = useState("");
  const [hidden, setHidden] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(getNotebooks());
  }, [dispatch]);

  console.log(sessionUser.username)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(title === '') {
      return
    }

    await dispatch(notebookActions.createNotebook({title, genre, hidden, userId: sessionUser.id}));
    history.push(`/notebooks/${sessionUser.username}`)
  }

  const handleChange = (e) => {
    let checkbox = e.target;
    if (checkbox.checked) {
      setHidden(e.target.value === true)
    } else {
      setHidden(e.target.value === false)
    }
  }


  return (
    <form onSubmit={(e) => handleSubmit(e)}>

      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <div>
        <label> Title
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Name your Notebook here.... '
            required >
          </input>
        </label>
      </div>
      <div>
        <label> In what area of Life are you discussing?
          <div>
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              placeholder='Enlighten us with your wisdom'
              required >
                {genres.map((genre) => {
                  return (
                    <option key={genre}>{`${genre}`}</option>
                  )
              })}
            </select>
          </div>
        </label>
      </div>
      <div>
        <label> Would you like to keep this hidden?
          <input
            type='checkbox'
            value={hidden}
            onChange={(e) => handleChange(e)}
            >
          </input>
        </label>
      </div>
      <button type='submit'> Create My Notebook!</button>
    </form>
  )
}


export default CreateNotebookPage;
