import SLReact from "./slreact.js";

function ramdomLikes() {
  return Math.ceil(Math.random() * 100);
}

const stories = [
  {
    name: "Didact introduction",
    url: "http://bit.ly/2pX7HNn",
  },
  {
    name: "Rendering DOM elements ",
    url: "http://bit.ly/2qCOejH",
  },
  {
    name: "Element creation and JSX",
    url: "http://bit.ly/2qGbw8S",
  },
  {
    name: "Instances and reconciliation",
    url: "http://bit.ly/2q4A746",
  },
  {
    name: "Components and state",
    url: "http://bit.ly/2rE16nh",
  },
];

class App extends SLReact.Component {
  render() {
    return (
      <div>
        <ul>
          {this.props.stories.map((story) => {
            return <Story name={story.name} url={story.url} />;
          })}
        </ul>
      </div>
    );
  }
}

class Story extends SLReact.Component {
  constructor(props) {
    super(props);

    this.state = {
      likes: ramdomLikes(),
    };
  }

  handleClick() {
    this.setState({
      likes: this.state.likes + 1,
    });
  }

  render() {
    const { name, url } = this.props;
    const { likes } = this.state;

    return (
      <li>
        <button onClick={(e) => this.handleClick()}>{likes}🐶</button>
        <a href={url}>{name}</a>
      </li>
    );
  }
}

SLReact.render(<App stories={stories} />, document.getElementById("root"));
