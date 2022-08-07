// Import this named export into your test file:
const mock = jest.fn().mockImplementation(() => {
  return {};
});

export default mock;