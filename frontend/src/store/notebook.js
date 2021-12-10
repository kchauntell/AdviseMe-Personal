import { csrfFetch } from './csrf';

const LOAD_NOTEBOOKS = 'notebook/LOAD_NOTEBOOKS';
const LOAD_NOTEBOOK = 'notebook/LOAD_NOTEBOOK'
const ADD_NOTEBOOK = 'notebook/ADD_NOTEBOOK';
const DELETE_NOTEBOOK = 'notebook/DELETE_NOTEBOOK'

const loadNotebooks = (notebooks) => {
  return {
    type: LOAD_NOTEBOOKS,
    payload: notebooks
  }
}

const loadNotebook = (singleNotebook) => {
  return {
    type: LOAD_NOTEBOOK,
    singleNotebook,
  }
}

const addNotebook = (newNotebook) => {
  return {
    type: ADD_NOTEBOOK,
    newNotebook,
  }
}

const deleteNotebook = (notebook) => {
  return {
    type: DELETE_NOTEBOOK,
    notebook,
  }
}

export const getNotebooks = () => async(dispatch) => {
  const response = await csrfFetch(`/api/notebook`);

  if(response.ok) {
    const library = await response.json();
    dispatch(loadNotebooks(library));
  }
};

export const getNotebook = (notebookId) => async(dispatch) => {
  const res = await csrfFetch(`api/notebook/${notebookId}`);

  if(res.ok) {
    const notebook = await res.json();
    dispatch(loadNotebook(notebook));
  }
}

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

export const removeNotebook = (notebook) => async dispatch => {
  const res = await csrfFetch(`/api/notebook/${notebook}`, {
    method: 'DELETE'
  });
  // console.log(notebook, '------------------');

  if(res.ok) {
    const notebook = await res.json();
    // console.log(notebook, '*********************');
    dispatch(deleteNotebook(notebook));
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
    case LOAD_NOTEBOOK: {
      const Notebook = {};
      action.singleNotebook.map(book => {
        return Notebook[book.id] = book;
      });
      return {
        ...Notebook,
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
      // return {
      //   ...state,
      //   [action.newNotebook.id]: {
      //     ...state[action.newNotebook.id],
      //     ...action.newNotebook
      //   }
      // }
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
