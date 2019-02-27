import React from 'react';
import styled from 'styled-components';
import { Auth } from 'aws-amplify';
import TopNav from 'rcl/Navigation/TopNav';
import Footer from 'rcl/UIElements/Footer';

const ContentContainer = styled.div`
  min-height: calc(100vh - 292px);
`;

const Wrapper = styled.div`
  min-height: 100%;
`;

/* eslint-disable react/prefer-stateless-function */
export default class AppWrapper extends React.PureComponent {
  signOut = async e => {
    e.preventDefault();
    Auth.signOut()
      .then(() => {
        localStorage.isAuthenticated = false;
        window.location = '/';
      })
      .catch(err => console.log(err));
  };
  render() {
    return (
      <Wrapper>
        <TopNav
          onLogout={this.signOut}
          showLogo={this.props.showLogo}
        />
        <ContentContainer>{this.props.children}</ContentContainer>
        <Footer />
      </Wrapper>
    );
  }
}
