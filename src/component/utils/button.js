import React from 'react';
import { Link } from 'react-router-dom';

const MyButton = (props) => {
  const buttons = () => {
    let template = '';

    if (props.type === 'default') {
      template = (
        <Link className="link_default" to={props.linkTo} {...props.addStyles}>
          {props.title}
        </Link>
      );
    } else {
      template = '';
    }
    return template;
  };
  return (
    <div className="my_link">
      {buttons()}
    </div>
  );
};

export default MyButton;
