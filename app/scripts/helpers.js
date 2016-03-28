let helpers =  {
  formatPrice :  function(cents) {
    return '$' + ( (cents / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") );
    // turns entry of 2000 into $20.00
  },
  rando : function(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  },
  slugify : function(text) {
    //make any string of text URL-friendly
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');            // Trim - from end of text
  },
  getFunName : function() {
    var adjectives = ['bigger', 'beautiful', 'clean', 'shiny', 'fancy', 'blue', 'magnificent', 'ship', 'plain', 'quaint', 'sparkling', 'bewildered', 'clumsy', 'defeated', 'embarrassed', 'fierce', 'grumpy', 'helpless', 'itchy', 'jealous', 'lazy', 'mysterious', 'nervous', 'obnoxious', 'scary'];
    
    var nouns = ['who', 'tardis', 'serenity', 'browncoat', 'policebox', 'leaves', 'mice', 'geese', 'lives', 'elves', 'loaves', 'potatoes', 'tomatoes', 'cacti', 'foci', 'fungi', 'nuclei', 'syllabuses', 'analyses', 'diagnoses', 'oases', 'theses', 'crises', 'phenomena', 'criteria', 'data'];
    
    return `${this.rando(adjectives)}-${this.rando(adjectives)}-${this.rando(nouns)}`;
  }
}

export default helpers;
