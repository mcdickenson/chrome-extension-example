// We want to match both lowercase strings and their capitalized versions in pages
String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

function replaceBoringPhrases(content){
  // Set up a mapping of more fun replacement phrases
  // Adapted from http://xkcd.com/1625/
  var dictionary = {
    "debate":                               "dance-off",
    "self\\-?driving":                      "uncontrollably swerving",
    "poll":                                 "psychic reading",
    "candidate":                            "airbender",
    "drone":                                "dog",
    "vows\\s+to":                           "probably won't",
    "at large":                             "very large",
    "successful":                           "sudden",
    "^(physically\\s)expands":              "physically expands",
    "(first|second|third)(\\-|\\s)?degree": "friggin' awful",
    "an unknown number":                    "like hundreds",
    "front\-?runner":                       "blade-runner",
    "global":                               "spherical",
    // we need to replace 'years' and 'minutes' with placeholders,
    // the replace those placeholders with minutes and years
    "years":                                "replacedYrs",
    "minutes":                              "replacedMins",
    "replacedYrs":                          "minutes",
    "replacedMins":                         "years",
    "no indication":                        "lots of signs",
    "urged restraint":                      "drunkenly egged on",
    "horsepower":                           "tons of horsemeat"
  }

  // iterate over the regular expressions, find-and-replace in content
  for (key in dictionary) {
    content = content.replace(new RegExp(key, "g"), dictionary[key]);

    capitalizedKey = key.capitalize();
    // for some of the keys (the ones starting with special RegExp symbols) this won't make a difference
    if (capitalizedKey !== key) {
      capitalizedReplacement = dictionary[key].capitalize();
      content = content.replace(new RegExp(capitalizedKey, "g"), capitalizedReplacement);
    }
  }

  return content;
}

// the text to use as content--the inner html of the page
document.body.innerHTML = replaceBoringPhrases(document.body.innerHTML);