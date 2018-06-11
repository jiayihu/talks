import React, { PropTypes } from 'react';
import { colors } from '../theme.js';

export default function Code({ color, children, size }) {
  const styles = {
    color,
    fontSize: size === 'small' ? '0.875em' : null
  };

  return (
    <code style={styles}>
      {children}
    </code>
  );
}

Code.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  size: PropTypes.oneOf(['small']),
};
