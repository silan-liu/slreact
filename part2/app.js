import SLReact from "slreact.js";

const stories = [
  { name: "Didact introduction", url: "http://bit.ly/2pX7HNn" },
  { name: "Rendering DOM elements ", url: "http://bit.ly/2qCOejH" },
  { name: "Element creation and JSX", url: "http://bit.ly/2qGbw8S" },
  { name: "Instances and reconciliation", url: "http://bit.ly/2q4A746" },
  { name: "Components and state", url: "http://bit.ly/2rE16nh" },
];

/** @jsx SLReact.createElement */
const appElement = (
  <div>
    <ul>{stories.map(storyElement)}</ul>
  </div>
);

// 生成 element 结构
function storyElement({ name, url }) {
  const likes = Math.ceil(Math.random() * 100);

  /** @jsx SLReact.createElement */
  return (
    <li>
      <button>{likes}🐶</button>
      <a href={url}>{name}</a>
    </li>
  );
}

SLReact.render(appElement, document.getElementById("root"));
