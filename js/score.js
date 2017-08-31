var Score = this.Score = function () {

    var score = this;

    // Interface
    score.notes = notes;
    score.laneCount = laneCount;
    score.laneLabels = laneLabels;
    score.lengthInBeats = lengthInBeats;
    score.insertNote = insertNote;
    score.updatePart = updatePart;
    score.reset = reset;
    score.init = init;
    score.isMuted = isMuted;
    score.toggleMute = toggleMute;
    score.randomSeed = randomSeed;
    score.reseed = reseed;
    score.seed = seed;

    // Members
    var _notes;
    var _laneCount;
    var _laneLabels;
    var _lengthInBeats;
    var _part;
    var _muted;

    var _randomNumberGeneratorSeed;

    var _updatePartDebounced;


    return score;

    //----------------------------------------------------------
    // internals

    function reset() {
      _notes = [];
    }

    function notes() {
      return _notes;
    }

    function toggleMute() {
      _muted = !_muted;
      score.trigger('change');
    }

    function randomSeed() {
      return _randomNumberGeneratorSeed;
    }

    function reseed(seed) {
      _randomNumberGeneratorSeed = seed
        ? seed
        : Math.round(Math.random() * 1000);
      score.trigger('change');
    }

    function seed() {
      return _randomNumberGeneratorSeed;
    }

    function isMuted() {
      return _muted;
    }

    function laneCount() {
      return _laneCount;
    }

    function laneLabels() {
      return _laneLabels;
    }

    function lengthInBeats() {
      return _lengthInBeats;
    }

    function noteAfterRangeInsertion(note, range) {
      if (note.row != range.row) { return [note]; }
      if (range.time <= note.time && range.end >= note.end) {
        // range completely covers note
        return [];
      }
      if (range.time >= note.end || range.end <= note.time) {
        // range doesn't affect note
        return [note];
      }
      if (range.time > note.time && range.end < note.end) {
        // range splits note into two
        var left = Object.assign({}, note);
        var right = Object.assign({}, note);

        left.end = range.time;
        left.length = left.end - left.time;

        right.time = range.end;
        right.length = right.end - right.time;
        return [left, right];
      }
      if (range.end > note.time && range.time <= note.time) {
        var chopped = Object.assign({}, note);
        chopped.time = range.end;
        chopped.length = chopped.end - chopped.time;
        return [chopped];
      }
      if (range.end >= note.end && range.time < note.end) {
        var chopped = Object.assign({}, note);
        chopped.end = range.time;
        chopped.length = chopped.end - chopped.time;
        return [chopped];
      }
      throw Error("WHAT!");
    }

    function insertNote(newNote) {
      if (isNaN(newNote.row)) { newNote.row = 0; }
      if (isNaN(newNote.length)) { newNote.length = 0; }
      if (isNaN(newNote.time)) { newNote.time = 0; }
      if (isNaN(newNote.vol)) { newNote.vol = 0; }

      // Note time comes in as measures so the programmer can type things
      // write expressions in terms of quarter notes (1/4), eighth notes (1/8), etc.
      newNote.time *= 4;
      newNote.length *= 4;

      newNote.row = Math.round(Math.abs(newNote.row)) % _laneCount;
      newNote.time = Math.abs(newNote.time) % _lengthInBeats;
      var noteEnd = Math.min(
        newNote.time + newNote.length,
        _lengthInBeats);
      newNote.length = noteEnd - newNote.time;
      newNote.end = noteEnd;
      newNote.vol = Math.max(0, Math.min(newNote.vol, 1.0));

      var newNotes = [];
      _notes.forEach(function(note) {
        var transformedNoteList = noteAfterRangeInsertion(note, newNote);
        transformedNoteList.forEach(function(transformed) {
          newNotes.push(transformed);
        });
      });

      newNotes.push(newNote);
      _notes = newNotes;

      _updatePartDebounced();
    }

    function updatePart() {
      if (_part) {
        _part.removeAll();
        _notes.forEach(function(note) {
          _part.add("0:1:0 * " + note.time, note);
        });
      }

      score.trigger('change');
    }

    function init(laneCount, part, laneLabels) {
      _laneCount = laneCount;
      _part = part;
      _lengthInBeats = 16;
      _updatePartDebounced = _.debounce(updatePart, 50);
      _muted = false;
      _laneLabels = laneLabels;

      _randomNumberGeneratorSeed = 0;
      reset();
    }
};


MicroEvent.mixin(Score);
