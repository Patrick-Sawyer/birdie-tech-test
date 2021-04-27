import * as React from 'react';
import { ReactElement } from 'react';
import { useParams, useHistory } from 'react-router-dom';
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
    const [ page, setPage ] = React.useState<number>(0);
    const history = useHistory();

    React.useEffect(
        () => {
            const source = axios.CancelToken.source();
            axios
            .get<Data>(
                props.api + '/observations?recipient=' + props.id + '&type=' + type + '&page=' + page,
                { cancelToken: source.token }
            )
            .then((response: AxiosResponse) => {
                setData(response.data);
            })
            .catch((err) => {
                setLoadFailed(true);
            });
            return () => {
                source.cancel('Component got unmounted');
            };
        }, 
        [page]
    );

    const displayData = (): JSX.Element[] => {
        let array: JSX.Element[] = [];
        data.forEach((row: Data, index: number) => array.push(<Observation key={index} data={row} />));
        return array;
    };

    const renderData = (): JSX.Element[] | string => {
        if (loadFailed) {
            return 'Nothing to display';
        } else {
            return displayData();
        }
    };

    const pageButtons = (): JSX.Element => {
        return (
            <div className="buttons" key="buttons">
                <div 
                    className="button"
                    onClick={() => {
                        history.push('/');
                    }}
                >
                    <div 
                        className="pointer"
                    >
                        back
                    </div>
                </div>
                <div 
                    className="button"
                    onClick={() => {
                        let newPage = page <= 1 ? 0 : page - 1; 
                        setPage(newPage);
                    }}
                >
                    <div 
                        className="pointer"  
                        style={page === 0 ? {display: 'none'} :  {display: 'block'}}
                    >
                        prev 20
                    </div>
                </div>
                <div 
                    className="button" 
                    onClick={() => {
                        if (data.length === 20) {
                            setPage(page + 1);
                        }
                    }}
                >
                    <div 
                        className="pointer" 
                        style={data.length === 20 ?  {display: 'block'}  : {display: 'none'}}
                    >
                        next 20
                    </div>
                </div>
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
                    {renderData()}
                </div>
            </div>
        </div>
    );
};

export default View;