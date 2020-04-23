import React from 'react'
import { Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions, Typography } from '@material-ui/core';

class EditModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            phnNo: "",
            id: "",
            open: false,
            emailError: false,
            validateMsg: false
        }
    }
    handleClose = () => {
        this.props.handleEditClose(false)
    }
    componentWillReceiveProps(nextProps) {
        
        
            this.setState({
                open: nextProps.open
            })


        if(nextProps.contact) {
            this.setState({
                firstName: nextProps.contact.firstName,
                lastName: nextProps.contact.lastName,
                email: nextProps.contact.email,
                phnNo: nextProps.contact.phnNo,
                id: nextProps.contact.id
            })
        }
    }

    handleEdit = () => {
        if(this.state.firstName !== "" && this.state.lastName !== "" && this.state.email !== "" && this.state.phnNo !== "" && !this.state.emailError) {
            let payload = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                phnNo: this.state.phnNo,
                id: this.state.id
            }
            this.props.editContact(payload)
            this.handleClose()
            this.setState({
                validateMsg: false
            })
        } else {
            this.setState({
                validateMsg: true
            })
        }
        
    }

    handleFirstNameChange = (e) => {
        if(/^[a-zA-Z]*$/g.test(e.target.value)) {
            this.setState({
                firstName: e.target.value
            })
        }
    }

    handleLastNameChange = (e) => {
        if(/^[a-zA-Z]*$/g.test(e.target.value)) {
            this.setState({
                lastName: e.target.value
            })
        }
    }

    handleEmailChange = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    handlePhnChange = (e) => {
        if(/^\d*(?:\.\d{1,2})?$/.test(e.target.value)) {
            this.setState({
                phnNo: e.target.value
            })
        }
    }

    validateEmail = (e) => {
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
        if (reg.test(this.state.email) === false) 
        {
            this.setState({
                emailError: true
            })
        } else {
            this.setState({
                emailError: false
            })
        }
    }

    render() {
        return (
            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Edit</DialogTitle>
                <DialogContent>
                
                    {this.state.validateMsg ? (<Typography variant="inherit" color="error">You have enter worng value or missing some values. Please fill correct data</Typography>) : ("")}
                    <TextField
                        margin="dense"
                        id="firstName"
                        label="First Name"
                        type="text"
                        fullWidth
                        value={this.state.firstName}
                        onChange={this.handleFirstNameChange}
                         variant="outlined"
                    />
                    <TextField
                        margin="dense"
                        id="name"
                        label="Last Name"
                        type="text"
                        fullWidth
                        value={this.state.lastName}
                        onChange={this.handleLastNameChange}
                         variant="outlined"
                    />
                    <TextField
                        margin="dense"
                        id="email"
                        label="Email"
                    type="email"
                        fullWidth
                        value={this.state.email}
                        onChange={this.handleEmailChange}
                         variant="outlined"
                         onBlur={this.validateEmail}
                    />
                    {this.state.emailError ? (<Typography variant="inherit" color="error">Enter valid email</Typography>) : ("")}
                    <TextField
                        margin="dense"
                        id="phonno"
                        label="Phone no"
                        type="text"
                        fullWidth
                        value={this.state.phnNo}
                        onChange={this.handlePhnChange}
                         variant="outlined"
                    />
                </DialogContent>
                <DialogActions>

                    <Button onClick={this.handleEdit} color="primary">
                        Edit
          </Button>
                    <Button onClick={this.handleClose} color="secondary">
                        Cancel
          </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default EditModal