let currentHTMLElement = null;
let rootComponent = null;

export const createElement = (type, props, ...children) => {
  if (typeof type === 'function') {
    if (!rootComponent) rootComponent = type;
    return type({...props, children});
  }

  return Object.freeze({type, props: {...props, children}});
};


export const mount = (container, element) => {
  if (['number', 'string'].includes(typeof element)) {
    container.appendChild(document.createTextNode(element));
    return;
  }
  const actualElement = document.createElement(element.type);

  if (element.props) {
    Object.keys(element.props).filter(isChildren).forEach((prop) => {
      const attribute = fromPropToAttribute(prop);

      actualElement[attribute] = element.props[prop];
    });
  }

  if (element.props && element.props.children) {
    element.props.children.forEach((child) => mount(actualElement, child));
  }

  container.appendChild(actualElement);

  currentHTMLElement = container;
};

const isChildren = (p) => p !== 'children';
const fromPropToAttribute = (prop) => {
  if (prop === 'className') return prop
  return prop.toLowerCase()
}


const states = [];
let stateIndex = 0;

export const useState = (initialValue) => {
  const STATE_POINTER = stateIndex;

  states[STATE_POINTER] = states[STATE_POINTER] || initialValue;

  const setState = (nextValue) => {
    states[STATE_POINTER] = nextValue;
    hydrate();
  };

  stateIndex += 1;

  return [states[STATE_POINTER], setState];
};


const hydrate = () => {
  stateIndex = 0;
  currentHTMLElement.firstChild.remove();

  mount(currentHTMLElement, rootComponent());
};

export default Object.freeze({
  createElement,
  useState,
  mount,
});
