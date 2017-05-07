import Ember from 'ember';

export default Ember.Controller.extend({
    text: "dit is een test",

    getCurrentWordForPosition: function(text, position) {
	if(position === 0)
	{
	    return "";
	}
	
	var startOfWord = position - 1;
	while(startOfWord > 0 && text.substring(startOfWord, startOfWord + 1) !== ' ')
	{
	    startOfWord--;
	}
	
	var endOfWord = position;
	while(endOfWord < text.length && text.substring(endOfWord, endOfWord + 1) !== ' ')
	{
	    endOfWord++;
	}
	return text.substring(startOfWord, endOfWord).trim();
    },
							   
    actions: {
	handleTrixAction: function(event) {
	    console.log(event);
	    var trixEditor = Ember.get(event, "target");
	    var internalEditor = Ember.get(trixEditor, "editor");
	    var document = Ember.get(internalEditor, "composition.document");
	    var textObjects = Ember.get(document, "blockList.objects");
	    var text = Ember.get(textObjects[0], "text.pieceList.objects");
	    var selectionManager = Ember.get(internalEditor, "selectionManager");
	    var currentLocationRange = Ember.get(selectionManager, "currentLocationRange");
	    var start = 0;
	    var end = 0;
	    if(currentLocationRange !== undefined)
	    {
		start = Ember.get(currentLocationRange[0], "offset");
		end = Ember.get(currentLocationRange[1], "offset");
	    }

	    
	    var innerHTML = Ember.get(trixEditor, "innerHTML");
	    var innerText = Ember.get(trixEditor, "innerText");

	    Ember.set(this, "innerHTML", innerHTML);
	    Ember.set(this, "innerText", innerText);
	    Ember.set(this, "start", start);
	    Ember.set(this, "end", end);
	    Ember.set(this, "innerHTMLStart", innerHTML.substring(0, start));
	    Ember.set(this, "innerHTMLEnd", innerHTML.substring(start, innerHTML.length));
	    Ember.set(this, "innerTextStart", innerText.substring(0, start));
	    Ember.set(this, "innerTextEnd", innerText.substring(start, innerHTML.length));
	    Ember.set(this, "text", text);
	    Ember.set(this, "currentWord", this.get("getCurrentWordForPosition")(innerText, start));
	    console.log(this.get('text'));
	}
    }
});
