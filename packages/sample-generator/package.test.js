test('package should expose a generator function', () => {
  expect(require('.')).toBeInstanceOf(Function);
});
