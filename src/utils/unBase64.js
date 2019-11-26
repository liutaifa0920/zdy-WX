let Base64 = require("js-base64").Base64;

export function unBase64(str) {
    return Base64.decode(str);
}