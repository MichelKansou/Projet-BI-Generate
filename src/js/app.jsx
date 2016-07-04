import React from 'react'
import ReactDOM from 'react-dom'
import mysql from 'mysql'
import Immutable from 'Immutable'

import Generator from './Generator.jsx'


// Connection BDD mysql
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'mydb'
});


var App = React.createClass({

    //Initialisation des variables
    getInitialState: function() {
        return {queryResult: null};
    },

    // Fonction lancer des requete à mysql
    connectToDB: function(query){
        connection.connect();

        connection.query( query, function(err, rows, fields) {
        if (err) throw err;
        console.log('Your Query contains: ', rows[0]);
        this.setState({queryResult: rows});
        }.bind(this));

        connection.end();
    },

    //Affichage des composants
    render: function() {
        return (
            <div className="app-container">
                <Generator queryResult={this.state.queryResult}/>
            </div>
        );
    }

});

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
