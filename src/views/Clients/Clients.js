import _ from 'lodash';
import React, { Component } from 'react';
import {Bar, Line} from 'react-chartjs-2';
import {
  Badge,
  Row,
  Col,
  Progress,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Button,
  ButtonToolbar,
  ButtonGroup,
  ButtonDropdown,
  Label,
  Input,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap';
import {connect} from 'react-redux';

import {buildUrl} from '../../helpers/api';

class Clients extends Component {

	constructor(props) {
		super(props);

		this.state = {};

	}

	componentDidMount() {
	}

	get displayClients() {
		var color;
		if (this.props.clients !== []) {
			return _.map(this.props.clients, (client, index) => {
				switch(client.status) {
					case "active":
						color = "success";
						break;
					case "inactive":
						color = "secondary";
						break;
					case "cancelled":
						color = "danger";
						break;
					case "pending":
						color = "warning";
						break;
				}
				return <tr key={index}>
					  <td>{client.name}</td>
					  <td>{client.contact}</td>
					  <td>{client.email}</td>
					  <td>{client.phone}</td>
					  <td>
					    <Badge color={color}>{client.status}</Badge>
					  </td>
					</tr>
			})
		}

	} 

	render() {
		return (
			<div>
				<h3>Clients</h3>
				          <Col lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Striped Table
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                  <tr>
                    <th>Client</th>
                    <th>Contact Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Status</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.displayClients}
                  </tbody>
                </Table>
                <Pagination>
                  <PaginationItem disabled><PaginationLink previous href="#">Prev</PaginationLink></PaginationItem>
                  <PaginationItem active>
                    <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink href="#">4</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink next href="#">Next</PaginationLink></PaginationItem>
                </Pagination>
              </CardBody>
            </Card>
          </Col>
			</div>
		);
	}

}

function mapStateToProps(state) {
	return {
		clients: state.clients
	}
}

export default connect(mapStateToProps)(Clients);