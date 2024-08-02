import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import PixlyApi from './api/pixlyApi';

import { test, expect, describe, beforeEach, vi } from "vitest";
import { mockImages } from "../tests/mocks";

vi.mock('./api/pixlyApi');

describe('App component', () => {
    beforeEach(() => {
        PixlyApi.getImages.mockResolvedValue(mockImages);
    });

    test('renders App component and navigates', async () => {

        await waitFor(() => {
            render(
                <MemoryRouter initialEntries={ ['/'] }>
                    <App/>
                </MemoryRouter>
            );
        })

        expect(screen.getAllByText('Pixly').length).toEqual(2);
        expect(screen.getByText('Edit and upload your images')).toBeInTheDocument();

        screen.getByText('images').click();
        expect(PixlyApi.getImages).toHaveBeenCalled();
        // Wait for loader on click
        await waitFor(() => {
            expect(screen.getByText('All images')).toBeInTheDocument();
            expect(screen.getByText('image1.jpg')).toBeInTheDocument();
            expect(screen.getByText('image2.jpg')).toBeInTheDocument();
        });
    });
});

