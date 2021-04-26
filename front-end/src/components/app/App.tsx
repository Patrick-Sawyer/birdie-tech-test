import * as React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { RootState } from '@App/store/reducers';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Title from '@App/components/Title';
import Logo from '@App/components/Logo';
import SubTitle from '@App/components/SubTitle';

const LogoUrl = require('../../assets/images/logo-birdie.svg');

import fetch from 'node-fetch';

interface AppProps {

}

interface AppState {
  careRecipientId: string;
  data?: Array<JSON>;
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
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

class App extends React.Component<AppProps, AppState> {
  public constructor(props: AppProps) {
    super(props);
    this.state = {
      careRecipientId: 'df50cac5-293c-490d-a06c-ee26796f850d'
    };
  }


  toJson = (response: Response):PromiseLike<object> => (
    response.json()
  );

  getRecipientData = (recipient: string): Promise<object> => {
    return fetch('http://localhost:8000/observations/recipient?recipient=' + recipient)
      .then(this.toJson)
      .then((data: Array<JSON>) => {
        this.setState({
          data: data
        })
      })
  };

  componentDidMount = () : void => {
    this.getRecipientData(this.state.careRecipientId);
  }

  public render() {
    return (
      <>
        <GlobalStyle />
        <AppContainer>
          <Logo src={LogoUrl} />
          <Title>Welcome to the birdie test</Title>
          <SubTitle>Best of luck!</SubTitle>
        </AppContainer>
      </>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: object) => {};

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => {};

export default connect(mapStateToProps, mapDispatchToProps)(App);