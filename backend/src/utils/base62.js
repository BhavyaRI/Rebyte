const ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

const encode = (id) => {
  if (id === 0) return ALPHABET[0];
  let num = id;
  let code = "";
  while (num > 0) {
    code = ALPHABET[num % 62] + code;
    num = Math.floor(num / 62);
  }
  return code;
}

module.exports = encode;