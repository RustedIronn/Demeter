import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import BasicInformation from "@/components/profile/BasicInformation/BasicInformation";  
import Goal from '@/components/nutrition/Goal/Goal';
import './PersonalPanel.css';

class PersonalPanel extends Component {
    render() {
        return (
            <Col md="5" className="PersonalPanel h-100 d-inline-block">
                <BasicInformation />
                <Goal />
            </Col>
        );
    }
}

export default PersonalPanel;