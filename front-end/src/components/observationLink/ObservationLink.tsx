import * as React from 'react';
import { humanReadable } from '../humanReadable.js';
import './observation-link.css';

interface AppProps {
    observationType: string;
    count: number;
}

interface AppState {

}

class ObservationLink extends React.Component<AppProps, AppState> {
    public constructor(props: AppProps) {
        super(props);
    }
    public render = () => {
        return (
            <div key={this.props.observationType} className="observation-type">
              {humanReadable[this.props.observationType] + ' (' + this.props.count + ')'}
            </div>
          );
    }
}

export default ObservationLink;