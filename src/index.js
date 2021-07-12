import Craftact, { useState } from './lib';

/**
 * My first non-react React component
 */
const SplendidApplication = () => {
  const [name, setName] = useState('Antonio');
  const [counter, setCounter] = useState(0);


  return (
    <div className="my-app">
      <HelloThing name={name} />
      <div className="form">
        <input type="text" value={name} onchange={(e) => setName(e.target.value)} />
      </div>
      <p>Counter: {counter}</p>
      <button onclick={() => setCounter(counter + 1)}>+</button>
      <button onclick={() => setCounter(counter - 1)}>-</button>
    </div>
  );
};


const HelloThing = ({ name }) => <h1>Hello, {name}</h1>;

Craftact.mount(window.appRoot, <SplendidApplication />);
