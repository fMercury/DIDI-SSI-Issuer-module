import React, { Component } from "react";
import { withRouter } from "react-router";
import "./Certificates.scss";

import ReactTable from "react-table";
import "react-table/react-table.css";

import MaterialIcon from "material-icons-react";

import Constants from "../../../constants/Constants";
import Messages from "../../../constants/Messages";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

class Certificates extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			isDialogOpen: false,
			name: ""
		};
	}

	// a pantalla de edicion
	onCertificateEdit = id => {
		this.props.history.push(Constants.ROUTES.EDIT_CERT + id);
	};

	// a pantalla de edicion
	onCertificateCreate = () => {
		this.props.history.push(Constants.ROUTES.EDIT_CERT);
	};

	// abrir dialogo de creacion de certificados
	onDialogOpen = () => this.setState({ isDialogOpen: true, name: "" });

	// cerrar dialogo de creacion de certificados
	onDialogClose = () => this.setState({ isDialogOpen: false, name: "" });

	render() {
		const loading = this.props.loading;
		const isDialogOpen = this.state.isDialogOpen;
		return (
			<div className="Certificates">
				{isDialogOpen && this.renderDialog()}
				{this.renderSectionButtons()}
				{!loading && this.renderTable()}
				{this.renderButtons()}
				<div className="errMsg">{this.props.error && this.props.error.message}</div>
			</div>
		);
	}

	renderDialog = () => {
		return (
			<Dialog open={this.state.isDialogOpen} onClose={this.onDialogClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="DialogTitle">{Messages.LIST.DIALOG.TITLE}</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label={Messages.LIST.DIALOG.NAME}
						type="text"
						onChange={this.props.updateName}
						fullWidth
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={this.onCertificateCreate} disabled={!this.state.name} color="primary">
						{Messages.LIST.DIALOG.CREATE}
					</Button>
					<Button onClick={this.onDialogClose} color="primary">
						{Messages.LIST.DIALOG.CLOSE}
					</Button>
				</DialogActions>
			</Dialog>
		);
	};

	renderSectionButtons = () => {
		const selected = this.props.selected;
		return (
			<div className="HeadButtons">
				{selected && (
					<button className="CreateButton" onClick={this.onCertificateCreate}>
						<MaterialIcon icon={Constants.TEMPLATES.ICONS.ADD_BUTTON} />
						<div className="CreateButtonText">{Messages.LIST.BUTTONS.CREATE_CERT}</div>
					</button>
				)}
			</div>
		);
	};

	renderTable = () => {
		const certificates = this.props.certificates;
		const columns = [
			/*{
				Header: "Id",
				accessor: "_id"
			},*/
			{
				Header: Messages.LIST.TABLE.LAST_NAME,
				accessor: "lastName"
			},
			{
				Header: Messages.LIST.TABLE.NAME,
				accessor: "firstName"
			},
			{
				Header: Messages.LIST.TABLE.CERT,
				accessor: "certName"
			},
			{
				Header: Messages.LIST.TABLE.EMISSION_DATE,
				accessor: "createdOn"
			},
			{
				Header: "",
				accessor: "actions"
			}
		];

		return (
			<div className="CertificateTable">
				<ReactTable
					previousText={Messages.LIST.TABLE.PREV}
					nextText={Messages.LIST.TABLE.NEXT}
					data={certificates}
					columns={columns}
					defaultPageSize={Constants.CERTIFICATES.TABLE.PAGE_SIZE}
					minRows={Constants.CERTIFICATES.TABLE.MIN_ROWS}
				/>
			</div>
		);
	};

	renderButtons = () => {
		return (
			<button className="LogoutButton" onClick={this.props.onLogout}>
				{Messages.LIST.BUTTONS.EXIT}
			</button>
		);
	};
}

export default withRouter(Certificates);