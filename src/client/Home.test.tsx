// Home.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import Home from './Home';
import { expect, test } from 'vitest';

test('renders Home component with titles', () => {
    const { getByText } = render(<Home/>);
    expect(getByText('Pixly')).toBeInTheDocument();
    expect(getByText('Edit and upload your images')).toBeInTheDocument();
});
