import * as React from 'react';
import { ReactElement } from 'react';

const humanReadable = require('../../humanReadable.json');
import './observation-link.css';
import { Link } from 'react-router-dom';

interface Props {
    observationType: string;
    count: number;
    id: string;
}

const ObservationLink: React.FC<Props> = (props): ReactElement => {

    let amount: string = props.count > 0 ? ' (' + props.count + ')' : '';

    return (
        <div 
            key={props.observationType} 
            className="observation-type"
        >
            <Link to={'/view/' + props.id + '/' + props.observationType}>
                <span className="bold">{humanReadable[props.observationType]}</span>{amount}
            </Link>
        </div>
    );
};

export default ObservationLink;