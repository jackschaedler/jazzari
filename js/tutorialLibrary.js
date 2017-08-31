var TUTORIAL_LIBRARY = [

{ name: "Tutorial 1: Create a single note",
  program:
`// Tutorial 1: Create a single note

NOTE({time: 1 + 1/16})
`
  },

  { name: "Tutorial 2: Create a note on a different row",
    program:
`// Tutorial 2: Create a note on a different row

NOTE({time: 1 + 1/16, row: 9})
`
},


{ name: "Tutorial 3: Create multiple notes",
  program:
`// Tutorial 3: Create multiple notes

NOTE({time: 1/8, row: 2})
NOTE({time: 2/8, row: 5})
NOTE({time: 6/8, row: 9})
NOTE({time: 8/8, row: 8})
`
},


{ name: "Tutorial 4: Create notes with different lengths",
  program:
`// Tutorial 4: Create notes with different lengths

NOTE({time: 1/8, row: 2, length: 1/16})
NOTE({time: 2/8, row: 5, length: 1})
NOTE({time: 6/8, row: 9, length: 1/8})
NOTE({time: 8/8, row: 8, length: 1/32})
`
},


{ name: "Tutorial 5: Create notes with different volumes",
  program:
`// Tutorial 5: Create notes with different volumes

NOTE({time: 1/8, row: 2, length: 1/16, vol: 0.5})
NOTE({time: 2/8, row: 5, length: 1, vol: 0.25})
NOTE({time: 6/8, row: 9, length: 1/8, vol: 0.75})
NOTE({time: 8/8, row: 8, length: 1/32, vol: 1.0})
`
},


{ name: "Tutorial 6: Create multiple notes in a loop",
  program:
`// Tutorial 6: Create multiple notes in a loop

var notelength = 1/16

for (var time = 0; time < 4; time += notelength) {
  NOTE({time: time,
        row: 9,
        vol: 1,
        length: notelength})
}
`
},


{ name: "Tutorial 7: Create notes in a loop with volume changes",
  program:
`// Tutorial 7: Create notes in a loop with volume changes

var notelength = 1/16
var volumes = [0.2, 0.8, 0.1]

for (var i = 0, time = 0;
     time < 4;
     time += notelength, i++)
{
  NOTE({time: time,
        row: 9,
        vol: volumes[i % volumes.length],
        length: notelength})
}
`
},


{ name: "Tutorial 8: Create notes in a loop with row changes",
  program:
`// Tutorial 8: Create notes in a loop with row changes

var notelength = 1/16

for (var i = 0, time = 0;
     time < 4;
     time += notelength, i++)
{
  NOTE({time: time,
        row: i,
        vol: 1,
        length: notelength})
}
`
},


{ name: "Tutorial 9: Create notes in a loop with random volumes",
  program:
`// Tutorial 9: Create notes in a loop with random volumes
// Create a new set of random numbers by clicking the dice!

var notelength = 1/16

for (var i = 0, time = 0;
     time < 4;
     time += notelength, i++)
{
  NOTE({time: time,
        row: 9,
        vol: Math.random(),
        length: notelength})
}
`
},


{ name: "Tutorial 10: Create notes in a loop with random rows",
  program:
`// Tutorial 10: Create notes in a loop with random rows
// Create a new set of random numbers by clicking the dice!

var notelength = 1/16

for (var i = 0, time = 0;
     time < 4;
     time += notelength, i++)
{
  NOTE({time: time,
        row: Math.random() * 12,
        vol: Math.random(),
        length: notelength})
}
`
},


{ name: "Tutorial 11: Create notes in a loop with trigonometry",
  program:
`// Tutorial 11: Create notes in a loop with trigonometry
// Create a new set of random numbers by clicking the dice!

var notelength = 1/16

for (var i = 0, time = 0;
     time < 4;
     time += notelength, i++)
{
  NOTE({time: time,
        row: Math.sin((time / 4) * 2 * Math.PI) * 12,
        vol: Math.random(),
        length: notelength})
}
`
},
];