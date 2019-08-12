import React, { Component } from "react";
import io from "socket.io-client";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import dislike from "../../assets/dislike.svg";
import like from "../../assets/like.svg";
import api from "../../services/api";
import itsamatch from "../../assets/itsamatch.png";
import {
  Container,
  UserList,
  User,
  Buttons,
  Empty,
  Loading,
  MatchContainer,
  MatchAvatar
} from "./styles";

class Main extends Component {
  state = {
    users: [],
    loading: true,
    matchDev: null
  };

  async componentDidMount() {
    const { match } = this.props;

    const response = await api.get("/devs", {
      headers: {
        user: match.params.id
      }
    });

    this.setState({
      users: [...response.data],
      loading: false
    });

    const socket = io("http://localhost:3333", {
      query: { user: match.params.id }
    });

    socket.on("match", dev => {
      this.setState({
        matchDev: dev
      });
    });
  }

  handleLike = async e => {
    const { match } = this.props;
    const { users } = this.state;

    await api.post(`/devs/${e}/likes`, null, {
      headers: {
        user: match.params.id
      }
    });

    const newUsers = users.filter(user => user._id !== e);

    this.setState({
      users: [...newUsers]
    });
  };

  handleDislike = async e => {
    const { match } = this.props;
    const { users } = this.state;

    await api.post(`/devs/${e}/dislikes`, null, {
      headers: {
        user: match.params.id
      }
    });

    const newUsers = users.filter(user => user._id !== e);

    this.setState({
      users: [...newUsers]
    });
  };

  setMatchDev = e => {
    this.setState({
      matchDev: e
    });
  };

  render() {
    const { users, loading, matchDev } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <Link to="/">
          <img src={logo} alt="Tindev" />
        </Link>
        {users.length > 0 ? (
          <UserList>
            {users.map(user => (
              <User key={user._id}>
                <img src={user.avatar} alt={user.name} />
                <footer>
                  <strong>{user.name}</strong>
                  <p>{user.bio}</p>
                </footer>
                <Buttons>
                  <button
                    type="button"
                    onClick={() => this.handleLike(user._id)}
                  >
                    <img src={like} alt="Like" />
                  </button>
                  <button
                    type="button"
                    onClick={() => this.handleDislike(user._id)}
                  >
                    <img src={dislike} alt="Dislike" />
                  </button>
                </Buttons>
              </User>
            ))}
          </UserList>
        ) : (
          <Empty>Acabou :(</Empty>
        )}
        {matchDev && (
          <MatchContainer>
            <img src={itsamatch} alt="textMatch" />
            <MatchAvatar src={matchDev.avatar} />
            <strong>{matchDev.name}</strong>
            <p>{matchDev.bio}</p>
            <button type="button" onClick={() => this.setMatchDev(null)}>
              Fechar
            </button>
          </MatchContainer>
        )}
      </Container>
    );
  }
}

export default Main;
