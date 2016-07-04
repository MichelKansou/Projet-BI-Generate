import React from 'react'
import { DateRange } from 'react-date-range'

var Generator = React.createClass({

     getInitialState: function() {
         return {
             handleDate: '',
             generatedDate: '',
             generatedProduct: '',
             generatedQuantity: '',
             commandNumber: 0
        };
    },

    generator(commandNumber, event){
        let startDate = this.state.handleDate.startDate;
        let endDate = this.state.handleDate.endDate;
        for (var i=0; i < commandNumber; i++) {
            this.randomDate(startDate, endDate);
        }
    },

    handleSelect(handleSelect){
        this.setState({handleDate: handleSelect});
        console.log(this.state.handleDate); // Momentjs object
    },

    randomDate(start, end) {
        var date = new Date(start + Math.random() * (end - start));
        this.setState({generatedDate: date});
        console.log('Generated Date : ', date);
    },

    randomProduct(length){
        var ProductID = Math.floor(Math.random() * length) + 1;
        var Quantity = Math.floor(Math.random() * 20) + 1;
        this.setState({
            generatedProduct: ProductID,
            generatedQuantity: Quantity
        });
    },
    handleChange(event){
        this.setState({commandNumber: event.target.value});
    },

    render() {
        let result = this.props.queryResult;

        return (
            <div className="generator-container">
                <div className="title">
                    <h1> Data Generator </h1>
                </div>
                <div className="ui form custom">
                    <div className="field custom">
                        <label>Number of order</label>
                        <input  type="text"
                                name="order-number"
                                value={this.state.commandNumber}
                                onChange={this.handleChange}
                                placeholder="00"/>
                    </div>
                    <button className="ui blue button"
                        onClick={this.generator.bind(this, this.state.commandNumber)}>Submit</button>
                </div>
                <div className="Datepicker">
                    <DateRange
                       onInit={this.handleSelect}
                       onChange={this.handleSelect}
                       theme={{
                                DateRange      : {
                                  background   : 'transparent'
                                },
                               Calendar       : {
                                 background   : '#3B3C3D',
                                 color        : '#ECF0F1',
                               }
                          }}
                   />
                </div>
            </div>
        );
      }
  });

export default Generator;
