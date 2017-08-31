/**
 * Creates a pseudo-random value generator. The seed must be an integer.
 *
 * Uses an optimized version of the Park-Miller PRNG.
 * http://www.firstpr.com.au/dsp/rand31/
 */
function Random(seed) {
  this._seed = seed % 2147483647;
  if (this._seed <= 0) this._seed += 2147483646;
}

/**
 * Returns a pseudo-random value between 1 and 2^32 - 2.
 */
Random.prototype.next = function () {
  return this._seed = this._seed * 16807 % 2147483647;
};


/**
 * Returns a pseudo-random floating point number in range [0, 1).
 */
Random.prototype.nextFloat = function (opt_minOrMax, opt_max) {
  // We know that result of next() will be 1 to 2147483646 (inclusive).
  return (this.next() - 1) / 2147483646;
};




var Programmer = this.Programmer = function () {

    var programmer = this;

    // Interface
    programmer.runCode = runCode;
    programmer.setScore = setScore;

    var mScore;
    var mRandomNumberGenerator;

    return programmer;

    function initApi(interpreter, scope) {
      wrapper = function(note) {
        var ROW = note && note.a && (note.a.row != undefined)
          ? note.a.row
          : 0;
        var TIME = note && note.a && (note.a.time != undefined)
          ? note.a.time
          : 0;
        var VOL = note && note.a && (note.a.vol != undefined)
          ? note.a.vol
          : 1;
        var LENGTH = note && note.a && (note.a.length != undefined)
          ? note.a.length
          : 1/4;

        var noteObj = {row:ROW, time:TIME, vol:VOL, length:LENGTH};

        return mScore.insertNote(noteObj);
      };
      interpreter.setProperty(scope, 'NOTE',
          interpreter.createNativeFunction(wrapper));


      wrapper = function () {
        var pseudoRandomNumber = mRandomNumberGenerator.nextFloat();
        return pseudoRandomNumber;
      }
      var mathObj = interpreter.getProperty(scope, 'Math');

      interpreter.setProperty(mathObj, 'random',
        this.createNativeFunction(wrapper),
        Interpreter.NONENUMERABLE_DESCRIPTOR);

      wrapper = function(text) {
        text = text ? text.toString() : '';
        return mScore.reset()
      };
      interpreter.setProperty(scope, 'RESET',
          interpreter.createNativeFunction(wrapper));
    }


    function runCode(code) {
      mRandomNumberGenerator = new Random(mScore.randomSeed());
      // The first random number is always very small. Discard it before running the code.
      mRandomNumberGenerator.nextFloat();

      var interpreter = new Interpreter(code, initApi);
      var steps = 0;

      while (interpreter.step()) {
        steps++;

        if (steps > 100000) {
          throw("Your program has an infinite loop, or is taking a really\
            long time to run.");
        }
      }

      mScore.updatePart();
    }

    function setScore(score) {
      mScore = score;
    }
};