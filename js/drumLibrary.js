var DRUM_LIBRARY = [

{ name: "Tutorial 12: Create a simple beat",
  program:
`// Tutorial 12: Create a simple beat

var kicks = [0, 1/4, 2/4, 3/4]
var snares = [1/4, 3/4]

for (var i = 0; i < 4; i++) {
  kicks.forEach(function(time) {
    NOTE({time: time + i, row: 0})
  })

  snares.forEach(function(time) {
    NOTE({time: time + i, row: 1})
  })

  for (var j = 0; j < 16; j++) {
    NOTE({time: j/16 + i, row: 3})
  }
}
`
},


{ name: "Idea Starter: Maddie Da Mouse",
  program:
`// Program: "Maddie Da Mouse"
// Creates a simple drum beat which can be modified or
// enhanced with your own flourishes.

var kick_times = [0, 3/16, 6/16, 7/16, 9/16, 10/16]
var snare_times = [1/4, 3/4]

var closed_hat_times = [0, 1/4, 2/4, 3/4]
var open_hat_times = [1/8, 3/8, 5/8, 7/8]
var hat_volumes = [1/4, 2/4, 1, 3/4]

var shaker_volumes = [1/4, 3/4, 1/4, 2/4]

var measures = [0, 1, 2, 3]

measures.forEach(function(measure) {
  kick_times.forEach(function(kick_time) {
    NOTE({time: kick_time + measure,
          row: 0});
  })

  snare_times.forEach(function(time) {
    NOTE({time: time + measure,
          row: 2});
  })

  closed_hat_times.forEach(function(time, index) {
    NOTE({time: time + measure,
          row: 3,
          vol: index % 3 + 0.5});
  })

  open_hat_times.forEach(function(time, index) {
    NOTE({time: time + measure,
          row: 4,
          vol: 0.5});
  })

  for (var i = 0; i < 16; i++) {
    NOTE({time: i/16 + measure,
          row: 5,
          vol: shaker_volumes[i%4]});
  }

  // add in a little build-up in the last measure
  if (measure == 3) {
    for (var i = 0; i < 16; i++) {
      NOTE({time: i/16 + measure,
            row: 0,
            vol: i/16});
    }
  }

});
`
  },


{ name: "Idea Starter: There's a cat on my drumset",
  program:
`// Program: "There's a cat on my drumset"
// Randomly generates notes by moving forward in time by
// some random amount, then creating a note on a randomly
// chosen row of the grid, at a randomly chosen volume.
// Simulates a cat playing the drums.

var current_time = 0;

// Values from 2 to 15 are most interesting. Above 15 and
// things start to get a bit nutty.
var density = 10;

// Values from 0 to 1.0 are interesting.
var spread = 0.8;

while(current_time < 4) {
  var random_time = Math.random() / density;

  NOTE({time: quantize(current_time, 1/16),
        length: random_time,
        vol: Math.random() * 2,
        row: Math.random() * 10 * spread + 2})

  current_time += random_time;
}

// Add a simple kick drum pattern to anchor the
// loop onto a steady beat
for (var i = 0; i < 16; i++) {
  NOTE({time: i/4})
  if (i % 4 == 3) {
    NOTE({time: i/4 + 3/16,
          vol: 1/2})
  }
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


{ name: "Idea Starter: Hammock-Driven-Drums",
  program:
`// Program: "Hammock Driven Drums"
// Creates a simple drum beat which can be modified or
// enhanced with your own flourishes.

var kick_times = [0, 2/4, 5/8]
var snare_times = [1/4, 3/4]

var hat_volumes = [1/4, 2/4, 1, 3/4]
var tamb_volumes = [3/4, 1]

// In this program, all of the hi-hats will be
// slightly off the beat by some random amount.
// This specifies the maximum amount of wiggle.
// Values from 1/256 to 1/128 are reasonable.
var maximum_wiggle = 1/128;

var measures = [0, 1, 2, 3]

measures.forEach(function(measure) {
  kick_times.forEach(function(t) {
    NOTE({time: t + measure, row: 0})
  });

  snare_times.forEach(function(t) {
    NOTE({time: t + measure, row: 1})
  });

  for (var i = 0; i < 16; i++) {
    var wiggle = (Math.random() - 0.5) * maximum_wiggle;
    NOTE({time: i/16 + measure + wiggle,
          row: 3,
          vol: hat_volumes[i % hat_volumes.length]})
  }

  for (var i = 0; i < 8; i++) {
    NOTE({time: i/8 + measure,
          row: 8,
          vol: tamb_volumes[i % tamb_volumes.length]})
  }

});

`
},


{ name: "Idea Starter: Kiss my Rollerblades",
  program:
`// Program: "Kiss my Rollerblades"
// Creates a simple drum beat which can be modified or
// enhanced with your own flourishes.

var kick_times = [0, 1/16, 3/16, 11/16, 14/16]
var snare_times = [1/4, 3/4]
var tamb_times = [6/16, 9/16, 11/16, 11.5/16]

var hat_volumes = [3/4, 1/4]

var measures = [0, 1, 2, 3]

measures.forEach(function(measure) {
  kick_times.forEach(function(t) {
   NOTE({time: t + measure, row: 0})
  });

  snare_times.forEach(function(t) {
   NOTE({time: t + measure, row: 1})
  });

  tamb_times.forEach(function(t) {
    NOTE({time: t + measure, row: 5})
  });

  for (var i = 0; i < 16; i++) {
   NOTE({time: i/16 + measure,
         row: 3,
         vol: hat_volumes[i % hat_volumes.length]})
  }

});

NOTE({time: 0, row: 12})
NOTE({time: 3, row: 12})

`
},


{ name: "Idea Starter: First Order Antelope",
  program:
`// Program: "First Order Antelope"
// Creates a simple drum beat which can be modified or
// enhanced with your own flourishes.

var kick_times = [0, 3/16, 7/16, 9/16, 10/16]
var snare_times = [1/4, 3/4]

var measures = [0,1,2,3]

measures.forEach(function(measure) {
  kick_times.forEach(function(t) {
   NOTE({time: t + measure, row: 0})
  });

  snare_times.forEach(function(t) {
   NOTE({time: t + measure, row: 1})
  });

  for (var i = 0; i < 8; i+=2) {
   NOTE({time: i/8 + measure, row: 3})
  }

  NOTE({time: 10/16 + measure, row: 4})
});

`
},


{ name: "Idea Starter: Lilac Chance",
  program:
`// Program: "Lilac Chance"
// Creates a simple drum beat which can be modified or
// enhanced with your own flourishes.

var kick_times = [0, 1/4, 1.5/4]
var snare_times = [1/4, 3/4]
var shaker_volumes = [1/4, 3/4, 1/4, 2/4]
var tamb_volumes = [3/4, 1]

var measures = [0,1,2,3]

measures.forEach(function(measure) {
  kick_times.forEach(function(t) {
   NOTE({time: t + measure, row: 0})
  });

  snare_times.forEach(function(t) {
   NOTE({time: t + measure, row: 1})
  });

  for (var i = 0; i < 8; i++) {
   NOTE({time: i/8 + measure,
         row: 5,
         vol: shaker_volumes[i % 4]})
  }

   for (var i = 0; i < 4; i++) {
   NOTE({time: i/4 + measure,
         row: 8,
         vol: tamb_volumes[i % 2]})
  }
});


// Sprinkle in some extra cowbells here and there
for (var time = 0; time < 4; time += Math.random() * 1/4) {
 NOTE({time: quantize(time, 1/16),
       row: 9,
       vol: Math.random(),
       length: 1/16})
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


{ name: "Idea Starter: Dirty Laundry",
  program:
`// Program: "Dirty Laundry"
// Creates a simple drum beat which can be modified or
// enhanced with your own flourishes.

var kick_times = [0, 2/16, 7/16, 8/16, 10/16]
var snare_times = [1/4, 3/4]
var rim_times = [5/16]
var hat_volumes = [2/4, 3/4]


var measures = [0, 1, 2, 3]

measures.forEach(function(measure) {
  kick_times.forEach(function(t) {
   NOTE({time: t + measure, row: 0})
  });

  snare_times.forEach(function(t) {
   NOTE({time: t + measure, row: 2})
  });

  rim_times.forEach(function(t) {
   NOTE({time: t + measure, row: 5})
  });


  for (var i = 0; i < 8; i++) {
   NOTE({time: i/8 + measure,
         row: 3,
         vol: hat_volumes[i % hat_volumes.length]})
  }
});
`
},


{ name: "Idea Starter: Probable Cause",
  program:
`// Program: "Probable Cause"
// Creates a random pattern based on tweakable probabilities
// for each row of the pattern

// The rows on which to place notes.
// The "row" value specifies the number of the row
// The "prob" value is the probability for making notes
// The "quantize" value snaps all notes to the nearest note

var rows = [ {row: 0, prob: 0.2, quantize: 1/8},
             {row: 2, prob: 0.4, quantize: 1/8},
             {row: 3, prob: 0.7, quantize: 1/16},
             {row: 5, prob: 0.9, quantize: 1/32},
             {row: 9, prob: 0.1, quantize: 1/8} ]


// Varies how "dense" the resulting pattern is.
// Values from around 4 to 100 are interesing
var density = 10


rows.forEach(function(row) {
  var current_time = 0;

  while(current_time < 4) {
    if (Math.random() < row.prob) {
      NOTE({time: quantize(current_time, row.quantize),
            row: row.row,
            vol: Math.random() * 2})
    }

    current_time += 1/32 + Math.random() / 20;
  }
});


// Handy helper function which quantizes (snaps) a value to
// the nearest fraction. For example:
// calling quantize(1.2, 0.25) will return 1.25
// calling quantize(1.1, 0.25) will return 1.0
function quantize(time, nearest) {
 return Math.round(time / nearest) * nearest;
}
`
},


{ name: "Idea Starter: Too-Loose La’Track",
  program:
`// Program: "Too-Loose La’Track"
// Creates a simple drum beat which can be modified or
// enhanced with your own flourishes.

var kick_times = [0, 1/8, 2.5/4, 3/4, 11.3/16]
var snare_times = [1/4, 3/4]
var hat_volumes = [1/4, 2/4, 1, 3/4]
var tamb_volumes = [3/4, 1]

var measures = [0,1,2,3]

measures.forEach(function(measure) {
  kick_times.forEach(function(t) {
   NOTE({time: t + measure, row: 0})
  });

  snare_times.forEach(function(t) {
   NOTE({time: t + measure, row: 2})
  });

  for (var i = 0; i < 16; i++) {
   NOTE({time: i/16 + measure,
         row: 3,
         vol: hat_volumes[i % 4]/2})
  }

   for (var i = 0; i < 8; i++) {
   NOTE({time: i/8 + measure,
         row: 11,
         vol: tamb_volumes[i % 2]})
  }

});
`
},


{ name: "Idea Starter: Finite Impulse Responsibility",
  program:
`// Program: "Finite Impulse Responsibility"
// Creates a simple drum beat which can be modified or
// enhanced with your own flourishes.

var kick_times = [0, 2/16, 3/16, 4/16, 6/16, 7/16,
                 8/16, 10/16, 11/16, 12/16, 14/16, 15/16]
var kick_volumes = [1, 0.5, 0.5, 1, 0.5, 0.5,
                   1, 0.5, 1, 0.5, 0.5, 0.5]

var snare_times = [1/4, 3/4]

var measures = [0, 1, 2, 3]

measures.forEach(function(measure) {
  kick_times.forEach(function(t, i) {
   NOTE({time: t + measure, row: 9, vol:kick_volumes[i]})
  });

  snare_times.forEach(function(t) {
   NOTE({time: t + measure, row: 1})
  });

  for (var i = 0; i < 8; i+=2) {
   NOTE({time: i/8 + measure, row: 3})
  }

  NOTE({time: 10/16 + measure, row: 4})
});
`
},


{ name: "Idea Starter: Funky Fractals",
  program:
`// Program: "Funky Fractals"
// Generates interesting symmetric pattern structures
// using the technique of recursion.

// Values from 1 to 10 are interesting. A value of 1 looks
// really cool, but isn't very musical. 2-4 sound nice.
var vertical_step = 2;

// Values from 1 to 10 are interesting. The higher you go,
// the fewer notes you'll get.
var sparsity = 1;

var start_row = 0;
funky(start_row, 16)


function funky(row, divisions) {
  if (row < 12) {
    for (var i = 0; i < divisions; i++) {
      var note_time = i/divisions * 4;
      var quantized_note_time = quantize(note_time, 1/16)

      // Increase for more wackiness
      var wackiness_multiplier = 1;

      NOTE({time: quantized_note_time,
            row: row * wackiness_multiplier,
            vol: 1 - row / 12,
            length: 1/16})
    }

    // call funky recursively to move to the next row
    funky(row + vertical_step, divisions - sparsity)
  }
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


{ name: "Idea Starter: Waltzing my ~",
  program:
`// Program: "Waltzing my ~"
// Creates a simple drum beat which can be modified or
// enhanced with your own flourishes.

var measures = [0,1,2,3]

measures.forEach(function(measure) {
  for (var i = 0; i < 12; i++) {
   NOTE({time: i/12 + measure, row: 8})
  }

  for (var i = 0; i < 6; i++) {
   NOTE({time: i/6 + measure, row: 0})
  }

  for (var i = 0; i < 24; i++) {
   NOTE({time: i/24 + measure, row: 3, vol: 0.5})
  }

  for (var i = 0; i < 8; i++) {
   NOTE({time: i/8 + measure, row: 10, vol: 0.8})
  }

});

`
},


{ name: "Idea Starter: Clavatronic",
  program:
`// Program: "Clavatronic"
// Creates a simple drum beat which can be modified or
// enhanced with your own flourishes.

function clave(row, time, vol) {
  NOTE({time: time, row: row, vol: vol, length: 1/16});
  NOTE({time: time + 3/16, row: row, vol: vol, length: 1/16});
  NOTE({time: time + 6/16, row: row, vol: vol, length: 1/16});
  NOTE({time: time + 10/16, row: row, vol: vol, length: 1/16});
  NOTE({time: time + 12/16, row: row, vol: vol, length: 1/16});
}

clave(10, 0, 0.7);
clave(10, 1, 0.9);
clave(10, 2, 0.7);
clave(10, 3, 0.6);
`
  },
//////////////////////////////////////////////////////////////////
  { name: "Idea Starter: Partly Purdie",
    program:
`// Program: "Partly Purdy"
// Creates a simple drum beat which can be modified or
// enhanced with your own flourishes. This one grooves.

function purdy(time) {
  NOTE({row: 2, time: 1/2 + time})
  NOTE({row: 0, time: 0 + time})
  NOTE({row: 0, time: 15/16 + time})

  vols = [0.3,0.5,0.7,0.3]

  for (var i = 0; i < 9; i++) {
    NOTE({time: i*1/9 + time,
          row: 5,
          vol:vols[i % vols.length] / 4})
  }

  for (var i = 0; i < 6; i++) {
    NOTE({row: 3,
          time:i/6 + time})
  }
}

for (var i = 0; i < 4; i++) {
 purdy(i);
}
`
},


{ name: "Idea Starter: Sinus Pain",
  program:
`// Program: "Sinus Pain"
// Draws a sequence of notes with their volumes
// defined using the mathematical function Math.sin().

// Values from 32 to 200 are most interesting.
var divisions = 64;

// Values from 0 to 1000 are interesting.
// High values relative to  "divisions" lead to
// aliasing, but very interesting random-ish musical results!
// For example, see the difference between 1000, 1001, 1002.
var frequency = 2;

// Shifts where the "peak" of the "wave" starts
// at Math.PI/2, the peak begins at the start of the music
var offset = Math.PI/2;


for (var i = 0; i < divisions; i++) {
  var percent = i / divisions;
  var note_time = percent * 4;
  var phase = (frequency * percent * Math.PI * 2) + offset;

  NOTE({time: note_time,
        length: 4 / divisions,
        row: 5,
        vol: Math.abs(Math.sin(phase))})

}
`
},


{ name: "Idea Starter: Duh! Lay",
  program:
`// Program: "Duh! Lay"
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


// Create 8 delayed notes
for (var i = 0; i < 8; i++) {
 delay(Math.random() * 4, // time
      Math.random() * 12, // row
      20, // echoes
      1/16, // spacing
      4) // falloff
}
`
}
];