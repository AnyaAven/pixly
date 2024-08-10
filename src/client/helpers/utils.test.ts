import { describe, expect, test } from 'vitest';
import { capitalize, isValsFilled, pluralize, convertBase64ToBlob, convertBlobToFile } from './utils';

describe('Utils', () => {
    test('capitalize should capitalize the first letter of a string', () => {
        expect(capitalize('hello')).toBe('Hello');
        expect(capitalize('')).toBe('');
    });

    test('isValsFilled should return true if all values are filled', () => {
        expect(isValsFilled({ 0: 'a', 1: 'b', 2: 'c' })).toBe(true);
        expect(isValsFilled({ 0: 'a', 1: '', 2: 'c' })).toBe(false);
    });

    test('pluralize should add an "s" to the word if count is greater than 1', () => {
        expect(pluralize(1, 'image')).toBe('image');
        expect(pluralize(2, 'image')).toBe('images');
    });

    test('convertBase64ToBlob should convert a base64 string to a Blob', () => {
        const base64String = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA';
        const blob = convertBase64ToBlob(base64String);
        expect(blob).toBeInstanceOf(Blob);
        expect(blob.type).toBe('image/png');
    });

    test('convertBlobToFile should convert a Blob to a File', () => {
        const blob = new Blob(['file content'], { type: 'text/plain' });
        const file = convertBlobToFile(blob);
        expect(file).toBeInstanceOf(File);
        expect(file.type).toBe('text/plain');
    });
});
