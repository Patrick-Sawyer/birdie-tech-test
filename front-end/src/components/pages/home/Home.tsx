import * as React from 'react';
import axios, { AxiosResponse } from 'axios';
import ObservationLink from '@App/components/observationLink/ObservationLink';
import './home.css';
import SubTitle from '@App/components/SubTitle';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

interface Props {
    api: string;
    recipientId: string;
    updateRecipientId: Function;
}

interface State {
    observationTypes?: Count | null;
    errorLoading: boolean;
    recipients: string[];
    currentRecipient: string;
}

interface Count { 
    [key: string]: number; 
}

interface DropdownData {
    value: string;
}

class Home extends React.Component<Props, State> {
    public constructor(props: Props) {
        super(props);
        this.state = {
            observationTypes: null,
            errorLoading: false,
            recipients: [],
            currentRecipient: this.props.recipientId
        };
    }

    public componentDidMount = (): void => {
        this.getRecipients();
    }

    public render = (): JSX.Element => {
        return (
            <div className="home-page">
                <SubTitle>{this.subtitle()}</SubTitle>
                <div className="border" />
                <div className="dropdown">
                    <div className="dropdown-inner">
                        <Dropdown 
                            options={this.state.recipients} 
                            value={this.state.currentRecipient} 
                            placeholder="Select a care recipient"
                            onChange={this.getObservationCounts}

                        />
                    </div>
                </div>
                {this.renderData()}
            </div>
        );
    }

    private subtitle = (): string => {
        return this.state.currentRecipient ? 'Click a category' : 'Select a care recipient';
    }

    private getRecipients = (): void => {
        axios
        .get<Count>(this.props.api + '/recipients')
        .then((response: AxiosResponse) => {
          this.setState({
            recipients: response.data
          });
        })
        .catch((err) => {
          this.setState({
              errorLoading: true
          });
        });
    }

    private getObservationCounts = (recipientId: DropdownData): void => {
        // this.props.updateRecipientId(recipientId.value);
        this.setState(
        { 
            observationTypes: {}
        }, 
        () => {
            axios
            .get<Count>(this.props.api + '/observations?recipient=' + recipientId.value + '&count=true')
            .then((response: AxiosResponse) => {
              this.setState({
                  observationTypes: response.data,
                  currentRecipient: recipientId.value
              });
            })
            .catch((err) => {
              this.setState({
                  errorLoading: true
              });
            });
        });
    }
    
    private renderData = (): JSX.Element[] | string | null => {
        if (this.state.observationTypes) {
            let array = [];
            for (let [key, value] of Object.entries(this.state.observationTypes)) {
            array.push(
                    (
                        <ObservationLink 
                            key={key} 
                            id={this.state.currentRecipient} 
                            observationType={key} 
                            count={value} 
                        />
                    )
                );
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