import Craftact, { useState } from './lib';

/**
 * My first non-react React component
 */
const MySplendidApp = () => {
  const [name, setName] = useState('Antonio');
  const [count, setCount] = useState(0);

  return (
    <div className="my-splendid-application">
      <h1>Hello {name}!</h1>
      <input type="text" placeholder="Hello" value={name} onchange={(e) => setName(e.target.value)} />
      <p>This is a React application, lorem ipsum dolor sit amet...</p>
      <hr />
      <p>Count: {count}</p>
      <button onclick={() => setCount(count + 1)}>add 1</button>
      <button onclick={() => setCount(count - 1)}>subtract 1</button>
    </div>
  );
};

Craftact.mount(window.appRoot, <MySplendidApp />);
