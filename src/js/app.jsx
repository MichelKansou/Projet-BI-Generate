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
  database : 'plasticbox'
});


var App = React.createClass({



    // Fonction lancer des requete à mysql
    connectToDB(query, callback){
        connection.query( query, function(err, rows, fields) {
        if (err) {
            return callback(err);
        }
        callback(rows);
        //console.log('Your Query contains: ', rows);
        });
    },

    insertToDB(query, post){
        var query = connection.query(query, post, function(err, result) {
        });
        console.log(query.sql);
    },

    //Affichage des composants
    render() {
        return (
            <div className="app-container">
                <Generator connectToDB={this.connectToDB} insertToDB={this.insertToDB} />
            </div>
        );
    }

});

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
