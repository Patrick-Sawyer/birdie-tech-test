import * as React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { RootState } from '@App/store/reducers';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Title from '@App/components/Title';
import Logo from '@App/components/Logo';

import Home from '@App/components/pages/home/Home';

const LogoUrl = require('../../assets/images/logo-birdie.svg');
const api = 'http://localhost:8000';

interface AppProps {

}

interface AppState {
  careRecipientId: string;
}

const GlobalStyle = createGlobalStyle`
  body {
    height: 100vh;
    background-color: #F9F9F9;
    > div {
      height: 100%;
    }
  }
`;

const AppContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
`;

class App extends React.Component<AppProps, AppState> {
  public constructor(props: AppProps) {
    super(props);
    this.state = {
      careRecipientId: 'df50cac5-293c-490d-a06c-ee26796f850d'
    };
  }

  public render() {
    return (
      <>
        <GlobalStyle />
        <AppContainer>
          <Logo src={LogoUrl} />
          <Title>Welcome to birdie</Title>
          <Router>
            <Switch>
              <Route path="/">
                <Home careRecipientId={this.state.careRecipientId} api={api}/>
              </Route>
            </Switch>
          </Router>
        </AppContainer>
      </>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: object) => {};

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => {};

export default connect(mapStateToProps, mapDispatchToProps)(App);