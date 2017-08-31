var BASS_LIBRARY = [
{ name: "Starter Idea: Dough Re Mi",
  program:
`// Program: "Dough Re Mi"
// Generates the notes of a scale in ascending order.
// Even programmer pianists have to practice their scales.

var major_scale = [0,2,4,5,7,9,11]
var minor_scale = [0,2,3,5,7,8,10]
var pentatonic_scale = [0,3,5,7,10]

// The scale to use. Change this to one of the names above.
var scale = pentatonic_scale;

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


{ name: "Starter Idea:That ol' Chestnut",
  program:
`// Program: "That ol' Chestnut"
// Generates a stupendously simple bassline

var major_scale = [0,2,4,5,7,9,11]
var minor_scale = [0,2,3,5,7,8,10]
var pentatonic_scale = [0,3,5,7,10]

// The scale to use. Change this to one of the names above.
var scale = minor_scale;

// The length of each note
// Values between 1/64 and 1/4 are most interesting.
var note_length = 1/8;

// The notes of the bassline
var notes = [0,4,3,2];


notes.forEach(function(note, note_index) {
  var segment_length = 4 / notes.length;
  var note_count = segment_length / note_length;

  var start_time = note_index * segment_length;

  for (var i = 0; i < note_count; i++) {
   NOTE({time: start_time + (i * note_length),
         row: unrolled(note, scale) + 0,
         length: note_length})
  }
});

// Handy helper function to get the "ith" note in a scale
function unrolled(i, scale) {
  var wraps = Math.floor(i / scale.length)
  var offset = wraps * 12
  return scale[i % scale.length] + offset
}
`
},


{ name: "Starter Idea: Stairstep Chords",
  program:
`// Program: "Stairstep Chords"
// Generates simple little ascending arpeggios.
// This program is a variant of "Chords Chords Chords!"

var major_scale = [0,2,4,5,7,9,11]
var minor_scale = [0,2,3,5,7,8,10]
var pentatonic_scale = [0,3,5,7,10]

// The scale to use.
// Change this to one of the names above, or define your own!
var scale = minor_scale;

// The chords to create. Each chord object should have a list
// of notes which defines the notes to be played, and a
// 'root' which defines on which row the chord should start.
var chords = [
  { notes: [0,2,5,7], root: 0},
  { notes: [0,2,5,7], root: 4},
  { notes: [0,2,5,7], root: 3},
  { notes: [0,2,5,7], root: 2},
]

// The length of each chord. Calculated to the chords
// fill the entire grid evenly.
var chord_length = 4 / chords.length;

// The number of notes in the arpeggio
var note_length = 1/16;

// Flip this to true if you want the stairs to decend.
var descending = false;

if (descending) {
 chords.forEach(function(chord) {
   chord.notes.reverse()
 })
}

chords.forEach(function(chord, chord_index) {
  var chord_time = chord_length * chord_index;
  var note_count = chord_length / note_length;

  for (var i = 0; i < note_count; i++) {
    var note = chord.notes[i % chord.notes.length];

    NOTE({time: chord_time + i * note_length * chord_length,
          row: unrolled(note + chord.root, scale),
          length: note_length });
  }

})

// Handy helper function to get the "ith" note in a scale
function unrolled(i, scale) {
  var wraps = Math.floor(i / scale.length)
  var offset = wraps * 12
  return scale[i % scale.length] + offset
}
`
},


{ name: "Starter Idea: Randameloda",
  program:
`// Program: "Randameloda"
// Generates simple looping melodies in a given scale.
// The melody is created by choosing some notes randomly
// from the scale and then repeating those notes at higher
// or lower pitches to imply a sense of progression.

var major_scale = [0,2,4,5,7,9,11]
var minor_scale = [0,2,3,5,7,8,10]
var pentatonic_scale = [0,3,5,7,10]

// The scale to use.
// Change this to any of the names above, or define your own!
var scale = minor_scale;

// The number of notes in the "core" melody.
var note_count = 8;

// How vertically spread or "tall" the melody can be.
// Values from 0 to the size of the scale are interesting.
var spread = 5;

notes = []
for (var i = 0; i < note_count; i++) {
  notes.push(Math.round(Math.random() * spread));
}

// The melody will be repeated as many times as there are
// numbers in the list below. Each number represents how
// much to "shift" the melody up or down.
var sections = [0,5,4,3];


// Each note in the melody has the same length.
// This line ensures that the melody fills the entire grid.
var note_length = 4 / (sections.length * notes.length)


sections.forEach(function(section, section_index) {
  notes.forEach(function(note, note_index) {
    var time_offset =
        section_index * note_length * notes.length;

    NOTE({time: time_offset + note_index * note_length,
          row: unrolled(note + section, scale),
          length: note_length})
  })
})


// Handy helper function to get the "ith" note in a scale
function unrolled(i, scale) {
  var wraps = Math.floor(i / scale.length)
  var offset = wraps * 12
  return scale[i % scale.length] + offset
}
`
},


{ name: "Starter Idea: The Jazzy Wanderer",
  program:
`// Program: "The Jazzy Wanderer"
// Generates simple wandering melodies in a given scale.
// The melody is generated by moving forward in time some
// random amount, and then moving up or down the scale some
// some random number of rows. To keep things in time, we
// quantize the notes.

var major_scale = [0,2,4,5,7,9,11]
var minor_scale = [0,2,3,5,7,8,10]
var pentatonic_scale = [0,3,5,7,10]

// The scale to use.
// Change this to any of the names above, or define your own!
var scale = pentatonic_scale;

// The note of the scale on which to start the melody
var start_note = 4;

// You probably don't want to change these. They are just here
// to keep track of the current position in the grid.
var current_time = 0;
var current_note = start_note;

// Should be a value between 0 and 1.0
var pluckiness = 0.7;

// Should be a value between 0 and 1.0
var jumpiness = 0.5;


var min_note_length = 1/16;


while(current_time < 4) {
  // Randomly choose a length for each note
  var random_note_length = Math.random() * (1-pluckiness);

  var note_length = Math.max(
    quantize(random_note_length, min_note_length),
    min_note_length);

  NOTE({ time: quantize(current_time, min_note_length),
         row: unrolled(current_note, scale),
         length: note_length})

  current_note += Math.round(
    (Math.random() - 0.5) * (jumpiness * scale.length))

  current_time += note_length
}



// Handy helper function to get the "ith" note in a scale
function unrolled(i, scale) {
  var wraps = Math.floor(i / scale.length)
  var offset = wraps * 12
  return scale[i % scale.length] + offset
}


// Handy helper function which quantizes (snaps) a value to
// the nearest fraction. For example:
// calling quantize(1.2, 0.25) will return 1.25
// calling quantize(1.1, 0.25) will return 1.0
function quantize(time, nearest) {
 return Math.round(time / nearest) * nearest;
}
`
},


{ name: "Idea Starter: The Snake Charmer",
  program:
`// Program: "The Snake Charmer"
// Generates simple melodies by choosing the
// "next" note in a scale. The "next" note
// is the note up or down from the current note
// in the scale. We randomly choose whether or not
// to move up or down by flipping a virtual coin.

var major_scale = [0,2,4,5,7,9,11]
var minor_scale = [0,2,3,5,7,8,10]
var pentatonic_scale = [0,3,5,7,10]

// The scale to use.
// Change this to one of the names above, or define your own!
var scale = minor_scale;

var notelength = 1/16;
var time = 0;
var row = 12;
var direction = 1;

while(time < 4) {
  NOTE({ time: time,
         row: unrolled(row, scale),
         length: notelength })

  // randomly choose to go up or down
  // for the next note.
  direction = Math.random() > 0.5
    ? 1
    : -1

  row += direction
  time += notelength
}

// Handy helper function to get the "ith" note in a scale
function unrolled(i, scale) {
  var wraps = Math.floor(i / scale.length)
  var offset = wraps * 12
  return scale[i % scale.length] + offset
}
`
}
];