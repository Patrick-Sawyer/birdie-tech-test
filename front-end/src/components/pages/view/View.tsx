import * as React from 'react';
import { ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';

import SubTitle from '@App/components/SubTitle'; 
import Observation from '../../observation/Observation';
import { humanReadable } from '../../humanReadable.js';
import './view.css';

interface Props {
    id: string;
    api: string;
}

interface ParamTypes {
    type: string;
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

    const { type } = useParams<ParamTypes>();
    const [ data, setData ] = React.useState<Data[]>([]);
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

    const displayData = (): JSX.Element[] => {
        let array: JSX.Element[] = [];
        data.forEach((row: Data, index: number) => array.push(<Observation data={row} />));
        return array;
    };

    const renderData = (): JSX.Element[] | string => {
        if (loadFailed) {
            return 'Nothing to display';
        } else {
            return displayData();
        }
    };
    
    return (
        <div className="view-page">
            <SubTitle>{humanReadable[type]}</SubTitle>
            <div className="elements">
                <div className="elements-inner">
                    {renderData()}
                </div>
            </div>
        </div>
    );
};

export default View;