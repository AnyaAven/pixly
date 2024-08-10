import React from 'react';
import { render } from '@testing-library/react';
import Alert from './Alert';
import { test, expect } from "vitest";


test('renders alert with given type and children', () => {
    const { getByRole } = render(<Alert type="success">Success message</Alert>);
    const alertElement = getByRole('alert');
    expect(alertElement).toHaveClass('alert-success');
    expect(alertElement).toHaveTextContent('Success message');
});
