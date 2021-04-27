import * as React from 'react';
import { ReactElement } from 'react';
import './observation.css';

interface Props {
    data: {
        note?: string;
        mood?: string;
        timestamp: string;
        taskNote?: string;
        taskDefinition?: string;
        fluidsObserved?: string | boolean;
        fluidType?: string;
    };
}

const Observation: React.FC<Props> = (props): ReactElement => {

    const format = (input: number): string => {
        return input.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        });
    };

    const date = (): string => {
        let dateObject = new Date(props.data.timestamp);
        let hours: string = format(dateObject.getHours());
        let minutes: string = format(dateObject.getMinutes());
        let dateString = dateObject.toDateString();
        return hours + ':' + minutes + ' on ' + dateString;
    };

    const listElement = (type: string): JSX.Element | null => {
        if (props.data[type]) {
            let extraText: string = type === 'fluidsObserved' ? 'Observed: ' : '';
            return (
                <div className="element">
                    {extraText + props.data[type]}
                </div>
            );
        } else {
            return null;
        }
    };

    return (
        <div className="observation-container">
            <div className="date">
                {date()}
            </div>
            {listElement('fluidType')}
            {listElement('fluidsObserved')}
            {listElement('taskDefinition')}
            {listElement('taskNote')}
            {listElement('mood')}
            {listElement('note')}
        </div>
    );
};

export default Observation;