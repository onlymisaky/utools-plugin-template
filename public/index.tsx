import React from 'react';
import ReactDom from 'react-dom';

class App extends React.Component {

  handleClick() { 
    window.method();
  }

  render() {
    return <div onClick={this.handleClick}>{window.value}</div>
  }
}

ReactDom.render(<App />, document.getElementById('root'));
