import React, { Component } from "react";
import ArticleApp from "./article";

export default function App() {
  class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        items: [],
        isLoaded: false
      };
    }

    componentDidMount() {
      fetch("https://rockstardata-e28c.restdb.io/rest/danskespil", {
        method: "get",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "x-apikey": "5cf21329102f585b7c8536c9",
          "cache-control": "no-cache"
        }
      })
        .then(res => res.json())
        .then(json => {
          this.setState({
            isLoaded: true,
            items: json
          });
        });
    }

    render() {
      let { isLoaded, items } = this.state;

      if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
          <div className="App">
            {items.map(item => (
              <ArticleApp {...item} />
            ))}
          </div>
        );
      }
    }
  }

  return (
    <div id="App">
      <header>Header</header>
      <App />
      <footer>Footer</footer>
    </div>
  );
}
