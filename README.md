# json-transcriber

Generates a copy of all or part of a JSON object, renaming keys and/or
otherwise transforming the object in the process.

I found myself needing to write this code a few times in an app that needed to
submit the same data to different APIs, each of which had different names for
each field, so here's a module for it. Other potential uses are to update a set
of JSON documents all at once, in case you decide to change a field name in
your NoSQL database.

## example

    var thing = {
      top_level: {
        nested: true
      },
      value: 23
    }

    var mapping = {
      denest: "top_level.nested",
      new_name: "value"
    }

    var copy = transcribe(mapping, thing);
    console.log(copy);
    //=> {denest: true, new_name: 23}

Want to extract a set of keys into an array or a nested object? Fine, just tell
`transcribe` what values you want:

    var src = {value1: 1, value2: 2, value3: 3}

    # final value will be an array
    var arrayMapping = {
      arr: ['value1', 'value2', 'value3']
    }
    var copy = transcribe(arrayMapping, src)
    //=> {arr: [1, 2, 3]}

    # final value will be an object
    var objectMapping = {
      foo: {
        one: "value1",
        two: "value2",
        three: "value3"
      }
    }
    copy = transcribe(objectMapping, src)
    //=> { foo: {one: 1, two: 2, three: 3} }

You can also use the "extract" function used to get at nested elements. Just
use simple dot-notation:

    var v = transcribe.extract("top_level.nested", thing);
    //=> true

    var a = transcribe.extract(['top_level.nested', 'value'], thing);
    //=> [true, 23]
