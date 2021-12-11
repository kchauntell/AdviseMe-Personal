const EditFab = props => {
  return (
    <div className={props.hidden ? 'fab is-hidden' : 'fab'} onClick={props.onClick}>
      {/* <span aria-label="add" role="img" className="fab-symbol">➕</span> */}
      <i className="far fa-edit"></i>
    </div>
  );
};

export default EditFab;
