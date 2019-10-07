import React from 'react';
import { connect } from 'react-redux';
import { submitWaterQualityData } from '../actions/waterQualityData';
import { MetalContentConclusion } from './MetalContentConclusion';
import { TestResultMap } from './Map/TestResultMap';
import { UserInputField } from './UserInputField';
import { Row, Col} from 'react-bootstrap';
import { Link } from "react-router-dom"; 
import './style.scss';

class WaterQualityTestPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cu: props.cu,
            lead: props.lead,
            iron: props.iron,
            chromium: props.chromium,
            nitrate: props.nitrate,
            mercury: props.mercury,
            showGraphResult: false
        }
    }

    onNumChange = (e) => {
        const id = e.target.id;
        const value = e.target.value;
        var numVal = parseFloat(value);

        if (isNaN(numVal)) {
            numVal = 0;
        }

        var object = this.state;
        object[id] = numVal;
        this.setState({...object});
    }

    onSubmit = (e) => {
        const { dispatch } =  this.props;
        const { addressLineOne, addressLineTwo, city, postal } = this.props;
        const address = addressLineOne + (addressLineTwo ? ', ' + addressLineTwo : '') + ', ' + city + ', CA, ' + postal;
        
        const { cu, lead, iron, chromium, nitrate, mercury } = this.state;

        dispatch(submitWaterQualityData({address, cu, lead, iron, chromium, nitrate, mercury}));
    }

    render() {
        const {showGraphResult, goodMarkers, badMarkers, user_lat, user_lon, cuStd,
            leadStd,ironStd,mercuryStd,chromiumStd,nitrateStd,showStdRes} = this.props;

        console.log('Current markers:', goodMarkers);

        return (
            <React.Fragment>
            <div style={{margin: "0 100px"}}>
            <div style={{margin: "30px"}}>
                <Row>
                    <Col xs={6} style={{marginBottom: "10px"}}>    
                        <Row>
                            <Col xs={12}>
                                <h3 className ="titleRow">Input Your Test Result</h3>
                                <p className="steps" id='stepfield'> Input your water test kit result to share with the community. Please follow your homekit instruction to interprete your result.</p>
                            </Col>
                            <UserInputField 
                                label="Copper(mg/L)"
                                id="cu"
                                placeholder="0"
                                onChange={this.onNumChange}
                                value={this.state.cu}
                            />
                            <UserInputField 
                                label="Lead(mg/L)"
                                id="lead"
                                placeholder="0"
                                onChange={this.onNumChange}
                                value={this.state.lead}
                            />
                            <UserInputField 
                                label="Iron(mg/L)"
                                id="iron"
                                placeholder="0"
                                onChange={this.onNumChange}
                                value={this.state.iron}
                            />
                            <UserInputField 
                                label="Chromium(mg/L)"
                                id="chromium"
                                placeholder="0"
                                onChange={this.onNumChange}
                                value={this.state.chromium}
                            />
                            <UserInputField 
                                label="Nitrate(mg/L)"
                                id="nitrate"
                                placeholder="0"
                                onChange={this.onNumChange}
                                value={this.state.nitrate}
                            />
                            <UserInputField 
                                label="Mercury(mg/L)"
                                id="mercury"
                                placeholder="0"
                                onChange={this.onNumChange}
                                value={this.state.mercury}
                            />
                        </Row>
                        <Row style={{marginTop: "20px"}}>
                            <Col>
                                <input className = "button" type="submit" value="Share" onClick={this.onSubmit}/>
                            </Col>
                        </Row>
                        {   showStdRes && 
                            <Row style={{marginTop: "40px"}}>
                                <Col>
                                    <h3 className ="titleRow"style={{marginBottom:"20px"}}>Water Quality</h3>
                                    <MetalContentConclusion metal="Copper" metalStd={cuStd}/>
                                    <MetalContentConclusion metal="Iron" metalStd={ironStd}/>
                                    <MetalContentConclusion metal="Lead" metalStd={leadStd}/>
                                    <MetalContentConclusion metal="Nitrate" metalStd={nitrateStd}/>
                                    <MetalContentConclusion metal="Mercury" metalStd={mercuryStd}/>
                                    <MetalContentConclusion metal="Chromium" metalStd={chromiumStd}/>
                                </Col>    
                            </Row>

                        }
                        <Row style={{marginTop: "60px"}}>
                            <Col>
                                <a style={{color:"#79a6d2"}} href='https://www.wikihow.com/Test-Water-Quality' class="active" target="_blank">Learn more about home water quality test</a>
                            </Col>    
                        </Row>
                        <Row style={{marginTop: "20px"}}>
                            <Col>
                                <Link style={{color:"#79a6d2"}} to='/address'>Go Back</Link>
                            </Col>
                        </Row>
                    </Col>
                
                
                    <Col xs={6}>
                    { showGraphResult && 
                        <React.Fragment> 
                            <Row style={{marginLeft:"40px"}}>
                                <Col>
                                    <h3 className ="titleRow">Homet Test Result In Your Community </h3>
                                </Col>
                            </Row>
                            <Row>
                                <Col >
                                    <p className="steps" id='stepfield' style={{marginLeft:"60px"}}>View home test result shared by resident in your community.
                                    </p>
                                </Col>
                            </Row>
                            <Row style={{marginLeft:"40px"}}>
                                <Col xs={12} xl={6}>
                                    <div style={{textAlign: "center"}}>
                                        <TestResultMap goodMarkers={goodMarkers} badMarkers={badMarkers} userLat={user_lat} userLon={user_lon}/>
                                    </div>
                                </Col>
                            </Row>
                        </React.Fragment>
                    }   
                    </Col>
                 </Row>
            </div>
            </div>
            </React.Fragment>
            )
    }
}


const mapStateToProps = (state) => {
    return {
        cu: state.waterQualityData.cu,
        lead: state.waterQualityData.lead,
        iron: state.waterQualityData.iron,
        chromium: state.waterQualityData.chromium,
        nitrate: state.waterQualityData.nitrate,
        mercury: state.waterQualityData.mercury,
        cuStd: state.waterQualityData.cuStd,
        leadStd: state.waterQualityData.leadStd,
        ironStd:  state.waterQualityData.ironStd,
        mercuryStd:  state.waterQualityData.mercuryStd,
        chromiumStd:  state.waterQualityData.chromiumStd,
        nitrateStd:  state.waterQualityData.nitrateStd,
        showStdRes: state.waterQualityData.showStdRes,
        goodMarkers: state.userTestResults.good_markers,
        badMarkers: state.userTestResults.bad_markers,
        user_lat: state.userTestResults.user_lat,
        user_lon: state.userTestResults.user_lon,
        showGraphResult: state.userTestResults.showGraphResult
    }
}

export default connect(mapStateToProps)(WaterQualityTestPage);
