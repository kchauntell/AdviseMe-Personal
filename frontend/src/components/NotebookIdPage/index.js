import React, {useEffect, useState } from 'react';
import { getNotebooks } from '../../store/notebook';
import { useDispatch, useSelector} from 'react-redux';
import { NavLink } from 'react-router-dom';
import PersonalNBPage from '../PersonalNBPage';


function NotebookIDPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const notebooks = useSelector(state => {
    return Object.values(state.notebook);
  })

  useEffect(() => {
    dispatch(getNotebooks());
  })

  return (
    <div>
      < PersonalNBPage />
      {notebooks.map((notebook) => {
        return(
          <main>
            <div>
              <h1>{notebook.title}</h1>
              <h3>{notebook.genre}</h3>
            </div>
            <div>
              <NavLink to={`/notebook/${sessionUser.username}/`}></NavLink>
            </div>
          </main>
        )
      })}
    </div>
  )
}

export default NotebookIDPage;
