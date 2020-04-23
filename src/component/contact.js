import React from 'react'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Menu, IconButton, MenuItem, Typography, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import browserHistory from '../history';
import EditModal from './editContactModal';
import { editContact, deleteContact } from '../action/action';
import DeleteDialogue from './deleteDialogue'

const columns = [
    { id: 'firstName', label: 'FirstName', minWidth: 120 },
    { id: 'lastName', label: 'LastName', minWidth: 120 },
    {
        id: 'email',
        label: 'Email',
        minWidth: 120,
        align: 'center',
    },
    {
        id: 'phnNo',
        label: 'Phone',
        minWidth: 120,
        align: 'center',
    },
    {
        id: 'action',
        label: 'Action',
        maxWidth: 50,
        align: 'center'
      }
];

const ITEM_HEIGHT = 40

class Contact extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 0,
            rowsPerPage: 5,
            anchorEl: null,
            open: false,
            contactList: props.contactList && props.contactList.length > 0 ? props.contactList : [],
            selectedRow: {},
            isEditModalOpen: false,
            deleteId: "",
            isDeleteModalOpen: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.contactList && nextProps.contactList.length > 0) {
            this.setState({
                contactList: nextProps.contactList
            })
        }
    }

    handleChangePage = (event, newPage) => {
        this.setState({
            page: newPage
        })
    };

    handleEditClose = (value) => {
        this.setState({
            isEditModalOpen: value,
            selectedRow: {}
        })
    }

    handleChangeRowsPerPage = (event) => {

        this.setState({
            rowsPerPage: event.target.value,
            page: 0
        })
    };

    handleClick = (event, row) => {
        console.log("Event", row)
        this.setState({
            anchorEl: event.currentTarget,
            open: true,
            selectedRow: row,
            deleteId: row.id
        })
    }

    handleClose = (e) => {
        this.setState({
            anchorEl: null,
            open:false
        })
        if(e.target && e.target.id === "edit") {
            this.setState({
                isEditModalOpen: true
            })
        } else if(e.target && e.target.id === "delete") {
            this.setState({
                isDeleteModalOpen: true
            })
        } else {
            this.setState({
                selectedRow: {},
                deleteId: 0
            })
        }
    }

    handleEditSelect = (contact) => {
        this.setState({
            selectedRow: contact,
            isEditModalOpen: true
        })
        // this.handleClose()
    }

    handleDeleteClose = () => {
        this.setState({
            deleteId: "",
            isDeleteModalOpen: false
        })
    }

    renderContactList = () => {
        console.log("ContactList", this.props.contactList)
        return (
            <Paper className="tablePaper">
                <TableContainer className="tableConatiner">
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.contactList.filter(item => item.status == "active").slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((row) => {
                                return (
                                    row.status === "active" ? 
                                    (<TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            value ? 
                                            (<TableCell key={"Menu"+column.id} align={column.align}>
                                                {value}
                                            </TableCell>) :
                                            (
                                                <TableCell align="center" key={"Menu1"+row.id}>
                                        <IconButton
                                        aria-label="more"
                                        aria-controls="long-menu"
                                        aria-haspopup="true"
                                        onClick={(e) => this.handleClick(e, row)}>
                                            <MoreVertIcon fontSize="small" />
                                        </IconButton>
                                        <Menu
                                            id="long-menu"
                                            anchorEl={this.state.anchorEl}
                                            open={this.state.open}
                                            onClose={this.handleClose}
                                            PaperProps={{
                                                style: {
                                                    maxHeight: ITEM_HEIGHT * 4.5,
                                                    width: '20ch',
                                                    textAlign: "center"
                                                },
                                            }}
                                        >
                                            <MenuItem key={"edit"+row.id} onClick={this.handleClose} id="edit">
                                                Edit
                                            </MenuItem>
                                            <MenuItem key={"delete"+row.id} onClick={this.handleClose} id="delete">
                                                Delete
                                            </MenuItem>
                                        </Menu>
                                    </TableCell>
                                            )
                                        );
                                    })}
                                    
                                </TableRow>) : ("")
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5]}
                    component="div"
                    count={this.state.contactList.filter(item => item.status === "active").length}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
                <EditModal open={this.state.isEditModalOpen} contact={this.state.selectedRow} handleEditClose={this.handleEditClose} editContact={this.props.editContact}/>
                <DeleteDialogue open={this.state.isDeleteModalOpen} id={this.state.deleteId} handleDeleteClose={this.handleDeleteClose} deleteContact={this.props.deleteContact}/>
            </Paper>
        )
    }

    renderIfEmptyList = () => {
        return (
            <div>
                <Typography variant="h3" color="primary" >The contact List is Empty. You can add contact by click on button</Typography>
                <Button color="primary" variant="contained" onClick={() => browserHistory.push("/addContact")} className="add-contact"> Add Contact </Button>
            </div>

        )
    }
    render() {
       return(
        this.props.contactList && this.props.contactList.filter(item => item.status === "active").length > 0 ? 
        this.renderContactList() :
        this.renderIfEmptyList()
       )
    }
}

const mapStateToProps = (state) => {
    return {
        contactList: state.contact.contactList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editContact: (payload) => dispatch(editContact(payload)),
        deleteContact: (payload) => dispatch(deleteContact(payload))
    }
}
const ContactComponent = connect(mapStateToProps, mapDispatchToProps)(Contact)

export default ContactComponent