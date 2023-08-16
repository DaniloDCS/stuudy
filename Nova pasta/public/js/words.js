


function getWords(word, lastWord = "") {
  word = word.replace(/ /g, "");
  
  if (word === "" || word.length <= 2) return [];

  lastWord = lastWord.toLowerCase();
  word = word.toLowerCase();

  let list = words[word.charAt(0).toLowerCase()].filter((item) => item.indexOf(word) === 0); 

  if (lastWord === "as" || lastWord === "os" || lastWord === "às" || lastWord === "aos" || lastWord === "das" || lastWord === "dos" || lastWord.slice(-2) === "as" || lastWord.slice(-2) === "os" || lastWord.slice(-3) === "aos" || lastWord.slice(-3) === "das" || lastWord.slice(-3) === "dos") {  
    
    if (lastWord === "os" || lastWord === "aos" || lastWord === "dos" || lastWord.slice(-2) === "os" || lastWord.slice(-3) === "aos" || lastWord.slice(-3) === "dos") {

      list = list.filter((item) => {
        let endsIn = item.slice(-2);
      
        if (endsIn === "re" || endsIn === "am" || endsIn === "em" || endsIn === "es" || endsIn === "rá" || endsIn === "lo" || endsIn === "os" || endsIn === "ar") return true;
      });
    }
    
    if (lastWord === "as" || lastWord === "às" || lastWord === "das" || lastWord.slice(-2) === "as" || lastWord.slice(-3) === "das") {

      list = list.filter((item) => {
        let endsIn = item.slice(-2);
      
        if (endsIn === "re" || endsIn === "am" || endsIn === "em" || endsIn === "es" || endsIn === "rá" || endsIn === "la" || endsIn === "as" || endsIn === "ar") return true;
      });
    }
  }

  // para lastWord em qualquer um dos tempo verbais, filtra a lista para só conter verbos, se não, não filtra

  let endsVerb = lastWord.slice(-4);

  if (endsVerb === "ando" || endsVerb === "endo" || endsVerb === "indo") {
    list = list.filter((item) => {
      let endsIn = item.slice(-4);

      if (endsIn.includes("as") || endsIn.includes("os") || endsIn === "ando" || endsIn === "endo" || endsIn === "indo") return true;
    });
  }

  // para lastWord em qualquer um dos tempo verbais, filtra a lista para só conter verbos, se não, não filtra

  endsVerb = lastWord.slice(-3);

  if (endsVerb === "ava") {
    list = list.filter((item) => {
      let endsIn = item.slice(-3);

      if (endsIn === "ava") return true;
    });
  }

  // para lastWord em qualquer um dos tempo verbais, filtra a lista para só conter verbos, se não, não filtra

  endsVerb = lastWord.slice(-2);

  if (endsVerb === "am" || endsVerb === "em" || endsVerb === "es" || endsVerb === "rá" || endsVerb === "lo" || endsVerb === "os" || endsVerb === "la" || endsVerb === "as") {
    list = list.filter((item) => {
      let endsIn = item.slice(-2);

      if (endsIn === "am" || endsIn === "em" || endsIn === "es" || endsIn === "rá" || endsIn === "er" || endsIn === "do" || endsIn === "ir" || endsIn === "as") return true;
    });
  }
  
  return list;
};