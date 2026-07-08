import OAuth from "oauth-1.0a";
import CryptoJS from "crypto-js";

const oauth = OAuth({
  consumer: {
    key: import.meta.env.VITE_FATSECRET_CONSUMER_KEY,
    secret: import.meta.env.VITE_FATSECRET_CONSUMER_SECRET,
  },
  signature_method: "HMAC-SHA1",
  hash_function(baseString, key) {
    return CryptoJS.HmacSHA1(baseString, key).toString(CryptoJS.enc.Base64);
  },
});

export default oauth;