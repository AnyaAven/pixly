import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchForm from './SearchForm';
import { describe, expect, test, vi, beforeEach } from 'vitest';

describe('SearchForm', () => {
    const mockHandleSearch = vi.fn();

    beforeEach(() => {
        vi.resetAllMocks();
    });

    test('renders SearchForm and handles form submission', async () => {
        render(<SearchForm handleSearch={ mockHandleSearch }/>);

        const input = screen.getByPlaceholderText(/enter search term/i);
        const searchButton = screen.getByText(/search!/i);

        const searchTerm = 'test term';
        await userEvent.type(input, searchTerm);
        await userEvent.click(searchButton);

        expect(mockHandleSearch).toHaveBeenCalledWith(searchTerm);
    });

    test('trims search term before submitting', async () => {
        render(<SearchForm handleSearch={ mockHandleSearch }/>);

        const input = screen.getByPlaceholderText(/enter search term/i);
        const searchButton = screen.getByText(/search!/i);

        const searchTerm = '  test term  ';
        await userEvent.type(input, searchTerm);
        await userEvent.click(searchButton);

        expect(mockHandleSearch).toHaveBeenCalledWith(searchTerm.trim());
    });
});
