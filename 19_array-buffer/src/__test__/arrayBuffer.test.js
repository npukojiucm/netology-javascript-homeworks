import ArrayBufferConverter, { getBuffer } from '../ArrayBuffer';
import { expect } from '@jest/globals';

const buffer = getBuffer();
const converter = new ArrayBufferConverter();

test('', () => {
  converter.load(buffer);
  expect(converter.bufferView).toBeInstanceOf(Uint16Array);
});

test('', () => {
  const str = '{"data":{"user":{"id":1,"name":"Hitman","level":10}}}';
  expect(converter.toString()).toEqual(expect.stringContaining(str));
});
