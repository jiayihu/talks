import React, { PropTypes } from 'react';
import { Text } from 'spectacle';

export default function Title({ children, textSize, ...otherProps }) {
  return <Text {...otherProps} textSize={textSize}>{children}</Text>;
}

Title.propTypes = {
  children: PropTypes.node.isRequired,
  textSize: PropTypes.string,
};

Title.defaultProps = {
  textSize: '2.5em',
};
