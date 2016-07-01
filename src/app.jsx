var React = require('react');
var ReactDom = require('react-dom');
var mysql      = require('mysql');
var Immutable = require('immutable');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'mydb'
});

var App = React.createClass({
    getInitialState: function() {
        return {table: null};
    },

  componentDidMount: function(){
    connection.connect();

    connection.query('SELECT * FROM mydb.Products', function(err, rows, fields) {
    if (err) throw err;
    console.log('The solution is: ', rows[0]);
    this.setState({table: rows});
    }.bind(this));

    connection.end();
},

  render: function() {
      console.log(this.state.table);
      if ( this.state.table != null ){
        var dataList = this.state.table.map((rows, index) =>
          <li key={index}>table : {rows.ProductName}</li>
        )
      }
    return (
        <div>
           <h1>Hello from React!</h1>
            <ul>
               {dataList}
            </ul>
        </div>
    );
  }

});

ReactDom.render(<App/>, document.getElementById('react-app'));
