import randomString from 'randomstring';

export function generateId(length, charset) {
  return randomString.generate({
    length, 
    charset
  });
}