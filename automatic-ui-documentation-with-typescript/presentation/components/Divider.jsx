import React, { PropTypes } from 'react';

export default function Divider({ margin }) {
  const styles = {
    height: '1px',
    margin,
    width: '100%',
  };

  return (
    <div style={styles} />
  );
}

Divider.propTypes = {
  margin: PropTypes.string.isRequired,
};

Divider.defaultProps = {
  margin: '1em 0 0',
};
