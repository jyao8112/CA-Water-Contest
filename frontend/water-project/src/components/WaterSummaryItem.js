import React from 'react';
import { Col} from 'react-bootstrap';

export class WaterSummaryItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {title, value} = this.props;

        return (
            <React.Fragment>
                <Col xs={6} md={3}>
                    <h5>{title}</h5>
                    <p style={{color: '#4F96A5'}}>{value === '' ? '-' : value}</p>
                </Col>
            </React.Fragment>
        );
    }
}
