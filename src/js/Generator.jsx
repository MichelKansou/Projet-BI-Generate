import React from 'react'
import { DateRange } from 'react-date-range'

var Generator = React.createClass({

     getInitialState: function() {
         return {
             handleDate: '',
             generatedDate: '',
             generatedProduct: '',
             generatedQuantity: ''
        };
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

    render() {
        let result = this.props.queryResult;
        let startDate = this.state.handleDate.startDate;
        let endDate = this.state.handleDate.endDate;

        if ( result != null ){
          var dataList = this.state.table.map((rows, index) =>
            <li key={index}>table : {rows.ProductName}</li>
          )
        }
        return (
            <div className="generator-container">
                <h1> Generator BI </h1>
                <button className="ui blue button" onClick={this.randomDate.bind(this, startDate, endDate)} >
                    Valider
                </button>
                <DateRange
                   onInit={this.handleSelect}
                   onChange={this.handleSelect}
               />
            </div>
        );
      }
  });

export default Generator;
