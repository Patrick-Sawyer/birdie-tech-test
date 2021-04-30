import * as React from 'react';
import { ReactElement } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import ObservationLink from '@App/components/observationLink/ObservationLink';
import SubTitle from '@App/components/SubTitle'; 

import './recipient.css';

interface Props {
    api: string;
}

interface ParamTypes {
    id: string;
}

interface Count { 
    [key: string]: number; 
}

const Select: React.FC<Props> = (props: Props): ReactElement => {

    const { id } = useParams<ParamTypes>();
    const history = useHistory();
    const [ types , setTypes ] = React.useState<Count>({});

    React.useEffect(
        () => {
            const source = axios.CancelToken.source();
            axios
            .get<Count>(
                props.api + '/observations?recipient=' + id + '&count=true',
                { cancelToken: source.token }
            )
            .then((response: AxiosResponse) => {
                setTypes(response.data);
            })
            .catch((err) => {
                setTypes({});
            });
            return () => {
                source.cancel('Component got unmounted');
            };
        }, 
        []
    );

    const renderData = (data: Count): JSX.Element[] => {
        let array: JSX.Element[] = [];
        for (let [key, value] of Object.entries(data)) {
        array.push(
                (
                    <ObservationLink 
                        key={key} 
                        id={id} 
                        observationType={key} 
                        count={value} 
                    />
                )
            );
        }
        return array;
    };

    const backButton = (): JSX.Element => {
        return (
            <div 
                className="button"
                onClick={() => {
                    history.push('/');
                }}
            >
                back
            </div>
        );
    };
    
    return (
        <div className="recipient-page">
            <SubTitle>Choose category</SubTitle>
            <div className="border" />
            {backButton()}
            {renderData(types)}
        </div>
    );
};

export default Select;