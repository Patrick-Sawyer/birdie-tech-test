import * as React from 'react';
import { ReactElement } from 'react';
import { humanReadable } from '../../humanReadable.js';
import { useParams } from 'react-router-dom';
import SubTitle from '@App/components/SubTitle'; 
import axios, { AxiosResponse } from 'axios';

interface Props {
    id: string;
    api: string;
}

interface ParamTypes {
    type: string;
}

interface Data {
    payload: JSON;
    timestamp: string;
}

const View: React.FC<Props> = (props): ReactElement => {

    const { type } = useParams<ParamTypes>();
    const [ data, setData ] = React.useState<Data>();
    const [ loadFailed, setLoadFailed ] = React.useState<boolean>(false);

    let page: number = 0;

    React.useEffect(
        () => {
            axios
            .get<Data>(props.api + '/observations?recipient=' + props.id + '&type=' + type + '&page=' + page)
            .then((response: AxiosResponse) => {
                setData(response.data);
            })
            .catch((err) => {
                setLoadFailed(true);
            });
        }, 
        [page]
    );

    const renderData = () => {
        if (loadFailed) {
            return 'Failed to load data';
        } else {
            return JSON.stringify(data);
        }
    };
    
    return (
        <div className="view-page">
            <SubTitle>{humanReadable[type]}</SubTitle>
            {renderData()}
        </div>
    );
};

export default View;