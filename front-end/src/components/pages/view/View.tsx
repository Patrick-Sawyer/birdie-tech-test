import * as React from 'react';
import { ReactElement } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';

import SubTitle from '@App/components/SubTitle'; 
import Observation from '../../observation/Observation';
const humanReadable = require('../../../humanReadable.json');
import './view.css';

interface Props {
    api: string;
}

interface ParamTypes {
    type: string;
    id: string;
}

interface Data {
    note: string;
    mood: string;
    timestamp: string;
    taskNote: string;
    taskDefinition: string;
    fluidsObserved: string;
    fluidType: string;
}

const View: React.FC<Props> = (props): ReactElement => {

    const { type, id } = useParams<ParamTypes>();
    const [ data, setData ] = React.useState<Data[]>([]);
    const [ page, setPage ] = React.useState<number>(0);
    const history = useHistory();

    React.useEffect(
        () => {
            const source = axios.CancelToken.source();
            axios
            .get<Data[]>(
                props.api + '/observations?recipient=' + id + '&type=' + type + '&page=' + page,
                { cancelToken: source.token }
            )
            .then((response: AxiosResponse) => {
                setData(response.data);
            })
            .catch((err) => {
                setData([]);
            });
            return () => {
                source.cancel('Component got unmounted');
            };
        }, 
        [page]
    );

    const displayData = (observations: Data[]): JSX.Element[] => {
        let array: JSX.Element[] = [];
        observations.forEach((row: Data, index: number) => array.push(<Observation key={index} data={row} />));
        return array;
    };

    const button = (text: string, click: () => void, display: boolean): JSX.Element => {
        return (
            <div className="button">
                <div 
                    className="pointer"  
                    style={{display: display ? 'block' : 'none'}}
                    onClick={click}
                >
                    {text}
                </div>
            </div>
        );
    };

    const prevPage = (): void => {
        let newPage: number = page <= 1 ? 0 : page - 1; 
        setPage(newPage);
    };

    const nextPage = (): void => {
        if (data.length === 20) {
            setPage(page + 1);
        }
    };

    const back = (): void => {
        history.push('/recipient/' + id);
    };

    const pageButtons = (): JSX.Element => {
        return (
            <div className="buttons" key="buttons">
                {button('prev 20', prevPage, page !== 0)}
                {button('back', back, true)}
                {button('next 20', nextPage, data.length === 20)}
            </div>
        );
    };
    
    return (
        <div className="view-page">
            <SubTitle>{humanReadable[type]}</SubTitle>
            <div className="border" />
            <div className="elements">
                <div className="elements-inner">
                    {pageButtons()}
                    {displayData(data)}
                </div>
            </div>
        </div>
    );
};

export default View;