/*
  A sentence is a very basic form of information, but English language is dumb.
  My challenge to you is to create a fully functional English sentence generator using popcode. As you may know, I plan to create a random sentence generator for my Spaceman project. I ran into many problems but I figured a way to do it.

  If you accept this test, here are the requirements:
  1. All three types of sentences: simple, compound, and complex.
  2. The ability to use eight parts of speech: Noun, Pronoun, Verb, Adjective, Adverb, Preposition, Article, and Conjunction.
  3. Correct grammar(use of the parts of speech) and varying "punctuation"!

  Some things that you shouldn't need --but would be impressive-- are:
  1. The inclusion of word plurality.
  2. The possession in subjects.
  3. Lists or dialogue.
  4. Interjections.
  5. And the presentation to other Scripted teachers.
*/

// array mean use all parts
// set mean options

// Convenience Set constructor
function set(...items) {
    return new window.Set(items);
}
var n = set("robot", "computer", "human");
var o = set("song", "metal", "program", "book", ...n);
var a = set("the", "a", "any", "this");
var adj = set("lonely", "new", "patient");
var oadj = set(adj, '');
var op = set([a, o], "itself");
var np = [a, oadj, n];
var vit = set("sees", "reads", "spins");
var vt = set(...vit, "buys", "sells", "builds");
var vi = set("thinks", "meditates", "sings");

var adverb = set('slowly', 'quietly', 'innecessantly');
var optionalAdverb = set(adverb, '');
var oa = optionalAdverb;

var vp = set(
    [vi],
    [vt, op]
);
var cnp = set(np);
var c = [cnp, oa, vp];
var cc = [np, 'that', vp];
cnp.add(cc);
cnp.add([cnp, 'which', vt, cnp]);

var coordinatingConj = set("and", "but");
var subordinatingConj = set("before", "because", "if");
var dependentClause = [subordinatingConj, c];

var simpleSentence = [c];
var compoundSentence = [c, coordinatingConj, c];
var complexSentence = [dependentClause, ",", c];

var sentence = set(simpleSentence, compoundSentence, complexSentence);

function choose(s) {
  return Array.from(s)[Math.floor(Math.random() * s.size)];
}

function evaluate(part) {
  if (typeof part === "string") {
    return part;
  } else if (Array.isArray(part)) {
      return part
      .map(evaluate)
      .join(" ");
  } else {
    var choice = choose(part);
    return evaluate(choice);
  }
}

function makeSentence() {
  var s = evaluate(sentence);

  // Capitalize the first letter, for good measure...
  return (s[0].toUpperCase() + s.slice(1) + ".").replace(" ,", ",");
}

function print(text) {
  $("body").append(`<p>${text}<p>`);
}

function test() {
  $("body").html("");
  [...Array(10).keys()].map(makeSentence).forEach(print);
  $("body").append("<button>More</button>");
}

test();
$("body").on("click", "button", test);