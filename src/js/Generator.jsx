import React from 'react'

var Generator = React.createClass({

    // getInitialState: function() {
    //     return {
    //         Var1: ''
    //     };
    // },

    render() {
        let result = this.props.queryResult;
        if ( result != null ){
          var dataList = this.state.table.map((rows, index) =>
            <li key={index}>table : {rows.ProductName}</li>
          )
        }
        return (
            <div className="generator-container">
                <h1> Generator BI </h1>
            </div>
        );
      }
  });

export default Generator;
