var specify = require('specify')
  , transfer = require('./transcribe')

specify('basic transfer', function(test) {
  var spec = {'newkey': 'oldkey'}
    , obj = {oldkey: 'value'}

  var copy = transfer(spec, obj)
  test.equal(copy.newkey, obj.oldkey)
})

specify('basic transfer with missing value', function(test) {
  var spec = {'newkey': 'oldkey'}
    , obj = {}

  var copy = transfer(spec, obj)
  test.equal(copy.newkey, undefined)
})

specify('nested object transfer', function(test) {
  var spec = {'newkey': 'oldkey.subkey'}
    , obj = {oldkey: {subkey: 'value'}}

  var copy = transfer(spec, obj)
  test.equal(copy.newkey, obj.oldkey.subkey)
})

specify('nested object transfer with missing value', function(test) {
  var spec = {'newkey': 'oldkey.subkey'}
    , obj = {oldkey: {}}

  var copy = transfer(spec, obj)
  test.equal(copy.newkey, undefined)

  obj = {}
  var copy = transfer(spec, obj)
  test.equal(copy.newkey, undefined)
})

specify('combine fields from old object into array', function(test) {
  var spec = {'newkey': ['key1', 'key2', 'foo.key3']}
    , obj = {key1: 1, key2: 2, foo: { key3: 3}}

  var copy = transfer(spec, obj)
  test.ok(Array.isArray(copy.newkey))
  test.deepEqual(copy.newkey, [1, 2, 3])
})

specify('combine fields from old object into nested object', function(test) {
  var spec = {'newkey': {one: 'key1', two: 'key2', three: 'foo.key3'}}
    , obj = {key1: 1, key2: 2, foo: { key3: 3}}

  var copy = transfer(spec, obj)
  test.equal(copy.newkey.one, obj.key1)
  test.equal(copy.newkey.two, obj.key2)
  test.equal(copy.newkey.three, obj.foo.key3)
})

specify.run()
