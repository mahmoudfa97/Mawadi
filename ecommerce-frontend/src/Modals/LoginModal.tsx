import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import LoginWithNumber from './signInWithPhoneNumber';
import LoginWithGooglePopUp from './loginWithGooglePopUp';
import LoginPage from '../Pages/LoginPage';
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
        <div className="flex mx-auto px-4 py-8">
         <LoginPage />
        </div>
      </Dialog>
    </React.Fragment>
  );
}
