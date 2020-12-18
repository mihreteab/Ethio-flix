import bcrypt from 'bcrypt';
import randomstring from 'randomstring';

export function generateId(length)
{
  return randomstring.generate({
    length: length,  //FIXME
    charset: 'numeric',
  })
}

/*
 * The following are heloper functions for mongodb  corner driver,
 * used to serialize nested filter objects, as mongodb nodejs driver 
 * does not support nested object filter, it needs to be serialized.
 *
 * E.g {sii: {address: 'blob'}} ----> {pii.address: 'blob'}
 *
 */
let query = {};

export function getQuery(data){
  query = {};

  let r = createQuery(data);

  return r;
}


function createQuery(data, curr){

  for(var key in data) {

    var value = data[key];
    var newKey = (curr ? curr + "." + key : key);

    if(value && typeof value === "object") {

      createQuery(value, newKey);
    } else {

      query[newKey] = value;
    }
  }

  return query;
}

export function isArray(data) {
  if (!!data && data.constructor === Array) return true;

  return false;
}
