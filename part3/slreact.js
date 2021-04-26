const TEXT_ELEMENT = "text";

let rootInstance = null;
function render(element, parentDom) {
  const prevInstance = rootInstance;
  const nextInstance = reconcile(parentDom, prevInstance, element);
  rootInstance = nextInstance;
}

function reconcile(parentDom, instance, element) {}

function instantitate(element) {}

function render(element, parentDom) {
  const { type, props } = element;

  // create dom element
  const isTextElement = type === TEXT_ELEMENT;
  const dom = isTextElement
    ? document.createTextNode("")
    : document.createElement(type);

  // listener
  const isListener = (name) => name.startsWith("on");
  Object.keys(props)
    .filter(isListener)
    .forEach((name) => {
      const eventType = name.toLocaleLowerCase().substring(2);
      dom.addEventListener(eventType, props[name]);
    });

  // property
  const isAttribute = (name) => !isListener(name) && name != "children";
  Object.keys(props)
    .filter(isAttribute)
    .forEach((name) => {
      dom[name] = props[name];
    });

  const childElements = props.children || [];
  childElements.forEach((child) => render(child, dom));

  if (!parentDom.lastChild) {
    parentDom.appendChild(dom);
  } else {
    parentDom.replaceChild(dom, parentDom.lastChild);
  }
}

// jsx 经 babel 转换后，会变成调用 createElement 的形式
function createElement(type, config, ...args) {
  let props = Object.assign({}, config);
  const hasChildren = args.length > 0;
  const rawChildren = hasChildren ? [].concat(...args) : [];

  // 过滤空子节点，并将文本特殊处理
  props.children = rawChildren
    .filter((c) => {
      const result = c != null && c != false;
      if (result) {
        return c;
      }
    })
    .map((c) => {
      let result = c instanceof Object ? c : createTextElement(c);

      return result;
    });

  return { type, props };
}

function createTextElement(value) {
  return createElement(TEXT_ELEMENT, { nodeValue: value });
}

const SLReact = {
  render,
  createElement,
};

export default SLReact;
