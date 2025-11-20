import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { useSelector, useDispatch } from "react-redux";
import { setOpen, setFullScreen } from '../redux/movieSlice';
import VideoBackground from './VideoBackground';
import { FaTimes, FaExpand } from 'react-icons/fa';
import useScrollLock from '../hooks/useScrollLock';
import './MovieDialog.css';

export default function MovieDialog() { 
  const { open, id, isFullScreen } = useSelector(store => store.movie);
  const dispatch = useDispatch();

  // Set full screen to true when dialog opens
  React.useEffect(() => {
    if (open && !isFullScreen) {
      dispatch(setFullScreen(true));
    }
  }, [open, isFullScreen, dispatch]);

  const handleClose = () => {
    dispatch(setOpen(false));
    // Reset full screen when closing dialog
    if (isFullScreen) {
      dispatch(setFullScreen(false));
    }
  };

  const handleFullScreenToggle = () => {
    dispatch(setFullScreen(!isFullScreen));
  };

  // Handle escape key to close dialog
  React.useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape' && open) {
        handleClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleKeyPress);
      return () => document.removeEventListener('keydown', handleKeyPress);
    }
  }, [open]);

  // Use custom scroll lock hook
  useScrollLock(open);
 
  return (
    <React.Fragment>
             <Dialog
         open={open}
         onClose={handleClose}
         maxWidth={false}
         fullWidth={false}
         className="movie-dialog"
         disableScrollLock={true}
         keepMounted={false}
         PaperProps={{
           className: isFullScreen ? 'dialog-fullscreen' : 'dialog-normal',
           style: {
             width: isFullScreen ? '100vw' : '80vw',
             height: isFullScreen ? '100vh' : '80vh',
             maxWidth: 'none',
             maxHeight: 'none',
             margin: 0,
             borderRadius: isFullScreen ? 0 : '12px'
           }
         }}
       >
        <DialogTitle className="dialog-title">
          <div className="title-content">
            <div className="title-actions">
              <IconButton
                onClick={handleFullScreenToggle}
                className="fullscreen-toggle-btn"
                title={isFullScreen ? "Exit Full Screen" : "Full Screen"}
              >
                <FaExpand />
              </IconButton>
              <IconButton
                onClick={handleClose}
                className="close-btn"
                title="Close"
              >
                <FaTimes />
              </IconButton>
            </div>
          </div>
        </DialogTitle>
        
        <DialogContent className="dialog-content">
          <VideoBackground movieId={id} />
        </DialogContent>
        
        <DialogActions className="dialog-actions">
          <Button 
            onClick={handleClose}
            variant="contained"
            className="close-button"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}