import React from "react";

import Leaderboard from "./Leaderboard";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      loading: false,
      opponent: null,
      isWinner: null,
      socketID: null,
    };

  }

  componentWillMount() {
    this.props.socket.on(
      "foo",
      function (data) {
        console.log(data);
        this.setState({ loading: data.loading, socketID: data.id }, function () {
          if (this.state.name !== null && !this.state.loading) {
            this.props.login(true);
            this.props.setOpponent(data.opponent);
            this.props.getStart(data.start);
          }
        });
      }.bind(this)
    );

    this.props.socket.on(
        "winner",
        function(data){
            console.log(data);
            this.setState({isWinner: data.isWinner})
        }.bind(this));
  }

  handleChange = (events) => {
    this.setState({ name: events.target.value });
  };

  onJoin = () => {
    console.log(this.state.name);
    this.props.socket.emit("join", { player: this.state.name });
    this.props.assignName(this.state.name);
  };

  render() {
    return (
      <div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "50px", marginTop: "300px" }}>
            <label htmlFor="username">Create Username: </label>
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
