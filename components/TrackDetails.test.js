import React from 'react';
import TrackDetails from './TrackDetails';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
	const rendered = renderer.create(<TrackDetails />).toJSON();
	expect(rendered).toBeTruthy();
});


