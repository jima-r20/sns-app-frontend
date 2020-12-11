import React from 'react';
import { Fab, useScrollTrigger, Zoom } from '@material-ui/core';
import { KeyboardArrowUp } from '@material-ui/icons';
import { ScrollTopStyle } from '../../styles/components/ScrollTop.style';

const ScrollTop: React.FC = () => {
  const classes = ScrollTopStyle();
  // const trigger = useScrollTrigger({
  //   disableHysteresis: true,
  //   threshold: 100,
  // });

  const handleScrollTop = (e: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (e.target as HTMLDivElement).ownerDocument || document
    ).querySelector('#back-to-top-anchor');
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    // <Zoom in={trigger}>
    <div
      onClick={handleScrollTop}
      role="presentation"
      className={classes.scrollTopButton}
    >
      <Fab color="primary" size="small" aria-label="scroll back to top">
        <KeyboardArrowUp />
      </Fab>
    </div>
    // </Zoom>
  );
};

export default ScrollTop;
