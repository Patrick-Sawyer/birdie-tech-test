import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ObservationLink from './ObservationLink';

import { MemoryRouter as Router } from 'react-router-dom';

const observationLink = (
    <Router>
        <ObservationLink observationType={'dummy-type'} id={'dummy-id'} count={123} />
    </Router>
);

describe('observation link', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            observationLink,
            div
        );
    });
});