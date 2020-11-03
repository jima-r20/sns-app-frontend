import React from 'react'
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

const Copyright: React.FC = () => {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      { 'Copyright ©︎ ' }
      <Link color='inherit' to='https://github.com/jima-r20/'>
        jima-r20
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default Copyright;
