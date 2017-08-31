var KEYS_LIBRARY = [
{ name: "Idea Starter: Dough Re Mi",
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


{ name: "Idea Starter: Chords Chords Chords!",
  program:
`// Program: "Chords Chords Chords!"
// Generates simple chord progressions

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
  { notes: [0,2,4], root: 0},
  { notes: [0,2,4,6], root: 4},
  { notes: [0,2,4], root: 3},
  { notes: [0,2,4], root: 2},
]

// The length of each chord.
// Values from 1/16 to 1 are most interesting.
var chord_length = 1;

for (var i = 0; i < (4/chord_length); i++) {
  var chord = chords[i % chords.length]
  var chord_time = chord_length * i;

  chord.notes.forEach(function(note) {
    NOTE({ time: chord_time,
           row: unrolled(note + chord.root, scale),
           length: chord_length });
  })
}

// Handy helper function to get the "ith" note in a scale
function unrolled(i, scale) {
  var wraps = Math.floor(i / scale.length)
  var offset = wraps * 12
  return scale[i % scale.length] + offset
}
`
},


{ name: "Idea Starter: Stairstep Chords",
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
var chord_length = 1;

// The number of notes in the arpeggio
var steps = 16;

// Flip this to true if you want the stairs to decend.
var descending = false;

if (descending) {
 chords.forEach(function(chord) {
   chord.notes.reverse()
 })
}


chords.forEach(function(chord, chord_index) {
  var chord_time = chord_length * chord_index;
  var note_length = chord_length / steps;
  var note_count = chord_length / note_length;

  for (var i = 0; i < note_count; i++) {
    var note = chord.notes[i % chord.notes.length];
    var note_time = chord_time + i * note_length

    if (note_time < 4) {
      NOTE({time: note_time,
            row: unrolled(note + chord.root, scale),
            length: note_length });

    }
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


{ name: "Idea Starter: Randameloda",
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


{ name: "Idea Starter: The Jazzy Wanderer",
  program:
`
// Program: "The Jazzy Wanderer"
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
var start_note = 10;

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


{ name: "Idea Starter: Dub Chords",
  program:
`// Program: "Dub Chords"
// Generates chord progressions that sound as if they
// are being echoed or delayed

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
  { notes: [0,2,4], root: 0},
  { notes: [0,2,4], root: 2},
  { notes: [0,3,5], root: 0},
  { notes: [0,3,5], root: 2},
  { notes: [0,2,4], root: 0},
  { notes: [0,2,4], root: 2},
  { notes: [0,3,5], root: 0},
  { notes: [0,3,5], root: 2},
]

// The length of each chord. Calculated to the chords
// fill the entire grid evenly.
var chord_length = 4 / chords.length;

chords.forEach(function(chord, chord_index) {
  var chord_time = chord_length * chord_index;

  chord.notes.forEach(function(note) {
    delay(chord_time,
          unrolled(note + chord.root, scale),
          16, // number of echoes
          1/16, // echo length
          5) // falloff

  })
})


// Helper function stolen from the "Duh Lay!" drum program.
// Creates notes that sound as if they're being delayed or
// echoed by creating repetitions of the original note
// later in time with decreased volume

// The "time" parameter specifies where the notes will start
// The "row" parameter specifies the row to place the notes

// The "echoes" parameter specifies the number of echoes
// Values between 5 and 20 are interesting

// The "spacing" parameter specifies the time between echoes
// Values between 1/128 and and 1/4 are interesting

// The "falloff" parameter specifies how quickly the echoes
// fade out. Values from 0 to 10 are interesting
function delay(time, row, echoes, spacing, falloff) {
  for (var i = 0; i < echoes; i++) {
    var pct = 1 - (i / echoes)
    var note_time = i * spacing + time
    if (note_time < 4) {
      NOTE({ time: note_time,
           row: row,
           vol: Math.pow(pct, falloff)})
    }
  }
}


// Handy helper function to get the "ith" note in a scale
function unrolled(i, scale) {
  var wraps = Math.floor(i / scale.length)
  var offset = wraps * 12
  return scale[i % scale.length] + offset
}
`
},


{ name: "Idea Starter: Interstellar Chit Chat",
  program:
`// Program: "Interstellar Chit Chat"
// Generates bleeps and bloops from another galaxy
// However, all the bloops fall into a scale. Curious!

var major_scale = [0,2,4,5,7,9,11]
var minor_scale = [0,2,3,5,7,8,10]
var pentatonic_scale = [0,3,5,7,10]

// The scale to use.
// Change this to one of the names above, or define your own!
var scale = minor_scale;

var time = 0;

while(time < 4) {
 NOTE({ row: unrolled(Math.round(Math.random() * 32), scale)
      , time: time
      , length: 1/64})

 time += 1/32
}

// Handy helper function to get the "ith" note in a scale
function unrolled(i, scale) {
  var wraps = Math.floor(i / scale.length)
  var offset = wraps * 12
  return scale[i % scale.length] + offset
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
var row = 16;
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