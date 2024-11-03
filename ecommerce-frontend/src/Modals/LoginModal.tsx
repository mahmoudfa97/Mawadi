import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import LoginWithNumber from './signInWithPhoneNumber';
import LoginWithGooglePopUp from './loginWithGooglePopUp';
interface CustomProps{
    isOpen: boolean
    closeModal: ()=>void
}
export default function ResponsiveDialog(props: CustomProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


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
          <LoginWithNumber />
          <br />
          <LoginWithGooglePopUp />
      </Dialog>
    </React.Fragment>
  );
}
