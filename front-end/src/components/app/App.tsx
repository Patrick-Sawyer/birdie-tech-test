import * as React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { RootState } from '@App/store/reducers';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Title from '@App/components/Title';
import Logo from '@App/components/Logo';
import SubTitle from '@App/components/SubTitle';
import axios, { AxiosResponse } from 'axios';

const LogoUrl = require('../../assets/images/logo-birdie.svg');

const api = 'http://localhost:8000';

interface AppProps {

}

interface Count { 
  [key: string]: number; 
}

interface AppState {
  careRecipientId: string;
  fetchedData?: Count | null;
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
      careRecipientId: 'df50cac5-293c-490d-a06c-ee26796f850d',
      fetchedData: null
    };
  }

  public componentDidMount = () => {
    this.getObservationCounts();
  }

  public render() {
    return (
      <>
        <GlobalStyle />
        <AppContainer>
          <Logo src={LogoUrl} />
          <Title>Welcome to the birdie test</Title>
          <SubTitle>Best of luck!</SubTitle>
          {this.renderData()}
        </AppContainer>
      </>
    );
  }

  private getObservationCounts = () => {
    axios
    .get<Count>(api + '/observations?recipient=' + this.state.careRecipientId + '&count=true')
    .then((response: AxiosResponse) => {
      this.setState({
        fetchedData: response.data
      });
    });
  }

  private renderData = () => {
    if (this.state.fetchedData) {
      return JSON.stringify(this.state.fetchedData);
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state: RootState, ownProps: object) => {};

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => {};

export default connect(mapStateToProps, mapDispatchToProps)(App);