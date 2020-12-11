import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const ScrollTopStyle = makeStyles((theme: Theme) =>
  createStyles({
    scrollTopButton: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: 340,
    },
  })
);
