import React from 'react';
import { Col } from 'react-bootstrap';

export class UserInputField extends React.Component {
    render() {
        const { label, id, placeholder, value, onChange } = this.props;

        return (
            <React.Fragment>
                <Col xs={12} md={6} lg={6} xl={4}>
                    <label>{label}</label><br/>
                    <input className="field"
                    type="text"
                    id={id}
                    placeholder={placeholder}
                    autoFocus
                    value={value}
                    onChange={onChange}
                    size="16"
                />
                </Col>
            </React.Fragment>
        );
    }
}
