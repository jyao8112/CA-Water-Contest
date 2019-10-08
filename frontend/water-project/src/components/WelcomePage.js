import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
// import Video from './Video';

export class WelcomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {  
        return (
            <React.Fragment>
                <div style={{margin: "50px"}}>
                    <Row style={{marginBottom: "40px"}}>
                        <Col xs={12} lg={6}>
                        <h3 className= 'webTitle' style={{paddingLeft:"30px", color:"#336699",fontSize:'24px'}}>Welcome to Jata Water Quality Information Platform </h3>   
                        <p style ={{marginLeft:"60px",marginRight:"60px"}} class="outset"></p>          
                        <p className="steps" style ={{marginLeft:"30px",marginRight:"40px",color:"smokegrey",fontSize:'16px'}} >Jata water information platform provides easy access of drinking water quality data to community residents.It also allows users to share their home self-monitoring water data within public and all stakeholders in the community.</p>
                        <p class="outset"></p>
                        <ul><b>Please note:</b>
                            <li style={{marginTop: "10px",marginLeft:"30px"}}>This is a prototype version with limited data feed by the open databases. </li>
                            <li style={{marginTop: "10px",marginLeft:"30px"}}>As the official data of water system serving boundaries is still in the process of being completed,this test version only supports informaion queries of the below-listed counties in California. </li>
                                <Row style={{marginTop: "10px"}}>
                                <Col xs={12} lg={4}>
                                    <ul>
                                        <li>ALAMEDA</li>
                                        <li>ALPINE</li>
                                        <li>AMADOR</li>
                                        <li>BUTTE</li>
                                        <li>CALAVERAS</li>
                                       
                                    </ul> 
                                </Col>
                                <Col xs={12} lg={4}>
                                    <ul>
                                        <li>COLUSA</li>
                                        <li>CONTRA COSTA</li>
                                        <li>DEL NORTE</li>
                                        <li>EL DORADO</li>
                                        <li>FRESNO</li>
                                    </ul>
                                </Col>
                                <Col xs={12} lg={4}>
                                    <ul>
                                        <li>GLENN</li>
                                        <li>HUMBOLDT</li>
                                        <li>IMPERIAL</li>
                                        <li>INYO</li>
                                        <li>KERN</li>
                                    </ul>
                                </Col>
                                </Row>

                        </ul>
                        </Col>
                        <Col xs={12} lg={6}>
                        <iframe style={{marginTop:"20px"}} width="540" height="420" src="https://www.youtube.com/embed/PsBkwDi22XA" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </Col>
                    </Row>
                    <Row style={{marginLeft: "60px",marginTop: "5px"}}>
                        <NavLink className='button' to="/address" activeClassName="is-active" style={{margin: "10px"}}>Go To Test</NavLink>
                    </Row>
                </div>    
            </React.Fragment>
        );
    }
}
