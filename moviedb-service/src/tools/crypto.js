import crypto from 'crypto';

function enc(passwd, text)
{
  let cipher, crypted, iv, key;

  iv = Buffer.from(crypto.randomBytes(16));

  //key must be 32 bits for cypheriv
  key = passwd + passwd + passwd.substring(0, 8);

  cipher = crypto.createCipheriv('aes-256-ctr', key, iv);
  crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');

  return `${iv.toString('hex')}:${crypted.toString()}`;
}
 
function dec(passwd, text)
{
  let decipher, decrypted, textParts, iv, key, encryptedText;
  
  textParts = text.split(':');

  //extract the IV from the first half of the value
  iv = Buffer.from(textParts.shift(), 'hex');
  //key must be 32 bits: 
  key  =  passwd + passwd + passwd.substring(0, 8);
  //extract the encrypted text without the IV
  encryptedText = Buffer.from(textParts.join(':'), 'hex');
  
  decipher = crypto.createDecipheriv('aes-256-ctr', key, iv);
  decrypted = decipher.update(encryptedText,  'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted.toString();
}
 
const CRYPTO = {
  enc:	enc,
  dec:	dec
}

export default CRYPTO;
