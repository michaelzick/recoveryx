var React         = require('react'),
    ReactDOM      = require('react-dom'),
    // TestComponent = require('./components/TestComponent.jsx'),
    Main = require('./components/Main.jsx');

ReactDOM.render(
  <Main dataFeed={workData}/>,
  document.getElementById("react-container")
);
