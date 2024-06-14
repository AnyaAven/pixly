--coalece means that all null fields will now be an empty string ''

--Key Features of PL/pgSQL:

--Control Structures: Allows the use of IF, CASE, LOOP, WHILE, FOR, etc.
--Variables: Supports declaring and using variables.
--Error Handling: Provides mechanisms for exception handling with BEGIN...EXCEPTION...END blocks.
--Composite Types: Can use custom composite types or table types directly.
--The $$ delimiters mark the function body.


-- Create the Image table
CREATE TABLE Image (
    id SERIAL PRIMARY KEY,
    filename VARCHAR NOT NULL,
    height INT NOT NULL,
    width INT NOT NULL,
    orientation TEXT NOT NULL,
    is_edited BOOLEAN DEFAULT FALSE NOT NULL,
    description TEXT,
    comment TEXT,
    document_with_weights TSVECTOR
);

-- Create a function to update the document_with_weights column
CREATE FUNCTION update_document_with_weights() RETURNS trigger AS $$
BEGIN
    NEW.document_with_weights :=
        setweight(to_tsvector('english', coalesce(NEW.filename, '')), 'A') ||
        setweight(to_tsvector('english', coalesce(NEW.description, '')), 'B') ||
        setweight(to_tsvector('english', coalesce(NEW.comment, '')), 'C');
    RETURN NEW;
END
$$ LANGUAGE plpgsql;

-- Create a trigger that calls the update_document_with_weights function before insert or update
CREATE TRIGGER trigger_update_document_with_weights
BEFORE INSERT OR UPDATE ON Image
FOR EACH ROW EXECUTE FUNCTION update_document_with_weights();

INSERT INTO Image (filename, height, width, orientation, is_edited, description, comment)
VALUES
('image1.jpg', 1080, 1920, 'landscape', false,
'A beautiful landscape depicting a serene mountain range with a clear blue sky. The foreground features a lush green meadow dotted with colorful wildflowers. This image captures the essence of natural beauty and tranquility, making it perfect for nature enthusiasts and anyone seeking a moment of peace.',
'No comments yet, but the scene is breathtakingly beautiful and evokes a sense of calm and serenity. It is truly a place where one can imagine escaping from the hustle and bustle of everyday life and reconnecting with nature.'),
('image2.jpg', 720, 1280, 'portrait', true,
'A portrait of a person with a focus on the subjects facial expression. The background is softly blurred to keep the attention on the person. This edited version enhances the brightness and sharpness of the facial features, highlighting the emotions conveyed through the eyes and subtle smile. Perfect for portrait photography portfolios or personal collections.',
'Edited for brightness to bring out the details in their face. The adjustments have significantly improved the overall clarity and impact of the image, making it a striking representation of the subjects character and mood.'),
('image3.jpg', 1080, 1080, 'portrait', false,
'This square format image is perfect for social media sharing, particularly on platforms like Instagram. The composition is well-balanced, with the subject perfectly centered. The background features a soft gradient that complements the subjects attire, adding to the overall aesthetic appeal of the photograph.',
'Square format makes it ideal for Instagram and other social media platforms. The composition is meticulously crafted to ensure a harmonious balance that draws the viewers eye to the subject. A great addition to any social media feed.'),
('image4.jpg', 1920, 1080, 'landscape', false,
'Another landscape photograph capturing a sunset over a tranquil lake. The sky is ablaze with vibrant hues of orange, pink, and purple, reflected beautifully on the calm waters below. This image encapsulates the perfect end to a day, offering viewers a moment of reflection and awe at the beauty of nature.',
'The sunset colors are stunning, creating a picturesque scene that is both captivating and serene. It is an image that evokes feelings of peace and wonder, reminding us of the simple yet profound beauty that can be found in the natural world.'),
('image5.jpg', 1200, 1600, 'landscape', true,
'A detailed macro shot of a dew-covered spider web in the early morning light. Each droplet of dew acts as a tiny lens, reflecting the surrounding environment. The intricate patterns of the web are highlighted, showcasing the artistry of nature. This edited version enhances the contrast and sharpness to bring out the finest details.',
'Enhanced for contrast and sharpness to showcase the intricate details of the spider web. The image captures the delicate beauty of the natural world, turning an everyday scene into a work of art. It is a perfect example of how natures smallest details can have the most significant impact.'),
('image6.jpg', 1024, 768, 'portrait', false,
'A vibrant portrait of a person in traditional attire, celebrating a cultural festival. The colorful garments and accessories stand out against a neutral background, highlighting the rich heritage and traditions being honored. This image is a celebration of diversity and cultural pride, captured beautifully through the lens.',
'The cultural significance of the attire and the joy of the festival are captured vividly in this portrait. The colors and details are not only visually appealing but also tell a story of tradition and celebration. It is an inspiring reminder of the beauty found in cultural diversity.');

-- Insert with inspire, inspiring, inspires
INSERT INTO Image (filename, height, width, orientation, is_edited, description, comment)
VALUES
('image1.jpg', 1080, 1920, 'landscape', false,
'A serene mountain range with a blue sky. The meadow features wildflowers. This image inspires peace.',
'Beautiful scene evokes calm and serenity, inspiring a moment of peace.'),
('image2.jpg', 720, 1280, 'portrait', true,
'A portrait with a focus on the face. The background is blurred. This edited version highlights facial features, inspiring portrait photography.',
'Edited for brightness to improve clarity, inspiring representation of the subjects character.'),
('image3.jpg', 1080, 1080, 'portrait', false,
'Perfect for social media. The subject is centered. The background complements the subject, inspiring social media sharing.',
'Square format ideal for Instagram, inspiring a harmonious balance.'),
('image4.jpg', 1920, 1080, 'landscape', false,
'A sunset over a tranquil lake. The sky reflects on the water. This image inspires reflection and awe.',
'Sunset colors create a serene scene, inspiring feelings of peace and wonder.'),
('image5.jpg', 1200, 1600, 'landscape', true,
'A macro shot of a dew-covered spider web. Each droplet reflects the environment. This image inspires appreciation of nature.',
'Enhanced for contrast, inspiring the beauty of the spider web.'),
('image6.jpg', 1024, 768, 'portrait', false,
'A portrait in traditional attire at a festival. The colorful garments highlight cultural pride. This image inspires celebration of diversity.',
'The joy of the festival is captured vividly, inspiring the beauty of cultural diversity.');

-- Create an index on the document_with_weights column
CREATE INDEX idx_image_document_with_weights
ON Image USING gin(document_with_weights);

--Generalized Inverted Index (GIN)