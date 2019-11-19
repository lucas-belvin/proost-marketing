import React from 'react';
import _ from 'lodash';

import { Line, defaults } from 'react-chartjs-2';


import {safePrefix, markdownify, Link} from '../utils';








export default class SectionHerograph extends React.Component {
    constructor() {
      super()
      this.myChart = undefined;
      this.allData = [{
        x: 0,
        y: 19
      },
      {
        x: 1,
        y: 15
      },
      {
        x: 2,
        y: 3
      },
      {
        x: 3,
        y: 5
      },
      {
        x: 4,
        y: 2
      },
      {
        x: 5,
        y: 3
      },
      {
        x: 6,
        y: 1
      },
      ];
      defaults.global.defaultFontColor = 'white';
      defaults.global.defaultFontSize = 16;
      
      this.options = {
        type: 'line',
        data: {
          datasets: [{
            label: 'Average meeting hours per week',
            data: [this.allData[0]],
            borderWidth: 3,
            borderColor: 'red',
            backgroundColor: '#ff000066',
            fill: true
          }, ]
        },
        options: {
          scales: {
            xAxes: [{
              type: 'linear',
              scaleLabel: {
                display: true,
                labelString: 'Weeks',
              },
              ticks: {
                min: 0,
                max: 6
              },
              gridLines: {
                display: false
              }
            }],
            yAxes: [{
              ticks: {
                min: 0,
                max: 25
              },
              gridLines: {
                display: false
              },
              scaleLabel: {
                display: true,
                labelString: 'Hours',
              },
      
            }]
          },
        },
      };
    }

    next() {
      const chart = _.get(this.myChart, 'chartInstance');
      const data = _.get(chart, 'data.datasets[0].data');

      if(data) {
        const count = data.length;
        data[count] = data[count - 1];
        chart.update({
          duration: 0
        });
        data[count] = this.allData[count];
        chart.update();
        if (count < this.allData.length) {
          setTimeout(() => {
            this.next();
          }, 1000);
        }
      }
    }
  


    componentDidMount() {
      setTimeout(() => {
        this.next();
      }, 1000);
    }

    render() {
        return (
            <div className={`hero-wrapper ` + _.get(this.props, 'section.background_image') ? 'has-bg' : '' + _.get(this.props, 'section.classes')} style={{ backgroundImage: `url(${_.get(this.props, 'section.background_image')})`}}>
              <section id={_.get(this.props, 'section.section_id')} className="block hero-block bg-accent outer" >
                <div className="inner container">
                  <div className="grid row"> 
                    <div className="cell block-preview graph">
                      <Line 
                        data={this.options.data} 
                        options={this.options.options}
                        ref={(reference) => {
                          this.myChart = reference;
                        }}
                        />
                    </div>
                    <div className="cell block-content">
                      {_.get(this.props, 'section.title') && 
                      <h2 className="block-title underline">{_.get(this.props, 'section.title')}</h2>
                      }
                      <div className="block-copy">
                        {markdownify(_.get(this.props, 'section.content'))}
                      </div>
                      {_.get(this.props, 'section.actions') && 
                      <p className="block-buttons">
                        {_.map(_.get(this.props, 'section.actions'), (action, action_idx) => (
                        <Link key={action_idx} to={safePrefix(_.get(action, 'url'))} className="button white large">{_.get(action, 'label')}</Link>
                        ))}
                      </p>
                      }
                    </div>
                  </div>
                </div>
              </section>
            </div>
        );
    }
}
