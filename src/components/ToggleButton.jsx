/* eslint-disable react/prop-types */

function ToggleButton({ onClick, children }) {
  return (
    <button className="btn-toggle" onClick={onClick}>
      {children}
    </button>
  );
}

export default ToggleButton;
