[![LinkedIn][linkedin-shield]][linkedin-url]

# PIXLY

## 💬 Introduction

Pixly is an Image Editing web app.

The backend was built with Typescript, Express, Node.js, PostgreSQL, and TypeORM.
The frontend was built with Typescript, React, and Bootstrap.

Images are stored within AWS S3 buckets.

## Demo

[![image-upload](readme-images/pixly-image-upload.png)]
[![images-list](readme-images/pixly-images-list.png)]

https://github.com/user-attachments/assets/2eeb61cf-07c6-4e9c-966d-35f11caa68d1

## React Components Frontend test coverage: 94%

| File                   | % Stmts   | % Branch   | % Funcs   | % Lines   |
|------------------------|-----------|------------|-----------|-----------|
| All files              | 93.91     | 85.93      | 93.54     | 93.91     |
| client                 | 94.87     | 90.32      | 92.85     | 94.87     |
| Alert.tsx              | 100       | 100        | 100       | 100       |
| App.tsx                | 85.36     | 100        | 75        | 85.36     |
| Home.tsx               | 100       | 100        | 100       | 100       |
| ImageCard.tsx          | 100       | 100        | 100       | 100       |
| ImageCardList.tsx      | 100       | 100        | 100       | 100       |
| ImageList.tsx          | 91.45     | 83.33      | 100       | 91.45     |
| Loader.tsx             | 100       | 100        | 100       | 100       |
| NavBar.tsx             | 100       | 100        | 100       | 100       |
| client/api             | 95.03     | 76.92      | 100       | 95.03     |
| pixlyApi.ts            | 95.03     | 76.92      | 100       | 95.03     |
| client/forms           | 89.2      | 72.72      | 85.71     | 89.2      |
| ImageUploadForm.tsx    | 86.95     | 62.5       | 75        | 86.95     |
| SearchForm.tsx         | 100       | 100        | 100       | 100       |
| client/helpers         | 100       | 100        | 100       | 100       |
| utils.ts               | 100       | 100        | 100       | 100       |
| tests                  | 100       | 100        | 100       | 100       |
| mocks.ts               | 100       | 100        | 100       | 100       |

## 🔧 Setup

- Set .env in the client folder and top-level

`pixly/src/client/.env`

```.env
VITE_REACT_APP_AWS_BASE_URL=https://your-bucket-name-here.s3.amazonaws.com
```

`pixly/.env`

```.env
PORT=3001

AWS_ACCESS_KEY=your-aws-key-here
AWS_SECRET=your-secret-key-here
AWS_BUCKET_NAME=your-bucket-name-here
AWS_REGION=us-east-1

VITE_REACT_APP_AWS_BASE_URL=https://your-bucket-name-here.s3.amazonaws.com
```

To ensure that everything works correctly, Node 20 should be used.

- Install dependencies

  ```sh
  npm install
  ```

- Run Express server in development mode

  ```sh
  npm run dev
  ```


- Run React FE

  ```sh
  npm run start
  ```

- Visit <http://http://localhost:5173/> or Vite's logged URL in the terminal

- You can run tests with

  ```sh
  npm run test
  
  npm run test:cov
  
  npm run test:ui
  ```

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555

[linkedin-url]: https://linkedin.com/in/anya-aven-6004b0132/
