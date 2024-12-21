/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/jwa";
exports.ids = ["vendor-chunks/jwa"];
exports.modules = {

/***/ "(ssr)/./node_modules/jwa/index.js":
/*!***********************************!*\
  !*** ./node_modules/jwa/index.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var bufferEqual = __webpack_require__(/*! buffer-equal-constant-time */ \"(ssr)/./node_modules/buffer-equal-constant-time/index.js\");\nvar Buffer = (__webpack_require__(/*! safe-buffer */ \"(ssr)/./node_modules/safe-buffer/index.js\").Buffer);\nvar crypto = __webpack_require__(/*! crypto */ \"crypto\");\nvar formatEcdsa = __webpack_require__(/*! ecdsa-sig-formatter */ \"(ssr)/./node_modules/ecdsa-sig-formatter/src/ecdsa-sig-formatter.js\");\nvar util = __webpack_require__(/*! util */ \"util\");\n\nvar MSG_INVALID_ALGORITHM = '\"%s\" is not a valid algorithm.\\n  Supported algorithms are:\\n  \"HS256\", \"HS384\", \"HS512\", \"RS256\", \"RS384\", \"RS512\", \"PS256\", \"PS384\", \"PS512\", \"ES256\", \"ES384\", \"ES512\" and \"none\".'\nvar MSG_INVALID_SECRET = 'secret must be a string or buffer';\nvar MSG_INVALID_VERIFIER_KEY = 'key must be a string or a buffer';\nvar MSG_INVALID_SIGNER_KEY = 'key must be a string, a buffer or an object';\n\nvar supportsKeyObjects = typeof crypto.createPublicKey === 'function';\nif (supportsKeyObjects) {\n  MSG_INVALID_VERIFIER_KEY += ' or a KeyObject';\n  MSG_INVALID_SECRET += 'or a KeyObject';\n}\n\nfunction checkIsPublicKey(key) {\n  if (Buffer.isBuffer(key)) {\n    return;\n  }\n\n  if (typeof key === 'string') {\n    return;\n  }\n\n  if (!supportsKeyObjects) {\n    throw typeError(MSG_INVALID_VERIFIER_KEY);\n  }\n\n  if (typeof key !== 'object') {\n    throw typeError(MSG_INVALID_VERIFIER_KEY);\n  }\n\n  if (typeof key.type !== 'string') {\n    throw typeError(MSG_INVALID_VERIFIER_KEY);\n  }\n\n  if (typeof key.asymmetricKeyType !== 'string') {\n    throw typeError(MSG_INVALID_VERIFIER_KEY);\n  }\n\n  if (typeof key.export !== 'function') {\n    throw typeError(MSG_INVALID_VERIFIER_KEY);\n  }\n};\n\nfunction checkIsPrivateKey(key) {\n  if (Buffer.isBuffer(key)) {\n    return;\n  }\n\n  if (typeof key === 'string') {\n    return;\n  }\n\n  if (typeof key === 'object') {\n    return;\n  }\n\n  throw typeError(MSG_INVALID_SIGNER_KEY);\n};\n\nfunction checkIsSecretKey(key) {\n  if (Buffer.isBuffer(key)) {\n    return;\n  }\n\n  if (typeof key === 'string') {\n    return key;\n  }\n\n  if (!supportsKeyObjects) {\n    throw typeError(MSG_INVALID_SECRET);\n  }\n\n  if (typeof key !== 'object') {\n    throw typeError(MSG_INVALID_SECRET);\n  }\n\n  if (key.type !== 'secret') {\n    throw typeError(MSG_INVALID_SECRET);\n  }\n\n  if (typeof key.export !== 'function') {\n    throw typeError(MSG_INVALID_SECRET);\n  }\n}\n\nfunction fromBase64(base64) {\n  return base64\n    .replace(/=/g, '')\n    .replace(/\\+/g, '-')\n    .replace(/\\//g, '_');\n}\n\nfunction toBase64(base64url) {\n  base64url = base64url.toString();\n\n  var padding = 4 - base64url.length % 4;\n  if (padding !== 4) {\n    for (var i = 0; i < padding; ++i) {\n      base64url += '=';\n    }\n  }\n\n  return base64url\n    .replace(/\\-/g, '+')\n    .replace(/_/g, '/');\n}\n\nfunction typeError(template) {\n  var args = [].slice.call(arguments, 1);\n  var errMsg = util.format.bind(util, template).apply(null, args);\n  return new TypeError(errMsg);\n}\n\nfunction bufferOrString(obj) {\n  return Buffer.isBuffer(obj) || typeof obj === 'string';\n}\n\nfunction normalizeInput(thing) {\n  if (!bufferOrString(thing))\n    thing = JSON.stringify(thing);\n  return thing;\n}\n\nfunction createHmacSigner(bits) {\n  return function sign(thing, secret) {\n    checkIsSecretKey(secret);\n    thing = normalizeInput(thing);\n    var hmac = crypto.createHmac('sha' + bits, secret);\n    var sig = (hmac.update(thing), hmac.digest('base64'))\n    return fromBase64(sig);\n  }\n}\n\nfunction createHmacVerifier(bits) {\n  return function verify(thing, signature, secret) {\n    var computedSig = createHmacSigner(bits)(thing, secret);\n    return bufferEqual(Buffer.from(signature), Buffer.from(computedSig));\n  }\n}\n\nfunction createKeySigner(bits) {\n return function sign(thing, privateKey) {\n    checkIsPrivateKey(privateKey);\n    thing = normalizeInput(thing);\n    // Even though we are specifying \"RSA\" here, this works with ECDSA\n    // keys as well.\n    var signer = crypto.createSign('RSA-SHA' + bits);\n    var sig = (signer.update(thing), signer.sign(privateKey, 'base64'));\n    return fromBase64(sig);\n  }\n}\n\nfunction createKeyVerifier(bits) {\n  return function verify(thing, signature, publicKey) {\n    checkIsPublicKey(publicKey);\n    thing = normalizeInput(thing);\n    signature = toBase64(signature);\n    var verifier = crypto.createVerify('RSA-SHA' + bits);\n    verifier.update(thing);\n    return verifier.verify(publicKey, signature, 'base64');\n  }\n}\n\nfunction createPSSKeySigner(bits) {\n  return function sign(thing, privateKey) {\n    checkIsPrivateKey(privateKey);\n    thing = normalizeInput(thing);\n    var signer = crypto.createSign('RSA-SHA' + bits);\n    var sig = (signer.update(thing), signer.sign({\n      key: privateKey,\n      padding: crypto.constants.RSA_PKCS1_PSS_PADDING,\n      saltLength: crypto.constants.RSA_PSS_SALTLEN_DIGEST\n    }, 'base64'));\n    return fromBase64(sig);\n  }\n}\n\nfunction createPSSKeyVerifier(bits) {\n  return function verify(thing, signature, publicKey) {\n    checkIsPublicKey(publicKey);\n    thing = normalizeInput(thing);\n    signature = toBase64(signature);\n    var verifier = crypto.createVerify('RSA-SHA' + bits);\n    verifier.update(thing);\n    return verifier.verify({\n      key: publicKey,\n      padding: crypto.constants.RSA_PKCS1_PSS_PADDING,\n      saltLength: crypto.constants.RSA_PSS_SALTLEN_DIGEST\n    }, signature, 'base64');\n  }\n}\n\nfunction createECDSASigner(bits) {\n  var inner = createKeySigner(bits);\n  return function sign() {\n    var signature = inner.apply(null, arguments);\n    signature = formatEcdsa.derToJose(signature, 'ES' + bits);\n    return signature;\n  };\n}\n\nfunction createECDSAVerifer(bits) {\n  var inner = createKeyVerifier(bits);\n  return function verify(thing, signature, publicKey) {\n    signature = formatEcdsa.joseToDer(signature, 'ES' + bits).toString('base64');\n    var result = inner(thing, signature, publicKey);\n    return result;\n  };\n}\n\nfunction createNoneSigner() {\n  return function sign() {\n    return '';\n  }\n}\n\nfunction createNoneVerifier() {\n  return function verify(thing, signature) {\n    return signature === '';\n  }\n}\n\nmodule.exports = function jwa(algorithm) {\n  var signerFactories = {\n    hs: createHmacSigner,\n    rs: createKeySigner,\n    ps: createPSSKeySigner,\n    es: createECDSASigner,\n    none: createNoneSigner,\n  }\n  var verifierFactories = {\n    hs: createHmacVerifier,\n    rs: createKeyVerifier,\n    ps: createPSSKeyVerifier,\n    es: createECDSAVerifer,\n    none: createNoneVerifier,\n  }\n  var match = algorithm.match(/^(RS|PS|ES|HS)(256|384|512)$|^(none)$/i);\n  if (!match)\n    throw typeError(MSG_INVALID_ALGORITHM, algorithm);\n  var algo = (match[1] || match[3]).toLowerCase();\n  var bits = match[2];\n\n  return {\n    sign: signerFactories[algo](bits),\n    verify: verifierFactories[algo](bits),\n  }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvandhL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFBLGtCQUFrQixtQkFBTyxDQUFDLDRGQUE0QjtBQUN0RCxhQUFhLDRGQUE2QjtBQUMxQyxhQUFhLG1CQUFPLENBQUMsc0JBQVE7QUFDN0Isa0JBQWtCLG1CQUFPLENBQUMsZ0dBQXFCO0FBQy9DLFdBQVcsbUJBQU8sQ0FBQyxrQkFBTTs7QUFFekI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG9CQUFvQixhQUFhO0FBQ2pDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3lvb20vLi9ub2RlX21vZHVsZXMvandhL2luZGV4LmpzP2NjNWIiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGJ1ZmZlckVxdWFsID0gcmVxdWlyZSgnYnVmZmVyLWVxdWFsLWNvbnN0YW50LXRpbWUnKTtcbnZhciBCdWZmZXIgPSByZXF1aXJlKCdzYWZlLWJ1ZmZlcicpLkJ1ZmZlcjtcbnZhciBjcnlwdG8gPSByZXF1aXJlKCdjcnlwdG8nKTtcbnZhciBmb3JtYXRFY2RzYSA9IHJlcXVpcmUoJ2VjZHNhLXNpZy1mb3JtYXR0ZXInKTtcbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbCcpO1xuXG52YXIgTVNHX0lOVkFMSURfQUxHT1JJVEhNID0gJ1wiJXNcIiBpcyBub3QgYSB2YWxpZCBhbGdvcml0aG0uXFxuICBTdXBwb3J0ZWQgYWxnb3JpdGhtcyBhcmU6XFxuICBcIkhTMjU2XCIsIFwiSFMzODRcIiwgXCJIUzUxMlwiLCBcIlJTMjU2XCIsIFwiUlMzODRcIiwgXCJSUzUxMlwiLCBcIlBTMjU2XCIsIFwiUFMzODRcIiwgXCJQUzUxMlwiLCBcIkVTMjU2XCIsIFwiRVMzODRcIiwgXCJFUzUxMlwiIGFuZCBcIm5vbmVcIi4nXG52YXIgTVNHX0lOVkFMSURfU0VDUkVUID0gJ3NlY3JldCBtdXN0IGJlIGEgc3RyaW5nIG9yIGJ1ZmZlcic7XG52YXIgTVNHX0lOVkFMSURfVkVSSUZJRVJfS0VZID0gJ2tleSBtdXN0IGJlIGEgc3RyaW5nIG9yIGEgYnVmZmVyJztcbnZhciBNU0dfSU5WQUxJRF9TSUdORVJfS0VZID0gJ2tleSBtdXN0IGJlIGEgc3RyaW5nLCBhIGJ1ZmZlciBvciBhbiBvYmplY3QnO1xuXG52YXIgc3VwcG9ydHNLZXlPYmplY3RzID0gdHlwZW9mIGNyeXB0by5jcmVhdGVQdWJsaWNLZXkgPT09ICdmdW5jdGlvbic7XG5pZiAoc3VwcG9ydHNLZXlPYmplY3RzKSB7XG4gIE1TR19JTlZBTElEX1ZFUklGSUVSX0tFWSArPSAnIG9yIGEgS2V5T2JqZWN0JztcbiAgTVNHX0lOVkFMSURfU0VDUkVUICs9ICdvciBhIEtleU9iamVjdCc7XG59XG5cbmZ1bmN0aW9uIGNoZWNrSXNQdWJsaWNLZXkoa2V5KSB7XG4gIGlmIChCdWZmZXIuaXNCdWZmZXIoa2V5KSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmICh0eXBlb2Yga2V5ID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmICghc3VwcG9ydHNLZXlPYmplY3RzKSB7XG4gICAgdGhyb3cgdHlwZUVycm9yKE1TR19JTlZBTElEX1ZFUklGSUVSX0tFWSk7XG4gIH1cblxuICBpZiAodHlwZW9mIGtleSAhPT0gJ29iamVjdCcpIHtcbiAgICB0aHJvdyB0eXBlRXJyb3IoTVNHX0lOVkFMSURfVkVSSUZJRVJfS0VZKTtcbiAgfVxuXG4gIGlmICh0eXBlb2Yga2V5LnR5cGUgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgdHlwZUVycm9yKE1TR19JTlZBTElEX1ZFUklGSUVSX0tFWSk7XG4gIH1cblxuICBpZiAodHlwZW9mIGtleS5hc3ltbWV0cmljS2V5VHlwZSAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyB0eXBlRXJyb3IoTVNHX0lOVkFMSURfVkVSSUZJRVJfS0VZKTtcbiAgfVxuXG4gIGlmICh0eXBlb2Yga2V5LmV4cG9ydCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IHR5cGVFcnJvcihNU0dfSU5WQUxJRF9WRVJJRklFUl9LRVkpO1xuICB9XG59O1xuXG5mdW5jdGlvbiBjaGVja0lzUHJpdmF0ZUtleShrZXkpIHtcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihrZXkpKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBrZXkgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBrZXkgPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdGhyb3cgdHlwZUVycm9yKE1TR19JTlZBTElEX1NJR05FUl9LRVkpO1xufTtcblxuZnVuY3Rpb24gY2hlY2tJc1NlY3JldEtleShrZXkpIHtcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihrZXkpKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBrZXkgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGtleTtcbiAgfVxuXG4gIGlmICghc3VwcG9ydHNLZXlPYmplY3RzKSB7XG4gICAgdGhyb3cgdHlwZUVycm9yKE1TR19JTlZBTElEX1NFQ1JFVCk7XG4gIH1cblxuICBpZiAodHlwZW9mIGtleSAhPT0gJ29iamVjdCcpIHtcbiAgICB0aHJvdyB0eXBlRXJyb3IoTVNHX0lOVkFMSURfU0VDUkVUKTtcbiAgfVxuXG4gIGlmIChrZXkudHlwZSAhPT0gJ3NlY3JldCcpIHtcbiAgICB0aHJvdyB0eXBlRXJyb3IoTVNHX0lOVkFMSURfU0VDUkVUKTtcbiAgfVxuXG4gIGlmICh0eXBlb2Yga2V5LmV4cG9ydCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IHR5cGVFcnJvcihNU0dfSU5WQUxJRF9TRUNSRVQpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGZyb21CYXNlNjQoYmFzZTY0KSB7XG4gIHJldHVybiBiYXNlNjRcbiAgICAucmVwbGFjZSgvPS9nLCAnJylcbiAgICAucmVwbGFjZSgvXFwrL2csICctJylcbiAgICAucmVwbGFjZSgvXFwvL2csICdfJyk7XG59XG5cbmZ1bmN0aW9uIHRvQmFzZTY0KGJhc2U2NHVybCkge1xuICBiYXNlNjR1cmwgPSBiYXNlNjR1cmwudG9TdHJpbmcoKTtcblxuICB2YXIgcGFkZGluZyA9IDQgLSBiYXNlNjR1cmwubGVuZ3RoICUgNDtcbiAgaWYgKHBhZGRpbmcgIT09IDQpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhZGRpbmc7ICsraSkge1xuICAgICAgYmFzZTY0dXJsICs9ICc9JztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYmFzZTY0dXJsXG4gICAgLnJlcGxhY2UoL1xcLS9nLCAnKycpXG4gICAgLnJlcGxhY2UoL18vZywgJy8nKTtcbn1cblxuZnVuY3Rpb24gdHlwZUVycm9yKHRlbXBsYXRlKSB7XG4gIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICB2YXIgZXJyTXNnID0gdXRpbC5mb3JtYXQuYmluZCh1dGlsLCB0ZW1wbGF0ZSkuYXBwbHkobnVsbCwgYXJncyk7XG4gIHJldHVybiBuZXcgVHlwZUVycm9yKGVyck1zZyk7XG59XG5cbmZ1bmN0aW9uIGJ1ZmZlck9yU3RyaW5nKG9iaikge1xuICByZXR1cm4gQnVmZmVyLmlzQnVmZmVyKG9iaikgfHwgdHlwZW9mIG9iaiA9PT0gJ3N0cmluZyc7XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZUlucHV0KHRoaW5nKSB7XG4gIGlmICghYnVmZmVyT3JTdHJpbmcodGhpbmcpKVxuICAgIHRoaW5nID0gSlNPTi5zdHJpbmdpZnkodGhpbmcpO1xuICByZXR1cm4gdGhpbmc7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUhtYWNTaWduZXIoYml0cykge1xuICByZXR1cm4gZnVuY3Rpb24gc2lnbih0aGluZywgc2VjcmV0KSB7XG4gICAgY2hlY2tJc1NlY3JldEtleShzZWNyZXQpO1xuICAgIHRoaW5nID0gbm9ybWFsaXplSW5wdXQodGhpbmcpO1xuICAgIHZhciBobWFjID0gY3J5cHRvLmNyZWF0ZUhtYWMoJ3NoYScgKyBiaXRzLCBzZWNyZXQpO1xuICAgIHZhciBzaWcgPSAoaG1hYy51cGRhdGUodGhpbmcpLCBobWFjLmRpZ2VzdCgnYmFzZTY0JykpXG4gICAgcmV0dXJuIGZyb21CYXNlNjQoc2lnKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVIbWFjVmVyaWZpZXIoYml0cykge1xuICByZXR1cm4gZnVuY3Rpb24gdmVyaWZ5KHRoaW5nLCBzaWduYXR1cmUsIHNlY3JldCkge1xuICAgIHZhciBjb21wdXRlZFNpZyA9IGNyZWF0ZUhtYWNTaWduZXIoYml0cykodGhpbmcsIHNlY3JldCk7XG4gICAgcmV0dXJuIGJ1ZmZlckVxdWFsKEJ1ZmZlci5mcm9tKHNpZ25hdHVyZSksIEJ1ZmZlci5mcm9tKGNvbXB1dGVkU2lnKSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlS2V5U2lnbmVyKGJpdHMpIHtcbiByZXR1cm4gZnVuY3Rpb24gc2lnbih0aGluZywgcHJpdmF0ZUtleSkge1xuICAgIGNoZWNrSXNQcml2YXRlS2V5KHByaXZhdGVLZXkpO1xuICAgIHRoaW5nID0gbm9ybWFsaXplSW5wdXQodGhpbmcpO1xuICAgIC8vIEV2ZW4gdGhvdWdoIHdlIGFyZSBzcGVjaWZ5aW5nIFwiUlNBXCIgaGVyZSwgdGhpcyB3b3JrcyB3aXRoIEVDRFNBXG4gICAgLy8ga2V5cyBhcyB3ZWxsLlxuICAgIHZhciBzaWduZXIgPSBjcnlwdG8uY3JlYXRlU2lnbignUlNBLVNIQScgKyBiaXRzKTtcbiAgICB2YXIgc2lnID0gKHNpZ25lci51cGRhdGUodGhpbmcpLCBzaWduZXIuc2lnbihwcml2YXRlS2V5LCAnYmFzZTY0JykpO1xuICAgIHJldHVybiBmcm9tQmFzZTY0KHNpZyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlS2V5VmVyaWZpZXIoYml0cykge1xuICByZXR1cm4gZnVuY3Rpb24gdmVyaWZ5KHRoaW5nLCBzaWduYXR1cmUsIHB1YmxpY0tleSkge1xuICAgIGNoZWNrSXNQdWJsaWNLZXkocHVibGljS2V5KTtcbiAgICB0aGluZyA9IG5vcm1hbGl6ZUlucHV0KHRoaW5nKTtcbiAgICBzaWduYXR1cmUgPSB0b0Jhc2U2NChzaWduYXR1cmUpO1xuICAgIHZhciB2ZXJpZmllciA9IGNyeXB0by5jcmVhdGVWZXJpZnkoJ1JTQS1TSEEnICsgYml0cyk7XG4gICAgdmVyaWZpZXIudXBkYXRlKHRoaW5nKTtcbiAgICByZXR1cm4gdmVyaWZpZXIudmVyaWZ5KHB1YmxpY0tleSwgc2lnbmF0dXJlLCAnYmFzZTY0Jyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlUFNTS2V5U2lnbmVyKGJpdHMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHNpZ24odGhpbmcsIHByaXZhdGVLZXkpIHtcbiAgICBjaGVja0lzUHJpdmF0ZUtleShwcml2YXRlS2V5KTtcbiAgICB0aGluZyA9IG5vcm1hbGl6ZUlucHV0KHRoaW5nKTtcbiAgICB2YXIgc2lnbmVyID0gY3J5cHRvLmNyZWF0ZVNpZ24oJ1JTQS1TSEEnICsgYml0cyk7XG4gICAgdmFyIHNpZyA9IChzaWduZXIudXBkYXRlKHRoaW5nKSwgc2lnbmVyLnNpZ24oe1xuICAgICAga2V5OiBwcml2YXRlS2V5LFxuICAgICAgcGFkZGluZzogY3J5cHRvLmNvbnN0YW50cy5SU0FfUEtDUzFfUFNTX1BBRERJTkcsXG4gICAgICBzYWx0TGVuZ3RoOiBjcnlwdG8uY29uc3RhbnRzLlJTQV9QU1NfU0FMVExFTl9ESUdFU1RcbiAgICB9LCAnYmFzZTY0JykpO1xuICAgIHJldHVybiBmcm9tQmFzZTY0KHNpZyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlUFNTS2V5VmVyaWZpZXIoYml0cykge1xuICByZXR1cm4gZnVuY3Rpb24gdmVyaWZ5KHRoaW5nLCBzaWduYXR1cmUsIHB1YmxpY0tleSkge1xuICAgIGNoZWNrSXNQdWJsaWNLZXkocHVibGljS2V5KTtcbiAgICB0aGluZyA9IG5vcm1hbGl6ZUlucHV0KHRoaW5nKTtcbiAgICBzaWduYXR1cmUgPSB0b0Jhc2U2NChzaWduYXR1cmUpO1xuICAgIHZhciB2ZXJpZmllciA9IGNyeXB0by5jcmVhdGVWZXJpZnkoJ1JTQS1TSEEnICsgYml0cyk7XG4gICAgdmVyaWZpZXIudXBkYXRlKHRoaW5nKTtcbiAgICByZXR1cm4gdmVyaWZpZXIudmVyaWZ5KHtcbiAgICAgIGtleTogcHVibGljS2V5LFxuICAgICAgcGFkZGluZzogY3J5cHRvLmNvbnN0YW50cy5SU0FfUEtDUzFfUFNTX1BBRERJTkcsXG4gICAgICBzYWx0TGVuZ3RoOiBjcnlwdG8uY29uc3RhbnRzLlJTQV9QU1NfU0FMVExFTl9ESUdFU1RcbiAgICB9LCBzaWduYXR1cmUsICdiYXNlNjQnKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVFQ0RTQVNpZ25lcihiaXRzKSB7XG4gIHZhciBpbm5lciA9IGNyZWF0ZUtleVNpZ25lcihiaXRzKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHNpZ24oKSB7XG4gICAgdmFyIHNpZ25hdHVyZSA9IGlubmVyLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgc2lnbmF0dXJlID0gZm9ybWF0RWNkc2EuZGVyVG9Kb3NlKHNpZ25hdHVyZSwgJ0VTJyArIGJpdHMpO1xuICAgIHJldHVybiBzaWduYXR1cmU7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUVDRFNBVmVyaWZlcihiaXRzKSB7XG4gIHZhciBpbm5lciA9IGNyZWF0ZUtleVZlcmlmaWVyKGJpdHMpO1xuICByZXR1cm4gZnVuY3Rpb24gdmVyaWZ5KHRoaW5nLCBzaWduYXR1cmUsIHB1YmxpY0tleSkge1xuICAgIHNpZ25hdHVyZSA9IGZvcm1hdEVjZHNhLmpvc2VUb0RlcihzaWduYXR1cmUsICdFUycgKyBiaXRzKS50b1N0cmluZygnYmFzZTY0Jyk7XG4gICAgdmFyIHJlc3VsdCA9IGlubmVyKHRoaW5nLCBzaWduYXR1cmUsIHB1YmxpY0tleSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTm9uZVNpZ25lcigpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHNpZ24oKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU5vbmVWZXJpZmllcigpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHZlcmlmeSh0aGluZywgc2lnbmF0dXJlKSB7XG4gICAgcmV0dXJuIHNpZ25hdHVyZSA9PT0gJyc7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBqd2EoYWxnb3JpdGhtKSB7XG4gIHZhciBzaWduZXJGYWN0b3JpZXMgPSB7XG4gICAgaHM6IGNyZWF0ZUhtYWNTaWduZXIsXG4gICAgcnM6IGNyZWF0ZUtleVNpZ25lcixcbiAgICBwczogY3JlYXRlUFNTS2V5U2lnbmVyLFxuICAgIGVzOiBjcmVhdGVFQ0RTQVNpZ25lcixcbiAgICBub25lOiBjcmVhdGVOb25lU2lnbmVyLFxuICB9XG4gIHZhciB2ZXJpZmllckZhY3RvcmllcyA9IHtcbiAgICBoczogY3JlYXRlSG1hY1ZlcmlmaWVyLFxuICAgIHJzOiBjcmVhdGVLZXlWZXJpZmllcixcbiAgICBwczogY3JlYXRlUFNTS2V5VmVyaWZpZXIsXG4gICAgZXM6IGNyZWF0ZUVDRFNBVmVyaWZlcixcbiAgICBub25lOiBjcmVhdGVOb25lVmVyaWZpZXIsXG4gIH1cbiAgdmFyIG1hdGNoID0gYWxnb3JpdGhtLm1hdGNoKC9eKFJTfFBTfEVTfEhTKSgyNTZ8Mzg0fDUxMikkfF4obm9uZSkkL2kpO1xuICBpZiAoIW1hdGNoKVxuICAgIHRocm93IHR5cGVFcnJvcihNU0dfSU5WQUxJRF9BTEdPUklUSE0sIGFsZ29yaXRobSk7XG4gIHZhciBhbGdvID0gKG1hdGNoWzFdIHx8IG1hdGNoWzNdKS50b0xvd2VyQ2FzZSgpO1xuICB2YXIgYml0cyA9IG1hdGNoWzJdO1xuXG4gIHJldHVybiB7XG4gICAgc2lnbjogc2lnbmVyRmFjdG9yaWVzW2FsZ29dKGJpdHMpLFxuICAgIHZlcmlmeTogdmVyaWZpZXJGYWN0b3JpZXNbYWxnb10oYml0cyksXG4gIH1cbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/jwa/index.js\n");

/***/ }),

/***/ "(action-browser)/./node_modules/jwa/index.js":
/*!***********************************!*\
  !*** ./node_modules/jwa/index.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var bufferEqual = __webpack_require__(/*! buffer-equal-constant-time */ \"(action-browser)/./node_modules/buffer-equal-constant-time/index.js\");\nvar Buffer = (__webpack_require__(/*! safe-buffer */ \"(action-browser)/./node_modules/safe-buffer/index.js\").Buffer);\nvar crypto = __webpack_require__(/*! crypto */ \"crypto\");\nvar formatEcdsa = __webpack_require__(/*! ecdsa-sig-formatter */ \"(action-browser)/./node_modules/ecdsa-sig-formatter/src/ecdsa-sig-formatter.js\");\nvar util = __webpack_require__(/*! util */ \"util\");\n\nvar MSG_INVALID_ALGORITHM = '\"%s\" is not a valid algorithm.\\n  Supported algorithms are:\\n  \"HS256\", \"HS384\", \"HS512\", \"RS256\", \"RS384\", \"RS512\", \"PS256\", \"PS384\", \"PS512\", \"ES256\", \"ES384\", \"ES512\" and \"none\".'\nvar MSG_INVALID_SECRET = 'secret must be a string or buffer';\nvar MSG_INVALID_VERIFIER_KEY = 'key must be a string or a buffer';\nvar MSG_INVALID_SIGNER_KEY = 'key must be a string, a buffer or an object';\n\nvar supportsKeyObjects = typeof crypto.createPublicKey === 'function';\nif (supportsKeyObjects) {\n  MSG_INVALID_VERIFIER_KEY += ' or a KeyObject';\n  MSG_INVALID_SECRET += 'or a KeyObject';\n}\n\nfunction checkIsPublicKey(key) {\n  if (Buffer.isBuffer(key)) {\n    return;\n  }\n\n  if (typeof key === 'string') {\n    return;\n  }\n\n  if (!supportsKeyObjects) {\n    throw typeError(MSG_INVALID_VERIFIER_KEY);\n  }\n\n  if (typeof key !== 'object') {\n    throw typeError(MSG_INVALID_VERIFIER_KEY);\n  }\n\n  if (typeof key.type !== 'string') {\n    throw typeError(MSG_INVALID_VERIFIER_KEY);\n  }\n\n  if (typeof key.asymmetricKeyType !== 'string') {\n    throw typeError(MSG_INVALID_VERIFIER_KEY);\n  }\n\n  if (typeof key.export !== 'function') {\n    throw typeError(MSG_INVALID_VERIFIER_KEY);\n  }\n};\n\nfunction checkIsPrivateKey(key) {\n  if (Buffer.isBuffer(key)) {\n    return;\n  }\n\n  if (typeof key === 'string') {\n    return;\n  }\n\n  if (typeof key === 'object') {\n    return;\n  }\n\n  throw typeError(MSG_INVALID_SIGNER_KEY);\n};\n\nfunction checkIsSecretKey(key) {\n  if (Buffer.isBuffer(key)) {\n    return;\n  }\n\n  if (typeof key === 'string') {\n    return key;\n  }\n\n  if (!supportsKeyObjects) {\n    throw typeError(MSG_INVALID_SECRET);\n  }\n\n  if (typeof key !== 'object') {\n    throw typeError(MSG_INVALID_SECRET);\n  }\n\n  if (key.type !== 'secret') {\n    throw typeError(MSG_INVALID_SECRET);\n  }\n\n  if (typeof key.export !== 'function') {\n    throw typeError(MSG_INVALID_SECRET);\n  }\n}\n\nfunction fromBase64(base64) {\n  return base64\n    .replace(/=/g, '')\n    .replace(/\\+/g, '-')\n    .replace(/\\//g, '_');\n}\n\nfunction toBase64(base64url) {\n  base64url = base64url.toString();\n\n  var padding = 4 - base64url.length % 4;\n  if (padding !== 4) {\n    for (var i = 0; i < padding; ++i) {\n      base64url += '=';\n    }\n  }\n\n  return base64url\n    .replace(/\\-/g, '+')\n    .replace(/_/g, '/');\n}\n\nfunction typeError(template) {\n  var args = [].slice.call(arguments, 1);\n  var errMsg = util.format.bind(util, template).apply(null, args);\n  return new TypeError(errMsg);\n}\n\nfunction bufferOrString(obj) {\n  return Buffer.isBuffer(obj) || typeof obj === 'string';\n}\n\nfunction normalizeInput(thing) {\n  if (!bufferOrString(thing))\n    thing = JSON.stringify(thing);\n  return thing;\n}\n\nfunction createHmacSigner(bits) {\n  return function sign(thing, secret) {\n    checkIsSecretKey(secret);\n    thing = normalizeInput(thing);\n    var hmac = crypto.createHmac('sha' + bits, secret);\n    var sig = (hmac.update(thing), hmac.digest('base64'))\n    return fromBase64(sig);\n  }\n}\n\nfunction createHmacVerifier(bits) {\n  return function verify(thing, signature, secret) {\n    var computedSig = createHmacSigner(bits)(thing, secret);\n    return bufferEqual(Buffer.from(signature), Buffer.from(computedSig));\n  }\n}\n\nfunction createKeySigner(bits) {\n return function sign(thing, privateKey) {\n    checkIsPrivateKey(privateKey);\n    thing = normalizeInput(thing);\n    // Even though we are specifying \"RSA\" here, this works with ECDSA\n    // keys as well.\n    var signer = crypto.createSign('RSA-SHA' + bits);\n    var sig = (signer.update(thing), signer.sign(privateKey, 'base64'));\n    return fromBase64(sig);\n  }\n}\n\nfunction createKeyVerifier(bits) {\n  return function verify(thing, signature, publicKey) {\n    checkIsPublicKey(publicKey);\n    thing = normalizeInput(thing);\n    signature = toBase64(signature);\n    var verifier = crypto.createVerify('RSA-SHA' + bits);\n    verifier.update(thing);\n    return verifier.verify(publicKey, signature, 'base64');\n  }\n}\n\nfunction createPSSKeySigner(bits) {\n  return function sign(thing, privateKey) {\n    checkIsPrivateKey(privateKey);\n    thing = normalizeInput(thing);\n    var signer = crypto.createSign('RSA-SHA' + bits);\n    var sig = (signer.update(thing), signer.sign({\n      key: privateKey,\n      padding: crypto.constants.RSA_PKCS1_PSS_PADDING,\n      saltLength: crypto.constants.RSA_PSS_SALTLEN_DIGEST\n    }, 'base64'));\n    return fromBase64(sig);\n  }\n}\n\nfunction createPSSKeyVerifier(bits) {\n  return function verify(thing, signature, publicKey) {\n    checkIsPublicKey(publicKey);\n    thing = normalizeInput(thing);\n    signature = toBase64(signature);\n    var verifier = crypto.createVerify('RSA-SHA' + bits);\n    verifier.update(thing);\n    return verifier.verify({\n      key: publicKey,\n      padding: crypto.constants.RSA_PKCS1_PSS_PADDING,\n      saltLength: crypto.constants.RSA_PSS_SALTLEN_DIGEST\n    }, signature, 'base64');\n  }\n}\n\nfunction createECDSASigner(bits) {\n  var inner = createKeySigner(bits);\n  return function sign() {\n    var signature = inner.apply(null, arguments);\n    signature = formatEcdsa.derToJose(signature, 'ES' + bits);\n    return signature;\n  };\n}\n\nfunction createECDSAVerifer(bits) {\n  var inner = createKeyVerifier(bits);\n  return function verify(thing, signature, publicKey) {\n    signature = formatEcdsa.joseToDer(signature, 'ES' + bits).toString('base64');\n    var result = inner(thing, signature, publicKey);\n    return result;\n  };\n}\n\nfunction createNoneSigner() {\n  return function sign() {\n    return '';\n  }\n}\n\nfunction createNoneVerifier() {\n  return function verify(thing, signature) {\n    return signature === '';\n  }\n}\n\nmodule.exports = function jwa(algorithm) {\n  var signerFactories = {\n    hs: createHmacSigner,\n    rs: createKeySigner,\n    ps: createPSSKeySigner,\n    es: createECDSASigner,\n    none: createNoneSigner,\n  }\n  var verifierFactories = {\n    hs: createHmacVerifier,\n    rs: createKeyVerifier,\n    ps: createPSSKeyVerifier,\n    es: createECDSAVerifer,\n    none: createNoneVerifier,\n  }\n  var match = algorithm.match(/^(RS|PS|ES|HS)(256|384|512)$|^(none)$/i);\n  if (!match)\n    throw typeError(MSG_INVALID_ALGORITHM, algorithm);\n  var algo = (match[1] || match[3]).toLowerCase();\n  var bits = match[2];\n\n  return {\n    sign: signerFactories[algo](bits),\n    verify: verifierFactories[algo](bits),\n  }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFjdGlvbi1icm93c2VyKS8uL25vZGVfbW9kdWxlcy9qd2EvaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQUEsa0JBQWtCLG1CQUFPLENBQUMsdUdBQTRCO0FBQ3RELGFBQWEsdUdBQTZCO0FBQzFDLGFBQWEsbUJBQU8sQ0FBQyxzQkFBUTtBQUM3QixrQkFBa0IsbUJBQU8sQ0FBQywyR0FBcUI7QUFDL0MsV0FBVyxtQkFBTyxDQUFDLGtCQUFNOztBQUV6QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0JBQW9CLGFBQWE7QUFDakM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8veW9vbS8uL25vZGVfbW9kdWxlcy9qd2EvaW5kZXguanM/MWVjYiJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYnVmZmVyRXF1YWwgPSByZXF1aXJlKCdidWZmZXItZXF1YWwtY29uc3RhbnQtdGltZScpO1xudmFyIEJ1ZmZlciA9IHJlcXVpcmUoJ3NhZmUtYnVmZmVyJykuQnVmZmVyO1xudmFyIGNyeXB0byA9IHJlcXVpcmUoJ2NyeXB0bycpO1xudmFyIGZvcm1hdEVjZHNhID0gcmVxdWlyZSgnZWNkc2Etc2lnLWZvcm1hdHRlcicpO1xudmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsJyk7XG5cbnZhciBNU0dfSU5WQUxJRF9BTEdPUklUSE0gPSAnXCIlc1wiIGlzIG5vdCBhIHZhbGlkIGFsZ29yaXRobS5cXG4gIFN1cHBvcnRlZCBhbGdvcml0aG1zIGFyZTpcXG4gIFwiSFMyNTZcIiwgXCJIUzM4NFwiLCBcIkhTNTEyXCIsIFwiUlMyNTZcIiwgXCJSUzM4NFwiLCBcIlJTNTEyXCIsIFwiUFMyNTZcIiwgXCJQUzM4NFwiLCBcIlBTNTEyXCIsIFwiRVMyNTZcIiwgXCJFUzM4NFwiLCBcIkVTNTEyXCIgYW5kIFwibm9uZVwiLidcbnZhciBNU0dfSU5WQUxJRF9TRUNSRVQgPSAnc2VjcmV0IG11c3QgYmUgYSBzdHJpbmcgb3IgYnVmZmVyJztcbnZhciBNU0dfSU5WQUxJRF9WRVJJRklFUl9LRVkgPSAna2V5IG11c3QgYmUgYSBzdHJpbmcgb3IgYSBidWZmZXInO1xudmFyIE1TR19JTlZBTElEX1NJR05FUl9LRVkgPSAna2V5IG11c3QgYmUgYSBzdHJpbmcsIGEgYnVmZmVyIG9yIGFuIG9iamVjdCc7XG5cbnZhciBzdXBwb3J0c0tleU9iamVjdHMgPSB0eXBlb2YgY3J5cHRvLmNyZWF0ZVB1YmxpY0tleSA9PT0gJ2Z1bmN0aW9uJztcbmlmIChzdXBwb3J0c0tleU9iamVjdHMpIHtcbiAgTVNHX0lOVkFMSURfVkVSSUZJRVJfS0VZICs9ICcgb3IgYSBLZXlPYmplY3QnO1xuICBNU0dfSU5WQUxJRF9TRUNSRVQgKz0gJ29yIGEgS2V5T2JqZWN0Jztcbn1cblxuZnVuY3Rpb24gY2hlY2tJc1B1YmxpY0tleShrZXkpIHtcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihrZXkpKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBrZXkgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKCFzdXBwb3J0c0tleU9iamVjdHMpIHtcbiAgICB0aHJvdyB0eXBlRXJyb3IoTVNHX0lOVkFMSURfVkVSSUZJRVJfS0VZKTtcbiAgfVxuXG4gIGlmICh0eXBlb2Yga2V5ICE9PSAnb2JqZWN0Jykge1xuICAgIHRocm93IHR5cGVFcnJvcihNU0dfSU5WQUxJRF9WRVJJRklFUl9LRVkpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBrZXkudHlwZSAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyB0eXBlRXJyb3IoTVNHX0lOVkFMSURfVkVSSUZJRVJfS0VZKTtcbiAgfVxuXG4gIGlmICh0eXBlb2Yga2V5LmFzeW1tZXRyaWNLZXlUeXBlICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IHR5cGVFcnJvcihNU0dfSU5WQUxJRF9WRVJJRklFUl9LRVkpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBrZXkuZXhwb3J0ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgdHlwZUVycm9yKE1TR19JTlZBTElEX1ZFUklGSUVSX0tFWSk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIGNoZWNrSXNQcml2YXRlS2V5KGtleSkge1xuICBpZiAoQnVmZmVyLmlzQnVmZmVyKGtleSkpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAodHlwZW9mIGtleSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAodHlwZW9mIGtleSA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB0aHJvdyB0eXBlRXJyb3IoTVNHX0lOVkFMSURfU0lHTkVSX0tFWSk7XG59O1xuXG5mdW5jdGlvbiBjaGVja0lzU2VjcmV0S2V5KGtleSkge1xuICBpZiAoQnVmZmVyLmlzQnVmZmVyKGtleSkpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAodHlwZW9mIGtleSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4ga2V5O1xuICB9XG5cbiAgaWYgKCFzdXBwb3J0c0tleU9iamVjdHMpIHtcbiAgICB0aHJvdyB0eXBlRXJyb3IoTVNHX0lOVkFMSURfU0VDUkVUKTtcbiAgfVxuXG4gIGlmICh0eXBlb2Yga2V5ICE9PSAnb2JqZWN0Jykge1xuICAgIHRocm93IHR5cGVFcnJvcihNU0dfSU5WQUxJRF9TRUNSRVQpO1xuICB9XG5cbiAgaWYgKGtleS50eXBlICE9PSAnc2VjcmV0Jykge1xuICAgIHRocm93IHR5cGVFcnJvcihNU0dfSU5WQUxJRF9TRUNSRVQpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBrZXkuZXhwb3J0ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgdHlwZUVycm9yKE1TR19JTlZBTElEX1NFQ1JFVCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZnJvbUJhc2U2NChiYXNlNjQpIHtcbiAgcmV0dXJuIGJhc2U2NFxuICAgIC5yZXBsYWNlKC89L2csICcnKVxuICAgIC5yZXBsYWNlKC9cXCsvZywgJy0nKVxuICAgIC5yZXBsYWNlKC9cXC8vZywgJ18nKTtcbn1cblxuZnVuY3Rpb24gdG9CYXNlNjQoYmFzZTY0dXJsKSB7XG4gIGJhc2U2NHVybCA9IGJhc2U2NHVybC50b1N0cmluZygpO1xuXG4gIHZhciBwYWRkaW5nID0gNCAtIGJhc2U2NHVybC5sZW5ndGggJSA0O1xuICBpZiAocGFkZGluZyAhPT0gNCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFkZGluZzsgKytpKSB7XG4gICAgICBiYXNlNjR1cmwgKz0gJz0nO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBiYXNlNjR1cmxcbiAgICAucmVwbGFjZSgvXFwtL2csICcrJylcbiAgICAucmVwbGFjZSgvXy9nLCAnLycpO1xufVxuXG5mdW5jdGlvbiB0eXBlRXJyb3IodGVtcGxhdGUpIHtcbiAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gIHZhciBlcnJNc2cgPSB1dGlsLmZvcm1hdC5iaW5kKHV0aWwsIHRlbXBsYXRlKS5hcHBseShudWxsLCBhcmdzKTtcbiAgcmV0dXJuIG5ldyBUeXBlRXJyb3IoZXJyTXNnKTtcbn1cblxuZnVuY3Rpb24gYnVmZmVyT3JTdHJpbmcob2JqKSB7XG4gIHJldHVybiBCdWZmZXIuaXNCdWZmZXIob2JqKSB8fCB0eXBlb2Ygb2JqID09PSAnc3RyaW5nJztcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplSW5wdXQodGhpbmcpIHtcbiAgaWYgKCFidWZmZXJPclN0cmluZyh0aGluZykpXG4gICAgdGhpbmcgPSBKU09OLnN0cmluZ2lmeSh0aGluZyk7XG4gIHJldHVybiB0aGluZztcbn1cblxuZnVuY3Rpb24gY3JlYXRlSG1hY1NpZ25lcihiaXRzKSB7XG4gIHJldHVybiBmdW5jdGlvbiBzaWduKHRoaW5nLCBzZWNyZXQpIHtcbiAgICBjaGVja0lzU2VjcmV0S2V5KHNlY3JldCk7XG4gICAgdGhpbmcgPSBub3JtYWxpemVJbnB1dCh0aGluZyk7XG4gICAgdmFyIGhtYWMgPSBjcnlwdG8uY3JlYXRlSG1hYygnc2hhJyArIGJpdHMsIHNlY3JldCk7XG4gICAgdmFyIHNpZyA9IChobWFjLnVwZGF0ZSh0aGluZyksIGhtYWMuZGlnZXN0KCdiYXNlNjQnKSlcbiAgICByZXR1cm4gZnJvbUJhc2U2NChzaWcpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUhtYWNWZXJpZmllcihiaXRzKSB7XG4gIHJldHVybiBmdW5jdGlvbiB2ZXJpZnkodGhpbmcsIHNpZ25hdHVyZSwgc2VjcmV0KSB7XG4gICAgdmFyIGNvbXB1dGVkU2lnID0gY3JlYXRlSG1hY1NpZ25lcihiaXRzKSh0aGluZywgc2VjcmV0KTtcbiAgICByZXR1cm4gYnVmZmVyRXF1YWwoQnVmZmVyLmZyb20oc2lnbmF0dXJlKSwgQnVmZmVyLmZyb20oY29tcHV0ZWRTaWcpKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVLZXlTaWduZXIoYml0cykge1xuIHJldHVybiBmdW5jdGlvbiBzaWduKHRoaW5nLCBwcml2YXRlS2V5KSB7XG4gICAgY2hlY2tJc1ByaXZhdGVLZXkocHJpdmF0ZUtleSk7XG4gICAgdGhpbmcgPSBub3JtYWxpemVJbnB1dCh0aGluZyk7XG4gICAgLy8gRXZlbiB0aG91Z2ggd2UgYXJlIHNwZWNpZnlpbmcgXCJSU0FcIiBoZXJlLCB0aGlzIHdvcmtzIHdpdGggRUNEU0FcbiAgICAvLyBrZXlzIGFzIHdlbGwuXG4gICAgdmFyIHNpZ25lciA9IGNyeXB0by5jcmVhdGVTaWduKCdSU0EtU0hBJyArIGJpdHMpO1xuICAgIHZhciBzaWcgPSAoc2lnbmVyLnVwZGF0ZSh0aGluZyksIHNpZ25lci5zaWduKHByaXZhdGVLZXksICdiYXNlNjQnKSk7XG4gICAgcmV0dXJuIGZyb21CYXNlNjQoc2lnKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVLZXlWZXJpZmllcihiaXRzKSB7XG4gIHJldHVybiBmdW5jdGlvbiB2ZXJpZnkodGhpbmcsIHNpZ25hdHVyZSwgcHVibGljS2V5KSB7XG4gICAgY2hlY2tJc1B1YmxpY0tleShwdWJsaWNLZXkpO1xuICAgIHRoaW5nID0gbm9ybWFsaXplSW5wdXQodGhpbmcpO1xuICAgIHNpZ25hdHVyZSA9IHRvQmFzZTY0KHNpZ25hdHVyZSk7XG4gICAgdmFyIHZlcmlmaWVyID0gY3J5cHRvLmNyZWF0ZVZlcmlmeSgnUlNBLVNIQScgKyBiaXRzKTtcbiAgICB2ZXJpZmllci51cGRhdGUodGhpbmcpO1xuICAgIHJldHVybiB2ZXJpZmllci52ZXJpZnkocHVibGljS2V5LCBzaWduYXR1cmUsICdiYXNlNjQnKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVQU1NLZXlTaWduZXIoYml0cykge1xuICByZXR1cm4gZnVuY3Rpb24gc2lnbih0aGluZywgcHJpdmF0ZUtleSkge1xuICAgIGNoZWNrSXNQcml2YXRlS2V5KHByaXZhdGVLZXkpO1xuICAgIHRoaW5nID0gbm9ybWFsaXplSW5wdXQodGhpbmcpO1xuICAgIHZhciBzaWduZXIgPSBjcnlwdG8uY3JlYXRlU2lnbignUlNBLVNIQScgKyBiaXRzKTtcbiAgICB2YXIgc2lnID0gKHNpZ25lci51cGRhdGUodGhpbmcpLCBzaWduZXIuc2lnbih7XG4gICAgICBrZXk6IHByaXZhdGVLZXksXG4gICAgICBwYWRkaW5nOiBjcnlwdG8uY29uc3RhbnRzLlJTQV9QS0NTMV9QU1NfUEFERElORyxcbiAgICAgIHNhbHRMZW5ndGg6IGNyeXB0by5jb25zdGFudHMuUlNBX1BTU19TQUxUTEVOX0RJR0VTVFxuICAgIH0sICdiYXNlNjQnKSk7XG4gICAgcmV0dXJuIGZyb21CYXNlNjQoc2lnKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVQU1NLZXlWZXJpZmllcihiaXRzKSB7XG4gIHJldHVybiBmdW5jdGlvbiB2ZXJpZnkodGhpbmcsIHNpZ25hdHVyZSwgcHVibGljS2V5KSB7XG4gICAgY2hlY2tJc1B1YmxpY0tleShwdWJsaWNLZXkpO1xuICAgIHRoaW5nID0gbm9ybWFsaXplSW5wdXQodGhpbmcpO1xuICAgIHNpZ25hdHVyZSA9IHRvQmFzZTY0KHNpZ25hdHVyZSk7XG4gICAgdmFyIHZlcmlmaWVyID0gY3J5cHRvLmNyZWF0ZVZlcmlmeSgnUlNBLVNIQScgKyBiaXRzKTtcbiAgICB2ZXJpZmllci51cGRhdGUodGhpbmcpO1xuICAgIHJldHVybiB2ZXJpZmllci52ZXJpZnkoe1xuICAgICAga2V5OiBwdWJsaWNLZXksXG4gICAgICBwYWRkaW5nOiBjcnlwdG8uY29uc3RhbnRzLlJTQV9QS0NTMV9QU1NfUEFERElORyxcbiAgICAgIHNhbHRMZW5ndGg6IGNyeXB0by5jb25zdGFudHMuUlNBX1BTU19TQUxUTEVOX0RJR0VTVFxuICAgIH0sIHNpZ25hdHVyZSwgJ2Jhc2U2NCcpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUVDRFNBU2lnbmVyKGJpdHMpIHtcbiAgdmFyIGlubmVyID0gY3JlYXRlS2V5U2lnbmVyKGJpdHMpO1xuICByZXR1cm4gZnVuY3Rpb24gc2lnbigpIHtcbiAgICB2YXIgc2lnbmF0dXJlID0gaW5uZXIuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICBzaWduYXR1cmUgPSBmb3JtYXRFY2RzYS5kZXJUb0pvc2Uoc2lnbmF0dXJlLCAnRVMnICsgYml0cyk7XG4gICAgcmV0dXJuIHNpZ25hdHVyZTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRUNEU0FWZXJpZmVyKGJpdHMpIHtcbiAgdmFyIGlubmVyID0gY3JlYXRlS2V5VmVyaWZpZXIoYml0cyk7XG4gIHJldHVybiBmdW5jdGlvbiB2ZXJpZnkodGhpbmcsIHNpZ25hdHVyZSwgcHVibGljS2V5KSB7XG4gICAgc2lnbmF0dXJlID0gZm9ybWF0RWNkc2Euam9zZVRvRGVyKHNpZ25hdHVyZSwgJ0VTJyArIGJpdHMpLnRvU3RyaW5nKCdiYXNlNjQnKTtcbiAgICB2YXIgcmVzdWx0ID0gaW5uZXIodGhpbmcsIHNpZ25hdHVyZSwgcHVibGljS2V5KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVOb25lU2lnbmVyKCkge1xuICByZXR1cm4gZnVuY3Rpb24gc2lnbigpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlTm9uZVZlcmlmaWVyKCkge1xuICByZXR1cm4gZnVuY3Rpb24gdmVyaWZ5KHRoaW5nLCBzaWduYXR1cmUpIHtcbiAgICByZXR1cm4gc2lnbmF0dXJlID09PSAnJztcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGp3YShhbGdvcml0aG0pIHtcbiAgdmFyIHNpZ25lckZhY3RvcmllcyA9IHtcbiAgICBoczogY3JlYXRlSG1hY1NpZ25lcixcbiAgICByczogY3JlYXRlS2V5U2lnbmVyLFxuICAgIHBzOiBjcmVhdGVQU1NLZXlTaWduZXIsXG4gICAgZXM6IGNyZWF0ZUVDRFNBU2lnbmVyLFxuICAgIG5vbmU6IGNyZWF0ZU5vbmVTaWduZXIsXG4gIH1cbiAgdmFyIHZlcmlmaWVyRmFjdG9yaWVzID0ge1xuICAgIGhzOiBjcmVhdGVIbWFjVmVyaWZpZXIsXG4gICAgcnM6IGNyZWF0ZUtleVZlcmlmaWVyLFxuICAgIHBzOiBjcmVhdGVQU1NLZXlWZXJpZmllcixcbiAgICBlczogY3JlYXRlRUNEU0FWZXJpZmVyLFxuICAgIG5vbmU6IGNyZWF0ZU5vbmVWZXJpZmllcixcbiAgfVxuICB2YXIgbWF0Y2ggPSBhbGdvcml0aG0ubWF0Y2goL14oUlN8UFN8RVN8SFMpKDI1NnwzODR8NTEyKSR8Xihub25lKSQvaSk7XG4gIGlmICghbWF0Y2gpXG4gICAgdGhyb3cgdHlwZUVycm9yKE1TR19JTlZBTElEX0FMR09SSVRITSwgYWxnb3JpdGhtKTtcbiAgdmFyIGFsZ28gPSAobWF0Y2hbMV0gfHwgbWF0Y2hbM10pLnRvTG93ZXJDYXNlKCk7XG4gIHZhciBiaXRzID0gbWF0Y2hbMl07XG5cbiAgcmV0dXJuIHtcbiAgICBzaWduOiBzaWduZXJGYWN0b3JpZXNbYWxnb10oYml0cyksXG4gICAgdmVyaWZ5OiB2ZXJpZmllckZhY3Rvcmllc1thbGdvXShiaXRzKSxcbiAgfVxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(action-browser)/./node_modules/jwa/index.js\n");

/***/ })

};
;