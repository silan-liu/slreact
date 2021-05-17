import SLReact from "./slreact.js";

function ramdomLikes() {
  return Math.ceil(Math.random() * 100);
}

const stories = [
  {
    name: "part1",
    url: "http://bit.ly/2pX7HNn",
  },
  {
    name: "part2",
    url: "http://bit.ly/2qCOejH",
  },
  {
    name: "part3",
    url: "http://bit.ly/2qGbw8S",
  },
  {
    name: "part4",
    url: "http://bit.ly/2q4A746",
  },
  {
    name: "part5",
    url: "http://bit.ly/2rE16nh",
  },
];

class App extends SLReact.Component {
  constructor(props) {
    super(props);
    const { stories } = props;

    this.state = { stories };
  }

  componentDidMount() {
    super.componentDidMount();
    console.log("App componentDidMount");

    // test componentDidUnMount
    // setTimeout(() => {
    //   this.setState({ stories: [] });
    // }, 1000);
  }

  componentWillMount() {
    super.componentWillMount();
    console.log("App componentWillMount");
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.stories.map((story) => {
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
