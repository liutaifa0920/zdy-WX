let Base64 = require("js-base64").Base64;
export function base64(str){
  return Base64.encode(str);
}