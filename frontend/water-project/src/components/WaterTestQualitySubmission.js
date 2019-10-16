import React from 'react';
import { connect } from 'react-redux';
import { setPersonalInfo, submitPersonalInfo } from '../actions/personalInfo';
import { PreYearAvgGraph } from './PrevYearAvgGraph';
import { WATERSTANDARD} from '../constants/waterStandard';
import { WaterSummaryItem } from './WaterSummaryItem';
import { UserInputField } from './UserInputField';
import { Row, Col} from 'react-bootstrap';
import { Link } from "react-router-dom";

class waterQualitySubmission extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addressLineOne: props.addressLineOne,
            addressLineTwo: props.addressLineTwo,
            city: props.city,
            postal:props.postal, 
            showSummary: false,
            showAverage: false
        }
    }

    onChange = (e) => {
        const { dispatch } = this.props;
        const id = e.target.id;
        const value = e.target.value;

        var object = this.state;
        object[id] = value;
        this.setState({...object});
        dispatch(setPersonalInfo(object));
    }

    onSubmit = (e) => {
        const { dispatch } =  this.props;
        const { addressLineOne, addressLineTwo, city, postal } = this.state;
        const address = addressLineOne + (addressLineTwo ? ', ' + addressLineTwo : '') + ', ' + city + ', CA, ' + postal;
        dispatch(submitPersonalInfo({address}));
    }

    render() {
        const {showSummary,showAverage, year, copper_avg, lead_avg, iron_avg, chromium_avg, nitrate_avg, mercury_avg, score, improveRate, population, 
            yearsInService, zipcode, waterSystemName, waterSystemNumber} = this.props;

        return (
            <React.Fragment>
            <div>
            <div>
                <Row style ={{paddingLeft:"30px"}}>
                    <Col xs={6} style={{marginBottom: "10px"}}>    
                        <Row style ={{paddingLeft:"50px"}}>
                        <Col xs={12}>
                                <h3 className ="titleRow" id='datafiled'>Input Your Address</h3>
                                <p className="steps" id='stepfield' >Input your address to retrieve your water system information.</p>
                                <p className="steps" id='stepfield' >Currently serving following couties:</p>
                                <p style={{color:"#6491AD"}} > ALAMEDA/ALPINE/AMADOR/BUTTE/CALAVERAS/COLUSA/CONTRA COSTA</p>
                                <p style={{color:"#6491AD"}} > DEL NORTE/EL DORADO/FRESNO/GLENN/HUMBOLDT/IMPERIAL/INYO/KERN</p>
                            </Col>
                            <UserInputField 
                                label="Address 1"
                                id="addressLineOne"
                                placeholder="address1"
                                onChange={this.onChange}
                                value={this.state.addressLineOne}
                            />
                            <UserInputField 
                                label="Address 2"
                                id="addressLineTwo"
                                placeholder="address2"
                                onChange={this.onChange}
                                value={this.state.addressLineTwo}
                            />
                            <UserInputField 
                                label="City"
                                id="city"
                                placeholder="City"
                                onChange={this.onChange}
                                value={this.state.city}
                            />
                            <UserInputField 
                                label="Postal"
                                id="postal"
                                placeholder="Zip Code"
                                onChange={this.onChange}
                                value={this.state.postal}
                            />
                        </Row>
                        <Row style={{marginTop: "30px", marginLeft:"35px"}}>
                            <Col>
                                <input className='button' type="button" value="Submit" onClick={this.onSubmit}/>
                            {/* <Col xs={12} style={{marginLeft:"20px"}}>  */}
                                    <button className='button' type="button" style={{marginLeft:"10px"}} ><Link style={{color:"white"}} to="/test"> Community Water Data</Link></button>
                            </Col> 
                        </Row>
                        <Row>
                        {showSummary && (
                            <React.Fragment>
                                <Col xs={12} style={{paddingLeft: "50px",marginTop: "60px", marginLeft:"30px"}}>   
                                    <Row>
                                    <h3 className ="titleRow" >Your Water System Information</h3>
                                    </Row>
                                    <Row>
                                    <p className="steps" id='stepfield'style={{paddingLeft: "5px"}}> Here is your water system information according to your address. </p>
                                    </Row>
                                    <Row className='summaryItemRowTop' >
                                        <WaterSummaryItem title="Water System Number" value={waterSystemNumber} />
                                        <WaterSummaryItem title="Water System Name" value={waterSystemName} />
                                        <WaterSummaryItem title="Water Quality Score" value={score}/>
                                    </Row> 
                                </Col>
                                <Col xs={12} className='summaryItemRow' style={{marginTop: "160px",marginLeft: "60px"}}>  
                                    <Row>
                                        <WaterSummaryItem title="Improve Rate" value={improveRate} />
                                        <WaterSummaryItem title="Total Served Population" value={population} />
                                        <WaterSummaryItem title="Years in Service" value={yearsInService} />
                                        {/* <WaterSummaryItem title="Zip Code" value={zipcode} /> */}
                                    </Row> 
                                </Col>
                                <Row style={{marginTop: "180px",marginLeft: "60px"}}>
                                    <Col>
                                        <Link style={{color:"#79a6d2"}} to='/'>Go Back</Link>
                                    </Col>
                                </Row>
                            </React.Fragment>)
                        }
                        </Row>
                    </Col>
                    <Col xs={6}>
                    { showAverage && 
                        <React.Fragment> 
                            <Row>
                                <Col style={{marginLeft:"30px"}}>
                                <h3 className ="titleRow" id='datafiled'> Chemical detected value change by year </h3>
                                <p className="steps" id='stepfield'> Critical chemical dectected from 2013-2019 in your water system</p>
                                <p className="steps" id='stepfield' style ={{color:"#0099e6"}}> YAC: Yearly Average Check</p>
                                <p className="steps" id='stepfield' style ={{color:"#D1820F"}}> MCL: Maximum Contaminant Levels</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12}>
                                    <Row>
                                            <PreYearAvgGraph 
                                                name='Copper'
                                                year={year}
                                                elemAvg={copper_avg}
                                                yTitle='copper_avg'
                                                stdValue={WATERSTANDARD.CUSTD}
                                            />
                                            <PreYearAvgGraph 
                                                name='Lead '
                                                year={year}
                                                elemAvg={lead_avg}
                                                yTitle='lead_avg'
                                                stdValue={WATERSTANDARD.LEADSTD}
                                            />
                                            <PreYearAvgGraph 
                                                name='Iron'
                                                year={year}
                                                elemAvg={iron_avg}
                                                yTitle='iron_avg'
                                                stdValue={WATERSTANDARD.IRONSTD}
                                            />
                                            <PreYearAvgGraph 
                                                name='Chromium'
                                                year={year}
                                                elemAvg={chromium_avg}
                                                yTitle='chromium_avg'
                                                stdValue={WATERSTANDARD.CRSTD}
                                            />
                                            <PreYearAvgGraph 
                                                name='Mercury'
                                                year={year}
                                                elemAvg={mercury_avg}
                                                yTitle='mercury_avg'
                                                stdValue={WATERSTANDARD.MERCURYSTD}
                                            />
                                            <PreYearAvgGraph 
                                                name='Nitrate'
                                                year={year}
                                                elemAvg={nitrate_avg}
                                                yTitle='nitrate_avg'
                                                stdValue={WATERSTANDARD.NITRATESTD}
                                            />
                                    </Row> 
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
        addressLineOne: state.personalInfo.addressLineOne,
        addressLineTwo: state.personalInfo.addressLineTwo,
        city: state.personalInfo.city,
        postal: state.personalInfo.postal,
        showTestResult: state.waterQualityData.showTestResult,
        copper_avg: state.prevYearAvg.copper_avg,
        lead_avg:state.prevYearAvg.lead_avg,
        iron_avg: state.prevYearAvg.iron_avg,
        chromium_avg: state.prevYearAvg.chromium_avg,
        nitrate_avg: state.prevYearAvg.nitrate_avg,
        mercury_avg: state.prevYearAvg.mercury_avg,
        showAverage: state.prevYearAvg.showAverage,
        year: state.prevYearAvg.year,
        score: state.waterQualitySummary.score,
        improveRate: state.waterQualitySummary.improveRate,
        population: state.waterQualitySummary.population,
        zipcode: state.waterQualitySummary.zipcode,
        showSummary: state.waterQualitySummary.showSummary,
        waterSystemNumber: state.waterQualitySummary.waterSystemNumber,
        waterSystemName: state.waterQualitySummary.waterSystemName,
        yearsInService: state.waterQualitySummary.yearsInService,
    }
}

export default connect(mapStateToProps)(waterQualitySubmission);