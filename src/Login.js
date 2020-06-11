import React from "react";
import io from "socket.io-client";
import Leaderboard from "./Leaderboard";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      loading: false,
      opponent: null,
    };

    this.socket = io.connect("http://localhost:5000/");
  }

  componentWillMount() {
    this.socket.on(
      "foo",
      function (data) {
        console.log(data);
        this.setState({ loading: data.loading }, function () {
          if (this.state.name !== null && !this.state.loading) {
            this.props.login(true);
            this.props.setOpponent(data.opponent);
            this.props.getStart(data.start);
            
          }
        });
      }.bind(this)
    );
  }

  handleChange = (events) => {
    this.setState({ name: events.target.value });
  };

  onJoin = () => {
    console.log(this.state.name);
    this.socket.emit("join", { player: this.state.name });
  };

  render() {
    return (
      <div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "50px", marginTop: "300px" }}>
            <label for="username">Create Username: </label>
            <input
              style={{ fontSize: "50px", borderRadius: "15px", margin: "20px" }}
              id="username"
              name="username"
              placeholder="johndoe235"
              onChange={this.handleChange}
            />
            <button
              style={{ fontSize: "50px", borderRadius: "15px" }}
              onClick={this.onJoin}
            >
              Join
            </button>
          </div>

          {this.state.loading ? <p>loading</p> : null}
        </div>
        <div>
          <Leaderboard />
        </div>
      </div>
    );
  }
}

export default Login;
