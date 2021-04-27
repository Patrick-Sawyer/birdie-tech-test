import * as React from 'react';
import axios, { AxiosResponse } from 'axios';
import ObservationLink from '@App/components/observationLink/ObservationLink';
import './home.css';
import SubTitle from '@App/components/SubTitle';

interface Props {
    api: string;
    id: string;
}

interface State {
    observationTypes?: Count | null;
    errorLoading: boolean;
}

interface Count { 
    [key: string]: number; 
}

class Home extends React.Component<Props, State> {
    public constructor(props: Props) {
        super(props);
        this.state = {
            observationTypes: null,
            errorLoading: false
        };
    }

    public componentDidMount = (): void => {
        this.getObservationCounts();
    }

    public render = () => {
        return (
            <div className="home-page">
                <SubTitle>Click a category</SubTitle>
                <div className="border" />
                {this.renderData()}
            </div>
        );
    }

    private getObservationCounts = (): void => {
        axios
        .get<Count>(this.props.api + '/observations?recipient=' + this.props.id + '&count=true')
        .then((response: AxiosResponse) => {
          this.setState({
            observationTypes: response.data
          });
        })
        .catch((err) => {
          this.setState({
              errorLoading: true
          });
        });
    }
    
    private renderData = (): JSX.Element[] | string | null => {
        if (this.state.observationTypes) {
            let array = [];
            for (let [key, value] of Object.entries(this.state.observationTypes)) {
            array.push(<ObservationLink observationType={key} count={value} />);
            }
            return array;
        } else if (this.state.errorLoading) {
            return 'Error loading data';
        } else {
            return null;
        }
    }
}

export default Home;