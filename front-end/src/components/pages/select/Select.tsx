import * as React from 'react';
import { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';

import SubTitle from '@App/components/SubTitle'; 

import './select.css';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

interface Props {
    api: string;
}

interface DropdownValue {
    value: string;
}

const Select: React.FC<Props> = (props: Props): ReactElement => {

    const history = useHistory();
    const [ recipients, setRecipients ] = React.useState<string[]>([]);

    React.useEffect(
        () => {
            const source = axios.CancelToken.source();
            axios
            .get<string[]>(
                props.api + '/recipients',
                { cancelToken: source.token }
            )
            .then((response: AxiosResponse) => {
                setRecipients(response.data);
            })
            .catch((err) => {
                setRecipients([]);
            });
            return () => {
                source.cancel('Component got unmounted');
            };
        }, 
        []
    );

    const selectRecipient = (recipient: DropdownValue): void => {
        history.push('/recipient/' + recipient.value);
    };
    
    return (
        <div className="dropdown">
            <SubTitle>Choose recipient ID</SubTitle>
            <div className="border" />
            <div className="dropdown-inner">
                <Dropdown 
                    options={recipients} 
                    placeholder="Select a care recipient"
                    onChange={selectRecipient}    
                />
            </div>
        </div>
    );
};

export default Select;