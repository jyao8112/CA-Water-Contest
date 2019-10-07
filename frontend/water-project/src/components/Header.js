import React from 'react';
import { Jumbotron } from 'react-bootstrap';

let imgUrl = 'http://publish.illinois.edu/wef-awwa-uiuc/files/2014/09/Water-Image1.jpg'; 
export class Header extends React.Component {
    render() {
        return (
            <div>
                <Jumbotron style = {{ marginTop: "10px",padding: "5px,10px",backgroundImage: 'url(' + imgUrl + ')', backgroundSize: '110% 100%',backgroundPosition: 'top right',
            backgroundRepeat: 'no-repeat',opacity:0.8}}>
                <h1 className = "textshadow" style={{ padding: "0px 40px", marginTop: "10px",marginBottom: "5px",textAlign: "bottom", fontSize:"50px",color: "#3973ac"}}>Jata Water Solution</h1>
                <p className = "lineshadow" style={{ padding: "0px 40px", textAlign: "top", marginTop: "5px",color: "#3973ac",fontSize:"20px"}}> ONE integrated information platform and TWO-way data communication
                </p>
                </Jumbotron>
            </div>
        );
    }
}
