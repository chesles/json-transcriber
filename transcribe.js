function transcribe(spec, src) {
  var dest = {}
  if (Array.isArray(spec)) {
    return extract(spec, src)
  }
  Object.keys(spec).forEach(function(key) {
    if (isObject(spec[key])) {
      dest[key] = transcribe(spec[key], src)
    }
    else {
      dest[key] = extract(spec[key], src)
    }
  })

  return dest
}

/*
 * extract the value at srckey from src
 *
 * formats for srckey:
 *   - 'field name' - return src['field name']
 *   - 'field.name[.name2]' - return src['field']['name']
 *
 * if the key specified is not found, return 'undefined'
 */
function extract(srckey, src) {
  if (Array.isArray(srckey)) {
    var ret = srckey.map(function(key) {
      return extract(key, src);
    })
    return ret
  }
  if (/\./.test(srckey)) {
    var keys = srckey.split('.')
    while (keys.length > 1 && isObject(src)) {
      srckey = keys.shift()
      src = src[srckey]
    }
    srckey = keys[0]
  }
  return isObject(src)
    ? src[srckey]
    : undefined
}

function isObject(o) {
  return o === Object(o)
}

module.exports = transcribe
module.exports.extract = extract
