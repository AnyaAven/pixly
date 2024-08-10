import React from 'react';
import { render, screen } from '@testing-library/react';
import ImageCard from './ImageCard';
import {
    mockImage,
    mockImageEmptyDescriptionAndComment,
    mockImageNoComment,
    mockImageNoDescription,
    mockImages
} from "../tests/mocks";
import { test, expect, describe } from "vitest";


describe('ImageCard Component', () => {

    test('renders ImageCard component with image details', () => {
        const { getByText, getByAltText } = render(<ImageCard image={ mockImages[0] }/>);
        expect(getByText('image1.jpg')).toBeInTheDocument();
        expect(getByText('Description: First image')).toBeInTheDocument();
        expect(getByText('Comment: First comment')).toBeInTheDocument();
        expect(getByAltText('Card image cap')).toHaveAttribute('src',
            expect.stringContaining(mockImages[0].id.toString()));
    });

    test('renders with description and comment', () => {
        render(<ImageCard image={ mockImage }/>);

        expect(screen.getByText('Description: A beautiful scenery')).toBeInTheDocument();
        expect(screen.getByText('Comment: Taken during vacation')).toBeInTheDocument();
    });

    test('renders without description', () => {
        render(<ImageCard image={ mockImageNoDescription }/>);

        expect(screen.queryByText('Description:')).not.toBeInTheDocument();
        expect(screen.getByText('Comment: Second comment')).toBeInTheDocument();
    });

    test('renders without comment', () => {
        render(<ImageCard image={ mockImageNoComment }/>);

        expect(screen.getByText('Description: Third image description')).toBeInTheDocument();
        console.log(screen.debug())
        expect(screen.queryByText('Comment:')).not.toBeInTheDocument();
    });

    test('renders with empty description and comment', () => {
        render(<ImageCard image={ mockImageEmptyDescriptionAndComment }/>);

        expect(screen.queryByText('Description:')).not.toBeInTheDocument();
        expect(screen.queryByText('Comment:')).not.toBeInTheDocument();
    });
});