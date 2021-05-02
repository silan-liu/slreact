import SLReact from "./slreact.js";

// const rootDom = document.getElementById("root");

// function tick() {
//   const time = new Date().toLocaleString();
//   const clockElement = <h1>{time}</h1>;
//   SLReact.render(clockElement, rootDom);
// }

// tick();
// setInterval(tick, 1000);

function ramdomLikes() {
  return Math.ceil(Math.random() * 100);
}

const stories = [
  {
    name: "part1",
    url: "http://bit.ly/2pX7HNn",
    likes: ramdomLikes(),
  },
  {
    name: "part2",
    url: "http://bit.ly/2qCOejH",
    likes: ramdomLikes(),
  },
  {
    name: "part3",
    url: "http://bit.ly/2qGbw8S",
    likes: ramdomLikes(),
  },
  {
    name: "part4",
    url: "http://bit.ly/2q4A746",
    likes: ramdomLikes(),
  },
  {
    name: "part5",
    url: "http://bit.ly/2rE16nh",
    likes: ramdomLikes(),
  },
];

// 需定义为函数，多次调用一样的结果
const appElement = () => (
  <div>
    <ul>{stories.map(storyElement)}</ul>
  </div>
);

// 生成 element 结构
function storyElement(story) {
  return (
    <li>
      <button onClick={(e) => handleClick(story)}>{story.likes}🐶</button>
      <a href={story.url}>{story.name}</a>
    </li>
  );
}

function handleClick(story) {
  story.likes += 1;
  SLReact.render(appElement(), document.getElementById("root"));
}

SLReact.render(appElement(), document.getElementById("root"));
