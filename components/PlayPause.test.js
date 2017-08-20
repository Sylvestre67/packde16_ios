import React from 'react';
import PlayPause from './PlayPause';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
	const rendered = renderer.create(<PlayPause />).toJSON();
	expect(rendered).toBeTruthy();
});

