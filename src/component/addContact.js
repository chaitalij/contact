import React from 'react'
import { Button, TextField, Typography } from '@material-ui/core'
import { addContact } from '../action/action'
import { connect } from 'react-redux'
import browserHistory from '../history'

class AddContact extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            phnNo: "",
            open: false,
            emailError: false,
            validateMsg: false
        }
    }

    handleFirstNameChange = e => {
        if(/^[a-zA-Z]*$/g.test(e.target.value)) {
            this.setState({
                firstName: e.target.value
            })
        }
    }

    handleLastNameChange = e => {
        if(/^[a-zA-Z]*$/g.test(e.target.value)) {
            this.setState({
                lastName: e.target.value
            })
        }
    }

    handleEmailChange = e => {
        this.setState({
            email: e.target.value
        })
    }

    handlePhnChange = e => {
        if(/^\d*(?:\.\d{1,2})?$/.test(e.target.value)) {
            this.setState({
                phnNo: e.target.value
            })
        }
    }

    handleClick = e => {
        if (this.state.firstName !== "" && this.state.lastName !== "" && this.state.email !== "" && this.state.phnNo !== "" && !this.state.handleEmailChange) {
            let payload = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                phnNo: this.state.phnNo
            }
            this.setState({
                open: true
            })
            this.props.addContact(payload)
            browserHistory.push("/")
            this.setState({
                validateMsg: false
            })
        } else {
            this.setState({
                validateMsg: true
            })
        }
    }

    handleClose = () => {
        this.setState({
            open: false
        })
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
            <div className="contact-add-form">
                {this.state.validateMsg ? (<Typography variant="inherit" color="error">You have enter worng value or missing some values. Please fill correct data</Typography> ): ("")}
                <TextField placeholder="Enter First Name" type="text" fullWidth={true} onChange={this.handleFirstNameChange} className="input-class" variant="outlined" value={this.state.firstName} />
                <TextField placeholder="Enter Last Name" type="text" onChange={this.handleLastNameChange} fullWidth={true} className="input-class" variant="outlined" value={this.state.lastName}/>
                <TextField placeholder="Enter Email" type="email" onChange={this.handleEmailChange} onBlur={this.validateEmail} fullWidth={true} className="input-class" variant="outlined" value={this.state.email}/>
                {this.state.emailError ? (<Typography variant="inherit" color="error" align="left">Enter valid email</Typography>) : ("")}
                <TextField placeholder="Enter Phone No" type="text" onChange={this.handlePhnChange} fullWidth={true} className="input-class" variant="outlined" value={this.state.phnNo}/>
                <Button color="primary" variant="contained" className="add-contact" size="medium" onClick={this.handleClick}>AddContact</Button>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addContact: (payload) => dispatch(addContact(payload))
    }
}

const mapStateTpProps = (state) => {
    return {
        state
    }
}
const AddContactComponent = connect(mapStateTpProps, mapDispatchToProps)(AddContact)
export default AddContactComponent