import React from 'react';
import { Link, Typography } from '@material-ui/core';

const Copyright: React.FC = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright ©︎ '}
      <Link
        color="inherit"
        href="https://github.com/jima-r20/"
        target="_blank"
        rel="noopener noreferrer"
      >
        jima-r20
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

export default Copyright;
