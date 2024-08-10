import { expect, afterEach } from "vitest";
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
// import '@testing-library/jest-dom' // this breaks if we import it here
// Only import the above line on each file.

expect.extend(matchers);
afterEach(cleanup);