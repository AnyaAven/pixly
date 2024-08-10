import { tImageModel } from "../shared/types.js";

export const mockImages: tImageModel[] = [
    {
        id: 1,
        filename: 'image1.jpg',
        height: 800,
        width: 600,
        description: 'First image',
        comment: 'First comment',
        isEdited: false,
        orientation: 'landscape'
    },
    {
        id: 2,
        filename: 'image2.jpg',
        height: 800,
        width: 600,
        description: 'Second image',
        comment: 'Second comment',
        isEdited: false,
        orientation: 'landscape'
    }
];

export const mockImage: tImageModel = {
    id: 1,
    filename: 'image1.jpg',
    height: 800,
    width: 600,
    description: 'A beautiful scenery',
    comment: 'Taken during vacation',
    isEdited: false,
    orientation: 'landscape'
};

export const mockImageNoDescription: tImageModel = {
    id: 2,
    filename: 'image2.jpg',
    height: 800,
    width: 600,
    description: null,
    comment: 'Second comment',
    isEdited: false,
    orientation: 'landscape'
};

export const mockImageNoComment: tImageModel = {
    id: 3,
    filename: 'image3.jpg',
    height: 800,
    width: 600,
    description: 'Third image description',
    comment: null,
    isEdited: false,
    orientation: 'landscape'
};

export const mockImageEmptyDescriptionAndComment: tImageModel = {
    id: 4,
    filename: 'image4.jpg',
    height: 800,
    width: 600,
    description: '',
    comment: '',
    isEdited: false,
    orientation: 'landscape'
};
