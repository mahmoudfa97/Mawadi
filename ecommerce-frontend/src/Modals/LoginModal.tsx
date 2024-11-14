import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import LoginPage from '../Pages/LoginPage';
interface CustomProps{
    isOpen: boolean
    closeModal: ()=>void
}
export default function ResponsiveDialog(props: CustomProps) {

  const handleClose = () => {
    props.closeModal();
  };

  return (
    <React.Fragment>
      <Dialog
        open={props.isOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <div className="flex mx-auto px-4 py-8">
         <LoginPage handleClose={handleClose}/>
        </div>
      </Dialog>
    </React.Fragment>
  );
}
