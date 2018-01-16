import _ from 'lodash';
import React, { Component } from 'react';
import {Bar, Line} from 'react-chartjs-2';
import {
	Badge,
	Row,
	Col,
	Progress,
	Dropdown,
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
	FormGroup,
	FormText,
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	Pagination,
	PaginationItem,
	PaginationLink
} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import axios from 'axios';

import {changeSelectInput} from '../../actions/index';
import {buildUrl} from '../../helpers/api';

class Projects extends Component {
	constructor (props) {
		super(props);

		this.state = {
         project: '',
         type: '',
         client: '',
         budget: '',
         deadline: '',
         status: 'initial'
      };

		this.createProject = this.createProject.bind(this);
		this.onInputChange = this.onInputChange.bind(this);

	}

	componentDidMount() {}

	get displayProjects() {
		var color;
		if (this.props.projects !== []) {
			return _.map(this.props.projects, (project, index) => {
            console.log('project', project);
            let resultProject = (project.project !== null) ? project.project : '';
            let resultClient = (project.client !== null) ? project.client : '';
				switch(project.status) {
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
					  <td>{resultProject}</td>
					  <td>{project.type}</td>
					  <td>{resultClient}</td>
					  <td>{project.budget}</td>
					  <td>{project.deadline}</td>
					  <td>
					    <Badge color={color}>{project.status}</Badge>
					  </td>
					</tr>
			})
		}

	} 

	onInputChange(e, name) {
		// var type = 'MODIFY_PROJECT';
		// var name = 'project';
		// this.props.changeSelectInput(type, name, val.value);
      this.setState({
         [name]:e.target.value 
      });

	}

   get displayProjectOptions() {
      return _.map(this.props.projects, (project, index) => {
         console.log('project list', project);
         return <option key={`${index}`} value={`${project.project}`}>{project.project}</option>
      })
   }

   get displayProjectClientOptions() {
      return _.map(this.props.projects, (project, index) => {
         return <option key={`${index}`} value={`${project.client}`}>{project.client}</option>
      })
   }

	createProject(e) {
		e.preventDefault();

		console.log('submit form');

		var idObj = _.maxBy(this.props.projects, function(p) { return p.id });
		var id = _.get(idObj, 'id') + 1;

		let formObj = {
			id: id,
			project: this.state.project,
			type: this.state.type,
			client: this.state.client,
			budget: this.state.budget,
			deadline: this.state.deadline,
			status: this.state.status
		};

      console.log('form obj', formObj);
		axios.post(buildUrl('api/projects'), formObj)
		.then(response => {
			console.log('new project submitted!', response);
		})
		.catch(err => {
			console.error('error submitting project', err);
		})
	}

	render() {
      console.log('this state projects', this.state);
      console.log('props projects', this.props.projects);
		return (
			<div>
				<h3>Projects</h3>
          <Col lg="12">
            <Card>
              <CardHeader>
                <strong>Create New Project</strong>
              </CardHeader>
              <CardBody>
                <form onSubmit={(e) => this.createProject(e)} className="form-horizontal">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="project">Project</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="select" name="project" id="project" onBlur={(e) => this.onInputChange(e, 'project')}>
                        <option>Please select</option>
                        {this.displayProjectOptions}
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="type">Type</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="select" name="type" id="type"  onBlur={(e) => this.onInputChange(e, 'type')}>
                        <option>Please select</option>
                        <option value="website">Website</option>
                        <option value="mobile application">Mobile Application</option>
                        <option value="web application">Web Application</option>
                        <option value="branding">Branding</option>
                        <option value="design">Design</option>
                        <option value="consultation">Consulation</option>
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="client">Client</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="select" name="client" id="client"  onBlur={(e) => this.onInputChange(e, 'client')}>
                        <option>Please select</option>
                        {this.displayProjectClientOptions}
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="budget">Budget</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="budget" name="budget"  onBlur={(e) => this.onInputChange(e, 'budget')} placeholder="Enter budget amount"/>
                      <FormText color="muted">Enter budget amount</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="deadline">Deadline</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="date" id="deadline" name="deadline" onBlur={(e) => this.onInputChange(e, 'deadline')} placeholder="Pick a date"/>
                    </Col>
                  </FormGroup>
                  <FormGroup>
	                <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
	                <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
	               </FormGroup>
                </form>
              </CardBody>
            </Card>
          </Col>
					<Col lg="12">
						<Card>
							<CardHeader>
								<i className="fa fa-align-justify"></i> Striped Table
							</CardHeader>
							<CardBody>
								<Table responsive striped>
									<thead>
										<tr>
											<th>Project</th>
											<th>Type</th>
											<th>Client</th>
											<th>Budget</th>
											<th>Deadline</th>
											<th>Status</th>
										</tr>
									</thead>
									<tbody>
										{this.displayProjects}
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
		projects: state.projects
	}
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({changeSelectInput}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Projects);