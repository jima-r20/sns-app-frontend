import { useScrollTrigger, Zoom } from '@material-ui/core';
import React from 'react';
import { ScrollTopStyle } from '../../styles/components/ScrollTop.style';

interface PROPS_SCROLLTOP {
  children: React.ReactElement;
}

const ScrollTop: React.FC<PROPS_SCROLLTOP> = (props) => {
  const classes = ScrollTopStyle();
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleScrollTop = (e: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (e.target as HTMLDivElement).ownerDocument || document
    ).querySelector('#back-to-top-anchor');
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  console.log('rendered scroll top button');

  return (
    <Zoom in={trigger}>
      <div
        onClick={handleScrollTop}
        role="presentation"
        className={classes.scrollTopButton}
      >
        {children}
      </div>
    </Zoom>
  );
};

export default ScrollTop;
