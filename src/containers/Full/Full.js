import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';
import Dashboard from '../../views/Dashboard/';
import Clients from '../../views/Clients';
import Projects from '../../views/Projects';
import Charts from '../../views/Charts/';
import Widgets from '../../views/Widgets/';

// Components
import Buttons from '../../views/Components/Buttons/';
import Cards from '../../views/Components/Cards/';
import Forms from '../../views/Components/Forms/';
import Modals from '../../views/Components/Modals/';
import SocialButtons from '../../views/Components/SocialButtons/';
import Switches from '../../views/Components/Switches/';
import Tables from '../../views/Components/Tables/';
import Tabs from '../../views/Components/Tabs/';

// Icons
import FontAwesome from '../../views/Icons/FontAwesome/';
import SimpleLineIcons from '../../views/Icons/SimpleLineIcons/';
// import FontAwesome from 'react-fontawesome';

import {getClients, getProjects, getData} from '../../actions/index';
import {buildUrl} from '../../helpers/api';

class Full extends Component {

  constructor(props) {
    super(props);

    this.state = {};

    this.apiRequest = this.apiRequest.bind(this);
  }

  apiRequest(url) {
    return new Promise(function (resolve, reject) {
          //our fake api simply returns the string passed as the 'url'
          if (url) {
              resolve(url);
          } else {
              //if no url is passed to the function, it will fail
              reject('apiRequest failed!');
          }
      })
      .catch(function(err){
          //return error;
          return err;
      });
  }



  componentDidMount() {
    fetch(buildUrl('api/clients'))
    .then((response) => response.json())
    .then((response) => response)
    .then(response => {
      console.log('clients', response.clients);
      return this.props.getClients(response.clients);
    })

    fetch(buildUrl('api/projects'))
    .then((response) => response.json())
    .then((response) => response)
    .then(response => {
      console.log('projects api', response.projects);
      return this.props.getProjects(response.projects);
    })

    // .catch(err => { console.error('err', err); })
    // var p1 = this.apiRequest(buildUrl('api/clients'));
    // var p2 = this.apiRequest(buildUrl('api/projects'));

    // Promise.all([p1, p2])
    // .then(function(res){
    //     console.log('Promise.all', res);
    //         let resObj = {
    //           projects: [],
    //           clients: []
    //         };
    //     _.forEach(res, (url, index) => {
    //       console.log('url => ', url);
    //         fetch(url)
    //         .then((response) => response.json())
    //         .then((response) => response[0])
    //         .then(response => {
    //           console.log('response', response);
    //           console.log('ids', response.meta.id.toLowerCase());
    //           var ids = response.meta.id.toLowerCase();
    //           console.log('is project? ', !!ids.includes("projects"));
    //           if (ids.includes("projects")) {
    //             console.log('exist');
    //             resObj.projects = response.properties.data;
    //             // this.props.getProjects(response.properties.data);
    //           } else {
    //             console.log('doesnt');
    //             resObj.clients = response.properties.data;
    //             // this.props.getClients(response.properties.data);
    //           }
    //         })
    //       })        
    // })
    // .then(response => {
    //   console.log('final res', response);
    //   return this.props.getClients(response.clients); return this.props.getProjects(response.projects);
    // })  
    .catch(function(err){
        console.error('final err', err);
    });
  }

  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props}/>
          <main className="main">
            <Breadcrumb />
            <Container fluid {...this.props}>
              <Switch>
                <Route path="/dashboard" name="Dashboard" component={Dashboard}/>
                <Route path="/clients" name="Clients" component={Clients} />
                <Route path="/projects" name="Projects" component={Projects} />
                <Route path="/components/buttons" name="Buttons" component={Buttons}/>
                <Route path="/components/cards" name="Cards" component={Cards}/>
                <Route path="/components/forms" name="Forms" component={Forms}/>
                <Route path="/components/modals" name="Modals" component={Modals}/>
                <Route path="/components/social-buttons" name="Social Buttons" component={SocialButtons}/>
                <Route path="/components/switches" name="Swithces" component={Switches}/>
                <Route path="/components/tables" name="Tables" component={Tables}/>
                <Route path="/components/tabs" name="Tabs" component={Tabs}/>
                <Route path="/icons/font-awesome" name="Font Awesome" component={FontAwesome}/>
                <Route path="/icons/simple-line-icons" name="Simple Line Icons" component={SimpleLineIcons}/>
                <Route path="/widgets" name="Widgets" component={Widgets}/>
                <Route path="/charts" name="Charts" component={Charts}/>
                <Redirect from="/" to="/dashboard"/>
              </Switch>
            </Container>
          </main>
          <Aside />
        </div>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    clients: state.clients,
    projects: state.projects
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({getClients, getProjects, getData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Full);
