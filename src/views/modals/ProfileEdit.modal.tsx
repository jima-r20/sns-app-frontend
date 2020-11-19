import { Modal } from '@material-ui/core';
import React, { useState } from 'react';
import ReactModal from 'react-modal';

interface PROPS_MODAL {
  open: boolean;
}

ReactModal.setAppElement('#root');

const ProfileEditModal: React.FC<PROPS_MODAL> = ({ open }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <ReactModal isOpen={open}>
      <button onClick={() => setIsModalOpen(false)}>close</button>
    </ReactModal>
  );
};

export default ProfileEditModal;
