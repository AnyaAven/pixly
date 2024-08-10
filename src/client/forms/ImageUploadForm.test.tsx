import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ImageUploadForm } from './ImageUploadForm';
import { describe, expect, test, vi, beforeEach } from 'vitest';


describe('ImageUploadForm', () => {
    const mockUploadImage = vi.fn();

    beforeEach(() => {
        vi.resetAllMocks();
    });

    // Currently this test does not work, the upload userEvent is not triggering
    // with the ImageEditor input correctly. If you compare the logs to the browser's
    // logs, you will see that it never triggers the handleImageChange during
    // upload.
    // Based on the current debugging, fileInput seems to be correctly selected.
    // There is only one input rendered from ImagePickerEditor. I don't see how
    // it would be any other input.

    // test('renders ImageUploadForm and handles form submission', async () => {
    //     const { container } = render(<ImageUploadForm uploadImage={mockUploadImage} />);
    //
    //     const filenameInput = screen.getByLabelText(/filename/i);
    //     const descriptionInput = screen.getByLabelText(/description/i);
    //     const commentInput = screen.getByLabelText(/comment/i);
    //     const orientationSelect = screen.getByLabelText(/orientation/i);
    //     const uploadButton = screen.getByText(/upload!/i);
    //
    //     // upload file
    //     const file = new File(['iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII='], 'image.jpg', { type: 'image/jpeg' });
    //     const fileInput = container.querySelector('.ImageUploadForm-ImagePickerEditor input[type="file"]');
    //     if (fileInput !== null) {
    //         await waitFor(() => {
    //             userEvent.upload(fileInput, file);
    //         })
    //         console.log(fileInput.outerHTML, fileInput.innerHTML)
    //     } else {
    //         throw new Error('File input not found');
    //     }
    //
    //     await userEvent.type(filenameInput, 'image.jpg');
    //     await userEvent.type(descriptionInput, 'A beautiful image');
    //     await userEvent.type(commentInput, 'This is a comment');
    //     await userEvent.selectOptions(orientationSelect, 'portrait');
    //
    //
    //     // console.log(screen.debug())
    //
    //     await waitFor(() => {
    //         expect(uploadButton).not.toBeDisabled();
    //     });
    //
    //     await userEvent.click(uploadButton);
    //
    //     await waitFor(() => {
    //         expect(screen.getByText(/uploaded 1 image!/i)).toBeInTheDocument();
    //     });
    //
    //     expect(mockUploadImage).toHaveBeenCalledWith({
    //         uploadedFile: file,
    //         filename: 'image.jpg',
    //         description: 'A beautiful image',
    //         comment: 'This is a comment',
    //         orientation: 'landscape',
    //     });
    // });

    test('does not submit form if file is not provided', async () => {
        render(<ImageUploadForm uploadImage={ mockUploadImage }/>);

        const filenameInput = screen.getByLabelText(/filename/i);
        const uploadButton = screen.getByText(/upload!/i);

        await userEvent.type(filenameInput, 'image.jpg');

        expect(uploadButton).toBeDisabled();
    });
});
