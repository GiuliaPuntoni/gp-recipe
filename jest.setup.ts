import "@testing-library/jest-dom";

beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ meals: [] }),
    })
  ) as jest.Mock;
});

afterEach(() => {
  jest.clearAllMocks();
});
