import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ImageList from './ImageList';
import PixlyApi from './api/pixlyApi';
import { describe, expect, test, vi, beforeEach, Mock } from 'vitest';

import { mockImages } from "../tests/mocks";


describe('ImageList', () => {

    beforeEach(() => {
        vi.resetAllMocks();
        vi.mock('./api/pixlyApi');
    });

    test('renders loader initially', async () => {
        (PixlyApi.getImages as Mock).mockResolvedValueOnce(mockImages);

        render(<ImageList/>);
        expect(screen.queryByText('All images')).not.toBeInTheDocument();

        await waitFor(() => {
            expect(screen.queryByText('All images')).toBeInTheDocument();
        });
    });

    test('fetches and displays images on initial render', async () => {
        (PixlyApi.getImages as Mock).mockResolvedValueOnce(mockImages);

        render(<ImageList/>);

        await waitFor(() => {
            expect(screen.getByText('All images')).toBeInTheDocument();
        });

        for (const { filename } of mockImages) {
            expect(screen.getByText(filename)).toBeInTheDocument();
        }

    });

    test('displays search results and handles empty search results', async () => {
        const searchTerm = 'Second';
        const searchResult = [mockImages[1]];
        //
        (PixlyApi.getImages as Mock).mockResolvedValueOnce(mockImages);
        (PixlyApi.getImagesBySearch as Mock).mockResolvedValueOnce(searchResult);
        (PixlyApi.getImagesBySearch as Mock).mockResolvedValueOnce([]);

        render(<ImageList/>);

        await waitFor(() => {
            expect(screen.getByText('All images')).toBeInTheDocument();
        });

        const input = screen.getByPlaceholderText('Enter Search Term...');
        const searchButton = screen.getByText('Search!');

        // Test successful search
        await userEvent.type(input, searchTerm);
        await userEvent.click(searchButton);

        await waitFor(() => {
            expect(screen.getByText(`Search results for "${ searchTerm }"`)).toBeInTheDocument();
        });

        for (const { filename } of searchResult) {
            expect(screen.getByText(filename)).toBeInTheDocument();
        }

        // Test empty search result
        await userEvent.clear(input);
        await userEvent.type(input, 'noResultsTerm');
        await userEvent.click(searchButton);

        await waitFor(() => {
            expect(screen.getByText('Sorry, no results were found!')).toBeInTheDocument();
        });
    });

    test('handles errors during search', async () => {
        const searchTerm = 'searchTerm';
        const errorMessage = 'Search failed';

        (PixlyApi.getImages as vi.Mock).mockResolvedValueOnce(mockImages);
        (PixlyApi.getImagesBySearch as vi.Mock).mockRejectedValueOnce([errorMessage]);

        render(<ImageList/>);

        await waitFor(() => {
            expect(screen.getByText('All images')).toBeInTheDocument();
        });

        const input = screen.getByPlaceholderText('Enter Search Term...');
        const searchButton = screen.getByText('Search!');

        await userEvent.type(input, searchTerm);
        await userEvent.click(searchButton);

        await waitFor(() => {
            expect(screen.getByText(errorMessage)).toBeInTheDocument();
        });
    });
});
