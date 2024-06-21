import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function MakeComplaint() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Make New Complaint
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Terms and Conditions
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <Typography gutterBottom> The library's noise policy is not being enforced properly, making it difficult to concentrate on work. The designated quiet areas are often disrupted by loud conversations and phone calls. Additionally, the library's collection of books on computer science and engineering is outdated and lacks recent publications. </Typography>
                    <Typography gutterBottom> The library's hours of operation are not convenient for students who have evening classes or work part-time jobs. The library should extend its hours during the week and open earlier on weekends to accommodate the needs of all students. Furthermore, the library's printing system is often out of order, causing delays and inconvenience for students who need to print assignments. </Typography>
                    <Typography gutterBottom> The library's study rooms are often occupied by groups who are not using them for academic purposes, making it difficult for students who need a quiet space to work on group projects. The library should enforce stricter policies on the use of study rooms and allocate more spaces for group work. Additionally, the library's air conditioning system is often set too high, making it uncomfortably cold for some patrons. </Typography>
                </DialogContent>
                <DialogActions>
                    <Link to="/make-new-complaint">
                        <Button autoFocus onClick={handleClose}>
                            Make Complaint
                        </Button>
                    </Link>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}