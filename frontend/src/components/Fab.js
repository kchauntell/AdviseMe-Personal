const Fab = props => {
  return (
    <div className={props.hidden ? 'fab is-hidden' : 'fab'} onClick={props.onClick}>
      {/* <span aria-label="add" role="img" className="fab-symbol">➕</span> */}
      <i className="fas fa-pencil-alt"></i>
    </div>
  );
};

export default Fab;
