function importFromBlow() {
  function render(element, parentDom) {
    const { type, props } = element;

    // create dom element
    const isTextElement = type === "text";
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

    // set property
    const isAttribute = (name) => !isListener(name) && name != "children";
    Object.keys(props)
      .filter(isAttribute)
      .forEach((name) => {
        dom[name] = props[name];
      });

    const childElements = props.children || [];
    childElements.forEach((child) => render(child, dom));

    parentDom.appendChild(dom);
  }

  return { render };
}

const SLReact = importFromBlow();

const stories = [
  { name: "part1", url: "http://bit.ly/2pX7HNn" },
  { name: "part2", url: "http://bit.ly/2qCOejH" },
  { name: "part3", url: "http://bit.ly/2qGbw8S" },
  { name: "part4", url: "http://bit.ly/2q4A746" },
  { name: "part5", url: "http://bit.ly/2rE16nh" },
];

const appElement = {
  type: "div",
  props: {
    children: [
      {
        type: "ul",
        props: {
          children: stories.map(storyElement),
        },
      },
    ],
  },
};

// 生成 element 结构
function storyElement({ name, url }) {
  const likes = Math.ceil(Math.random() * 100);
  const buttonElement = {
    type: "button",
    props: {
      children: [
        { type: "text", props: { nodeValue: likes } },
        { type: "text", props: { nodeValue: " 🐶" } },
      ],
    },
  };

  const linkElement = {
    type: "a",
    props: {
      href: url,
      children: [{ type: "text", props: { nodeValue: name } }],
    },
  };

  return {
    type: "li",
    props: {
      children: [buttonElement, linkElement],
    },
  };
}

SLReact.render(appElement, document.getElementById("root"));
