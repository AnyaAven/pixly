import { describe, it, expect, beforeEach, vi } from 'vitest';
import PixlyApi from 'api/pixlyApi';
import { mockImages } from "../../tests/mocks";
import { tImageModel } from "@/shared/types";

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL || "http://localhost:3001";

global.fetch = vi.fn();

describe('PixlyApi', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    it('should fetch images', async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ images: mockImages }),
        });

        const images = await PixlyApi.getImages();
        expect(images).toEqual(mockImages);
        expect(fetch).toHaveBeenCalledWith(new URL(`${ BASE_URL }/images/`), {
            method: 'GET',
            body: undefined,
            headers: undefined,
        });
    });

    it('should search images by term', async () => {
        const searchTerm = 'inspire';

        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ images: mockImages }),
        });

        const images = await PixlyApi.getImagesBySearch(searchTerm);
        expect(images).toEqual(mockImages);
        expect(fetch).toHaveBeenCalledWith(new URL(`${ BASE_URL }/images/search?q=${ searchTerm }`), {
            method: 'GET',
            body: undefined,
            headers: undefined,
        });
    });

    it('should fetch image by id', async () => {
        const imageId = 1;
        const mockImage = mockImages[0];

        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ image: mockImage }),
        });

        const image = await PixlyApi.getImage(imageId);
        expect(image).toEqual(mockImage);
        expect(fetch).toHaveBeenCalledWith(new URL(`${ BASE_URL }/images/${ imageId }`), {
            method: 'GET',
            body: undefined,
            headers: undefined,
        });
    });

    it('should upload image', async () => {
        const uploadImage: tImageModel = {
            id: 1,
            filename: 'uploaded.jpg',
            height: 800,
            width: 600,
            description: 'A test upload',
            comment: 'This is a comment',
            isEdited: false,
            orientation: 'landscape',
        };

        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ image: uploadImage }),
        });

        const mockFile = new File(['(⌐□_□)'], 'uploaded.jpg', { type: 'image/jpeg' });

        const uploadedImage = await PixlyApi.uploadImage({
            uploadedFile: mockFile,
            filename: 'uploaded.jpg',
            description: 'A test upload',
            comment: 'This is a comment',
            orientation: 'landscape',
        });

        expect(uploadedImage).toEqual(uploadImage);
        expect(fetch).toHaveBeenCalled();
    });

    // Currently this does not work but should be an added addition later.

    // it('should handle API error', async () => {
    //     fetch.mockResolvedValue({
    //         ok: false,
    //         status: 400,
    //         statusText: 'Bad Request',
    //         json: async () => ({error: {message: 'Invalid request'}}),
    //     });
    //
    //     await expect(PixlyApi.getImages()).rejects.toThrow('Invalid request');
    //     expect(fetch).toHaveBeenCalledWith(new URL(`${BASE_URL}/images/`), {
    //         method: 'GET',
    //         body: undefined,
    //         headers: undefined,
    //     });
    // });
});
