import { csrfFetch } from './csrf';

const LOAD_NOTEBOOKS = 'notebook/LOAD_NOTEBOOKS';
const ADD_NOTEBOOK = 'notebook/ADD_NOTEBOOK';
const DELETE_NOTEBOOK = 'notebook/DELETE_NOTEBOOK'

const loadNotebooks = (notebooks) => {
  return {
    type: LOAD_NOTEBOOKS,
    payload: notebooks
  }
}

const addNotebook = (newNotebook) => {
  return {
    type: ADD_NOTEBOOK,
    newNotebook,
  }
}

const deleteNotebook = (notebookId) => {
  return {
    type: DELETE_NOTEBOOK,
    payload: notebookId
  }
}

export const getNotebooks = () => async(dispatch) => {
  const response = await csrfFetch(`/api/notebook`);

  if(response.ok) {
    const library = await response.json();
    dispatch(loadNotebooks(library));
  }
};

export const createNotebook = (data) => async (dispatch) => {
  const response = await csrfFetch(`/api/notebook`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (response.ok) {
    const postNotebook = await response.json();
    dispatch(addNotebook(postNotebook));
    return postNotebook;
  }
}

const initialState = {};

const notebookReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_NOTEBOOKS: {
      const allNotebooks = {};
      action.payload.map(notebook => {
        return allNotebooks[notebook.id] = notebook;
      });
      return {
        ...allNotebooks,
        ...state,
      }
    }
    case ADD_NOTEBOOK: {
      newState = {...state};
      if(!state[action.newNotebook.id]) {
        newState = {
          ...state,
          [action.newNotebook.id]: action.newNotebook
        };
        newState[action.newNotebook.id] = action.newNotebook
        return newState;
      }
      return {
        ...state,
        [action.newNotebook.id]: {
          ...state[action.newNotebook.id],
          ...action.newNotebook
        }
      }
    };
    case DELETE_NOTEBOOK: {
      newState={...state};
      delete newState[action.notebookId];
      return newState;
    };
    default:
      return state;
  }
}

export default notebookReducer;
