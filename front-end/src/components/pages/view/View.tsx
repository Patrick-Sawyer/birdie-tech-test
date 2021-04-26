import * as React from 'react';
import { ReactElement } from 'react';
import { humanReadable } from '../../humanReadable.js';
import { useParams } from 'react-router-dom';
import SubTitle from '@App/components/SubTitle'; 

interface Props {
    
}

interface ParamTypes {
    type: string;
}

const View: React.FC<Props> = (props): ReactElement => {

    const { type } = useParams<ParamTypes>();

    return (
        <div>
            <SubTitle>{humanReadable[type]}</SubTitle>
        </div>
    );
};

export default View;