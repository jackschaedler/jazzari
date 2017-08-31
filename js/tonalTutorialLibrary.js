var TONAL_TUTORIAL_LIBRARY = [

{ name: "Tutorial 12: Play a major scale",
  program:
`// Tutorial 12: Play a major scale

var scale = [0,2,4,5,7,9,11]

// Row on which to start the scale.
// A value of 0 corresponds to C.
// A value of 1 corresponds to C#/Db, etc.
var start_row = 0;

// The length of each note
// Values between 1/64 and 1/4 are most interesting.
var note_length = 1/8;

for (var i = 0; i < 4 / note_length; i++) {
 NOTE({ time: note_length * i,
        row: unrolled(i, scale) + start_row,
        length: note_length })
}


// Handy helper function to get the "ith" note in a scale
function unrolled(i, scale) {
  var wraps = Math.floor(i / scale.length)
  var offset = wraps * 12
  return scale[i % scale.length] + offset
}
`
},


{ name: "Tutorial 13: Play a minor scale",
  program:
`// Tutorial 13: Play a minor

var scale = [0,2,3,5,7,8,10]

// Row on which to start the scale.
// A value of 0 corresponds to C.
// A value of 1 corresponds to C#/Db, etc.
var start_row = 0;

// The length of each note
// Values between 1/64 and 1/4 are most interesting.
var note_length = 1/8;

for (var i = 0; i < 4 / note_length; i++) {
 NOTE({ time: note_length * i,
        row: unrolled(i, scale) + start_row,
        length: note_length })
}


// Handy helper function to get the "ith" note in a scale
function unrolled(i, scale) {
  var wraps = Math.floor(i / scale.length)
  var offset = wraps * 12
  return scale[i % scale.length] + offset
}
`
},


{ name: "Tutorial 14: Play a pentatonic scale",
  program:
`// Tutorial 14: Play a pentatonic scale

var scale = [0,3,5,7,10]

// Row on which to start the scale.
// A value of 0 corresponds to C.
// A value of 1 corresponds to C#/Db, etc.
var start_row = 0;

// The length of each note
// Values between 1/64 and 1/4 are most interesting.
var note_length = 1/8;

for (var i = 0; i < 4 / note_length; i++) {
 NOTE({ time: note_length * i,
        row: unrolled(i, scale) + start_row,
        length: note_length })
}


// Handy helper function to get the "ith" note in a scale
function unrolled(i, scale) {
  var wraps = Math.floor(i / scale.length)
  var offset = wraps * 12
  return scale[i % scale.length] + offset
}
`
},

];