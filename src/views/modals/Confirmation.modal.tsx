import React from 'react';
import {
  Backdrop,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Fade,
  Modal,
  Typography,
} from '@material-ui/core';
import { ConfirmationModalStyle } from '../../styles/modals/ConfirmationModal.style';

interface PROPS_CONFIRMATION_MODAL {
  mainText: string;
  selectionText: string;
  isModalOpen: boolean;
  setIsModalOpen: (value: React.SetStateAction<boolean>) => void;
  handleModalFunction: () => Promise<void>;
}

const ConfirmationModal: React.FC<PROPS_CONFIRMATION_MODAL> = (props) => {
  const classes = ConfirmationModalStyle();
  const {
    mainText,
    selectionText,
    isModalOpen,
    setIsModalOpen,
    handleModalFunction,
  } = props;

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      className={classes.modal}
      open={isModalOpen}
      onClose={() => {
        setIsModalOpen(false);
      }}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isModalOpen}>
        <div className={classes.modalPaper}>
          <Typography variant="h6" align="center" gutterBottom>
            {mainText}
          </Typography>
          <Card variant="outlined">
            <CardActionArea onClick={handleModalFunction}>
              <CardContent>
                <Typography variant="body1" align="center" color="secondary">
                  {selectionText}
                </Typography>
              </CardContent>
            </CardActionArea>
            <Divider />
            <CardActionArea onClick={() => setIsModalOpen(false)}>
              <CardContent>
                <Typography variant="body1" align="center">
                  Cancel
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      </Fade>
    </Modal>
  );
};

export default ConfirmationModal;
