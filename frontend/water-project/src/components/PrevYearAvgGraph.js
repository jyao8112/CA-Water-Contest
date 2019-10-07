import React, { Component } from 'react';
import Plot from 'react-plotly.js';

import { Col} from 'react-bootstrap';


export class PreYearAvgGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
          width:  0.3 * window.innerWidth,
          height: window.innerHeight
        }
    }

    updateDimensions = () => {
      if(window.innerWidth < 1200) {
        let update_width  = 0.3 * window.innerWidth;
        let update_height = 0.8 * Math.round(update_width);
        this.setState({ width: update_width, height: update_height });
      } else {
        let update_width  = 0.3 * window.innerWidth;
        let update_height = 0.8 * Math.round(update_width);
        this.setState({ width: update_width, height: update_height });
      }
    }

    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions);
    }
  
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    render() {

        const { name, year, elemAvg, yTitle, stdValue } = this.props; 
        const standard = [];
        elemAvg.forEach(element => {
            standard.push(stdValue);
        });

        var trace1 = {
            type: "scatter",
            mode: "lines+markers",
            name: name + " YAC",
            x: year,
            y: elemAvg,
            line: {
              color: "#17BECF"
            },
            marker: {
                color: "#2077b4",
                symbol: "hexagram"
            }
        };

        var trace2 = {
            mode: "lines",
            name: name + " MCL",
            x: year,
            y: standard,
            line: {
              color: "#fcb603"
            },
            marker: {
                color: "#2077b4",
                symbol: "hexagram"
            }
        };
      
        var data = [trace1, trace2];
      
        var layout = {
            // autosize: true,
            // useResizeHandler: true,
            width: this.state.width,
            height: this.state.height,       
            title: name + " Yearly Average Value",
            xaxis: { title: 'Year' },
            yaxis: { title: yTitle + ' μg/L' },
            font: {size: 10, family: 'arial'},
            legend: {
                x: -0.1, 
                y: 1.2,
                font: {
                  size: 8,
                  family: 'arial'
                }
            }
        }

        return (
          <React.Fragment>
            <Col xs={6}>
              <Plot
                data={data}
                layout={layout}
              />
            </Col>
          </React.Fragment>
        );
      }
}

