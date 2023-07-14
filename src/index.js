import React, { useState } from './lib';

/**
 * My first non-react React component
 */
const SplendidApplication = () => {
  const [name, setName] = useState('MoonPay');
  const [counter, setCounter] = useState(0);

  return (
    <div className="splendid-app">
      <Greeting name={name} />
      <div className="form">
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <Counter value={counter} />
      </div>
      <footer>
        <button onClick={() => setCounter(counter + 1)}>add (+)</button>
        <button onClick={() => setCounter(counter - 1)}>sub (-)</button>
      </footer>
    </div>
  );
};

const Greeting = ({name}) => <h1>Hello, {name}</h1>;

const Counter = ({value}) => (
  <div className="counter">
    <label>Counter: {value}</label>
  </div>
)

React.mount(window.appRoot, <SplendidApplication />);
