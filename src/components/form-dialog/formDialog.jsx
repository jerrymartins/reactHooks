import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {EyeIcon} from "../../assets/icons/icons";

export default function FormDialog(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                <EyeIcon/>
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Observação</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {props.item.item.ORD_OBSERVATION}
                    </DialogContentText>
                    {/*<TextField*/}
                    {/*    autoFocus*/}
                    {/*    margin="dense"*/}
                    {/*    id="name"*/}
                    {/*    label="Email Address"*/}
                    {/*    type="email"*/}
                    {/*    fullWidth*/}
                    {/*/>*/}
                </DialogContent>
                {/*<DialogActions>*/}
                {/*    <Button onClick={handleClose} color="primary">*/}
                {/*        Cancel*/}
                {/*    </Button>*/}
                {/*    <Button onClick={handleClose} color="primary">*/}
                {/*        Subscribe*/}
                {/*    </Button>*/}
                {/*</DialogActions>*/}
            </Dialog>
        </div>
    );
}
