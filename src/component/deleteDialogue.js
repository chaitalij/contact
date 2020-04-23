import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core'

class DeleteDialogue extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            id: ""
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            open: nextProps.open,
            id: nextProps.id
        })
    }

    handleClose = () => {
        this.props.handleDeleteClose(false)
    }

    handleDelete = () => {
        this.props.deleteContact(this.state.id)
        this.handleClose()
    }

    render() {
        return (
            <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure, you want to Delete this contact?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
        )
    }
}

export default DeleteDialogue;