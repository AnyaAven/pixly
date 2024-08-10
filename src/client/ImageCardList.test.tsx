import React from 'react';
import {render} from '@testing-library/react';
import ImageCardList from './ImageCardList';
import {test, expect} from "vitest";

import {mockImages} from "../tests/mocks";

test('renders ImageCardList component with list of images', () => {
    const {getByText} = render(<ImageCardList images={mockImages}/>);
    expect(getByText('image1.jpg')).toBeInTheDocument();
    expect(getByText('image2.jpg')).toBeInTheDocument();
});
