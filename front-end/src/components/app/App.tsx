import * as React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { RootState } from '@App/store/reducers';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { BrowserRouter as Router, Route, Switch, RouteComponentProps } from 'react-router-dom';

import Title from '@App/components/Title';
import Logo from '@App/components/Logo';

import Home from '@App/components/pages/home/Home';
import View from '@App/components/pages/view/View';

const LogoUrl = require('../../assets/images/logo-birdie.svg');
const api = 'http://localhost:8000';

interface AppProps {

}

interface AppState {
  recipientId: string;
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
      recipientId: ''
    };
    this.updateRecipientId = this.updateRecipientId.bind(this);
  }

  public updateRecipientId = (id: string): void => {
    this.setState({
      recipientId: id
    });
  }

  public render(): JSX.Element {
    return (
      <>
        <GlobalStyle />
        <AppContainer>
          <Logo src={LogoUrl} />
          <Title>Welcome to birdie</Title>
          <Router>
            <Switch>
              <Route 
                exact={true} 
                path="/"
                component={(props: RouteComponentProps) => <Home 
                  api={api}
                  updateRecipientId={this.updateRecipientId}
                  recipientId={this.state.recipientId}
                  {...props} 
                />} 
              />
              <Route 
                exact={true} 
                path="/view/:id/:type" 
                component={(props: RouteComponentProps) => <View
                  api={api} 
                  {...props} 
                />} 
              />
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