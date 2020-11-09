const states = []; // the states array
let stateCursor = 0; // the states cursor
let rootComponent = null; // the root component, the first one to be executed
let mainContainer = null; // the container where the app mounts

/**
 * Creates a Cratfact virtual DOM element
 */
const createElement = (type, props, ...children) => {
  if (typeof type === 'function') {
    if (!rootComponent) rootComponent = type; // register the first component as the root of the app
    return type({ ...props, children });
  }

  return { type, props: { ...props, children } };
};

/**
 * Convert a virtual DOM element into actual DOM elements
 */
const mount = (container, craftactEl) => {
  if (['number', 'string'].includes(typeof craftactEl)) {
    container.appendChild(document.createTextNode(craftactEl));
    return;
  }

  const actualDOMEl = document.createElement(craftactEl.type);

  // for each element apply attributes
  if (craftactEl.props) {
    Object.keys(craftactEl.props).filter((p) => p !== 'children').forEach((p) => actualDOMEl[p] = craftactEl.props[p]);
  }

  // for each children element apply attributes
  if (craftactEl.props && craftactEl.props.children) {
    craftactEl.props.children.forEach((child) => mount(actualDOMEl, child));
  }

  container.appendChild(actualDOMEl);

  mainContainer = container;
};

/**
 * Re-renders the application
 */
const hydrate = () => {
  stateCursor = 0;
  mainContainer.firstChild.remove();
  mount(mainContainer, rootComponent());
};

/**
 * useState hooks
 */
export const useState = (initialState) => {
  const CURRENT_CURSOR = stateCursor;
  states[CURRENT_CURSOR] = states[CURRENT_CURSOR] || initialState;

  const setState = (nextState) => {
    states[CURRENT_CURSOR] = nextState;
    hydrate();
  };

  stateCursor += 1;

  return [states[CURRENT_CURSOR], setState];
};


export default Object.freeze({
  createElement,
  mount,
  useState,
});
