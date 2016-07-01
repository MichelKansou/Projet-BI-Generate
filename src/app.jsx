var React = require('react');
var ReactDom = require('react-dom');

var App = React.createClass({
  // propTypes: {
  // },

  render: function() {
    return (
       <h1>Hello from React!</h1>
    );
  }

});

ReactDom.render(<App/>, document.getElementById('react-app'));
