import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // Hook that checks if an error occurs inside this component or its children.
  componentDidCatch(error) {
    // Update state so the next render will show the fallback UI.
    this.setState({ hasError: true });
  }

  render() {
    // Check if there are any errors and shows a message.
    if (this.state.hasError) {
      return <h1>Something went wrong. Check Console for details.</h1>;
    }

    //If there are no errors it renders the children components.
    return this.props.children;
  }
}

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    this.setState(({counter}) => ({
      counter: counter + 1
    }));
  }
  
  render() {
    if (this.state.counter === 5) {
      throw new Error('Crashed.');
    }
    return <h1 onClick={this.handleClick}>{this.state.counter}</h1>;
  }
}

function App() {
  return (
    <div>
      <p>
        <b>
          Click on the numbers to increase the counters.
          <br />
          The counter is programmed to throw an error when it reaches 5. This simulates a JavaScript error in a component.
        </b>
      </p>
      <hr />
        <ErrorBoundary>
          <Counter />
        </ErrorBoundary>
        <ErrorBoundary>
          <Counter />
        </ErrorBoundary>
      <hr />
    </div>
  );
}

export default App;
