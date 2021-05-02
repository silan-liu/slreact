import SLReact from "./slreact.js";

const stories = [
  { name: "part1", url: "http://bit.ly/2pX7HNn" },
  { name: "part2", url: "http://bit.ly/2qCOejH" },
  { name: "part3", url: "http://bit.ly/2qGbw8S" },
  { name: "part4", url: "http://bit.ly/2q4A746" },
  { name: "part5", url: "http://bit.ly/2rE16nh" },
];

const appElement = (
  <div>
    <ul>{stories.map(storyElement)}</ul>
  </div>
);

// 生成 element 结构
function storyElement({ name, url }) {
  const likes = Math.ceil(Math.random() * 100);

  return (
    <li>
      <button>{likes}🐶</button>
      <a href={url}>{name}</a>
    </li>
  );
}

SLReact.render(appElement, document.getElementById("root"));
