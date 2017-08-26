import React from 'react';
import FeatDetails from './FeatDeteils';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
	const rendered = renderer.create(<FeatDetails />).toJSON();
	expect(rendered).toBeTruthy();
});

