import React from 'react';

/**
  This is an awesome looking button for React.
*/
const Button = ({ disabled, label, style, onClick }) => (
  <button disabled={disabled} onClick={onClick}>
    {label}
  </button>
);

Object.assign(Button, {
  displayName: 'Button',
  propTypes: {
    /**
      Label for the button.
    */
    label: React.PropTypes.string.isRequired,
    /**
      Label for the button.
    */
    style: React.PropTypes.object,
    /**
      Label for the button.
    */
    disabled: React.PropTypes.bool,
    /**
      Label for the button.
    */
    onClick: React.PropTypes.func,
    tag: React.PropTypes.string,
    size: React.PropTypes.oneOf(['tiny', 'small', 'medium', 'big', 'huge']),
  },
  defaultProps: {
    disabled: false,
    size: null,
    tag: 'span',
  },
});

export default Button;
