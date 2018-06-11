import React, { PropTypes } from 'react';
import { colors } from '../theme.js';

export default function Span({ bold, caps, strike, children, color }) {
  const styles = {
    color: color ? colors[color] : colors.angular,
    fontWeight: bold ? 'bold' : null,
    textTransform: caps ? 'uppercase' : null,
    textDecoration: strike ? 'line-through' : null,
  };

  return (
    <span style={styles}>{children}</span>
  );
}

Span.propTypes = {
  bold: PropTypes.bool,
  caps: PropTypes.bool,
  strike: PropTypes.bool,
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
};
