import React, { forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './CustomToggle.css';

const CustomToggle = forwardRef((props, ref) => {
  const handleClick = (e) => {
    e.preventDefault();
    props.onClick(e);
  };

  return (
    <div ref={ref} className="CustomToggle" onClick={handleClick}>
      {props.children}
      <FontAwesomeIcon icon="chevron-down" className="float-right" />
    </div>
  );
});

export default CustomToggle;
