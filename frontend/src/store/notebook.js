import { csrfFetch } from './csrf';

const LOAD_NOTEBOOKS = 'notebook/LOAD_NOTEBOOKS';


const loadNotebooks = (notebooks) => {
  return {
    type: LOAD_NOTEBOOKS,
    payload: notebooks
  }
}


export const getNotebooks = () => async(dispatch) => {
  const response = await csrfFetch(`/api/notebook`);

  if(response.ok) {
    const library = await response.json();
    dispatch(loadNotebooks(library));
  }
}

const initialState = {};

const notebookReducer = (state = initialState, action) => {
  // let newState;
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
    default:
      return state;
  }
}
export default notebookReducer;
