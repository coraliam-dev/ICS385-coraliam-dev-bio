var inspirationalMessages =
  [
    "I put contact lenses in my dog's eyes.  They had little pictures of cats on them.  Then I took one out and he ran around in circles. -- Steven Wright",
    "Silence is the only virtue you have left.",
    "You now have Asian Flu.",
    "The truth you speak has no past and no future.  It is, and that's all it needs to be.",
    "You have a massage (from the Swedish prime minister).",
    "Chaos is King and Magic is loose in the world.",
    "America works less, when you say \"Union Yes!\"",
    "Jesuit priests are DATING CAREER DIPLOMATS!!",
    "When the speaker and he to whom he is speaks do not understand, that is metaphysics. -- Voltaire",
    "So little time, so little to do. -- Oscar Levant"
  ];


function inspiration () {

  return inspirationalMessages[Math.floor((Math.random() * 10))];
}

module.exports = inspiration;
