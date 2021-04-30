const TEXT_ELEMENT = "text";

class Component {
  constructor(props) {
    this.props = props;
    this.state = this.state || {};
  }

  setState(state) {
    this.state = Object.assign({}, this.state, state);

    updateInstance(this.__internalInstance);
  }
}

// 创建组件对象，内部关联 dom 实例
function createPublicInstance(element, internalInstance) {
  const { type, props } = element;
  const publicInstance = new type(props);
  publicInstance.__internalInstance = internalInstance;
  return publicInstance;
}

function updateInstance(internalInstance) {
  const parentDom = internalInstance.dom.parentNode;
  const element = internalInstance.element;

  reconcile(parentDom, internalInstance, element);
}

let rootInstance = null;
function render(element, parentDom) {
  const prevInstance = rootInstance;
  const nextInstance = reconcile(parentDom, prevInstance, element);
  rootInstance = nextInstance;
}

// dom 更新操作
function reconcile(parentDom, instance, element) {
  if (instance == null) {
    const newInstance = instantitate(element);
    console.log("create dom ", parentDom, newInstance.dom);
    parentDom.appendChild(newInstance.dom);

    return newInstance;
  } else if (element == null) {
    console.log("remove dom");
    // remove，若新子节点数 < 原节点数，需移除
    parentDom.removeChild(instance.dom);

    return null;
  } else if (instance.element.type != element.type) {
    console.log("replace dom");

    // 替换原节点
    const newInstance = instantitate(element);
    parentDom.replaceChild(newInstance.dom, instance.dom);

    return newInstance;
  } else if (typeof element.type === "string") {
    console.log("reuse dom");

    // 重用节点，更新属性
    updateDomProperties(instance.dom, instance.element.props, element.props);
    instance.childInstances = reconcileChildren(instance, element);
    instance.element = element;

    return instance;
  } else {
    console.log("update component");

    // component
    // 更新 props
    instance.publicInstance.props = element.props;

    // 重新构建节点信息
    const childElement = instance.publicInstance.render();
    const oldChildInstance = instance.childInstance;

    // 更新 dom 节点
    const childInstance = reconcile(parentDom, oldChildInstance, childElement);

    instance.childInstance = childInstance;
    instance.dom = childInstance.dom;
    instance.element = element;

    return instance;
  }
}

// 对子节点做处理
function reconcileChildren(instance, element) {
  const dom = instance.dom;
  const childInstances = instance.childInstances;
  const nextChildElements = element.props.children || [];

  const newChildInstances = [];

  // 取最大的，若新子节点数 < 原节点数，需移除
  const count = Math.max(childInstances.length, nextChildElements.length);
  for (let i = 0; i < count; i++) {
    const childInstance = childInstances[i];
    const childElement = nextChildElements[i];

    const newChildInstance = reconcile(dom, childInstance, childElement);
    newChildInstances.push(newChildInstance);
  }

  return newChildInstances;
}

// virtual dom，保存真实的 dom，element，childInstance
function instantitate(element) {
  console.log("instantitate", element);
  const { type, props } = element;

  // 如果 type 是字符串，则表明非组件
  const isDomElement = typeof type === "string";

  if (isDomElement) {
    const isTextElement = type === TEXT_ELEMENT;
    const dom = isTextElement
      ? document.createTextNode("")
      : document.createElement(type);

    // 更新属性
    updateDomProperties(dom, [], props);

    // 处理子节点
    const childElements = props.children || [];
    const childInstances = childElements.map(instantitate);
    const childDoms = childInstances.map((childInstance) => childInstance.dom);

    childDoms.forEach((childDom) => dom.appendChild(childDom));

    const instance = { dom, element, childInstances };

    return instance;
  } else {
    const instance = {};
    const publicInstance = createPublicInstance(element, instance);

    // 调用组件的 render 方法，返回节点
    const childElement = publicInstance.render();

    // 调用 instantiate 创建 dom & virual dom，因为 render 方法只能返回一个节点
    const childInstance = instantitate(childElement);

    const dom = childInstance.dom;

    Object.assign(instance, {
      dom,
      element,
      childInstance,
      publicInstance,
    });

    return instance;
  }
}

// 更新 dom 属性
function updateDomProperties(dom, prevProps, nextProps) {
  const isEvent = (name) => name.startsWith("on");
  const isAttribute = (name) => !isEvent(name) && name !== "children";

  // remove listener
  Object.keys(prevProps)
    .filter(isEvent)
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.removeEventListener(eventType, prevProps[name]);
    });

  // remove attributes
  Object.keys(prevProps)
    .filter(isAttribute)
    .forEach((name) => {
      dom[name] = null;
    });

  // set attributes
  Object.keys(nextProps)
    .filter(isAttribute)
    .forEach((name) => {
      dom[name] = nextProps[name];
    });

  // add listener
  Object.keys(nextProps)
    .filter(isEvent)
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, nextProps[name]);
    });
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
  Component,
};

export default SLReact;
