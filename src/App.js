import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import Search from './Components/Search/Search';
import DatePicker from './Components/DatePicker/DatePicker';
import BasicInformation from './Components/BasicInformation/BasicInformation';
import Goal from './Components/Goal/Goal';
import PersonalPanel from './Components/PersonalPanel/PersonalPanel';
import ListFood from './Components/ListFood/ListFood';
import SearchCard from './Components/SearchCard/SearchCard';
import AddCard from './Components/AddCard/AddCard';
import Fab from './Components/Fab/Fab';

import * as actionsGeneral from './actions/general';
import * as actionsPersonalData from './actions/personalData';
import { data } from './data';

class App extends Component {
  componentDidMount = () => {
    window.addEventListener("resize", this.updateWindowDimensions);
    this.updateWindowDimensions();
    this.props.dispatch(actionsPersonalData.personalDataSet(data))
  }

  componentWillUnmount = () => window.removeEventListener("resize", this.updateWindowDimensions);
  updateWindowDimensions = () => this.props.dispatch(actionsGeneral.mobileSet(window.innerWidth < 768));

  render() {
    return (
      <Container className={this.props.isMobile ? "p-0" : ""} fluid={this.props.isMobile}>
        <Row className={this.props.isMobile ? "m-0" : ""}>
          <Col lg="12" className={this.props.isMobile ? "p-0" : ""}>
            <Search />
            {
              this.props.isMobile &&
              <React.Fragment>
                <BasicInformation />
                <DatePicker />
                <Goal />
                <ListFood />
              </React.Fragment>
            }
            {
              !this.props.isMobile &&
              <Container fluid>
                <Row>
                  <PersonalPanel />
                  <ListFood />
                </Row>
              </Container>
            }
            <SearchCard />
            <AddCard />
            <Fab handleAddOnClick={this.handleAddOnClick} />
          </Col>
        </Row>
      </Container>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    isMobile: state.general.isMobile,
  }
}

export default connect(mapStateToProps)(App);