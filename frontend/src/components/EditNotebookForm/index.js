import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import * as notebookActions from '../../store/notebook';
import { useDispatch, useSelector } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import { getNotebooks, updateNotebook } from '../../store/notebook';
import './EditNotebook.css';

const genres = [
  'General Relationships',
  'Platonic Relationships',
  'School/Environment',
  'Work Environment/Relationships'
]


function EditNotebookForm ({ hideForm }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const notebooks = useSelector(state => {
    return Object.values(state.notebook);
  });

  const [title, setTitle] = useState(notebooks.title);
  const [genre, setGenre] = useState(notebooks.genre);
  const [hidden, setHidden] = useState(notebooks.hidden);
  const [errors, setErrors] = useState([]);

  const updateTitle = (e) => setTitle(e.target.value);
  const updateGenre = (e) => setGenre(e.target.value);
  const updateHidden = (e) => setHidden(e.target.value);


  useEffect(() => {
    dispatch(getNotebooks());
  }, [dispatch]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...notebooks,
      title,
      genre,
      hidden
    };

    const updatedNotebook = await dispatch(updateNotebook(payload));
    if(updatedNotebook) {
      hideForm();
      history.push(`/notebooks/${sessionUser.username}`);
    }

  }

  const handleCancelClick = (e) => {
    e.preventDefault();
    hideForm();
    history.push(`/notebooks/${sessionUser.username}`)
  };

  const handleChange = (e) => {
    let checkbox = e.target.value;
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
            onChange={updateTitle}
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
              onChange={updateGenre}
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
      <button type='submit'> Update My Notebook!</button>
      <button type="button" onClick={handleCancelClick}>Cancel</button>
    </form>
  )

}

export default EditNotebookForm;
