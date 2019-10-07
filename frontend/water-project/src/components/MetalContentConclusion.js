import React from 'react';

export class MetalContentConclusion extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {metal, metalStd} = this.props;

        return (
            <React.Fragment> 
            {
                metalStd === 1 ?
                <p>
                    <b style={{color:"smokegrey"}}>{metal}</b>: Below Maximum Contaminant Levels(MCLs) - <b style ={{color:"#7793b0"}}>Satisfied</b>
                </p> :
                <p>
                    <b style={{color:"smokegrey"}}>{metal}</b>: Above Maximum Contaminant Levels(MCLs) - <b>Concerned</b>
                </p>
            }
            </React.Fragment> 
        );
    }
}