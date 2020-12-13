import React, { useEffect, useState } from 'react';
import { Fab, useScrollTrigger, Zoom } from '@material-ui/core';
import { KeyboardArrowUp } from '@material-ui/icons';
import { ScrollTopStyle } from '../../styles/components/ScrollTop.style';

const ScrollTop: React.FC = () => {
  const classes = ScrollTopStyle();
  const [containerHeight, setContainerHeight] = useState<number | undefined>(0);
  const [windowHeight, setWindowHeight] = useState<number | undefined>(0);
  // const trigger = useScrollTrigger({
  //   disableHysteresis: true,
  //   threshold: 100,
  // });

  // useEffect(() => {
  process.nextTick(() => {
    const elm = document.getElementById('container');
    setContainerHeight(elm?.clientHeight);
    setWindowHeight(window.innerHeight);
    console.log(`container height ${containerHeight}`);
    console.log(`window height ${windowHeight}`);
  });
  // }, []);

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
    <Zoom
      in={
        containerHeight !== undefined &&
        windowHeight !== undefined &&
        containerHeight > windowHeight
      }
    >
      <div
        onClick={handleScrollTop}
        role="presentation"
        className={classes.scrollTopButton}
      >
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUp />
        </Fab>
      </div>
    </Zoom>
  );
};

export default ScrollTop;
