var React         = require('react'),
    ReactDOM      = require('react-dom'),
    // TestComponent = require('./components/TestComponent.jsx'),
    ShowData = require('./components/ShowData.jsx');

ReactDOM.render(
  <ShowData dataFeed={workData}/>,
  document.getElementById("react-container")
);
