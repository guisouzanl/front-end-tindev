import React, { Component } from "react";
import logo from "../../assets/logo.svg";
import { LoginForm, Container } from "./styles";
import api from "../../services/api";

class Login extends Component {
  state = {
    username: ""
  };

  handleChange = e => {
    this.setState({
      username: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { history } = this.props;

    const { username } = this.state;

    const response = await api.post("/devs", {
      username
    });

    const { _id } = response.data;

    console.log(response.data);

    history.push(`/dev/${_id}`);
  };

  render() {
    return (
      <Container>
        <LoginForm onSubmit={this.handleSubmit}>
          <img src={logo} alt="" />
          <input
            type="text"
            placeholder="Digite seu usuário do GitHub"
            onChange={this.handleChange}
          />
          <button type="submit">Entrar</button>
        </LoginForm>
      </Container>
    );
  }
}

export default Login;
