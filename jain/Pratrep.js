	/**
 * Convert data in CSV (comma separated value) format to a javascript array.
 *
 * Values are separated by a comma, or by a custom one character delimeter.
 * Rows are separated by a new-line character.
 *
 * Leading and trailing spaces and tabs are ignored.
 * Values may optionally be enclosed by double quotes.
 * Values containing a special character (comma's, double-quotes, or new-lines)
 *   must be enclosed by double-quotes.
 * Embedded double-quotes must be represented by a pair of consecutive 
 * double-quotes.
 *
 * Example usage:
 *   var csv = '"x", "y", "z"\n12.3, 2.3, 8.7\n4.5, 1.2, -5.6\n';
 *   var array = csv2array(csv);
 *  
 * Author: Jos de Jong, 2010
 * 
 * @param {string} data      The data in CSV format.
 * @param {string} delimeter [optional] a custom delimeter. Comma ',' by default
 *                           The Delimeter must be a single character.
 * @return {Array} array     A two dimensional array containing the data
 * @throw {String} error     The method throws an error when there is an
 *                           error in the provided data.
 */ 
function Spellprocess() {
  window.a = ""; //Declaring these variables for use in PratRep2 and PPrep for getting Par pratyay and Pre pratyay
  window.c = "";
  mystring = document.getElementById("MyList").value;
  // Split the string into words
const words = mystring.split(/[\/\\\(\)\"\'\-\.\,\r\n\s\:\;\<\>\~\!\@\#\$\%\^\&\*\|\+\=\[\]\{\}\~\?\│]+|[0-9]+|[०-९]+|[૦-૯]+/g);


  //const words = mystring.split(/[\/\\\(\)\"\-\.\,\:\;\<\>\~\!\@\#\$\%\^\&\*\|\+\=\[\]\{\}\~\?\│\s\']+/);

  // Loop over each word and check if it needs to be corrected
  let correctedString = "";
  let contextString = "";
  let contextStart = 0;
  let contextEnd = 0;
  let changedWords = [];


  for (let i = 0; i < words.length-1; i++) {
    const words = mystring.split(/[.(),;:!?\s]+/);
    word = words[i];
	word=word.replace(/[\/\\\(\)\"\'\-\.\,\r\n\s\:\;\<\>\~\!\@\#\$\%\^\&\*\|\+\=\[\]\{\}\~\?\│]+|[0-9]+|[०-९]+|[૦-૯]+/g,"");
if (word==""){}
else
{
console.log(word);
    let corrected = Spellcheck(word);
	a="";
    if (corrected !== word) {
      contextStart = Math.max(0, i - 4);
      contextEnd = Math.min(words.length, i + 5);
      contextString = words.slice(contextStart, contextEnd).join(" ");
      let confirmedWord = prompt(
        `Did you mean "${corrected}" for "${word}"?\n\n${contextString}\n\nType the correct word or press Cancel to keep the original.`,
        corrected
      );
      if (confirmedWord !== null) {
        mystring = mystring.replaceAll(word, confirmedWord);
        changedWords.push([word, confirmedWord]);
      }
	}
    }
  }

  // Log the history of changed words to the console
  console.log("Changed words:");
  console.log(changedWords);

  // Return the corrected string
  document.getElementById("Answer").innerHTML = mystring;
}


function csv2array(data, delimeter) {
  // Retrieve the delimeter
  if (delimeter == undefined) 
    delimeter = ',';
  if (delimeter && delimeter.length > 1)
    delimeter = ',';

  // initialize variables
  var newline = '\n';
  var eof = '';
  var i = 0;
  var c = data.charAt(i);
  var row = 0;
  var col = 0;
  var array = new Array();

  while (c != eof) {
    // skip whitespaces
    while (c == ' ' || c == '\t' || c == '\r') {
      c = data.charAt(++i); // read next char
    }
    
    // get value
    var value = "";
    if (c == '\"') {
      // value enclosed by double-quotes
      c = data.charAt(++i);
      
      do {
        if (c != '\"') {
          // read a regular character and go to the next character
          value += c;
          c = data.charAt(++i);
        }
        
        if (c == '\"') {
          // check for escaped double-quote
          var cnext = data.charAt(i+1);
          if (cnext == '\"') {
            // this is an escaped double-quote. 
            // Add a double-quote to the value, and move two characters ahead.
            value += '\"';
            i += 2;
            c = data.charAt(i);
          }
        }
      }
      while (c != eof && c != '\"');
      
      if (c == eof) {
        throw "Unexpected end of data, double-quote expected";
      }

      c = data.charAt(++i);
    }
    else {
      // value without quotes
      while (c != eof && c != delimeter && c!= newline && c != ' ' && c != '\t' && c != '\r') {
        value += c;
        c = data.charAt(++i);
      }
    }

    // add the value to the array
    if (array.length <= row) 
      array.push(new Array());
    array[row].push(value);
    
    // skip whitespaces
    while (c == ' ' || c == '\t' || c == '\r') {
      c = data.charAt(++i);
    }

    // go to the next row or column
    if (c == delimeter) {
      // to the next column
      col++;
    }
    else if (c == newline) {
      // to the next row
      col = 0;
      row++;
    }
    else if (c != eof) {
      // unexpected character
      throw "Delimiter expected after character " + i;
    }
    
    // go to the next character
    c = data.charAt(++i);
  }  
  
  return array;
}

function get() //input should be without \n. This is the function to do actual vlookup in the form.js (list of Dict words arranged in first two character based variables) and check if word is available in the dictionary or not. It will give answer as either the found word or "NA".
{
      // retrieve data
	  	window.a=""; //Declaring these variables for use in PratRep2 and PPrep for getting Par pratyay and Pre pratyay
	window.c="";
      var MyList = document.getElementById("MyList").value;

      // convert data to array
      /*try {
        window.Dict = csv2array(data);
      }
      catch (exception) {
        alert("Error: " + exception);
        return;
      }*/
	  try {
        window.MyOriList = csv2array(MyList);
      }
      catch (exception) {
        alert("Error: " + exception);
        return;
      }


var test = "";
var today;

	  var temp = 0;
	  while (temp < MyOriList.length) {
	  //alert(MyOriList[temp]);
	 var b;
	 b=ocrclr(MyOriList[temp].toString()) + "\n";
	 a="";c="";
	 
	 today = new Date();
	 console.log("Answer is ==>> " + b+"Obtained at "+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds());
	   test += b;
		temp++;
		}
		      /* convert the array back to a string
      var arrayStr = "";
      for (row = 0; row < FoundList.length; row++) {
        for (col = 0; col < FoundList[row].length; col++) {
         if (col > 0) {
            arrayStr += ",";
          }
          arrayStr += FoundList[row][col];
        }
        arrayStr += "\n";
      }*/

      // show the data in an alert 	
  
document.getElementById("Answer").innerHTML = test ;

    }
function vlookup(input) 
{
	var da;
	if(datalist.search("\""+input.slice(0,2)+"\"")==-1){return "NA";}
	da=eval("data"+input.slice(0,2));
	if(da.search("\""+input+"\"")==-1){return "NA";}
	else{return input;}
	/*var i = 1;
if (input == null){
return "NA";}
	while (Dict[i] < input) {
	i++;	
	} 
	if (Dict[i] == input) {
	return input;}
	else {return "NA";}*/
}
function pratrep2(x)  
{
var y,t3,t1,z,d,t5,t6;
y,t3,t1,z,d,t5,t6 = "";
if (vlookup(x) != "NA")// CHECK1 answer obtained by directly searching in dictionary
{
	console.log("answer obtained by directly searching in dictionary");
	return x;
}
d=x;
x=fmwreplace(x);
if (vlookup(x) != "NA")// CHECK2 Mean if word is found in FMW list & then looked up in Dictionary, if found then ANSWER Obtained, if not found, then continue..
{
	console.log("First we corrected with frequently mistaken word list and answer obtained by directly searching in dictionary");
return x;
}
if (d!=x) //meaning if word is found in FMW list, no need again to check in dict as already checked above. So now apply pratyay removal process on FMW replaced word and see if it results in answer.
{
	console.log("Checked in my Data of frequent mistake words(FMW) and found this word as Frequently mistaken, so correcting it, word "+d+" got changed to "+x);
y=x+"\n";
x=x+"\n";
t5=pratcheck(x,y); //applying prat remo process on FMW changed word.
if(t5!="NA") //After applying pratyay removal process, if word was not found (meaning NA) then Go further and search with original word (currently stored in variable d).
	{ return t5;}
	console.log("nothing found in PratRep2 for "+d+" with FMW Replace, now trying back to use original word and see if it works");
}
t6=pratcheck(d+"\n",d+"\n"); //if FMW change not happened and Checking for Original word.
if(t6=="NA") // now checking original word with pratyay removal process and if it results in NA that means nothing can be done further and answer is NA.
{
	console.log("nothing found in PratRep2, FMWReplace and even applying original word with PratRep for "+d+"!!");
return "NA";
}
return t6;
}
function pratcheck(x,y)
{
d=x;
a="";
// PASTE FROM HERE
if((x.search("ઓમય"+"\n")==-1)&&(x.search("નેય"+"\n")==-1)&&(x.search("ેય"+"\n")==-1)&&(x.search("મય"+"\n")==-1)&&(x.search("ગણરાજ્ય"+"\n")==-1)&&(x.search("મોહનીય"+"\n")==-1)&&(x.search("વેદનીય"+"\n")==-1)&&(x.search("દ્રવ્ય"+"\n")==-1)&&(x.search("ાચાર્ય"+"\n")==-1)&&(x.search("રાજ્ય"+"\n")==-1)&&(x.search("ભોગ્ય"+"\n")==-1)&&(x.search("યોગ્ય"+"\n")==-1)&&(x.search("વિષય"+"\n")==-1)&&(x.search("ત્રય"+"\n")==-1)&&(x.search("વિજય"+"\n")==-1)&&(x.search("સમય"+"\n")==-1)&&(x.search("કીય"+"\n")==-1)&&(x.search("મ્ય"+"\n")==-1)&&(x.search("નીય"+"\n")==-1)&&(x.search("નય"+"\n")==-1)){x=x.replace(/ય[\n]/g,"\n");}if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ય"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ય"+a;y =y+"\n";}}
x = x.replace(/ઓમાંથી[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ઓમાંથી"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ઓમાંથી"+a;y =y+"\n";}z=y+"ઓમાંથી".slice(0,-1);if (vlookup(z) != "NA"){a="ી"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"ઓમાંથી".slice(0,-2);if (vlookup(z) != "NA"){a="થી"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"ઓમાંથી".slice(0,-5);if (vlookup(z) != "NA"){a="માંથી"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/માંથી[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="માંથી"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="માંથી"+a;y =y+"\n";}z=y+"માંથી".slice(0,-1);if (vlookup(z) != "NA"){a="ી"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"માંથી".slice(0,-2);if (vlookup(z) != "NA"){a="થી"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
if((x.search("ઓથી"+"\n")==-1)&&(x.search("ાર્થી"+"\n")==-1)){x=x.replace(/થી[\n]/g,"\n");}if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="થી"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="થી"+a;y =y+"\n";}z=y+"થી".slice(0,-1);if (vlookup(z) != "NA"){a="ી"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/તાઓ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="તાઓ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="તાઓ"+a;y =y+"\n";}z=y+"તાઓ".slice(0,-1);if (vlookup(z) != "NA"){a="ઓ"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ઓના[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ઓના"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ઓના"+a;y =y+"\n";}z=y+"ઓના".slice(0,-1);if (vlookup(z) != "NA"){a="ા"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"ઓના".slice(0,-2);if (vlookup(z) != "NA"){a="ના"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
if((x.search("ેલ"+"\n")==-1)&&(x.search("લાલ"+"\n")==-1)&&(x.search("શીલ"+"\n")==-1)&&(x.search("કાલ"+"\n")==-1)){x=x.replace(/લ[\n]/g,"\n");}if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="લ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="લ"+a;y =y+"\n";}}
x = x.replace(/ઓનો[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ઓનો"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ઓનો"+a;y =y+"\n";}z=y+"ઓનો".slice(0,-1);if (vlookup(z) != "NA"){a="ો"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"ઓનો".slice(0,-2);if (vlookup(z) != "NA"){a="નો"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ઓની[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ઓની"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ઓની"+a;y =y+"\n";}z=y+"ઓની".slice(0,-1);if (vlookup(z) != "NA"){a="ી"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"ઓની".slice(0,-2);if (vlookup(z) != "NA"){a="ની"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ઓથી[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ઓથી"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ઓથી"+a;y =y+"\n";}z=y+"ઓથી".slice(0,-1);if (vlookup(z) != "NA"){a="ી"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ઓમય[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ઓમય"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ઓમય"+a;y =y+"\n";}z=y+"ઓમય".slice(0,-2);if (vlookup(z) != "NA"){a="મય"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ઓનું[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ઓનું"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ઓનું"+a;y =y+"\n";}z=y+"ઓનું".slice(0,-2);if (vlookup(z) != "NA"){a="ું"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"ઓનું".slice(0,-3);if (vlookup(z) != "NA"){a="નું"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/મ્[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="મ્"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="મ્"+a;y =y+"\n";}}
if((x.search("નામું"+"\n")==-1)){x=x.replace(/મું[\n]/g,"\n");}if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="મું"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="મું"+a;y =y+"\n";}z=y+"મું".slice(0,-2);if (vlookup(z) != "NA"){a="ું"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/માં[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="માં"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="માં"+a;y =y+"\n";}}
x = x.replace(/મા[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="મા"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="મા"+a;y =y+"\n";}z=y+"મા".slice(0,-1);if (vlookup(z) != "NA"){a="ા"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/મુ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="મુ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="મુ"+a;y =y+"\n";}z=y+"મુ".slice(0,-1);if (vlookup(z) != "NA"){a="ુ"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/નાના[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="નાના"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="નાના"+a;y =y+"\n";}z=y+"નાના".slice(0,-1);if (vlookup(z) != "NA"){a="ા"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"નાના".slice(0,-2);if (vlookup(z) != "NA"){a="ના"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ેયને[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ેયને"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ેયને"+a;y =y+"\n";}z=y+"ેયને".slice(0,-1);if (vlookup(z) != "NA"){a="ે"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"ેયને".slice(0,-2);if (vlookup(z) != "NA"){a="ને"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/નેય[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="નેય"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="નેય"+a;y =y+"\n";}z=y+"નેય".slice(0,-2);if (vlookup(z) != "NA"){a="ેય"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ેય[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ેય"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ેય"+a;y =y+"\n";}}
x = x.replace(/ને[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ને"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ને"+a;y =y+"\n";}z=y+"ને".slice(0,-1);if (vlookup(z) != "NA"){a="ે"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/નો[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="નો"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="નો"+a;y =y+"\n";}z=y+"નો".slice(0,-1);if (vlookup(z) != "NA"){a="ો"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
if((x.search("ખાની"+"\n")==-1)){x=x.replace(/ની[\n]/g,"\n");}if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ની"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ની"+a;y =y+"\n";}z=y+"ની".slice(0,-1);if (vlookup(z) != "NA"){a="ી"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
if((x.search("ખાનું"+"\n")==-1)){x=x.replace(/નું[\n]/g,"\n");}if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="નું"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="નું"+a;y =y+"\n";}z=y+"નું".slice(0,-2);if (vlookup(z) != "NA"){a="ું"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/નુ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="નુ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="નુ"+a;y =y+"\n";}z=y+"નુ".slice(0,-1);if (vlookup(z) != "NA"){a="ુ"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
if((x.search("ખાના"+"\n")==-1)){x=x.replace(/ના[\n]/g,"\n");}if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ના"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ના"+a;y =y+"\n";}z=y+"ના".slice(0,-1);if (vlookup(z) != "NA"){a="ા"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/સો[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="સો"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="સો"+a;y =y+"\n";}z=y+"સો".slice(0,-1);if (vlookup(z) != "NA"){a="ો"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/પૂર્વક[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="પૂર્વક"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="પૂર્વક"+a;y =y+"\n";}z=y+"પૂર્વક".slice(0,-1);if (vlookup(z) != "NA"){a="ક"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/વાળો[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="વાળો"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="વાળો"+a;y =y+"\n";}z=y+"વાળો".slice(0,-1);if (vlookup(z) != "NA"){a="ો"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"વાળો".slice(0,-3);if (vlookup(z) != "NA"){a="ાળો"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/વાળું[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="વાળું"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="વાળું"+a;y =y+"\n";}z=y+"વાળું".slice(0,-2);if (vlookup(z) != "NA"){a="ું"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/વાળ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="વાળ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="વાળ"+a;y =y+"\n";}z=y+"વાળ".slice(0,-2);if (vlookup(z) != "NA"){a="ાળ"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/વાળા[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="વાળા"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="વાળા"+a;y =y+"\n";}z=y+"વાળા".slice(0,-1);if (vlookup(z) != "NA"){a="ા"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"વાળા".slice(0,-3);if (vlookup(z) != "NA"){a="ાળા"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/વાળુ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="વાળુ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="વાળુ"+a;y =y+"\n";}z=y+"વાળુ".slice(0,-1);if (vlookup(z) != "NA"){a="ુ"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/વાળી[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="વાળી"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="વાળી"+a;y =y+"\n";}z=y+"વાળી".slice(0,-1);if (vlookup(z) != "NA"){a="ી"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/પિતા[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="પિતા"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="પિતા"+a;y =y+"\n";}z=y+"પિતા".slice(0,-1);if (vlookup(z) != "NA"){a="ા"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"પિતા".slice(0,-2);if (vlookup(z) != "NA"){a="તા"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/માતા[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="માતા"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="માતા"+a;y =y+"\n";}z=y+"માતા".slice(0,-1);if (vlookup(z) != "NA"){a="ા"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"માતા".slice(0,-2);if (vlookup(z) != "NA"){a="તા"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/પણા[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="પણા"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="પણા"+a;y =y+"\n";}z=y+"પણા".slice(0,-1);if (vlookup(z) != "NA"){a="ા"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"પણા".slice(0,-2);if (vlookup(z) != "NA"){a="ણા"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/પણું[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="પણું"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="પણું"+a;y =y+"\n";}z=y+"પણું".slice(0,-2);if (vlookup(z) != "NA"){a="ું"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"પણું".slice(0,-3);if (vlookup(z) != "NA"){a="ણું"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
if((x.search("કર્મો"+"\n")==-1)){x=x.replace(/મો[\n]/g,"\n");}if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="મો"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="મો"+a;y =y+"\n";}z=y+"મો".slice(0,-1);if (vlookup(z) != "NA"){a="ો"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
if((x.search("ઈએ"+"\n")==-1)&&(x.search("ુએ"+"\n")==-1)&&(x.search("ાવીએ"+"\n")==-1)&&(x.search("શ્રીએ"+"\n")==-1)&&(x.search("ીએ"+"\n")==-1)){x=x.replace(/એ[\n]/g,"\n");}if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="એ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="એ"+a;y =y+"\n";}}
if((x.search("ુઓ"+"\n")==-1)){x=x.replace(/ઓ[\n]/g,"\n");}if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ઓ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ઓ"+a;y =y+"\n";}}
x = x.replace(/ઃ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ઃ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ઃ"+a;y =y+"\n";}}
x = x.replace(/ાર્થી[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાર્થી"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાર્થી"+a;y =y+"\n";}z=y+"ાર્થી".slice(0,-1);if (vlookup(z) != "NA"){a="ી"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ાર્થ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાર્થ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાર્થ"+a;y =y+"\n";}}
x = x.replace(/તો[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="તો"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="તો"+a;y =y+"\n";}z=y+"તો".slice(0,-1);if (vlookup(z) != "NA"){a="ો"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/તી[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="તી"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="તી"+a;y =y+"\n";}z=y+"તી".slice(0,-1);if (vlookup(z) != "NA"){a="ી"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
if((x.search("કર્તા"+"\n")==-1)){x=x.replace(/્તા[\n]/g,"\n");}if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="્તા"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="્તા"+a;y =y+"\n";}z=y+"્તા".slice(0,-1);if (vlookup(z) != "NA"){a="ા"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"્તા".slice(0,-2);if (vlookup(z) != "NA"){a="તા"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
if((x.search("કર્તા"+"\n")==-1)){x=x.replace(/તા[\n]/g,"\n");}if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="તા"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="તા"+a;y =y+"\n";}z=y+"તા".slice(0,-1);if (vlookup(z) != "NA"){a="ા"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
if((x.search("નીશ"+"\n")==-1)){x=x.replace(/ીશ[\n]/g,"\n");}if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ીશ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ીશ"+a;y =y+"\n";}}
x = x.replace(/ુત્તમ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ુત્તમ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ુત્તમ"+a;y =y+"\n";}z=y+"ુત્તમ".slice(0,-1);if (vlookup(z) != "NA"){a="મ"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ોત્તમ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ોત્તમ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ોત્તમ"+a;y =y+"\n";}z=y+"ોત્તમ".slice(0,-1);if (vlookup(z) != "NA"){a="મ"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ીશું[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ીશું"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ીશું"+a;y =y+"\n";}z=y+"ીશું".slice(0,-2);if (vlookup(z) != "NA"){a="ું"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
if((x.search("ાશે"+"\n")==-1)){x=x.replace(/શે[\n]/g,"\n");}if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="શે"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="શે"+a;y =y+"\n";}z=y+"શે".slice(0,-1);if (vlookup(z) != "NA"){a="ે"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ઈશું[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ઈશું"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ઈશું"+a;y =y+"\n";}z=y+"ઈશું".slice(0,-2);if (vlookup(z) != "NA"){a="ું"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ઈશ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ઈશ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ઈશ"+a;y =y+"\n";}}
x = x.replace(/ુતમ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ુતમ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ુતમ"+a;y =y+"\n";}z=y+"ુતમ".slice(0,-1);if (vlookup(z) != "NA"){a="મ"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ોતમ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ોતમ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ોતમ"+a;y =y+"\n";}z=y+"ોતમ".slice(0,-1);if (vlookup(z) != "NA"){a="મ"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ેષ્ઠ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ેષ્ઠ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ેષ્ઠ"+a;y =y+"\n";}}
x = x.replace(/ીષ્ઠ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ીષ્ઠ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ીષ્ઠ"+a;y =y+"\n";}}
x = x.replace(/ેષ્ટ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ેષ્ટ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ેષ્ટ"+a;y =y+"\n";}}
x = x.replace(/ીષ્ટ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ીષ્ટ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ીષ્ટ"+a;y =y+"\n";}}
if((x.search("ાવનારો"+"\n")==-1)&&(x.search("નારો"+"\n")==-1)){x=x.replace(/ારો[\n]/g,"\n");}if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ારો"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ારો"+a;y =y+"\n";}z=y+"ારો".slice(0,-1);if (vlookup(z) != "NA"){a="ો"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
if((x.search("ાવનારી"+"\n")==-1)&&(x.search("નારી"+"\n")==-1)&&(x.search("કારી"+"\n")==-1)){x=x.replace(/ારી[\n]/g,"\n");}if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ારી"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ારી"+a;y =y+"\n";}z=y+"ારી".slice(0,-1);if (vlookup(z) != "NA"){a="ી"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/વાર[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="વાર"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="વાર"+a;y =y+"\n";}z=y+"વાર".slice(0,-2);if (vlookup(z) != "NA"){a="ાર"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ાડો[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાડો"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાડો"+a;y =y+"\n";}z=y+"ાડો".slice(0,-1);if (vlookup(z) != "NA"){a="ો"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"ાડો".slice(0,-2);if (vlookup(z) != "NA"){a="ડો"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
if((x.search("વિદ્યા"+"\n")==-1)){x=x.replace(/્યા[\n]/g,"\n");}if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="્યા"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="્યા"+a;y =y+"\n";}z=y+"્યા".slice(0,-1);if (vlookup(z) != "NA"){a="ા"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"્યા".slice(0,-2);if (vlookup(z) != "NA"){a="યા"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ાવનાર[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાવનાર"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાવનાર"+a;y =y+"\n";}z=y+"ાવનાર".slice(0,-2);if (vlookup(z) != "NA"){a="ાર"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"ાવનાર".slice(0,-3);if (vlookup(z) != "NA"){a="નાર"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/નાર[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="નાર"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="નાર"+a;y =y+"\n";}z=y+"નાર".slice(0,-2);if (vlookup(z) != "NA"){a="ાર"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
if((x.search("સંસ્કાર"+"\n")==-1)&&(x.search("ચમત્કાર"+"\n")==-1)&&(x.search("ાનુસાર"+"\n")==-1)&&(x.search("પ્રકાર"+"\n")==-1)&&(x.search("પ્રચાર"+"\n")==-1)&&(x.search("ધિકાર"+"\n")==-1)&&(x.search("કુમાર"+"\n")==-1)&&(x.search("વિકાર"+"\n")==-1)&&(x.search("હજાર"+"\n")==-1)&&(x.search("ાચાર"+"\n")==-1)&&(x.search("ાકાર"+"\n")==-1)&&(x.search("ગાર"+"\n")==-1)&&(x.search("દાર"+"\n")==-1)&&(x.search("સાર"+"\n")==-1)&&(x.search("ભાર"+"\n")==-1)&&(x.search("કાર"+"\n")==-1)){x=x.replace(/ાર[\n]/g,"\n");}if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાર"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાર"+a;y =y+"\n";}}
x = x.replace(/નારું[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="નારું"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="નારું"+a;y =y+"\n";}z=y+"નારું".slice(0,-2);if (vlookup(z) != "NA"){a="ું"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ાવનારા[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાવનારા"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાવનારા"+a;y =y+"\n";}z=y+"ાવનારા".slice(0,-1);if (vlookup(z) != "NA"){a="ા"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"ાવનારા".slice(0,-3);if (vlookup(z) != "NA"){a="ારા"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"ાવનારા".slice(0,-4);if (vlookup(z) != "NA"){a="નારા"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/નારા[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="નારા"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="નારા"+a;y =y+"\n";}z=y+"નારા".slice(0,-1);if (vlookup(z) != "NA"){a="ા"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"નારા".slice(0,-3);if (vlookup(z) != "NA"){a="ારા"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ારા[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ારા"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ારા"+a;y =y+"\n";}z=y+"ારા".slice(0,-1);if (vlookup(z) != "NA"){a="ા"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ાવનારી[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાવનારી"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાવનારી"+a;y =y+"\n";}z=y+"ાવનારી".slice(0,-1);if (vlookup(z) != "NA"){a="ી"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"ાવનારી".slice(0,-4);if (vlookup(z) != "NA"){a="નારી"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/નારી[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="નારી"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="નારી"+a;y =y+"\n";}z=y+"નારી".slice(0,-1);if (vlookup(z) != "NA"){a="ી"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ાવનારો[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાવનારો"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાવનારો"+a;y =y+"\n";}z=y+"ાવનારો".slice(0,-1);if (vlookup(z) != "NA"){a="ો"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"ાવનારો".slice(0,-4);if (vlookup(z) != "NA"){a="નારો"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/નારો[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="નારો"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="નારો"+a;y =y+"\n";}z=y+"નારો".slice(0,-1);if (vlookup(z) != "NA"){a="ો"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ુઓ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ુઓ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ુઓ"+a;y =y+"\n";}}
x = x.replace(/ઈએ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ઈએ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ઈએ"+a;y =y+"\n";}}
x = x.replace(/સ્[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="સ્"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="સ્"+a;y =y+"\n";}}
x = x.replace(/ીન[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ીન"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ીન"+a;y =y+"\n";}z=y+"ીન".slice(0,-1);if (vlookup(z) != "NA"){a="ન"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
if((x.search("દેવી"+"\n")==-1)){x=x.replace(/વી[\n]/g,"\n");}if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="વી"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="વી"+a;y =y+"\n";}z=y+"વી".slice(0,-1);if (vlookup(z) != "NA"){a="ી"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ધેલું[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ધેલું"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ધેલું"+a;y =y+"\n";}z=y+"ધેલું".slice(0,-2);if (vlookup(z) != "NA"){a="ું"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"ધેલું".slice(0,-4);if (vlookup(z) != "NA"){a="ેલું"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ાવડાયેલું[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાવડાયેલું"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાવડાયેલું"+a;y =y+"\n";}z=y+"ાવડાયેલું".slice(0,-2);if (vlookup(z) != "NA"){a="ું"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"ાવડાયેલું".slice(0,-4);if (vlookup(z) != "NA"){a="ેલું"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"ાવડાયેલું".slice(0,-5);if (vlookup(z) != "NA"){a="યેલું"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"ાવડાયેલું".slice(0,-6);if (vlookup(z) != "NA"){a="ાયેલું"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ાવડાયેલા[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાવડાયેલા"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાવડાયેલા"+a;y =y+"\n";}z=y+"ાવડાયેલા".slice(0,-1);if (vlookup(z) != "NA"){a="ા"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"ાવડાયેલા".slice(0,-3);if (vlookup(z) != "NA"){a="ેલા"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"ાવડાયેલા".slice(0,-4);if (vlookup(z) != "NA"){a="યેલા"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"ાવડાયેલા".slice(0,-5);if (vlookup(z) != "NA"){a="ાયેલા"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ાવડાયેલી[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાવડાયેલી"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાવડાયેલી"+a;y =y+"\n";}z=y+"ાવડાયેલી".slice(0,-1);if (vlookup(z) != "NA"){a="ી"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"ાવડાયેલી".slice(0,-2);if (vlookup(z) != "NA"){a="લી"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"ાવડાયેલી".slice(0,-3);if (vlookup(z) != "NA"){a="ેલી"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"ાવડાયેલી".slice(0,-4);if (vlookup(z) != "NA"){a="યેલી"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"ાવડાયેલી".slice(0,-5);if (vlookup(z) != "NA"){a="ાયેલી"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ાવડાયેલો[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાવડાયેલો"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાવડાયેલો"+a;y =y+"\n";}z=y+"ાવડાયેલો".slice(0,-1);if (vlookup(z) != "NA"){a="ો"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"ાવડાયેલો".slice(0,-3);if (vlookup(z) != "NA"){a="ેલો"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"ાવડાયેલો".slice(0,-4);if (vlookup(z) != "NA"){a="યેલો"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"ાવડાયેલો".slice(0,-5);if (vlookup(z) != "NA"){a="ાયેલો"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ાયેલું[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાયેલું"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાયેલું"+a;y =y+"\n";}z=y+"ાયેલું".slice(0,-2);if (vlookup(z) != "NA"){a="ું"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"ાયેલું".slice(0,-4);if (vlookup(z) != "NA"){a="ેલું"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"ાયેલું".slice(0,-5);if (vlookup(z) != "NA"){a="યેલું"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ાયેલા[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાયેલા"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાયેલા"+a;y =y+"\n";}z=y+"ાયેલા".slice(0,-1);if (vlookup(z) != "NA"){a="ા"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"ાયેલા".slice(0,-3);if (vlookup(z) != "NA"){a="ેલા"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"ાયેલા".slice(0,-4);if (vlookup(z) != "NA"){a="યેલા"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ાયેલી[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાયેલી"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાયેલી"+a;y =y+"\n";}z=y+"ાયેલી".slice(0,-1);if (vlookup(z) != "NA"){a="ી"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"ાયેલી".slice(0,-2);if (vlookup(z) != "NA"){a="લી"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"ાયેલી".slice(0,-3);if (vlookup(z) != "NA"){a="ેલી"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"ાયેલી".slice(0,-4);if (vlookup(z) != "NA"){a="યેલી"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ાયેલો[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાયેલો"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાયેલો"+a;y =y+"\n";}z=y+"ાયેલો".slice(0,-1);if (vlookup(z) != "NA"){a="ો"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"ાયેલો".slice(0,-3);if (vlookup(z) != "NA"){a="ેલો"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"ાયેલો".slice(0,-4);if (vlookup(z) != "NA"){a="યેલો"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/યેલું[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="યેલું"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="યેલું"+a;y =y+"\n";}z=y+"યેલું".slice(0,-2);if (vlookup(z) != "NA"){a="ું"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"યેલું".slice(0,-4);if (vlookup(z) != "NA"){a="ેલું"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/યેલા[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="યેલા"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="યેલા"+a;y =y+"\n";}z=y+"યેલા".slice(0,-1);if (vlookup(z) != "NA"){a="ા"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"યેલા".slice(0,-3);if (vlookup(z) != "NA"){a="ેલા"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/યેલી[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="યેલી"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="યેલી"+a;y =y+"\n";}z=y+"યેલી".slice(0,-1);if (vlookup(z) != "NA"){a="ી"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"યેલી".slice(0,-2);if (vlookup(z) != "NA"){a="લી"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"યેલી".slice(0,-3);if (vlookup(z) != "NA"){a="ેલી"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/યેલો[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="યેલો"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="યેલો"+a;y =y+"\n";}z=y+"યેલો".slice(0,-1);if (vlookup(z) != "NA"){a="ો"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"યેલો".slice(0,-3);if (vlookup(z) != "NA"){a="ેલો"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
if((x.search("ાયા"+"\n")==-1)&&(x.search("વિદ્યા"+"\n")==-1)&&(x.search("માયા"+"\n")==-1)){x=x.replace(/યા[\n]/g,"\n");}if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="યા"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="યા"+a;y =y+"\n";}z=y+"યા".slice(0,-1);if (vlookup(z) != "NA"){a="ા"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ેલું[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ેલું"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ેલું"+a;y =y+"\n";}z=y+"ેલું".slice(0,-2);if (vlookup(z) != "NA"){a="ું"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ેલા[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ેલા"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ેલા"+a;y =y+"\n";}z=y+"ેલા".slice(0,-1);if (vlookup(z) != "NA"){a="ા"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ેલી[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ેલી"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ેલી"+a;y =y+"\n";}z=y+"ેલી".slice(0,-1);if (vlookup(z) != "NA"){a="ી"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"ેલી".slice(0,-2);if (vlookup(z) != "NA"){a="લી"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ેલો[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ેલો"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ેલો"+a;y =y+"\n";}z=y+"ેલો".slice(0,-1);if (vlookup(z) != "NA"){a="ો"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/મણું[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="મણું"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="મણું"+a;y =y+"\n";}z=y+"મણું".slice(0,-2);if (vlookup(z) != "NA"){a="ું"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"મણું".slice(0,-3);if (vlookup(z) != "NA"){a="ણું"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ાશે[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાશે"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાશે"+a;y =y+"\n";}z=y+"ાશે".slice(0,-1);if (vlookup(z) != "NA"){a="ે"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ાશ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાશ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાશ"+a;y =y+"\n";}}
if((x.search("યાણી"+"\n")==-1)&&(x.search("વાણી"+"\n")==-1)){x=x.replace(/ાણી[\n]/g,"\n");}if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાણી"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાણી"+a;y =y+"\n";}z=y+"ાણી".slice(0,-1);if (vlookup(z) != "NA"){a="ી"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/યાણી[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="યાણી"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="યાણી"+a;y =y+"\n";}z=y+"યાણી".slice(0,-1);if (vlookup(z) != "NA"){a="ી"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ાણ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાણ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાણ"+a;y =y+"\n";}z=y+"ાણ".slice(0,-1);if (vlookup(z) != "NA"){a="ણ"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ાઉ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાઉ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાઉ"+a;y =y+"\n";}}
x = x.replace(/ુએ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ુએ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ુએ"+a;y =y+"\n";}}
x = x.replace(/તું[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="તું"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="તું"+a;y =y+"\n";}z=y+"તું".slice(0,-2);if (vlookup(z) != "NA"){a="ું"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
if((x.search("હેતુ"+"\n")==-1)){x=x.replace(/તુ[\n]/g,"\n");}if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="તુ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="તુ"+a;y =y+"\n";}z=y+"તુ".slice(0,-1);if (vlookup(z) != "NA"){a="ુ"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/્યો[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="્યો"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="્યો"+a;y =y+"\n";}z=y+"્યો".slice(0,-1);if (vlookup(z) != "NA"){a="ો"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ાવશો[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાવશો"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાવશો"+a;y =y+"\n";}z=y+"ાવશો".slice(0,-1);if (vlookup(z) != "NA"){a="ો"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"ાવશો".slice(0,-2);if (vlookup(z) != "NA"){a="શો"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/શો[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="શો"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="શો"+a;y =y+"\n";}z=y+"શો".slice(0,-1);if (vlookup(z) != "NA"){a="ો"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ાવજો[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાવજો"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાવજો"+a;y =y+"\n";}z=y+"ાવજો".slice(0,-1);if (vlookup(z) != "NA"){a="ો"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"ાવજો".slice(0,-2);if (vlookup(z) != "NA"){a="જો"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/જો[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="જો"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="જો"+a;y =y+"\n";}z=y+"જો".slice(0,-1);if (vlookup(z) != "NA"){a="ો"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ાવીયે[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાવીયે"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાવીયે"+a;y =y+"\n";}z=y+"ાવીયે".slice(0,-1);if (vlookup(z) != "NA"){a="ે"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"ાવીયે".slice(0,-3);if (vlookup(z) != "NA"){a="ીયે"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ાવીએ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાવીએ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાવીએ"+a;y =y+"\n";}z=y+"ાવીએ".slice(0,-2);if (vlookup(z) != "NA"){a="ીએ"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ીયે[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ીયે"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ીયે"+a;y =y+"\n";}z=y+"ીયે".slice(0,-1);if (vlookup(z) != "NA"){a="ે"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/શ્રીએ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="શ્રીએ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="શ્રીએ"+a;y =y+"\n";}z=y+"શ્રીએ".slice(0,-2);if (vlookup(z) != "NA"){a="ીએ"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ીએ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ીએ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ીએ"+a;y =y+"\n";}}
if((x.search("ાવડાવે"+"\n")==-1)&&(x.search("વડાવે"+"\n")==-1)){x=x.replace(/ાવે[\n]/g,"\n");}if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાવે"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાવે"+a;y =y+"\n";}z=y+"ાવે".slice(0,-1);if (vlookup(z) != "NA"){a="ે"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ાવજે[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાવજે"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાવજે"+a;y =y+"\n";}z=y+"ાવજે".slice(0,-1);if (vlookup(z) != "NA"){a="ે"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"ાવજે".slice(0,-2);if (vlookup(z) != "NA"){a="જે"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/જે[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="જે"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="જે"+a;y =y+"\n";}z=y+"જે".slice(0,-1);if (vlookup(z) != "NA"){a="ે"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
if((x.search("વિરચિત"+"\n")==-1)&&(x.search("ગર્ભિત"+"\n")==-1)&&(x.search("જનિત"+"\n")==-1)&&(x.search("રહિત"+"\n")==-1)&&(x.search("સહિત"+"\n")==-1)){x=x.replace(/િત[\n]/g,"\n");}if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="િત"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="િત"+a;y =y+"\n";}z=y+"િત".slice(0,-1);if (vlookup(z) != "NA"){a="ત"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ાવડાવો[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાવડાવો"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાવડાવો"+a;y =y+"\n";}z=y+"ાવડાવો".slice(0,-1);if (vlookup(z) != "NA"){a="ો"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"ાવડાવો".slice(0,-2);if (vlookup(z) != "NA"){a="વો"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"ાવડાવો".slice(0,-3);if (vlookup(z) != "NA"){a="ાવો"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"ાવડાવો".slice(0,-5);if (vlookup(z) != "NA"){a="વડાવો"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/વડાવો[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="વડાવો"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="વડાવો"+a;y =y+"\n";}z=y+"વડાવો".slice(0,-1);if (vlookup(z) != "NA"){a="ો"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"વડાવો".slice(0,-2);if (vlookup(z) != "NA"){a="વો"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"વડાવો".slice(0,-3);if (vlookup(z) != "NA"){a="ાવો"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ાવડાવે[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાવડાવે"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાવડાવે"+a;y =y+"\n";}z=y+"ાવડાવે".slice(0,-1);if (vlookup(z) != "NA"){a="ે"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"ાવડાવે".slice(0,-5);if (vlookup(z) != "NA"){a="વડાવે"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ાવડાવવું[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાવડાવવું"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાવડાવવું"+a;y =y+"\n";}z=y+"ાવડાવવું".slice(0,-2);if (vlookup(z) != "NA"){a="ું"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"ાવડાવવું".slice(0,-3);if (vlookup(z) != "NA"){a="વું"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"ાવડાવવું".slice(0,-5);if (vlookup(z) != "NA"){a="ાવવું"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"ાવડાવવું".slice(0,-7);if (vlookup(z) != "NA"){a="વડાવવું"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/વડાવે[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="વડાવે"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="વડાવે"+a;y =y+"\n";}z=y+"વડાવે".slice(0,-1);if (vlookup(z) != "NA"){a="ે"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/વડાવવું[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="વડાવવું"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="વડાવવું"+a;y =y+"\n";}z=y+"વડાવવું".slice(0,-2);if (vlookup(z) != "NA"){a="ું"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"વડાવવું".slice(0,-3);if (vlookup(z) != "NA"){a="વું"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"વડાવવું".slice(0,-5);if (vlookup(z) != "NA"){a="ાવવું"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ાડવું[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાડવું"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાડવું"+a;y =y+"\n";}z=y+"ાડવું".slice(0,-2);if (vlookup(z) != "NA"){a="ું"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"ાડવું".slice(0,-3);if (vlookup(z) != "NA"){a="વું"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ાડાવવું[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાડાવવું"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાડાવવું"+a;y =y+"\n";}z=y+"ાડાવવું".slice(0,-2);if (vlookup(z) != "NA"){a="ું"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"ાડાવવું".slice(0,-3);if (vlookup(z) != "NA"){a="વું"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"ાડાવવું".slice(0,-5);if (vlookup(z) != "NA"){a="ાવવું"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ાવું[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાવું"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાવું"+a;y =y+"\n";}z=y+"ાવું".slice(0,-2);if (vlookup(z) != "NA"){a="ું"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"ાવું".slice(0,-3);if (vlookup(z) != "NA"){a="વું"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ાવવું[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાવવું"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાવવું"+a;y =y+"\n";}z=y+"ાવવું".slice(0,-2);if (vlookup(z) != "NA"){a="ું"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"ાવવું".slice(0,-3);if (vlookup(z) != "NA"){a="વું"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
if((x.search("સ્વભાવ"+"\n")==-1)&&(x.search("અભાવ"+"\n")==-1)&&(x.search("ભાવ"+"\n")==-1)){x=x.replace(/ાવ[\n]/g,"\n");}if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાવ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાવ"+a;y =y+"\n";}}
x = x.replace(/ાડ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાડ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાડ"+a;y =y+"\n";}}
x = x.replace(/ાડે[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાડે"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાડે"+a;y =y+"\n";}z=y+"ાડે".slice(0,-1);if (vlookup(z) != "NA"){a="ે"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
if((x.search("લાલભાઈ"+"\n")==-1)&&(x.search("ઓભાઈ"+"\n")==-1)&&(x.search("ભાઈ"+"\n")==-1)){x=x.replace(/ાઈ[\n]/g,"\n");}if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાઈ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાઈ"+a;y =y+"\n";}z=y+"ાઈ".slice(0,-1);if (vlookup(z) != "NA"){a="ઈ"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ાવડાવ્યું[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાવડાવ્યું"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાવડાવ્યું"+a;y =y+"\n";}z=y+"ાવડાવ્યું".slice(0,-2);if (vlookup(z) != "NA"){a="ું"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"ાવડાવ્યું".slice(0,-4);if (vlookup(z) != "NA"){a="્યું"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"ાવડાવ્યું".slice(0,-6);if (vlookup(z) != "NA"){a="ાવ્યું"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ાડ્યું[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાડ્યું"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાડ્યું"+a;y =y+"\n";}z=y+"ાડ્યું".slice(0,-2);if (vlookup(z) != "NA"){a="ું"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"ાડ્યું".slice(0,-4);if (vlookup(z) != "NA"){a="્યું"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ાડાવ્યું[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાડાવ્યું"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાડાવ્યું"+a;y =y+"\n";}z=y+"ાડાવ્યું".slice(0,-2);if (vlookup(z) != "NA"){a="ું"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"ાડાવ્યું".slice(0,-4);if (vlookup(z) != "NA"){a="્યું"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"ાડાવ્યું".slice(0,-6);if (vlookup(z) != "NA"){a="ાવ્યું"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ાવ્યું[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાવ્યું"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાવ્યું"+a;y =y+"\n";}z=y+"ાવ્યું".slice(0,-2);if (vlookup(z) != "NA"){a="ું"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"ાવ્યું".slice(0,-4);if (vlookup(z) != "NA"){a="્યું"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/્યું[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="્યું"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="્યું"+a;y =y+"\n";}z=y+"્યું".slice(0,-2);if (vlookup(z) != "NA"){a="ું"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ાડવા[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાડવા"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાડવા"+a;y =y+"\n";}z=y+"ાડવા".slice(0,-1);if (vlookup(z) != "NA"){a="ા"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"ાડવા".slice(0,-2);if (vlookup(z) != "NA"){a="વા"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ાવવા[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાવવા"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાવવા"+a;y =y+"\n";}z=y+"ાવવા".slice(0,-1);if (vlookup(z) != "NA"){a="ા"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"ાવવા".slice(0,-2);if (vlookup(z) != "NA"){a="વા"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ેતર[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ેતર"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ેતર"+a;y =y+"\n";}z=y+"ેતર".slice(0,-2);if (vlookup(z) != "NA"){a="તર"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/તર[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="તર"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="તર"+a;y =y+"\n";}}
x = x.replace(/ણા[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ણા"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ણા"+a;y =y+"\n";}z=y+"ણા".slice(0,-1);if (vlookup(z) != "NA"){a="ા"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ણું[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ણું"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ણું"+a;y =y+"\n";}z=y+"ણું".slice(0,-2);if (vlookup(z) != "NA"){a="ું"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
if((x.search("ઓપૂર્ણ"+"\n")==-1)&&(x.search("પરાયણ"+"\n")==-1)&&(x.search("પૂર્ણ"+"\n")==-1)&&(x.search("ગ્રહણ"+"\n")==-1)&&(x.search("પાટણ"+"\n")==-1)&&(x.search("ાયણ"+"\n")==-1)&&(x.search("ગુણ"+"\n")==-1)&&(x.search("પણ"+"\n")==-1)){x=x.replace(/ણ[\n]/g,"\n");}if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ણ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ણ"+a;y =y+"\n";}}
x = x.replace(/ેલ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ેલ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ેલ"+a;y =y+"\n";}}
x = x.replace(/ાટ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાટ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાટ"+a;y =y+"\n";}}
if((x.search("ેક"+"\n")==-1)&&(x.search("ીક"+"\n")==-1)&&(x.search("પ્રકાશક"+"\n")==-1)&&(x.search("ાત્મક"+"\n")==-1)&&(x.search("વિપાક"+"\n")==-1)&&(x.search("વિષયક"+"\n")==-1)&&(x.search("કારક"+"\n")==-1)&&(x.search("ાદિક"+"\n")==-1)&&(x.search("સાધક"+"\n")==-1)&&(x.search("નાક"+"\n")==-1)&&(x.search("લોક"+"\n")==-1)&&(x.search("પાક"+"\n")==-1)){x=x.replace(/ક[\n]/g,"\n");}if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ક"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ક"+a;y =y+"\n";}}
x = x.replace(/િયાળ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="િયાળ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="િયાળ"+a;y =y+"\n";}z=y+"િયાળ".slice(0,-2);if (vlookup(z) != "NA"){a="ાળ"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/િયાળી[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="િયાળી"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="િયાળી"+a;y =y+"\n";}z=y+"િયાળી".slice(0,-1);if (vlookup(z) != "NA"){a="ી"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/િયાળો[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="િયાળો"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="િયાળો"+a;y =y+"\n";}z=y+"િયાળો".slice(0,-1);if (vlookup(z) != "NA"){a="ો"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"િયાળો".slice(0,-3);if (vlookup(z) != "NA"){a="ાળો"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/લડી[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="લડી"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="લડી"+a;y =y+"\n";}z=y+"લડી".slice(0,-1);if (vlookup(z) != "NA"){a="ી"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"લડી".slice(0,-2);if (vlookup(z) != "NA"){a="ડી"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ડું[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ડું"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ડું"+a;y =y+"\n";}z=y+"ડું".slice(0,-2);if (vlookup(z) != "NA"){a="ું"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ડુ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ડુ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ડુ"+a;y =y+"\n";}z=y+"ડુ".slice(0,-1);if (vlookup(z) != "NA"){a="ુ"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ડી[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ડી"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ડી"+a;y =y+"\n";}z=y+"ડી".slice(0,-1);if (vlookup(z) != "NA"){a="ી"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ડો[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ડો"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ડો"+a;y =y+"\n";}z=y+"ડો".slice(0,-1);if (vlookup(z) != "NA"){a="ો"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ેરું[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ેરું"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ેરું"+a;y =y+"\n";}z=y+"ેરું".slice(0,-2);if (vlookup(z) != "NA"){a="ું"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/િયું[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="િયું"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="િયું"+a;y =y+"\n";}z=y+"િયું".slice(0,-2);if (vlookup(z) != "NA"){a="ું"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
if((x.search("માયા"+"\n")==-1)){x=x.replace(/ાયા[\n]/g,"\n");}if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાયા"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાયા"+a;y =y+"\n";}z=y+"ાયા".slice(0,-1);if (vlookup(z) != "NA"){a="ા"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/વું[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="વું"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="વું"+a;y =y+"\n";}z=y+"વું".slice(0,-2);if (vlookup(z) != "NA"){a="ું"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/વા[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="વા"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="વા"+a;y =y+"\n";}z=y+"વા".slice(0,-1);if (vlookup(z) != "NA"){a="ા"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ાવો[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાવો"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાવો"+a;y =y+"\n";}z=y+"ાવો".slice(0,-1);if (vlookup(z) != "NA"){a="ો"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"ાવો".slice(0,-2);if (vlookup(z) != "NA"){a="વો"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/વો[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="વો"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="વો"+a;y =y+"\n";}z=y+"વો".slice(0,-1);if (vlookup(z) != "NA"){a="ો"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ચું[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ચું"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ચું"+a;y =y+"\n";}z=y+"ચું".slice(0,-2);if (vlookup(z) != "NA"){a="ું"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ચી[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ચી"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ચી"+a;y =y+"\n";}z=y+"ચી".slice(0,-1);if (vlookup(z) != "NA"){a="ી"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/બાન[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="બાન"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="બાન"+a;y =y+"\n";}z=y+"બાન".slice(0,-1);if (vlookup(z) != "NA"){a="ન"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
if((x.search("સંસ્થાન"+"\n")==-1)&&(x.search("વિજ્ઞાન"+"\n")==-1)&&(x.search("પ્રશ્ન"+"\n")==-1)&&(x.search("વિમાન"+"\n")==-1)&&(x.search("દર્શન"+"\n")==-1)&&(x.search("જ્ઞાન"+"\n")==-1)&&(x.search("સ્થાન"+"\n")==-1)&&(x.search("ભગવાન"+"\n")==-1)&&(x.search("સ્તાન"+"\n")==-1)&&(x.search("મગ્ન"+"\n")==-1)&&(x.search("બહેન"+"\n")==-1)&&(x.search("સમાન"+"\n")==-1)&&(x.search("પૂજન"+"\n")==-1)&&(x.search("દાન"+"\n")==-1)&&(x.search("બેન"+"\n")==-1)&&(x.search("ગમન"+"\n")==-1)&&(x.search("માન"+"\n")==-1)&&(x.search("વાન"+"\n")==-1)&&(x.search("વચન"+"\n")==-1)&&(x.search("કથન"+"\n")==-1)&&(x.search("જન"+"\n")==-1)){x=x.replace(/ન[\n]/g,"\n");}if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ન"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ન"+a;y =y+"\n";}}
if((x.search("માળા"+"\n")==-1)){x=x.replace(/ાળા[\n]/g,"\n");}if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાળા"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાળા"+a;y =y+"\n";}z=y+"ાળા".slice(0,-1);if (vlookup(z) != "NA"){a="ા"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/લી[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="લી"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="લી"+a;y =y+"\n";}z=y+"લી".slice(0,-1);if (vlookup(z) != "NA"){a="ી"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ાળો[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાળો"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાળો"+a;y =y+"\n";}z=y+"ાળો".slice(0,-1);if (vlookup(z) != "NA"){a="ો"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
if((x.search("ગોપાળ"+"\n")==-1)&&(x.search("કાળ"+"\n")==-1)){x=x.replace(/ાળ[\n]/g,"\n");}if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાળ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાળ"+a;y =y+"\n";}}
x = x.replace(/ાપો[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાપો"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાપો"+a;y =y+"\n";}z=y+"ાપો".slice(0,-1);if (vlookup(z) != "NA"){a="ો"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
if((x.search("પરિણામ"+"\n")==-1)&&(x.search("કર્મ"+"\n")==-1)&&(x.search("નામ"+"\n")==-1)){x=x.replace(/મ[\n]/g,"\n");}if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="મ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="મ"+a;y =y+"\n";}}
if((x.search("મંગળરૂપ"+"\n")==-1)&&(x.search("ાદિરૂપ"+"\n")==-1)&&(x.search("દ્વિપ"+"\n")==-1)&&(x.search("ઓરૂપ"+"\n")==-1)&&(x.search("રૂપ"+"\n")==-1)){x=x.replace(/પ[\n]/g,"\n");}if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="પ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="પ"+a;y =y+"\n";}}
x = x.replace(/તે[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="તે"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="તે"+a;y =y+"\n";}z=y+"તે".slice(0,-1);if (vlookup(z) != "NA"){a="ે"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
if((x.search("લાલભાઈ"+"\n")==-1)&&(x.search("ઓભાઈ"+"\n")==-1)&&(x.search("ભાઈ"+"\n")==-1)){x=x.replace(/ઈ[\n]/g,"\n");}if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ઈ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ઈ"+a;y =y+"\n";}}
x = x.replace(/ઉં[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ઉં"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ઉં"+a;y =y+"\n";}}
x = x.replace(/ેક[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ેક"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ેક"+a;y =y+"\n";}}
x = x.replace(/ીક[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ીક"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ીક"+a;y =y+"\n";}}
if((x.search("માત"+"\n")==-1)){x=x.replace(/ાત[\n]/g,"\n");}if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાત"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાત"+a;y =y+"\n";}z=y+"ાત".slice(0,-1);if (vlookup(z) != "NA"){a="ત"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
if((x.search("પર્યાપ્ત"+"\n")==-1)&&(x.search("ઓયુક્ત"+"\n")==-1)&&(x.search("દેવકૃત"+"\n")==-1)&&(x.search("વિરચિત"+"\n")==-1)&&(x.search("ગર્ભિત"+"\n")==-1)&&(x.search("યુક્ત"+"\n")==-1)&&(x.search("જીકૃત"+"\n")==-1)&&(x.search("ઓભૂત"+"\n")==-1)&&(x.search("વ્રત"+"\n")==-1)&&(x.search("જનિત"+"\n")==-1)&&(x.search("રહિત"+"\n")==-1)&&(x.search("સહિત"+"\n")==-1)&&(x.search("માત"+"\n")==-1)&&(x.search("વંત"+"\n")==-1)&&(x.search("ભૂત"+"\n")==-1)&&(x.search("કૃત"+"\n")==-1)&&(x.search("મત"+"\n")==-1)){x=x.replace(/ત[\n]/g,"\n");}if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ત"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ત"+a;y =y+"\n";}}
x = x.replace(/ે[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ે"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ે"+a;y =y+"\n";}}
if((x.search("વિદ્યા"+"\n")==-1)&&(x.search("કર્તા"+"\n")==-1)&&(x.search("પ્રભા"+"\n")==-1)&&(x.search("વેડા"+"\n")==-1)&&(x.search("માયા"+"\n")==-1)&&(x.search("જ્ઞા"+"\n")==-1)&&(x.search("રાજા"+"\n")==-1)&&(x.search("ખાના"+"\n")==-1)&&(x.search("ભાષા"+"\n")==-1)&&(x.search("માળા"+"\n")==-1)&&(x.search("કલા"+"\n")==-1)&&(x.search("કળા"+"\n")==-1)&&(x.search("વડા"+"\n")==-1)){x=x.replace(/ા[\n]/g,"\n");}if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ા"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ા"+a;y =y+"\n";}}
if((x.search("કર્મો"+"\n")==-1)){x=x.replace(/ો[\n]/g,"\n");}if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ો"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ો"+a;y =y+"\n";}}
if((x.search("ખાનું"+"\n")==-1)&&(x.search("નામું"+"\n")==-1)){x=x.replace(/ું[\n]/g,"\n");}if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ું"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ું"+a;y =y+"\n";}}
if((x.search("બાહુ"+"\n")==-1)&&(x.search("હેતુ"+"\n")==-1)){x=x.replace(/ુ[\n]/g,"\n");}if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ુ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ુ"+a;y =y+"\n";}}
if((x.search("જી"+"\n")==-1)&&(x.search("દેવીશ્રી"+"\n")==-1)&&(x.search("દેવશ્રી"+"\n")==-1)&&(x.search("સ્વામી"+"\n")==-1)&&(x.search("સુંદરી"+"\n")==-1)&&(x.search("સંબંધી"+"\n")==-1)&&(x.search("ાવલંબી"+"\n")==-1)&&(x.search("પક્ષી"+"\n")==-1)&&(x.search("મંજરી"+"\n")==-1)&&(x.search("દર્શી"+"\n")==-1)&&(x.search("રૂપી"+"\n")==-1)&&(x.search("દેવી"+"\n")==-1)&&(x.search("નગરી"+"\n")==-1)&&(x.search("ઓમયી"+"\n")==-1)&&(x.search("વાસી"+"\n")==-1)&&(x.search("ખાની"+"\n")==-1)&&(x.search("વાણી"+"\n")==-1)&&(x.search("વાદી"+"\n")==-1)&&(x.search("ગીરી"+"\n")==-1)&&(x.search("શ્રી"+"\n")==-1)&&(x.search("કારી"+"\n")==-1)&&(x.search("શાળી"+"\n")==-1)&&(x.search("શાહી"+"\n")==-1)&&(x.search("મયી"+"\n")==-1)){x=x.replace(/ી[\n]/g,"\n");}if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ી"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ી"+a;y =y+"\n";}}
x = x.replace(/જી[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="જી"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="જી"+a;y =y+"\n";}}
if((x.search("સમય"+"\n")==-1)){x=x.replace(/મય[\n]/g,"\n");}if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="મય"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="મય"+a;y =y+"\n";}}
x = x.replace(/ઇત્યાદિ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ઇત્યાદિ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ઇત્યાદિ"+a;y =y+"\n";}z=y+"ઇત્યાદિ".slice(0,-3);if (vlookup(z) != "NA"){a="ાદિ"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ચંદ્રસૂરિ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ચંદ્રસૂરિ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ચંદ્રસૂરિ"+a;y =y+"\n";}z=y+"ચંદ્રસૂરિ".slice(0,-4);if (vlookup(z) != "NA"){a="સૂરિ"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/સૂરિશ્વર[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="સૂરિશ્વર"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="સૂરિશ્વર"+a;y =y+"\n";}z=y+"સૂરિશ્વર".slice(0,-2);if (vlookup(z) != "NA"){a="વર"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}z=y+"સૂરિશ્વર".slice(0,-4);if (vlookup(z) != "NA"){a="શ્વર"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/પર્યાપ્ત[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="પર્યાપ્ત"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="પર્યાપ્ત"+a;y =y+"\n";}}
x = x.replace(/સંસ્કાર[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="સંસ્કાર"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="સંસ્કાર"+a;y =y+"\n";}z=y+"સંસ્કાર".slice(0,-3);if (vlookup(z) != "NA"){a="કાર"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/દેવીશ્રી[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="દેવીશ્રી"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="દેવીશ્રી"+a;y =y+"\n";}z=y+"દેવીશ્રી".slice(0,-4);if (vlookup(z) != "NA"){a="શ્રી"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ચમત્કાર[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ચમત્કાર"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ચમત્કાર"+a;y =y+"\n";}z=y+"ચમત્કાર".slice(0,-3);if (vlookup(z) != "NA"){a="કાર"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ગણરાજ્ય[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ગણરાજ્ય"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ગણરાજ્ય"+a;y =y+"\n";}z=y+"ગણરાજ્ય".slice(0,-5);if (vlookup(z) != "NA"){a="રાજ્ય"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/શાસ્ત્ર[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="શાસ્ત્ર"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="શાસ્ત્ર"+a;y =y+"\n";}z=y+"શાસ્ત્ર".slice(0,-6);if (vlookup(z) != "NA"){a="ાસ્ત્ર"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/કેન્દ્ર[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="કેન્દ્ર"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="કેન્દ્ર"+a;y =y+"\n";}z=y+"કેન્દ્ર".slice(0,-6);if (vlookup(z) != "NA"){a="ેન્દ્ર"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/મંગળરૂપ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="મંગળરૂપ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="મંગળરૂપ"+a;y =y+"\n";}z=y+"મંગળરૂપ".slice(0,-3);if (vlookup(z) != "NA"){a="રૂપ"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/સંસ્થાન[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="સંસ્થાન"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="સંસ્થાન"+a;y =y+"\n";}z=y+"સંસ્થાન".slice(0,-5);if (vlookup(z) != "NA"){a="સ્થાન"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/વિજ્ઞાન[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="વિજ્ઞાન"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="વિજ્ઞાન"+a;y =y+"\n";}z=y+"વિજ્ઞાન".slice(0,-5);if (vlookup(z) != "NA"){a="જ્ઞાન"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/દેવશ્રી[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="દેવશ્રી"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="દેવશ્રી"+a;y =y+"\n";}z=y+"દેવશ્રી".slice(0,-4);if (vlookup(z) != "NA"){a="શ્રી"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/પ્રકાશક[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="પ્રકાશક"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="પ્રકાશક"+a;y =y+"\n";}}
x = x.replace(/સ્વામી[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="સ્વામી"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="સ્વામી"+a;y =y+"\n";}}
x = x.replace(/સુંદરી[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="સુંદરી"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="સુંદરી"+a;y =y+"\n";}}
x = x.replace(/ાનુસાર[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાનુસાર"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાનુસાર"+a;y =y+"\n";}z=y+"ાનુસાર".slice(0,-3);if (vlookup(z) != "NA"){a="સાર"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ઓયુક્ત[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ઓયુક્ત"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ઓયુક્ત"+a;y =y+"\n";}z=y+"ઓયુક્ત".slice(0,-5);if (vlookup(z) != "NA"){a="યુક્ત"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ઓપૂર્ણ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ઓપૂર્ણ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ઓપૂર્ણ"+a;y =y+"\n";}z=y+"ઓપૂર્ણ".slice(0,-5);if (vlookup(z) != "NA"){a="પૂર્ણ"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/વિદ્યા[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="વિદ્યા"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="વિદ્યા"+a;y =y+"\n";}}
x = x.replace(/મોહનીય[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="મોહનીય"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="મોહનીય"+a;y =y+"\n";}z=y+"મોહનીય".slice(0,-3);if (vlookup(z) != "NA"){a="નીય"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/વેદનીય[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="વેદનીય"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="વેદનીય"+a;y =y+"\n";}z=y+"વેદનીય".slice(0,-3);if (vlookup(z) != "NA"){a="નીય"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ઓમાત્ર[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ઓમાત્ર"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ઓમાત્ર"+a;y =y+"\n";}z=y+"ઓમાત્ર".slice(0,-5);if (vlookup(z) != "NA"){a="માત્ર"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/સંબંધી[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="સંબંધી"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="સંબંધી"+a;y =y+"\n";}}
x = x.replace(/પરિણામ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="પરિણામ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="પરિણામ"+a;y =y+"\n";}}
x = x.replace(/પ્રકાર[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="પ્રકાર"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="પ્રકાર"+a;y =y+"\n";}z=y+"પ્રકાર".slice(0,-3);if (vlookup(z) != "NA"){a="કાર"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/કાન્[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="કાન્"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="કાન્"+a;y =y+"\n";}}
x = x.replace(/ેન્દ્ર[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ેન્દ્ર"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ેન્દ્ર"+a;y =y+"\n";}}
x = x.replace(/સ્વભાવ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="સ્વભાવ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="સ્વભાવ"+a;y =y+"\n";}z=y+"સ્વભાવ".slice(0,-3);if (vlookup(z) != "NA"){a="ભાવ"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/તત્ત્વ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="તત્ત્વ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="તત્ત્વ"+a;y =y+"\n";}z=y+"તત્ત્વ".slice(0,-3);if (vlookup(z) != "NA"){a="ત્વ"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/વૃત્તિ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="વૃત્તિ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="વૃત્તિ"+a;y =y+"\n";}}
x = x.replace(/ાદિરૂપ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાદિરૂપ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાદિરૂપ"+a;y =y+"\n";}z=y+"ાદિરૂપ".slice(0,-3);if (vlookup(z) != "NA"){a="રૂપ"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/પ્રચાર[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="પ્રચાર"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="પ્રચાર"+a;y =y+"\n";}}
x = x.replace(/દ્રવ્ય[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="દ્રવ્ય"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="દ્રવ્ય"+a;y =y+"\n";}}
x = x.replace(/ાચાર્ય[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાચાર્ય"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાચાર્ય"+a;y =y+"\n";}}
x = x.replace(/દેવકૃત[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="દેવકૃત"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="દેવકૃત"+a;y =y+"\n";}z=y+"દેવકૃત".slice(0,-3);if (vlookup(z) != "NA"){a="કૃત"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/વિરચિત[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="વિરચિત"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="વિરચિત"+a;y =y+"\n";}}
x = x.replace(/દૃષ્ટિ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="દૃષ્ટિ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="દૃષ્ટિ"+a;y =y+"\n";}}
x = x.replace(/મહારાજ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="મહારાજ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="મહારાજ"+a;y =y+"\n";}z=y+"મહારાજ".slice(0,-3);if (vlookup(z) != "NA"){a="રાજ"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/પ્રશ્ન[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="પ્રશ્ન"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="પ્રશ્ન"+a;y =y+"\n";}}
x = x.replace(/લાલભાઈ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="લાલભાઈ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="લાલભાઈ"+a;y =y+"\n";}z=y+"લાલભાઈ".slice(0,-3);if (vlookup(z) != "NA"){a="ભાઈ"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/શસ્ત્ર[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="શસ્ત્ર"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="શસ્ત્ર"+a;y =y+"\n";}}
x = x.replace(/ાસ્ત્ર[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાસ્ત્ર"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાસ્ત્ર"+a;y =y+"\n";}}
x = x.replace(/ગર્ભિત[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ગર્ભિત"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ગર્ભિત"+a;y =y+"\n";}}
x = x.replace(/જ્યોતિ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="જ્યોતિ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="જ્યોતિ"+a;y =y+"\n";}}
x = x.replace(/મૂર્તિ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="મૂર્તિ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="મૂર્તિ"+a;y =y+"\n";}}
x = x.replace(/ાવલંબી[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાવલંબી"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાવલંબી"+a;y =y+"\n";}}
x = x.replace(/પુરુષ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="પુરુષ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="પુરુષ"+a;y =y+"\n";}}
x = x.replace(/કર્તા[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="કર્તા"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="કર્તા"+a;y =y+"\n";}}
x = x.replace(/રાજ્ય[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="રાજ્ય"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="રાજ્ય"+a;y =y+"\n";}}
x = x.replace(/પક્ષી[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="પક્ષી"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="પક્ષી"+a;y =y+"\n";}}
x = x.replace(/વૃક્ષ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="વૃક્ષ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="વૃક્ષ"+a;y =y+"\n";}}
x = x.replace(/દ્વિપ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="દ્વિપ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="દ્વિપ"+a;y =y+"\n";}}
x = x.replace(/વિમાન[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="વિમાન"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="વિમાન"+a;y =y+"\n";}z=y+"વિમાન".slice(0,-3);if (vlookup(z) != "NA"){a="માન"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/મંજરી[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="મંજરી"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="મંજરી"+a;y =y+"\n";}}
x = x.replace(/ધિકાર[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ધિકાર"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ધિકાર"+a;y =y+"\n";}z=y+"ધિકાર".slice(0,-3);if (vlookup(z) != "NA"){a="કાર"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/તીર્થ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="તીર્થ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="તીર્થ"+a;y =y+"\n";}}
x = x.replace(/યુક્ત[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="યુક્ત"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="યુક્ત"+a;y =y+"\n";}}
x = x.replace(/પરાયણ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="પરાયણ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="પરાયણ"+a;y =y+"\n";}z=y+"પરાયણ".slice(0,-3);if (vlookup(z) != "NA"){a="ાયણ"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/પૂર્ણ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="પૂર્ણ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="પૂર્ણ"+a;y =y+"\n";}}
x = x.replace(/માત્ર[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="માત્ર"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="માત્ર"+a;y =y+"\n";}}
x = x.replace(/કુમાર[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="કુમાર"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="કુમાર"+a;y =y+"\n";}}
x = x.replace(/દર્શન[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="દર્શન"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="દર્શન"+a;y =y+"\n";}}
x = x.replace(/પુત્ર[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="પુત્ર"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="પુત્ર"+a;y =y+"\n";}}
x = x.replace(/માર્ગ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="માર્ગ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="માર્ગ"+a;y =y+"\n";}}
x = x.replace(/પૂર્વ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="પૂર્વ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="પૂર્વ"+a;y =y+"\n";}}
x = x.replace(/શક્તિ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="શક્તિ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="શક્તિ"+a;y =y+"\n";}}
x = x.replace(/જ્ઞાન[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="જ્ઞાન"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="જ્ઞાન"+a;y =y+"\n";}}
x = x.replace(/ગ્રંથ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ગ્રંથ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ગ્રંથ"+a;y =y+"\n";}}
x = x.replace(/ભોગ્ય[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ભોગ્ય"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ભોગ્ય"+a;y =y+"\n";}}
x = x.replace(/ખાનું[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ખાનું"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ખાનું"+a;y =y+"\n";}}
x = x.replace(/સ્થાન[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="સ્થાન"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="સ્થાન"+a;y =y+"\n";}}
x = x.replace(/ાત્મક[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાત્મક"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાત્મક"+a;y =y+"\n";}}
x = x.replace(/વિપાક[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="વિપાક"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="વિપાક"+a;y =y+"\n";}z=y+"વિપાક".slice(0,-3);if (vlookup(z) != "NA"){a="પાક"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ચંદ્ર[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ચંદ્ર"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ચંદ્ર"+a;y =y+"\n";}}
x = x.replace(/ગ્રહણ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ગ્રહણ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ગ્રહણ"+a;y =y+"\n";}}
x = x.replace(/ભગવાન[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ભગવાન"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ભગવાન"+a;y =y+"\n";}z=y+"ભગવાન".slice(0,-3);if (vlookup(z) != "NA"){a="વાન"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/સંબંધ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="સંબંધ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="સંબંધ"+a;y =y+"\n";}}
x = x.replace(/ગોપાળ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ગોપાળ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ગોપાળ"+a;y =y+"\n";}}
x = x.replace(/વિકાર[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="વિકાર"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="વિકાર"+a;y =y+"\n";}z=y+"વિકાર".slice(0,-3);if (vlookup(z) != "NA"){a="કાર"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/સૂત્ર[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="સૂત્ર"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="સૂત્ર"+a;y =y+"\n";}}
x = x.replace(/યુદ્ધ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="યુદ્ધ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="યુદ્ધ"+a;y =y+"\n";}}
x = x.replace(/સમિતિ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="સમિતિ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="સમિતિ"+a;y =y+"\n";}}
x = x.replace(/લબ્ધિ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="લબ્ધિ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="લબ્ધિ"+a;y =y+"\n";}}
x = x.replace(/જીકૃત[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="જીકૃત"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="જીકૃત"+a;y =y+"\n";}z=y+"જીકૃત".slice(0,-3);if (vlookup(z) != "NA"){a="કૃત"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/નામું[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="નામું"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="નામું"+a;y =y+"\n";}}
x = x.replace(/સ્તાન[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="સ્તાન"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="સ્તાન"+a;y =y+"\n";}}
x = x.replace(/યોગ્ય[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="યોગ્ય"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="યોગ્ય"+a;y =y+"\n";}}
x = x.replace(/વિષયક[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="વિષયક"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="વિષયક"+a;y =y+"\n";}}
x = x.replace(/દર્શી[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="દર્શી"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="દર્શી"+a;y =y+"\n";}}
x = x.replace(/પ્રભા[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="પ્રભા"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="પ્રભા"+a;y =y+"\n";}}
x = x.replace(/પ્રભ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="પ્રભ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="પ્રભ"+a;y =y+"\n";}}
x = x.replace(/બાહુ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="બાહુ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="બાહુ"+a;y =y+"\n";}}
x = x.replace(/વેડા[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="વેડા"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="વેડા"+a;y =y+"\n";}}
x = x.replace(/ગિરિ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ગિરિ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ગિરિ"+a;y =y+"\n";}}
x = x.replace(/માયા[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="માયા"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="માયા"+a;y =y+"\n";}}
x = x.replace(/રૂપી[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="રૂપી"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="રૂપી"+a;y =y+"\n";}}
x = x.replace(/દેવી[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="દેવી"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="દેવી"+a;y =y+"\n";}}
x = x.replace(/નગરી[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="નગરી"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="નગરી"+a;y =y+"\n";}}
x = x.replace(/પત્ર[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="પત્ર"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="પત્ર"+a;y =y+"\n";}}
x = x.replace(/જ્ઞા[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="જ્ઞા"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="જ્ઞા"+a;y =y+"\n";}}
x = x.replace(/બદ્ધ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="બદ્ધ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="બદ્ધ"+a;y =y+"\n";}}
x = x.replace(/ઓરૂપ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ઓરૂપ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ઓરૂપ"+a;y =y+"\n";}z=y+"ઓરૂપ".slice(0,-3);if (vlookup(z) != "NA"){a="રૂપ"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ઓનાથ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ઓનાથ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ઓનાથ"+a;y =y+"\n";}z=y+"ઓનાથ".slice(0,-3);if (vlookup(z) != "NA"){a="નાથ"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ઓભાઈ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ઓભાઈ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ઓભાઈ"+a;y =y+"\n";}z=y+"ઓભાઈ".slice(0,-3);if (vlookup(z) != "NA"){a="ભાઈ"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/નવીસ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="નવીસ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="નવીસ"+a;y =y+"\n";}}
x = x.replace(/ઓમયી[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ઓમયી"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ઓમયી"+a;y =y+"\n";}z=y+"ઓમયી".slice(0,-3);if (vlookup(z) != "NA"){a="મયી"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ઓભૂત[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ઓભૂત"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ઓભૂત"+a;y =y+"\n";}z=y+"ઓભૂત".slice(0,-3);if (vlookup(z) != "NA"){a="ભૂત"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/રાજા[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="રાજા"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="રાજા"+a;y =y+"\n";}}
x = x.replace(/વાસી[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="વાસી"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="વાસી"+a;y =y+"\n";}}
x = x.replace(/ખાની[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ખાની"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ખાની"+a;y =y+"\n";}}
x = x.replace(/ખાના[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ખાના"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ખાના"+a;y =y+"\n";}}
x = x.replace(/શ્વર[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="શ્વર"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="શ્વર"+a;y =y+"\n";}z=y+"શ્વર".slice(0,-2);if (vlookup(z) != "NA"){a="વર"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/કારક[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="કારક"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="કારક"+a;y =y+"\n";}}
x = x.replace(/પ્રદ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="પ્રદ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="પ્રદ"+a;y =y+"\n";}}
x = x.replace(/મંગળ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="મંગળ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="મંગળ"+a;y =y+"\n";}}
x = x.replace(/મગ્ન[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="મગ્ન"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="મગ્ન"+a;y =y+"\n";}}
x = x.replace(/કર્મો[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="કર્મો"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="કર્મો"+a;y =y+"\n";}}
x = x.replace(/કર્મ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="કર્મ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="કર્મ"+a;y =y+"\n";}}
x = x.replace(/જાતિ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="જાતિ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="જાતિ"+a;y =y+"\n";}}
x = x.replace(/હજાર[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="હજાર"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="હજાર"+a;y =y+"\n";}}
x = x.replace(/વિદ્[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="વિદ્"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="વિદ્"+a;y =y+"\n";}}
x = x.replace(/ાદિક[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાદિક"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાદિક"+a;y =y+"\n";}}
x = x.replace(/ભાષા[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ભાષા"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ભાષા"+a;y =y+"\n";}}
x = x.replace(/સમૂહ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="સમૂહ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="સમૂહ"+a;y =y+"\n";}}
x = x.replace(/વાણી[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="વાણી"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="વાણી"+a;y =y+"\n";}}
x = x.replace(/વાદી[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="વાદી"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="વાદી"+a;y =y+"\n";}}
x = x.replace(/ગુરૂ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ગુરૂ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ગુરૂ"+a;y =y+"\n";}}
x = x.replace(/સૂરિ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="સૂરિ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="સૂરિ"+a;y =y+"\n";}}
x = x.replace(/ાચાર[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાચાર"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાચાર"+a;y =y+"\n";}}
x = x.replace(/વિષય[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="વિષય"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="વિષય"+a;y =y+"\n";}}
x = x.replace(/ગીરી[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ગીરી"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ગીરી"+a;y =y+"\n";}}
x = x.replace(/અભાવ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="અભાવ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="અભાવ"+a;y =y+"\n";}z=y+"અભાવ".slice(0,-3);if (vlookup(z) != "NA"){a="ભાવ"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/શ્રી[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="શ્રી"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="શ્રી"+a;y =y+"\n";}}
x = x.replace(/લિંગ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="લિંગ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="લિંગ"+a;y =y+"\n";}}
x = x.replace(/પાટણ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="પાટણ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="પાટણ"+a;y =y+"\n";}}
x = x.replace(/બહેન[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="બહેન"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="બહેન"+a;y =y+"\n";}}
x = x.replace(/ગાંવ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ગાંવ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ગાંવ"+a;y =y+"\n";}}
x = x.replace(/સમાજ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="સમાજ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="સમાજ"+a;y =y+"\n";}}
x = x.replace(/માળા[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="માળા"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="માળા"+a;y =y+"\n";}}
x = x.replace(/સમાન[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="સમાન"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="સમાન"+a;y =y+"\n";}z=y+"સમાન".slice(0,-3);if (vlookup(z) != "NA"){a="માન"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/પૂજન[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="પૂજન"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="પૂજન"+a;y =y+"\n";}z=y+"પૂજન".slice(0,-2);if (vlookup(z) != "NA"){a="જન"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/વ્રત[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="વ્રત"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="વ્રત"+a;y =y+"\n";}}
x = x.replace(/કારી[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="કારી"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="કારી"+a;y =y+"\n";}}
x = x.replace(/ત્રય[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ત્રય"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ત્રય"+a;y =y+"\n";}}
x = x.replace(/પક્ષ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="પક્ષ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="પક્ષ"+a;y =y+"\n";}}
x = x.replace(/જનિત[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="જનિત"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="જનિત"+a;y =y+"\n";}}
x = x.replace(/રહિત[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="રહિત"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="રહિત"+a;y =y+"\n";}}
x = x.replace(/સહિત[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="સહિત"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="સહિત"+a;y =y+"\n";}}
x = x.replace(/સાધક[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="સાધક"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="સાધક"+a;y =y+"\n";}}
x = x.replace(/હેતુ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="હેતુ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="હેતુ"+a;y =y+"\n";}}
x = x.replace(/ાકાર[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાકાર"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાકાર"+a;y =y+"\n";}z=y+"ાકાર".slice(0,-3);if (vlookup(z) != "NA"){a="કાર"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/કુંદ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="કુંદ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="કુંદ"+a;y =y+"\n";}}
x = x.replace(/શાળી[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="શાળી"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="શાળી"+a;y =y+"\n";}}
x = x.replace(/માંશ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="માંશ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="માંશ"+a;y =y+"\n";}z=y+"માંશ".slice(0,-3);if (vlookup(z) != "NA"){a="ાંશ"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/વિજય[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="વિજય"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="વિજય"+a;y =y+"\n";}}
x = x.replace(/સિંહ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="સિંહ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="સિંહ"+a;y =y+"\n";}}
x = x.replace(/શાહી[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="શાહી"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="શાહી"+a;y =y+"\n";}}
x = x.replace(/મુનિ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="મુનિ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="મુનિ"+a;y =y+"\n";}}
x = x.replace(/સાગર[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="સાગર"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="સાગર"+a;y =y+"\n";}z=y+"સાગર".slice(0,-2);if (vlookup(z) != "NA"){a="ગર"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/નગર[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="નગર"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="નગર"+a;y =y+"\n";}z=y+"નગર".slice(0,-2);if (vlookup(z) != "NA"){a="ગર"+a;console.log("answer was obtained by removing pratyay -- "+a+" and later on adding back itself");return z;}}
x = x.replace(/ાંશ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાંશ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાંશ"+a;y =y+"\n";}}
x = x.replace(/ચંદ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ચંદ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ચંદ"+a;y =y+"\n";}}
x = x.replace(/દેશ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="દેશ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="દેશ"+a;y =y+"\n";}}
x = x.replace(/પુર[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="પુર"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="પુર"+a;y =y+"\n";}}
x = x.replace(/પતિ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="પતિ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="પતિ"+a;y =y+"\n";}}
x = x.replace(/નદિ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="નદિ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="નદિ"+a;y =y+"\n";}}
x = x.replace(/નીસ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="નીસ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="નીસ"+a;y =y+"\n";}}
x = x.replace(/નીશ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="નીશ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="નીશ"+a;y =y+"\n";}}
x = x.replace(/ગતિ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ગતિ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ગતિ"+a;y =y+"\n";}}
x = x.replace(/કલા[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="કલા"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="કલા"+a;y =y+"\n";}}
x = x.replace(/કળા[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="કળા"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="કળા"+a;y =y+"\n";}}
x = x.replace(/ગાર[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ગાર"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ગાર"+a;y =y+"\n";}}
x = x.replace(/દાન[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="દાન"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="દાન"+a;y =y+"\n";}}
x = x.replace(/ખોર[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ખોર"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ખોર"+a;y =y+"\n";}}
x = x.replace(/લાલ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="લાલ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="લાલ"+a;y =y+"\n";}}
x = x.replace(/બેન[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="બેન"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="બેન"+a;y =y+"\n";}}
x = x.replace(/ખાં[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ખાં"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ખાં"+a;y =y+"\n";}}
x = x.replace(/શીલ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="શીલ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="શીલ"+a;y =y+"\n";}}
x = x.replace(/ગમન[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ગમન"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ગમન"+a;y =y+"\n";}}
x = x.replace(/શાહ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="શાહ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="શાહ"+a;y =y+"\n";}}
x = x.replace(/નાક[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="નાક"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="નાક"+a;y =y+"\n";}}
x = x.replace(/મંદ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="મંદ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="મંદ"+a;y =y+"\n";}}
x = x.replace(/સમય[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="સમય"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="સમય"+a;y =y+"\n";}}
x = x.replace(/વાદ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="વાદ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="વાદ"+a;y =y+"\n";}}
x = x.replace(/નામ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="નામ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="નામ"+a;y =y+"\n";}}
x = x.replace(/માત[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="માત"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="માત"+a;y =y+"\n";}}
x = x.replace(/ાયણ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાયણ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાયણ"+a;y =y+"\n";}}
x = x.replace(/ાહટ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાહટ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાહટ"+a;y =y+"\n";}}
x = x.replace(/લોક[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="લોક"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="લોક"+a;y =y+"\n";}}
x = x.replace(/વડા[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="વડા"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="વડા"+a;y =y+"\n";}}
x = x.replace(/વંત[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="વંત"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="વંત"+a;y =y+"\n";}}
x = x.replace(/બાજ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="બાજ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="બાજ"+a;y =y+"\n";}}
x = x.replace(/ભેદ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ભેદ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ભેદ"+a;y =y+"\n";}}
x = x.replace(/દાર[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="દાર"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="દાર"+a;y =y+"\n";}}
x = x.replace(/નૂં[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="નૂં"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="નૂં"+a;y =y+"\n";}}
x = x.replace(/કૂં[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="કૂં"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="કૂં"+a;y =y+"\n";}}
x = x.replace(/દેવ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="દેવ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="દેવ"+a;y =y+"\n";}}
x = x.replace(/વર્[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="વર્"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="વર્"+a;y =y+"\n";}}
x = x.replace(/પાક[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="પાક"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="પાક"+a;y =y+"\n";}}
x = x.replace(/રૂપ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="રૂપ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="રૂપ"+a;y =y+"\n";}}
x = x.replace(/નાથ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="નાથ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="નાથ"+a;y =y+"\n";}}
x = x.replace(/કાલ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="કાલ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="કાલ"+a;y =y+"\n";}}
x = x.replace(/કાળ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="કાળ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="કાળ"+a;y =y+"\n";}}
x = x.replace(/ભાઈ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ભાઈ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ભાઈ"+a;y =y+"\n";}}
x = x.replace(/કીય[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="કીય"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="કીય"+a;y =y+"\n";}}
x = x.replace(/વાસ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="વાસ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="વાસ"+a;y =y+"\n";}}
x = x.replace(/મયી[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="મયી"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="મયી"+a;y =y+"\n";}}
x = x.replace(/ભૂત[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ભૂત"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ભૂત"+a;y =y+"\n";}}
x = x.replace(/રાજ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="રાજ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="રાજ"+a;y =y+"\n";}}
x = x.replace(/નાદ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="નાદ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="નાદ"+a;y =y+"\n";}}
x = x.replace(/ગુણ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ગુણ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ગુણ"+a;y =y+"\n";}}
x = x.replace(/ત્વ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ત્વ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ત્વ"+a;y =y+"\n";}}
x = x.replace(/સ્વ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="સ્વ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="સ્વ"+a;y =y+"\n";}}
x = x.replace(/ભાવ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ભાવ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ભાવ"+a;y =y+"\n";}}
x = x.replace(/ગીર[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ગીર"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ગીર"+a;y =y+"\n";}}
x = x.replace(/ાદિ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ાદિ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ાદિ"+a;y =y+"\n";}}
x = x.replace(/મ્ય[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="મ્ય"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="મ્ય"+a;y =y+"\n";}}
x = x.replace(/કવિ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="કવિ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="કવિ"+a;y =y+"\n";}}
x = x.replace(/નીય[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="નીય"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="નીય"+a;y =y+"\n";}}
x = x.replace(/જીવ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="જીવ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="જીવ"+a;y =y+"\n";}}
x = x.replace(/કૃત[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="કૃત"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="કૃત"+a;y =y+"\n";}}
x = x.replace(/બાદ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="બાદ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="બાદ"+a;y =y+"\n";}}
x = x.replace(/સાર[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="સાર"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="સાર"+a;y =y+"\n";}}
x = x.replace(/માન[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="માન"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="માન"+a;y =y+"\n";}}
x = x.replace(/વાન[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="વાન"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="વાન"+a;y =y+"\n";}}
x = x.replace(/વચન[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="વચન"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="વચન"+a;y =y+"\n";}}
x = x.replace(/કંદ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="કંદ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="કંદ"+a;y =y+"\n";}}
x = x.replace(/કથન[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="કથન"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="કથન"+a;y =y+"\n";}}
x = x.replace(/ભાર[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ભાર"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ભાર"+a;y =y+"\n";}}
x = x.replace(/કાર[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="કાર"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="કાર"+a;y =y+"\n";}}
x = x.replace(/પદ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="પદ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="પદ"+a;y =y+"\n";}}
x = x.replace(/ધર[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ધર"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ધર"+a;y =y+"\n";}}
x = x.replace(/ઘર[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ઘર"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ઘર"+a;y =y+"\n";}}
x = x.replace(/રસ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="રસ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="રસ"+a;y =y+"\n";}}
x = x.replace(/પણ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="પણ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="પણ"+a;y =y+"\n";}}
x = x.replace(/જન[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="જન"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="જન"+a;y =y+"\n";}}
x = x.replace(/નય[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="નય"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="નય"+a;y =y+"\n";}}
x = x.replace(/ગર[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="ગર"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="ગર"+a;y =y+"\n";}}
x = x.replace(/કર[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="કર"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="કર"+a;y =y+"\n";}}
x = x.replace(/વર[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="વર"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="વર"+a;y =y+"\n";}}
x = x.replace(/વશ[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="વશ"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="વશ"+a;y =y+"\n";}}
x = x.replace(/મત[\n]/g,"\n");if(y!=x){y = x.replace(/\n/g,"");if (vlookup(y) != "NA"){a="મત"+a;console.log("answer obtained by removing pratyay -- "+a+" and later on adding back itself");return y+a;}else{a="મત"+a;y =y+"\n";}}

// SECTION 2 : -


t3 =vlookup(x.replace(/[\n]/g,"વું"));if (t3!="NA"){x= x.replace(/\n/g,""); console.log("Answer was obtained by first removing pratyay -- "+a+" from the word (and later on adding back itself). Then to check answer we added extra વું at the end");return x+a; }
t3 =vlookup(x.replace(/[\n]/g,"ેવું"));if (t3!="NA"){x= x.replace(/\n/g,""); console.log("Answer was obtained by first removing pratyay -- "+a+" from the word (and later on adding back itself). Then to check answer we added extra ેવું at the end");return x+a; }
t3 =vlookup(x.replace(/[\n]/g,"ુ"));if (t3!="NA"){x= x.replace(/\n/g,""); console.log("Answer was obtained by first removing pratyay -- "+a+" from the word (and later on adding back itself). Then to check answer we added extra ુ at the end");return x+a; }
t3 =vlookup(x.replace(/[\n]/g,"ું"));if (t3!="NA"){x= x.replace(/\n/g,""); console.log("Answer was obtained by first removing pratyay -- "+a+" from the word (and later on adding back itself). Then to check answer we added extra ું at the end");return x+a; }
t3 =vlookup(x.replace(/[\n]/g,"રવું"));if (t3!="NA"){x= x.replace(/\n/g,""); console.log("Answer was obtained by first removing pratyay -- "+a+" from the word (and later on adding back itself). Then to check answer we added extra રવું at the end");return x+a; }
t3 =vlookup(x.replace(/[\n]/g,"ોવું"));if (t3!="NA"){x= x.replace(/\n/g,""); console.log("Answer was obtained by first removing pratyay -- "+a+" from the word (and later on adding back itself). Then to check answer we added extra ોવું at the end");return x+a; }
t3 =vlookup(x.replace(/[\n]/g,"ાવું"));if (t3!="NA"){x= x.replace(/\n/g,""); console.log("Answer was obtained by first removing pratyay -- "+a+" from the word (and later on adding back itself). Then to check answer we added extra ાવું at the end");return x+a; }
t3 =vlookup(x.replace(/[\n]/g,"ો"));if (t3!="NA"){x= x.replace(/\n/g,""); console.log("Answer was obtained by first removing pratyay -- "+a+" from the word (and later on adding back itself). Then to check answer we added extra ો at the end");return x+a; }
t3 =vlookup(x.replace(/[\n]/g,"વવું"));if (t3!="NA"){x= x.replace(/\n/g,""); console.log("Answer was obtained by first removing pratyay -- "+a+" from the word (and later on adding back itself). Then to check answer we added extra વવું at the end");return x+a; }


console.log("nothing found in PratRep2 for "+d);

return "NA";
}
function spellcheck(x)// we want answer here without \n and input also should be without \n
{ 
console.log("Word I am checking is "+ x);
var t3, t4, y;		//t3,t4 is multiuse temporary variable, y is x without \n
t3, t4, y = "";
a="";c="";
t3=pratrep2(x);

if (t3!="NA"){
	return t3;
}
y=x;
y="\n"+y;

//PASTE HERE from "PurvPratyay" sheet Col N.
console.log("Now we will try remove some PurvPratyay and see if that gives result")
a="";c="";t4= y.replace(/[\n]અતિ/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]અતિ/g,"")); if (t4!="NA"){c="અતિ"; console.log(" and also we first removed અતિ to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]અધિ/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]અધિ/g,"")); if (t4!="NA"){c="અધિ"; console.log(" and also we first removed અધિ to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]અનુ/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]અનુ/g,"")); if (t4!="NA"){c="અનુ"; console.log(" and also we first removed અનુ to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]અપ/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]અપ/g,"")); if (t4!="NA"){c="અપ"; console.log(" and also we first removed અપ to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]મહા/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]મહા/g,"")); if (t4!="NA"){c="મહા"; console.log(" and also we first removed મહા to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]અભિ/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]અભિ/g,"")); if (t4!="NA"){c="અભિ"; console.log(" and also we first removed અભિ to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]અવ/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]અવ/g,"")); if (t4!="NA"){c="અવ"; console.log(" and also we first removed અવ to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]ઉત્/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]ઉત્/g,"")); if (t4!="NA"){c="ઉત્"; console.log(" and also we first removed ઉત્ to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]ઉન્/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]ઉન્/g,"")); if (t4!="NA"){c="ઉન્"; console.log(" and also we first removed ઉન્ to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]ઉચ્છ/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]ઉચ્છ/g,"")); if (t4!="NA"){c="ઉચ્છ"; console.log(" and also we first removed ઉચ્છ to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]ઉપ/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]ઉપ/g,"")); if (t4!="NA"){c="ઉપ"; console.log(" and also we first removed ઉપ to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]દુર્/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]દુર્/g,"")); if (t4!="NA"){c="દુર્"; console.log(" and also we first removed દુર્ to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]નિ/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]નિ/g,"")); if (t4!="NA"){c="નિ"; console.log(" and also we first removed નિ to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]નિરુ/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]નિરુ/g,"ઉ")); if (t4!="NA"){c="નિરુ"; console.log(" and also we first removed નિરુ to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]નિર્/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]નિર્/g,"")); if (t4!="NA"){c="નિર્"; console.log(" and also we first removed નિર્ to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]પરા/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]પરા/g,"")); if (t4!="NA"){c="પરા"; console.log(" and also we first removed પરા to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]પરિ/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]પરિ/g,"")); if (t4!="NA"){c="પરિ"; console.log(" and also we first removed પરિ to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]પ્રતિ/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]પ્રતિ/g,"")); if (t4!="NA"){c="પ્રતિ"; console.log(" and also we first removed પ્રતિ to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]પ્રત્યા/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]પ્રત્યા/g,"આ")); if (t4!="NA"){c="પ્રત્યા"; console.log(" and also we first removed પ્રત્યા to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]અધો/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]અધો/g,"")); if (t4!="NA"){c="અધો"; console.log(" and also we first removed અધો to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]અની/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]અની/g,"ઇ")); if (t4!="NA"){c="અની"; console.log(" and also we first removed અની to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]અન/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]અન/g,"અ")); if (t4!="NA"){c="અન"; console.log(" and also we first removed અન to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]અંતરા/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]અંતરા/g,"આ")); if (t4!="NA"){c="અંતરા"; console.log(" and also we first removed અંતરા to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]અંતર્/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]અંતર્/g,"")); if (t4!="NA"){c="અંતર્"; console.log(" and also we first removed અંતર્ to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]અલં/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]અલં/g,"")); if (t4!="NA"){c="અલં"; console.log(" and also we first removed અલં to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]આવિષ્/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]આવિષ્/g,"")); if (t4!="NA"){c="આવિષ્"; console.log(" and also we first removed આવિષ્ to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]આવિર્/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]આવિર્/g,"")); if (t4!="NA"){c="આવિર્"; console.log(" and also we first removed આવિર્ to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]ઇતિ/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]ઇતિ/g,"")); if (t4!="NA"){c="ઇતિ"; console.log(" and also we first removed ઇતિ to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]કુ/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]કુ/g,"")); if (t4!="NA"){c="કુ"; console.log(" and also we first removed કુ to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]ચિરં/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]ચિરં/g,"")); if (t4!="NA"){c="ચિરં"; console.log(" and also we first removed ચિરં to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]તિરસ્/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]તિરસ્/g,"")); if (t4!="NA"){c="તિરસ્"; console.log(" and also we first removed તિરસ્ to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]તિરો/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]તિરો/g,"")); if (t4!="NA"){c="તિરો"; console.log(" and also we first removed તિરો to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]દિવા/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]દિવા/g,"આ")); if (t4!="NA"){c="દિવા"; console.log(" and also we first removed દિવા to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]પશ્ચાદ્/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]પશ્ચાદ્/g,"")); if (t4!="NA"){c="પશ્ચાદ્"; console.log(" and also we first removed પશ્ચાદ્ to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]પશ્ચા/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]પશ્ચા/g,"")); if (t4!="NA"){c="પશ્ચા"; console.log(" and also we first removed પશ્ચા to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]પુનર્/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]પુનર્/g,"")); if (t4!="NA"){c="પુનર્"; console.log(" and also we first removed પુનર્ to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]પુરસ્/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]પુરસ્/g,"")); if (t4!="NA"){c="પુરસ્"; console.log(" and also we first removed પુરસ્ to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]પુરા/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]પુરા/g,"")); if (t4!="NA"){c="પુરા"; console.log(" and also we first removed પુરા to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]પ્રાતઃ/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]પ્રાતઃ/g,"")); if (t4!="NA"){c="પ્રાતઃ"; console.log(" and also we first removed પ્રાતઃ to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]પ્રાદુર્/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]પ્રાદુર્/g,"")); if (t4!="NA"){c="પ્રાદુર્"; console.log(" and also we first removed પ્રાદુર્ to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]બહિર્/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]બહિર્/g,"")); if (t4!="NA"){c="બહિર્"; console.log(" and also we first removed બહિર્ to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]મિથ્યા/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]મિથ્યા/g,"")); if (t4!="NA"){c="મિથ્યા"; console.log(" and also we first removed મિથ્યા to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]વૃથ/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]વૃથ/g,"")); if (t4!="NA"){c="વૃથ"; console.log(" and also we first removed વૃથ to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]સહ/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]સહ/g,"")); if (t4!="NA"){c="સહ"; console.log(" and also we first removed સહ to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]સત્/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]સત્/g,"આ")); if (t4!="NA"){c="સત્"; console.log(" and also we first removed સત્ to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]સાક્ષાત્/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]સાક્ષાત્/g,"")); if (t4!="NA"){c="સાક્ષાત્"; console.log(" and also we first removed સાક્ષાત્ to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]સાયં/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]સાયં/g,"")); if (t4!="NA"){c="સાયં"; console.log(" and also we first removed સાયં to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]સ્વ/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]સ્વ/g,"")); if (t4!="NA"){c="સ્વ"; console.log(" and also we first removed સ્વ to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]સ્વયં/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]સ્વયં/g,"આ")); if (t4!="NA"){c="સ્વયં"; console.log(" and also we first removed સ્વયં to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]શ્રદ્/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]શ્રદ્/g,"")); if (t4!="NA"){c="શ્રદ્"; console.log(" and also we first removed શ્રદ્ to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]અમા/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]અમા/g,"")); if (t4!="NA"){c="અમા"; console.log(" and also we first removed અમા to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]સ્વર્/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]સ્વર્/g,"")); if (t4!="NA"){c="સ્વર્"; console.log(" and also we first removed સ્વર્ to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]સ્વસ્/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]સ્વસ્/g,"")); if (t4!="NA"){c="સ્વસ્"; console.log(" and also we first removed સ્વસ્ to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]પેશ/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]પેશ/g,"")); if (t4!="NA"){c="પેશ"; console.log(" and also we first removed પેશ to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]ના/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]ના/g,"")); if (t4!="NA"){c="ના"; console.log(" and also we first removed ના to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]દર/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]દર/g,"")); if (t4!="NA"){c="દર"; console.log(" and also we first removed દર to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]ગેર/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]ગેર/g,"")); if (t4!="NA"){c="ગેર"; console.log(" and also we first removed ગેર to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]ખુશ/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]ખુશ/g,"")); if (t4!="NA"){c="ખુશ"; console.log(" and also we first removed ખુશ to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]રણ/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]રણ/g,"આ")); if (t4!="NA"){c="રણ"; console.log(" and also we first removed રણ to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]હર/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]હર/g,"")); if (t4!="NA"){c="હર"; console.log(" and also we first removed હર to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]હમ/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]હમ/g,"")); if (t4!="NA"){c="હમ"; console.log(" and also we first removed હમ to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]સર/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]સર/g,"")); if (t4!="NA"){c="સર"; console.log(" and also we first removed સર to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]લા/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]લા/g,"")); if (t4!="NA"){c="લા"; console.log(" and also we first removed લા to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]બેલા/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]બેલા/g,"")); if (t4!="NA"){c="બેલા"; console.log(" and also we first removed બેલા to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]બે/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]બે/g,"")); if (t4!="NA"){c="બે"; console.log(" and also we first removed બે to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]બિન/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]બિન/g,"")); if (t4!="NA"){c="બિન"; console.log(" and also we first removed બિન to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]બર/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]બર/g,"")); if (t4!="NA"){c="બર"; console.log(" and also we first removed બર to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]બદ/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]બદ/g,"")); if (t4!="NA"){c="બદ"; console.log(" and also we first removed બદ to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]કમ/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]કમ/g,"")); if (t4!="NA"){c="કમ"; console.log(" and also we first removed કમ to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]હીણ/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]હીણ/g,"")); if (t4!="NA"){c="હીણ"; console.log(" and also we first removed હીણ to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]વણ/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]વણ/g,"")); if (t4!="NA"){c="વણ"; console.log(" and also we first removed વણ to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]ભર/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]ભર/g,"")); if (t4!="NA"){c="ભર"; console.log(" and also we first removed ભર to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]દુ/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]દુ/g,"")); if (t4!="NA"){c="દુ"; console.log(" and also we first removed દુ to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]અણ/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]અણ/g,"")); if (t4!="NA"){c="અણ"; console.log(" and also we first removed અણ to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]અધ/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]અધ/g,"")); if (t4!="NA"){c="અધ"; console.log(" and also we first removed અધ to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]આ/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]આ/g,"")); if (t4!="NA"){c="આ"; console.log(" and also we first removed આ to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]પ્ર/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]પ્ર/g,"")); if (t4!="NA"){c="પ્ર"; console.log(" and also we first removed પ્ર to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]વિ/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]વિ/g,"")); if (t4!="NA"){c="વિ"; console.log(" and also we first removed વિ to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]સં/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]સં/g,"")); if (t4!="NA"){c="સં"; console.log(" and also we first removed સં to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]સુ/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]સુ/g,"")); if (t4!="NA"){c="સુ"; console.log(" and also we first removed સુ to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]અ/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]અ/g,"")); if (t4!="NA"){c="અ"; console.log(" and also we first removed અ to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]ક/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]ક/g,"")); if (t4!="NA"){c="ક"; console.log(" and also we first removed ક to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]ન/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]ન/g,"")); if (t4!="NA"){c="ન"; console.log(" and also we first removed ન to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]સ/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]સ/g,"")); if (t4!="NA"){c="સ"; console.log(" and also we first removed સ to arrive at the correct word"); return c+t4; }}
a="";c="";t4= y.replace(/[\n]બ/g,"\n");if (t4 != y) { t4=pratrep2(y.replace(/[\n]બ/g,"")); if (t4!="NA"){c="બ"; console.log(" and also we first removed બ to arrive at the correct word"); return c+t4; }}






console.log("nothing found in PPrep for "+x);
return "NA";
}
function ocrclr(x){ //input should be without \n. It will give either word or options with | or blank indicating nothing found.
	var y,t1,t2,t3;
	y=PPrep(x);
	t1="";
	t2="";
	t3="";
	if (y!="NA"){return y;}
	
	//PASTE FROM HERE.. TO Be copied from OCR Correction formula sheet.
	
a="";c="";t1=x.replace(/ણુ/g,"ણ");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ણુ with ણ"); t2+=y+"|";}}
a="";c="";t1=x.replace(/ષ/g,"પ");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ષ with પ"); t2+=y+"|";}}
a="";c="";t1=x.replace(/ગ/g,"પ");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ગ with પ"); t2+=y+"|";}}
a="";c="";t1=x.replace(/૫/g,"પ");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ૫ with પ"); t2+=y+"|";}}
a="";c="";t1=x.replace(/શ/g,"રા");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing શ with રા"); t2+=y+"|";}}
a="";c="";t1=x.replace(/્([ા-ૌ])/g,"$1");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ્([ા-ૌ]) with $1"); t2+=y+"|";}}
a="";c="";t1=x.replace(/સ/g,"મ");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing સ with મ"); t2+=y+"|";}}
a="";c="";t1=x.replace(/ઝ/g,"મ");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ઝ with મ"); t2+=y+"|";}}
a="";c="";t1=x.replace(/ઞ/g,"ગ");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ઞ with ગ"); t2+=y+"|";}}
a="";c="";t1=x.replace(/ણ/g,"ગ");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ણ with ગ"); t2+=y+"|";}}
a="";c="";t1=x.replace(/શ/g,"ગ");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing શ with ગ"); t2+=y+"|";}}
a="";c="";t1=x.replace(/મ/g,"ગ");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing મ with ગ"); t2+=y+"|";}}
a="";c="";t1=x.replace(/ઝ/g,"ગ");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ઝ with ગ"); t2+=y+"|";}}
a="";c="";t1=x.replace(/ખ/g,"ગ");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ખ with ગ"); t2+=y+"|";}}
a="";c="";t1=x.replace(/([ા-ૌ])[ા-ૌ]/g,"$1");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ([ા-ૌ])[ા-ૌ] with $1"); t2+=y+"|";}}
a="";c="";t1=x.replace(/્ર/g,"");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ્ર with "); t2+=y+"|";}}
a="";c="";t1=x.replace(/દ્ર/g,"દ્વ");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing દ્ર with દ્વ"); t2+=y+"|";}}
a="";c="";t1=x.replace(/ઠ/g,"હ");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ઠ with હ"); t2+=y+"|";}}
a="";c="";t1=x.replace(/ઢ/g,"હ");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ઢ with હ"); t2+=y+"|";}}
a="";c="";t1=x.replace(/ચ/g,"ય");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ચ with ય"); t2+=y+"|";}}
a="";c="";t1=x.replace(/શ/g,"ય");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing શ with ય"); t2+=y+"|";}}
a="";c="";t1=x.replace(/ખ/g,"બ");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ખ with બ"); t2+=y+"|";}}
a="";c="";t1=x.replace(/મ/g,"બ");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing મ with બ"); t2+=y+"|";}}
a="";c="";t1=x.replace(/અ/g,"બ");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing અ with બ"); t2+=y+"|";}}
a="";c="";t1=x.replace(/([ઁ-ઃ])[ઁ-ઃ]/g,"$1");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ([ઁ-ઃ])[ઁ-ઃ] with $1"); t2+=y+"|";}}
a="";c="";t1=x.replace(/શ/g,"ભ");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing શ with ભ"); t2+=y+"|";}}
a="";c="";t1=x.replace(/બ/g,"વ");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing બ with વ"); t2+=y+"|";}}
a="";c="";t1=x.replace(/ધ/g,"વ");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ધ with વ"); t2+=y+"|";}}
a="";c="";t1=x.replace(/ત/g,"ન");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ત with ન"); t2+=y+"|";}}
a="";c="";t1=x.replace(/ન્ન/g,"ન");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ન્ન with ન"); t2+=y+"|";}}
a="";c="";t1=x.replace(/ષ/g,"ચ");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ષ with ચ"); t2+=y+"|";}}
a="";c="";t1=x.replace(/વ/g,"ચ");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing વ with ચ"); t2+=y+"|";}}
a="";c="";t1=x.replace(/ુ/g,"ૂ");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ુ with ૂ"); t2+=y+"|";}}
a="";c="";t1=x.replace(/્રૃ/g,"ૂ");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ્રૃ with ૂ"); t2+=y+"|";}}
a="";c="";t1=x.replace(/ૃ્/g,"ૂ");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ૃ્ with ૂ"); t2+=y+"|";}}
a="";c="";t1=x.replace(/્/g,"ૂ");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ્ with ૂ"); t2+=y+"|";}}
a="";c="";t1=x.replace(/્/g,"્ર");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ્ with ્ર"); t2+=y+"|";}}
a="";c="";t1=x.replace(/ઢ/g,"ટ");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ઢ with ટ"); t2+=y+"|";}}
a="";c="";t1=x.replace(/ઢ/g,"દ");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ઢ with દ"); t2+=y+"|";}}
a="";c="";t1=x.replace(/હ/g,"દ");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing હ with દ"); t2+=y+"|";}}
a="";c="";t1=x.replace(/ઢ/g,"ર");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ઢ with ર"); t2+=y+"|";}}
a="";c="";t1=x.replace(/શ/g,"ર");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing શ with ર"); t2+=y+"|";}}
a="";c="";t1=x.replace(/૨/g,"ર");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ૨ with ર"); t2+=y+"|";}}
a="";c="";t1=x.replace(/જા/g,"જૂ");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing જા with જૂ"); t2+=y+"|";}}
a="";c="";t1=x.replace(/જી/g,"જૂ");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing જી with જૂ"); t2+=y+"|";}}
a="";c="";t1=x.replace(/ઢ/g,"ઠ");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ઢ with ઠ"); t2+=y+"|";}}
a="";c="";t1=x.replace(/ક/g,"ઠ");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ક with ઠ"); t2+=y+"|";}}
a="";c="";t1=x.replace(/ઢ/g,"ડ");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ઢ with ડ"); t2+=y+"|";}}
a="";c="";t1=x.replace(/ઠ/g,"ડ");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ઠ with ડ"); t2+=y+"|";}}
a="";c="";t1=x.replace(/ક્/g,"ફ");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ક્ with ફ"); t2+=y+"|";}}
a="";c="";t1=x.replace(/ક્ષ્/g,"ફ");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ક્ષ્ with ફ"); t2+=y+"|";}}
a="";c="";t1=x.replace(/ક્ષ/g,"ફ");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ક્ષ with ફ"); t2+=y+"|";}}
a="";c="";t1=x.replace(/ક/g,"લ");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ક with લ"); t2+=y+"|";}}
a="";c="";t1=x.replace(/બ/g,"લ");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing બ with લ"); t2+=y+"|";}}
a="";c="";t1=x.replace(/છ/g,"ઇ");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing છ with ઇ"); t2+=y+"|";}}
a="";c="";t1=x.replace(/ધ/g,"ઇ");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ધ with ઇ"); t2+=y+"|";}}
a="";c="";t1=x.replace(/ઈ/g,"ઇ");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ઈ with ઇ"); t2+=y+"|";}}
a="";c="";t1=x.replace(/ફ/g,"ક્");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ફ with ક્"); t2+=y+"|";}}
a="";c="";t1=x.replace(/ઘ્ર/g,"દ્ય");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ઘ્ર with દ્ય"); t2+=y+"|";}}
a="";c="";t1=x.replace(/દા/g,"દ્ય");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing દા with દ્ય"); t2+=y+"|";}}
a="";c="";t1=x.replace(/ધ્ય/g,"દ્ય");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ધ્ય with દ્ય"); t2+=y+"|";}}
a="";c="";t1=x.replace(/ં/g,"");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ં with "); t2+=y+"|";}}
a="";c="";t1=x.replace(/્/g,"");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ્ with "); t2+=y+"|";}}
a="";c="";t1=x.replace(/ર્/g,"");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ર્ with "); t2+=y+"|";}}
a="";c="";t1=x.replace(/ધ/g,"ષ");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ધ with ષ"); t2+=y+"|";}}
a="";c="";t1=x.replace(/ઑઓ/g,"ઓ");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ઑઓ with ઓ"); t2+=y+"|";}}
a="";c="";t1=x.replace(/ઑ/g,"ઓ");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ઑ with ઓ"); t2+=y+"|";}}
a="";c="";t1=x.replace(/ો/g,"ી");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ો with ી"); t2+=y+"|";}}
a="";c="";t1=x.replace(/િ/g,"ી");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing િ with ી"); t2+=y+"|";}}
a="";c="";t1=x.replace(/ી/g,"ા");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ી with ા"); t2+=y+"|";}}
a="";c="";t1=x.replace(/ઍએ/g,"એ");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ઍએ with એ"); t2+=y+"|";}}
a="";c="";t1=x.replace(/ઋ/g,"એ");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ઋ with એ"); t2+=y+"|";}}
a="";c="";t1=x.replace(/ઐ/g,"એ");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ઐ with એ"); t2+=y+"|";}}
a="";c="";t1=x.replace(/ન્ય/g,"વ્ય");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ન્ય with વ્ય"); t2+=y+"|";}}
a="";c="";t1=x.replace(/બ્ય/g,"વ્ય");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing બ્ય with વ્ય"); t2+=y+"|";}}
a="";c="";t1=x.replace(/ન્/g,"ં");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ન્ with ં"); t2+=y+"|";}}
a="";c="";t1=x.replace(/ૌ/g,"ો");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ૌ with ો"); t2+=y+"|";}}
a="";c="";t1=x.replace(/બ/g,"ળ");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing બ with ળ"); t2+=y+"|";}}
a="";c="";t1=x.replace(/હ્યા/g,"હ્મ");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing હ્યા with હ્મ"); t2+=y+"|";}}
a="";c="";t1=x.replace(/ૈ/g,"ે");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ૈ with ે"); t2+=y+"|";}}
a="";c="";t1=x.replace(/ૅ/g,"ે");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ૅ with ે"); t2+=y+"|";}}
a="";c="";t1=x.replace(/ઇ/g,"ઈ");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ઇ with ઈ"); t2+=y+"|";}}
a="";c="";t1=x.replace(/ચ્ચ/g,"ચ્ય");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ચ્ચ with ચ્ય"); t2+=y+"|";}}
a="";c="";t1=x.replace(/:/g,"ઃ");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing : with ઃ"); t2+=y+"|";}}
a="";c="";t1=x.replace(/સ્ર/g,"સ્ત્ર");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing સ્ર with સ્ત્ર"); t2+=y+"|";}}
a="";c="";t1=x.replace(/ી/g,"િ");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ી with િ"); t2+=y+"|";}}
a="";c="";t1=x.replace(/આ/g,"બા");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing આ with બા"); t2+=y+"|";}}
a="";c="";t1=x.replace(/(ક|ઠ|હ)/g,"$1્");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing (ક|ઠ|હ) with $1્"); t2+=y+"|";}}
a="";c="";t1=x.replace(/(ય)/g,"્$1");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing (ય) with ્$1"); t2+=y+"|";}}
a="";c="";t1=x.replace(/ૠ/g,"ઋ");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ૠ with ઋ"); t2+=y+"|";}}
a="";c="";t1=x.replace(/ૂ/g,"ુ");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ૂ with ુ"); t2+=y+"|";}}
a="";c="";t1=x.replace(/શ્વ/g,"શ્ચ");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing શ્વ with શ્ચ"); t2+=y+"|";}}
a="";c="";t1=x.replace(/રૂ/g,"રુ");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing રૂ with રુ"); t2+=y+"|";}}
a="";c="";t1=x.replace(/દ્ર/g,"દ્વ");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing દ્ર with દ્વ"); t2+=y+"|";}}
a="";c="";t1=x.replace(/દ([શ્|ષ્])/g,"દૃ$1");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing દ([શ્|ષ્]) with દૃ$1"); t2+=y+"|";}}









a="";c="";t1=x.replace(/ક્ર/g,"ક");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ક્ર with ક"); t2+=y+"|";}}
a="";c="";t1=x.replace(/ર્([ક-હ][ા-ૌ])ં/g,"$1ં");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ર્([ક-હ][ા-ૌ])ં with $1ં"); t2+=y+"|";}}
a="";c="";t1=x.replace(/ર્([ક-હ][ા-ૌ]|[ક-હ])/g,"$1ં");if (t1!=x){y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing ર્([ક-હ][ા-ૌ]|[ક-હ]) with $1ં"); t2+=y+"|";}}












a="";c="";if (x.slice(-4)=="સ્રિ"){t1=x.slice(0,-4)+"સૂરિ";y=PPrep(t1);if(y!="NA"){a="";c="";console.log("but all this was obtained by replacing સ્રિ with સૂરિ"); t2+=y+"|";}}



//Keep Below as it is.
if (t2==""){return "NA";}else{return t2;}
}
function fmwreplace(x){
	x="\n"+x+"\n";
	//Below is standard list of mistakes which can be anywhere. Taken from Font Conversion script.Taken from GujLast Script of Fontconversion scripts
x = x.replace(/ઁ([ા-ૌ])/g,"$1ઁ");
x = x.replace(/ ા/g,"ા");
x = x.replace(/ ી/g,"ી");
x = x.replace(/ ુ/g,"ુ");
x = x.replace(/ ૂ/g,"ૂ");
x = x.replace(/ ૃ/g,"ૃ");
x = x.replace(/ ૄ/g,"ૄ");
x = x.replace(/ ૅ/g,"ૅ");
x = x.replace(/ ે/g,"ે");
x = x.replace(/ ૈ/g,"ૈ");
x = x.replace(/ ૉ/g,"ૉ");
x = x.replace(/ ો/g,"ો");
x = x.replace(/ ૌ/g,"ૌ");
x = x.replace(/ ્/g,"્");
x = x.replace(/ ં/g,"ં");
x = x.replace(/઼્/g,"઼્");
x = x.replace(/્ા/g,"");
x = x.replace(/્ૉ/g,"ૅ");
x = x.replace(/્ો/g,"ે");
x = x.replace(/્ૌ/g,"ૈ");
x = x.replace(/્ૅા/g,"ૅ");
x = x.replace(/્ેા/g,"ે");
x = x.replace(/્ૈા/g,"ૈ");
x = x.replace(/ૅા/g,"ૉ");
x = x.replace(/ેા/g,"ો");
x = x.replace(/ૈા/g,"ૌ");
x = x.replace(/ાે/g,"ો");
x = x.replace(/ાૈ/g,"ૌ");
x = x.replace(/ાૅ/g,"ૉ");
//Taken from GujMid Script of Fontconversion scripts
x = x.replace(/ેે/g,"ે");
x = x.replace(/ૈૈ/g,"ૈ");
x = x.replace(/ોે/g,"ો");
x = x.replace(/ાા/g,"ા");
x = x.replace(/ંં/g,"ં");
x = x.replace(/જાુ/g,"જુ");
x = x.replace(/જોુ/g,"જુ");
x = x.replace(/અાે/g,"ઓ");
x = x.replace(/અાૈ/g,"ઔ");
x = x.replace(/અાૅ/g,"ઑ");
x = x.replace(/અેા/g,"ઓ");
x = x.replace(/અૈા/g,"ઔ");
x = x.replace(/અૅા/g,"ઑ");
x = x.replace(/અો/g,"ઓ");
x = x.replace(/અૌ/g,"ઔ");
x = x.replace(/અૉ/g,"ઑ");
x = x.replace(/અે/g,"એ");
x = x.replace(/અૈ/g,"ઐ");
x = x.replace(/અૅ/g,"ઍ");
x = x.replace(/આે/g,"ઓ");
x = x.replace(/આૈ/g,"ઔ");
x = x.replace(/આૅ/g,"ઑ");
x = x.replace(/અા/g,"આ");
x = x.replace(/ાે/g,"ો");
x = x.replace(/ાૈ/g,"ૌ");
x = x.replace(/ાૅ/g,"ૉ");
x = x.replace(/ેા/g,"ો");
x = x.replace(/ૈા/g,"ૌ");
x = x.replace(/ૅા/g,"ૉ");

	//Here onwards add the items in AllRep Sheet col D.
x = x.replace(/વૃત(?![ઁ-ૡ])/g,"વૃત્ત");
x = x.replace(/ંન્/g,"ં");
x = x.replace(/ંમ્/g,"ં");
x = x.replace(/ઓનુ(?![ઁ-ૡ])/g,"ઓનું");
x = x.replace(/સિરી/g,"સૂરિ");
x = x.replace(/સુનિ/g,"મુનિ");
x = x.replace(/દશ્ય/g,"દૃશ્ય");
x = x.replace(/ૠ/g,"ઋ");
x = x.replace(/દષ્ટ/g,"દૃષ્ટ");
x = x.replace(/દઢ/g,"દૃઢ");
x = x.replace(/્ર્([ક-હ])/g,"્ર$1");
x = x.replace(/\u2000/g,"");
x = x.replace(/\u2001/g,"");
x = x.replace(/\u2002/g,"");
x = x.replace(/\u2003/g,"");
x = x.replace(/\u2004/g,"");
x = x.replace(/\u2005/g,"");
x = x.replace(/\u2006/g,"");
x = x.replace(/\u2007/g,"");
x = x.replace(/\u2008/g,"");
x = x.replace(/\u2009/g,"");
x = x.replace(/\u200A/g,"");
x = x.replace(/\u200B/g,"");
x = x.replace(/\u200C/g,"");
x = x.replace(/\u200D/g,"");
x = x.replace(/\u200E/g,"");
x = x.replace(/\u200F/g,"");
x = x.replace(/તત્વ/g,"તત્ત્વ");
x = x.replace(/સહસ્ર/g,"સહસ્ત્ર");
x = x.replace(/મેરૂ/g,"મેરુ");
x = x.replace(/આશ્વર્ય/g,"આશ્ચર્ય");
x = x.replace(/0/g,"૦");
x = x.replace(/1/g,"૧");
x = x.replace(/2/g,"૨");
x = x.replace(/3/g,"૩");
x = x.replace(/4/g,"૪");
x = x.replace(/5/g,"૫");
x = x.replace(/6/g,"૬");
x = x.replace(/7/g,"૭");
x = x.replace(/8/g,"૮");
x = x.replace(/9/g,"૯");
x = x.replace(/૫([ઁ-ૡ])/g,"પ$1");
x = x.replace(/([ઁ-ૡ])૫/g,"$1પ");
x = x.replace(/૨([ઁ-ૡ])/g,"ર$1");
x = x.replace(/([ઁ-ૡ])૨/g,"$1ર");
x = x.replace(/્રુ/g,"ૃ");
x = x.replace(/વિધ્યા/g,"વિદ્યા");
x = x.replace(/સ્વામિ/g,"સ્વામી");
x = x.replace(/યુધ્ધ/g,"યુદ્ધ");
x = x.replace(/ભાઇ/g,"ભાઈ");
x = x.replace(/િશ(?![ઁ-ૡ])/g,"ીશ");
x = x.replace(/િન્દ્ર(?![ઁ-ૡ])/g,"ીન્દ્ર");
x = x.replace(/(?<![ઁ-ૡ])પ્રી/g,"પ્રિ");
x = x.replace(/(?<![ઁ-ૡ])પ્રિત/g,"પ્રીત");
x = x.replace(/ીયા(?![ઁ-ૡ])/g,"િયા");
x = x.replace(/િય(?![ઁ-ૡ])/g,"ીય");
x = x.replace(/દ્રીય(?![ઁ-ૡ])/g,"દ્રિય");
x = x.replace(/પ્રીય(?![ઁ-ૡ])/g,"પ્રિય");
x = x.replace(/ક્ષત્રીય(?![ઁ-ૡ])/g,"ક્ષત્રિય");
x = x.replace(/ીત્વ(?![ઁ-ૡ])/g,"િત્વ");
x = x.replace(/વુ(?![ઁ-ૡ])/g,"વું");
x = x.replace(/(?<![ઁ-ૡ])અતી/g,"અતિ");
x = x.replace(/(?<![ઁ-ૡ])અધી/g,"અધિ");
x = x.replace(/(?<![ઁ-ૡ])અભી/g,"અભિ");
x = x.replace(/(?<![ઁ-ૡ])નીઃ/g,"નિઃ");
x = x.replace(/(?<![ઁ-ૡ])પરી/g,"પરિ");
x = x.replace(/(?<![ઁ-ૡ])અનૂ/g,"અનુ");
x = x.replace(/(?<![ઁ-ૡ])ઊપ/g,"ઉપ");
x = x.replace(/(?<![ઁ-ૡ])દૂર્/g,"દુર્");
x = x.replace(/(?<![ઁ-ૡ])દૂઃ/g,"દુઃ");
x = x.replace(/(?<![ઁ-ૡ])ઊત્/g,"ઉત્");
x = x.replace(/(?<![ઁ-ૡ])ઊદ્/g,"ઉદ્");
x = x.replace(/(?<![ઁ-ૡ])પૂનર્/g,"પુનર્");
x = x.replace(/(?<![ઁ-ૡ])પૂનઃ/g,"પુનઃ");
x = x.replace(/ઇન(?![ઁ-ૡ])/g,"ઈન");
x = x.replace(/વતિ(?![ઁ-ૡ])/g,"વતી");
x = x.replace(/ણિત(?![ઁ-ૡ])/g,"ણીત");
x = x.replace(/ાતિત(?![ઁ-ૡ])/g,"ાતીત");
x = x.replace(/ાંકીત(?![ઁ-ૡ])/g,"ાંકિત");
x = x.replace(/ીષ્ઠ(?![ઁ-ૡ])/g,"િષ્ઠ");
x = x.replace(/(?<!ા)ઉ(?![ઁ-ૡ])/g,"ઉં");
x = x.replace(/દ્રષ્ટ/g,"દૃષ્ટ");
x = x.replace(/પારાયણ/g,"પરાયણ");
x = x.replace(/પ્રવૃતિ/g,"પ્રવૃત્તિ");
x = x.replace(/(?<![ખ|મ])ાં(?![ઁ-ૡ])/g,"ા");
x = x.replace(/(?<![ઁ-ૡ])શ્રીમદ(?![ઁ-ૡ])/g,"શ્રીમદ્");
x = x.replace(/(?<![ઁ-ૡ])ચિત(?![ઁ-ૡ])/g,"ચિત્ત");

//Hereonwards, add all the items in F1 Sheet Col F

x = x.replace(/(?<![ઁ-ૡ])ક્યા(?![ઁ-ૡ])/g,"ક્યાં");
x = x.replace(/(?<![ઁ-ૡ])જ્યા(?![ઁ-ૡ])/g,"જ્યાં");
x = x.replace(/(?<![ઁ-ૡ])તુ(?![ઁ-ૡ])/g,"તું");
x = x.replace(/(?<![ઁ-ૡ])ત્યા(?![ઁ-ૡ])/g,"ત્યાં");
x = x.replace(/(?<![ઁ-ૡ])મે(?![ઁ-ૡ])/g,"મેં");
x = x.replace(/(?<![ઁ-ૡ])હુ(?![ઁ-ૡ])/g,"હું");
x = x.replace(/(?<![ઁ-ૡ])ચિત(?![ઁ-ૡ])/g,"ચિત્ત");
x = x.replace(/અંગુઠો/g,"અંગૂઠો");
x = x.replace(/અંજલી/g,"અંજલિ");
x = x.replace(/અંતર્શ્ચક્ષુ/g,"અંતર્ચક્ષુ");
x = x.replace(/અંતદર્શન/g,"અંતર્દર્શન");
x = x.replace(/અંતઃમુહૂર્ત/g,"અંતર્મુહૂર્ત");
x = x.replace(/અંતમુર્હૂત/g,"અંતર્મુહૂર્ત");
x = x.replace(/અંતમુહૂર્ત/g,"અંતર્મુહૂર્ત");
x = x.replace(/અત્યંજ/g,"અંત્યજ");
x = x.replace(/અંત્યેષ્ટી/g,"અંત્યેષ્ટિ");
x = x.replace(/અકાદમિ/g,"અકાદમી");
x = x.replace(/અખત્રો/g,"અખતરો");
x = x.replace(/અગત્યતા/g,"અગત્ય");
x = x.replace(/અગરબતી/g,"અગરબત્તી");
x = x.replace(/અગવડતા/g,"અગવડ");
x = x.replace(/અગત્સ્ય/g,"અગસ્ત્ય");
x = x.replace(/અગ્નિયસ્ત્ર/g,"અગ્ન્યસ્ત્ર");
x = x.replace(/અગ્રીમ/g,"અગ્રિમ");
x = x.replace(/અચીંતીત/g,"અચિંતિત");
x = x.replace(/અછેદ્ય/g,"અચ્છેદ્ય");
x = x.replace(/અજૂગતૂં/g,"અજુગતું");
x = x.replace(/અતીથી/g,"અતિથિ");
x = x.replace(/અતિંદ્ર/g,"અતીંદ્ર");
x = x.replace(/અતિત/g,"અતીત");
x = x.replace(/અતિન્દ્ર/g,"અતીન્દ્ર");
x = x.replace(/અદીતી/g,"અદિતિ");
x = x.replace(/અદીતિ/g,"અદિતિ");
x = x.replace(/અદિતી/g,"અદિતિ");
x = x.replace(/અદ્રશ્ય/g,"અદૃશ્ય");
x = x.replace(/અધ્યતન/g,"અદ્યતન");
x = x.replace(/અદ્ધિતિય/g,"અદ્વિતિય");
x = x.replace(/અધમુઉ/g,"અધમૂઉં");
x = x.replace(/અધમુઊં/g,"અધમૂઉં");
x = x.replace(/અધમૂઊ/g,"અધમૂઉં");
x = x.replace(/અધિકારિ/g,"અધિકારી");
x = x.replace(/અધીકૃત/g,"અધિકૃત");
x = x.replace(/અધીનીયમ/g,"અધિનિયમ");
x = x.replace(/અધિન/g,"અધીન");
x = x.replace(/અધિર/g,"અધીર");
x = x.replace(/અદ્ધર/g,"અધ્ધર");
x = x.replace(/અદ્યાત્મ/g,"અધ્યાત્મ");
x = x.replace(/અર્ધ્યુ/g,"અધ્વર્યુ");
x = x.replace(/અનીશ્ચીત/g,"અનિશ્ચિત");
x = x.replace(/અનીષ્ટ/g,"અનિષ્ટ");
x = x.replace(/અનૂકરણ/g,"અનુકરણ");
x = x.replace(/અનુકુલન/g,"અનુકૂલન");
x = x.replace(/અનૂકુલન/g,"અનુકૂલન");
x = x.replace(/અનૂકૂલન/g,"અનુકૂલન");
x = x.replace(/અનુકુળ/g,"અનુકૂળ");
x = x.replace(/અનૂકુળ/g,"અનુકૂળ");
x = x.replace(/અનૂકૂળ/g,"અનુકૂળ");
x = x.replace(/અનુદિષ્ટિ/g,"અનુદ્દિષ્ટ");
x = x.replace(/અનુંનાસિકા/g,"અનુનાસિકા");
x = x.replace(/અનુભુત/g,"અનુભૂત");
x = x.replace(/અનૂભુત/g,"અનુભૂત");
x = x.replace(/અનૂભૂત/g,"અનુભૂત");
x = x.replace(/અનુરુપ/g,"અનુરૂપ");
x = x.replace(/અનૂરુપ/g,"અનુરૂપ");
x = x.replace(/અનૂરૂપ/g,"અનુરૂપ");
x = x.replace(/અનુસ્ત્રાવ/g,"અનુસ્રાવ");
x = x.replace(/અપકિર્તિ/g,"અપકીર્તિ");
x = x.replace(/અભીજીત/g,"અભિજિત");
x = x.replace(/અભીવૃદ્ધી/g,"અભિવૃદ્ધિ");
x = x.replace(/અભીવ્યક્તી/g,"અભિવ્યક્તિ");
x = x.replace(/અભુતપુર્વ/g,"અભૂતપૂર્વ");
x = x.replace(/અભેધ્ય/g,"અભેદ્ય");
x = x.replace(/અમુર્તિ/g,"અમૂર્તિ");
x = x.replace(/અર્થછાયા/g,"અર્થચ્છાયા");
x = x.replace(/અર્થાત(?![ઁ-ૡ])/g,"અર્થાત્");
x = x.replace(/અધાર્હ/g,"અર્ધાર્હ");
x = x.replace(/અર્વાચિન/g,"અર્વાચીન");
x = x.replace(/અલીપ્ત/g,"અલિપ્ત");
x = x.replace(/અલુણું/g,"અલૂણું");
x = x.replace(/અલુણૂં/g,"અલૂણું");
x = x.replace(/અલૂણૂં/g,"અલૂણું");
x = x.replace(/અવધી/g,"અવધિ");
x = x.replace(/અવધુત/g,"અવધૂત");
x = x.replace(/અવમુલ્યન/g,"અવમૂલ્યન");
x = x.replace(/અવીવાહીત/g,"અવિવાહિત");
x = x.replace(/અશ્લિલ/g,"અશ્લીલ");
x = x.replace(/અશ્વમેઘ/g,"અશ્વમેધ");
x = x.replace(/અસ્વિકૃતિ/g,"અસ્વીકૃતિ");
x = x.replace(/અર્હનિશ/g,"અહર્નિશ");
x = x.replace(/અહર્નીશ/g,"અહર્નિશ");
x = x.replace(/આંતરજ્ઞાતિય/g,"આંતરજ્ઞાતીય");
x = x.replace(/આંશીક/g,"આંશિક");
x = x.replace(/આગંતૂક/g,"આગંતુક");
x = x.replace(/આગતૂંક/g,"આગંતુક");
x = x.replace(/આગોતરિ/g,"આગોતરી");
x = x.replace(/આજિવિકા/g,"આજીવિકા");
x = x.replace(/આત્મવેતા/g,"આત્મવેત્તા");
x = x.replace(/આત્મસાત(?![ઁ-ૡ])/g,"આત્મસાત્");
x = x.replace(/આત્મિય/g,"આત્મીય");
x = x.replace(/આદીજાતી/g,"આદિજાતિ");
x = x.replace(/આદિવાસિ/g,"આદિવાસી");
x = x.replace(/આધ્યકવિ/g,"આદ્યકવિ");
x = x.replace(/આધુનીક/g,"આધુનિક");
x = x.replace(/આધ્યાત્મીક/g,"આધ્યાત્મિક");
x = x.replace(/આબરુ/g,"આબરૂ");
x = x.replace(/આબેહુબ/g,"આબેહૂબ");
x = x.replace(/આભુષણ/g,"આભૂષણ");
x = x.replace(/આમુલ/g,"આમૂલ");
x = x.replace(/આર્યુવેદ/g,"આયુર્વેદ");
x = x.replace(/આરુઢ/g,"આરૂઢ");
x = x.replace(/આરોગ્યતા/g,"આરોગ્ય");
x = x.replace(/આર્થીક/g,"આર્થિક");
x = x.replace(/આદ્રતા/g,"આર્દ્રતા");
x = x.replace(/આદ્રા/g,"આર્દ્રા");
x = x.replace(/આષદૃષ્ટા/g,"આર્ષદૃષ્ટા");
x = x.replace(/આલિશાન/g,"આલીશાન");
x = x.replace(/આલબમ/g,"આલ્બમ");
x = x.replace(/આવૃત્તી/g,"આવૃત્તિ");
x = x.replace(/આર્શીવાદ/g,"આશીર્વાદ");
x = x.replace(/આશિર્વાદ/g,"આશીર્વાદ");
x = x.replace(/આસક્તી/g,"આસક્તિ");
x = x.replace(/આલ્હાદક/g,"આહ્લાદક");
x = x.replace(/આહવાન/g,"આહ્વાન");
x = x.replace(/ઇંદ્રીય/g,"ઇંદ્રિય");
x = x.replace(/ઈચ્છા/g,"ઇચ્છા");
x = x.replace(/ઇતીહાસ/g,"ઇતિહાસ");
x = x.replace(/ઇર્ષા/g,"ઈર્ષા");
x = x.replace(/ઊચ્છૃંખલ/g,"ઉચ્છૃંખલ");
x = x.replace(/ઉશ્વસન/g,"ઉચ્છ્વસન");
x = x.replace(/ઉશ્વાસ/g,"ઉચ્છ્વાસ");
x = x.replace(/ઊછાંછળૂં/g,"ઉછાંછળું");
x = x.replace(/ઊત્કૃષ્ટ/g,"ઉત્કૃષ્ટ");
x = x.replace(/ઉતીર્ણ/g,"ઉત્તીર્ણ");
x = x.replace(/ઉત્પતિ/g,"ઉત્પત્તિ");
x = x.replace(/ઊત્સાહ/g,"ઉત્સાહ");
x = x.replace(/ઉદાત/g,"ઉદાત્ત");
x = x.replace(/ઉધ્ધાટન/g,"ઉદ્ઘાટન");
x = x.replace(/ઉદીપક/g,"ઉદ્દીપક");
x = x.replace(/ઉધ્ધત/g,"ઉદ્ધત");
x = x.replace(/ઉધ્ધવ/g,"ઉદ્ધવ");
x = x.replace(/ઉધ્ધાર/g,"ઉદ્ધાર");
x = x.replace(/ઔદ્યોગીકરણ/g,"ઉદ્યોગીકરણ");
x = x.replace(/ઊપરછલ્લૂં/g,"ઉપરછલ્લું");
x = x.replace(/ઊપર્યૂક્ત/g,"ઉપર્યુક્ત");
x = x.replace(/ઉપવિત/g,"ઉપવીત");
x = x.replace(/ઊપોદ્ઘાન/g,"ઉપોદ્ઘાન");
x = x.replace(/ઊર્વશી/g,"ઉર્વશી");
x = x.replace(/ઉંઘ/g,"ઊંઘ");
x = x.replace(/ઉંચ/g,"ઊંચ");
x = x.replace(/ઉંચક/g,"ઊચક");
x = x.replace(/ઊંચક/g,"ઊચક");
x = x.replace(/ઉજળ/g,"ઊજળ");
x = x.replace(/ઊજળૂં/g,"ઊજળું");
x = x.replace(/ઉણપ/g,"ઊણપ");
x = x.replace(/ઉર્જા/g,"ઊર્જા");
x = x.replace(/ઉર્ધ્વ/g,"ઊર્ધ્વ");
x = x.replace(/ઉર્મિ/g,"ઊર્મિ");
x = x.replace(/ઉંલટૂં/g,"ઊલ્ટું");
x = x.replace(/ઉલટું/g,"ઊલ્ટું");
x = x.replace(/ઊલટું/g,"ઊલ્ટું");
x = x.replace(/ઊલટૂં/g,"ઊલ્ટું");
x = x.replace(/ઉહાપોહ/g,"ઊહાપોહ");
x = x.replace(/એશીયા/g,"એશિયા");
x = x.replace(/ઐચ્છીક/g,"ઐચ્છિક");
x = x.replace(/ઐતીહાસીક/g,"ઐતિહાસિક");
x = x.replace(/ઓશીયાળું/g,"ઓશિયાળું");
x = x.replace(/ઔચીત્ય/g,"ઔચિત્ય");
x = x.replace(/ઔદાર્યતા/g,"ઔદાર્ય");
x = x.replace(/કજીય/g,"કજિય");
x = x.replace(/કણીત/g,"કણિત");
x = x.replace(/કથિતવ્ય/g,"કથયિતવ્ય");
x = x.replace(/કદરુપું/g,"કદરૂપું");
x = x.replace(/કદરુપૂં/g,"કદરૂપું");
x = x.replace(/કદરૂપૂં/g,"કદરૂપું");
x = x.replace(/કદાચિત(?![ઁ-ૡ])/g,"કદાચિત્");
x = x.replace(/કનીષ્ઠ/g,"કનિષ્ઠ");
x = x.replace(/કબુલાત/g,"કબૂલાત");
x = x.replace(/કમિશ્નર/g,"કમિશનર");
x = x.replace(/કરીયાતું/g,"કરિયાતું");
x = x.replace(/કરેલાં/g,"કરેલા");
x = x.replace(/કતૃત્વ/g,"કર્તૃત્વ");
x = x.replace(/ક્વચિત(?![ઁ-ૡ])/g,"કવચિત્");
x = x.replace(/કવયિત્રિ/g,"કવયિત્રી");
x = x.replace(/કવિયિત્રી/g,"કવયિત્રી");
x = x.replace(/કસુર/g,"કસૂર");
x = x.replace(/કાઠીયાવાડ/g,"કાઠિયાવાડ");
x = x.replace(/કાનુન/g,"કાનૂન");
x = x.replace(/કામિનિ/g,"કામિની");
x = x.replace(/કારકિર્દિ/g,"કારકિર્દી");
x = x.replace(/કાર્યવાહિ/g,"કાર્યવાહી");
x = x.replace(/કાવત્રું/g,"કાવતરું");
x = x.replace(/કાષ્ટ/g,"કાષ્ઠ");
x = x.replace(/કિંચિત(?![ઁ-ૡ])/g,"કિંચિત્");
x = x.replace(/કિંવદંતિ/g,"કિંવદંતી");
x = x.replace(/કિન્નાખોરિ/g,"કિન્નાખોરી");
x = x.replace(/કિરિટ/g,"કિરીટ");
x = x.replace(/કીલકીલાટ/g,"કિલકિલાટ");
x = x.replace(/કીસ્મત/g,"કિસ્મત");
x = x.replace(/કિર્તન/g,"કીર્તન");
x = x.replace(/કિર્તિ/g,"કીર્તિ");
x = x.replace(/કૂંવારૂં/g,"કુંવારું");
x = x.replace(/કૂટૂંબ/g,"કુટુંબ");
x = x.replace(/કુતુહલ/g,"કુતૂહલ");
x = x.replace(/કૂતુહલ/g,"કુતૂહલ");
x = x.replace(/કૂતૂહલ/g,"કુતૂહલ");
x = x.replace(/કુલીન/g,"કુલિન");
x = x.replace(/કુળવધુ/g,"કુળવધૂ");
x = x.replace(/કૂળવધુ/g,"કુળવધૂ");
x = x.replace(/કૂળવધૂ/g,"કુળવધૂ");
x = x.replace(/કુપન/g,"કૂપન");
x = x.replace(/કુવો/g,"કૂવો");
x = x.replace(/કેન્દ્રિય/g,"કેન્દ્રીય");
x = x.replace(/કોતરણિ/g,"કોતરણી");
x = x.replace(/કોશીશ/g,"કોશિશ");
x = x.replace(/કૃંદન/g,"ક્રંદન");
x = x.replace(/ક્રમીક/g,"ક્રમિક");
x = x.replace(/ક્રીયા/g,"ક્રિયા");
x = x.replace(/ક્રિયાશિલ/g,"ક્રિયાશીલ");
x = x.replace(/ક્લીષ્ટ/g,"ક્લિષ્ટ");
x = x.replace(/ક્ષત્રીય/g,"ક્ષત્રિય");
x = x.replace(/ક્ષેત્રિય/g,"ક્ષેત્રીય");
x = x.replace(/ખડીયો/g,"ખડિયો");
x = x.replace(/ખણખણીત/g,"ખણખણિત");
x = x.replace(/ખાણીયો/g,"ખાણિયો");
x = x.replace(/ખાતમુહુર્ત/g,"ખાતમુહૂર્ત");
x = x.replace(/ખાતમૂહુર્ત/g,"ખાતમુહૂર્ત");
x = x.replace(/ખાતમૂહૂર્ત/g,"ખાતમુહૂર્ત");
x = x.replace(/ખાસીયત/g,"ખાસિયત");
x = x.replace(/ખિસકોલિ/g,"ખિસકોલી");
x = x.replace(/ખિસ્સાકાત્રુ/g,"ખિસ્સાકાતરુ");
x = x.replace(/ખીસ્સાકોશ/g,"ખિસ્સાકોશ");
x = x.replace(/ખિંટિ/g,"ખીંટી");
x = x.replace(/ખિચોખિચ/g,"ખીચોખીચ");
x = x.replace(/ખૂન્નસ/g,"ખુન્નસ");
x = x.replace(/ખૂશનૂમા/g,"ખુશનુમા");
x = x.replace(/ખૂશામત/g,"ખુશામત");
x = x.replace(/ખુંધ/g,"ખૂંધ");
x = x.replace(/ખુબસુરત/g,"ખૂબસૂરત");
x = x.replace(/ખેડુત/g,"ખેડૂત");
x = x.replace(/ખેપીયો/g,"ખેપિયો");
x = x.replace(/ખેલદિલિ/g,"ખેલદિલી");
x = x.replace(/ગણત્રી/g,"ગણતરી");
x = x.replace(/ગણીત/g,"ગણિત");
x = x.replace(/ગતિશિલ/g,"ગતિશીલ");
x = x.replace(/ગાદગદિત/g,"ગદ્ગદિત");
x = x.replace(/ગદ્ધાવૈતરું/g,"ગધ્ધાવૈતરું");
x = x.replace(/ગરિબાઈ/g,"ગરીબાઈ");
x = x.replace(/ગર્ભીત/g,"ગર્ભિત");
x = x.replace(/ગિરદિ/g,"ગિરદી");
x = x.replace(/ગીરિ/g,"ગિરિ");
x = x.replace(/ગીરીધામ/g,"ગિરિધામ");
x = x.replace(/ગૂંજાશ/g,"ગુંજાશ");
x = x.replace(/ગુણવતા/g,"ગુણવત્તા");
x = x.replace(/ગુણીત/g,"ગુણિત");
x = x.replace(/ગુનાઈત/g,"ગુનાહિત");
x = x.replace(/ગૂપચૂપ/g,"ગુપચુપ");
x = x.replace(/ગૂરૂત્વાકર્ષણ/g,"ગુરુત્વાકર્ષણ");
x = x.replace(/ગુંચળું/g,"ગૂંચળું");
x = x.replace(/ગુંચળૂં/g,"ગૂંચળું");
x = x.replace(/ગૂંચળૂં/g,"ગૂંચળું");
x = x.replace(/ગુંથણ/g,"ગૂંથણ");
x = x.replace(/ગ્રહસ્થ/g,"ગૃહસ્થ");
x = x.replace(/ગૃહિણિ/g,"ગૃહિણી");
x = x.replace(/ગૃહીણિ/g,"ગૃહિણી");
x = x.replace(/ગૃહીણી/g,"ગૃહિણી");
x = x.replace(/ગૃહિત/g,"ગૃહીત");
x = x.replace(/ગેરરિતિ/g,"ગેરરીતિ");
x = x.replace(/ગોઝારૂં/g,"ગોઝારું");
x = x.replace(/ગૃહપૂજા/g,"ગ્રહપૂજા");
x = x.replace(/ગ્રામિણ/g,"ગ્રામીણ");
x = x.replace(/ગ્રિષ્મ/g,"ગ્રીષ્મ");
x = x.replace(/ઘુંઘટ/g,"ઘૂંઘટ");
x = x.replace(/ધૃણા/g,"ઘૃણા");
x = x.replace(/ચકચુર/g,"ચકચૂર");
x = x.replace(/ચડીયાતું/g,"ચડિયાતું");
x = x.replace(/ચતુવર્ણ/g,"ચતુર્વણ");
x = x.replace(/ચાંચીયો/g,"ચાંચિયો");
x = x.replace(/ચાર્તુમાસ/g,"ચાતુર્માસ");
x = x.replace(/ચીકીત્સક/g,"ચિકિત્સક");
x = x.replace(/ચિઠ્ઠિ/g,"ચિઠ્ઠી");
x = x.replace(/ચિતશુદ્ધિ/g,"ચિત્તશુદ્ધિ");
x = x.replace(/ચીત્ર/g,"ચિત્ર");
x = x.replace(/ચીત્રવીચીત્ર/g,"ચિત્રવિચિત્ર");
x = x.replace(/ચિન્હ/g,"ચિહ્ન");
x = x.replace(/ચિકાશ/g,"ચીકાશ");
x = x.replace(/ચીઢવ/g,"ચીડવ");
x = x.replace(/ચીઢાવ/g,"ચીડાવ");
x = x.replace(/ચુંટણિ/g,"ચૂંટણી");
x = x.replace(/ચુપચાપ/g,"ચૂપચાપ");
x = x.replace(/ચુર્ણ/g,"ચૂર્ણ");
x = x.replace(/ચૂર્ણીત/g,"ચૂર્ણિત");
x = x.replace(/છડિદાર/g,"છડીદાર");
x = x.replace(/છાત્રવૃતિ/g,"છાત્રવૃત્તિ");
x = x.replace(/છીન્નભીન્ન/g,"છિન્નભિન્ન");
x = x.replace(/છૂટકારો/g,"છુટકારો");
x = x.replace(/છુંદણું/g,"છૂંદણું");
x = x.replace(/છુંદણૂં/g,"છૂંદણું");
x = x.replace(/છૂંદણૂં/g,"છૂંદણું");
x = x.replace(/છુટાછેડા/g,"છૂટાછેડા");
x = x.replace(/છુતઅછુત/g,"છૂતઅછૂત");
x = x.replace(/છેતરપિંડિ/g,"છેતરપિંડી");
x = x.replace(/જગત્ચક્ષુ/g,"જગચ્ચક્ષુ");
x = x.replace(/જગત્નિયંતા/g,"જગન્નિયંતા");
x = x.replace(/જયંતિ/g,"જયંતી");
x = x.replace(/જલ્દી/g,"જલદી");
x = x.replace(/જાગરુક/g,"જાગરૂક");
x = x.replace(/જાગૃતી/g,"જાગૃતિ");
x = x.replace(/(?<![ઁ-ૡ])જાનું(?<![ઁ-ૡ])/g,"જાનુ");
x = x.replace(/જામિન/g,"જામીન");
x = x.replace(/જાહેરનામૂં/g,"જાહેરનામું");
x = x.replace(/જિંદગિ/g,"જિંદગી");
x = x.replace(/(?<![ઁ-ૡ])જિદ(?<![ઁ-ૡ])/g,"જિદ્દ");
x = x.replace(/જીલ્લો/g,"જિલ્લો");
x = x.replace(/જિર્ણ/g,"જીર્ણ");
x = x.replace(/જીર્ણોધ્ધાર/g,"જીર્ણોદ્ધાર");
x = x.replace(/જિવિત/g,"જીવિત");
x = x.replace(/જૂસ્સો/g,"જુસ્સો");
x = x.replace(/જુગટું/g,"જૂગટું");
x = x.replace(/જુગટૂં/g,"જૂગટું");
x = x.replace(/જૂગટૂં/g,"જૂગટું");
x = x.replace(/જુનું/g,"જૂનું");
x = x.replace(/જુનૂં/g,"જૂનું");
x = x.replace(/જૂનૂં/g,"જૂનું");
x = x.replace(/જ્યોતિમંડલ/g,"જ્યોતિર્મંડલ");
x = x.replace(/જ્યોર્તિલિંગ/g,"જ્યોતિર્લિંગ");
x = x.replace(/જ્યોતિવિદ/g,"જ્યોતિર્વિદ");
x = x.replace(/જ્યોતીષ/g,"જ્યોતિષ");
x = x.replace(/જ્યોતિવિદ્યા/g,"જ્યોતિષવિદ્યા");
x = x.replace(/જ્યોતિશાસ્ત્ર/g,"જ્યોતિષશાસ્ત્ર");
x = x.replace(/ઝઝુમવું/g,"ઝઝૂમવું");
x = x.replace(/ઝઝુમવૂં/g,"ઝઝૂમવું");
x = x.replace(/ઝઝૂમવૂં/g,"ઝઝૂમવું");
x = x.replace(/ઝરુખો /g,"ઝરૂખો ");
x = x.replace(/ઝીણવટતા/g,"ઝીણવટ");
x = x.replace(/ઝુંટાઝુંટ/g,"ઝૂંટાઝૂંટ");
x = x.replace(/ઝુમખું/g,"ઝૂમખું");
x = x.replace(/ઝુમખૂં/g,"ઝૂમખું");
x = x.replace(/ઝૂમખૂં/g,"ઝૂમખું");
x = x.replace(/ટચુકડું /g,"ટચૂકડું ");
x = x.replace(/ટચુકડૂં /g,"ટચૂકડું ");
x = x.replace(/ટચૂકડૂં /g,"ટચૂકડું ");
x = x.replace(/ટીકિટ/g,"ટિકિટ");
x = x.replace(/ટિકડિ/g,"ટીકડી");
x = x.replace(/ટુંક/g,"ટૂંક");
x = x.replace(/ડગૂમગૂ/g,"ડગુમગુ");
x = x.replace(/ડુંટિ/g,"ડુંટી");
x = x.replace(/તંગદિલિ/g,"તંગદિલી");
x = x.replace(/તકનિકિ/g,"તકનિકી");
x = x.replace(/તકલિફ/g,"તકલીફ");
x = x.replace(/તજજ્ઞ/g,"તજ્જ્ઞ");
x = x.replace(/તત્વવેતા/g,"તત્ત્વવેત્તા");
x = x.replace(/તત્વાર્થ/g,"તત્ત્વાર્થ");
x = x.replace(/તદૂપરાંત/g,"તદુપરાંત");
x = x.replace(/તપસ્વિનિ/g,"તપસ્વિની");
x = x.replace(/તપસ્વીનિ/g,"તપસ્વિની");
x = x.replace(/તપસ્વીની/g,"તપસ્વિની");
x = x.replace(/તપસ્વિ/g,"તપસ્વી");
x = x.replace(/તપાસનિસ/g,"તપાસનીસ");
x = x.replace(/તબદિલિ/g,"તબદીલી");
x = x.replace(/તબિબ/g,"તબીબ");
x = x.replace(/તમિસ્ત્ર/g,"તમિસ્ર");
x = x.replace(/તરંગિણિ/g,"તરંગિણી");
x = x.replace(/તરણીત/g,"તરણિત");
x = x.replace(/તલસ્પર્શિ/g,"તલસ્પર્શી");
x = x.replace(/તસ્વીર/g,"તસવીર");
x = x.replace(/તારિજ/g,"તારીજ");
x = x.replace(/તાર્કીક/g,"તાર્કિક");
x = x.replace(/તાલિમ/g,"તાલીમ");
x = x.replace(/તાસિર/g,"તાસીર");
x = x.replace(/તિજોરિ/g,"તિજોરી");
x = x.replace(/તીથિ/g,"તિથિ");
x = x.replace(/તીમીર/g,"તિમિર");
x = x.replace(/તીલાંજલી/g,"તિલાંજલિ");
x = x.replace(/તિર્થ/g,"તીર્થ");
x = x.replace(/તીથાંકર/g,"તીર્થંકર");
x = x.replace(/તિવ્ર/g,"તીવ્ર");
x = x.replace(/તૂક્કો/g,"તુક્કો");
x = x.replace(/તૃતિયા/g,"તૃતીયા");
x = x.replace(/તેલિબિયાં/g,"તેલીબિયાં");
x = x.replace(/તોતીંગ/g,"તોતિંગ");
x = x.replace(/ત્રિભાષિ/g,"ત્રિભાષી");
x = x.replace(/ત્રિરંગિ/g,"ત્રિરંગી");
x = x.replace(/ત્વરીત/g,"ત્વરિત");
x = x.replace(/દંડવત(?![ઁ-ૡ])/g,"દંડવત્");
x = x.replace(/દફ્તર/g,"દફતર");
x = x.replace(/દરીયો/g,"દરિયો");
x = x.replace(/દર્શિનિ/g,"દર્શિની");
x = x.replace(/દાગિનો/g,"દાગીનો");
x = x.replace(/દામિનિ/g,"દામિની");
x = x.replace(/દારીદ્રય/g,"દારિદ્રય");
x = x.replace(/દાર્શનીક/g,"દાર્શનિક");
x = x.replace(/દીયર/g,"દિયર");
x = x.replace(/દિલગિરિ/g,"દિલગીરી");
x = x.replace(/દીલાસો/g,"દિલાસો");
x = x.replace(/દિવાળિ/g,"દિવાળી");
x = x.replace(/દીવ્યા/g,"દિવ્યા");
x = x.replace(/દિકરો/g,"દીકરો");
x = x.replace(/દિક્ષા/g,"દીક્ષા");
x = x.replace(/દિદાર/g,"દીદાર");
x = x.replace(/દિપાવલિ/g,"દીપાવલિ");
x = x.replace(/દિપોત્સવિ/g,"દીપોત્સવી");
x = x.replace(/દિર્ઘ/g,"દીર્ઘ");
x = x.replace(/દિવાદાંડિ/g,"દીવાદાંડી");
x = x.replace(/દિવાલ/g,"દીવાલ");
x = x.replace(/દિવાસળિ/g,"દીવાસળી");
x = x.replace(/દુઘર્ષ/g,"દુર્ધર્ષ");
x = x.replace(/દૂશ્મન/g,"દુશ્મન");
x = x.replace(/દૂષ્કાળ/g,"દુષ્કાળ");
x = x.replace(/દૂષ્ટ/g,"દુષ્ટ");
x = x.replace(/દુબળું/g,"દૂબળું");
x = x.replace(/દુબળૂં/g,"દૂબળું");
x = x.replace(/દૂબળૂં/g,"દૂબળું");
x = x.replace(/દ્રષ્ટ/g,"દૃષ્ટ");
x = x.replace(/દૈવવશાત(?![ઁ-ૡ])/g,"દૈવવશાત્");
x = x.replace(/દાવ્ય/g,"દ્રાવ્ય");
x = x.replace(/દ્રારપાલ/g,"દ્વારપાલ");
x = x.replace(/દ્વિઅર્થિ/g,"દ્વિઅર્થી");
x = x.replace(/દ્વિતિયા/g,"દ્વિતીયા");
x = x.replace(/દ્વીવાર્ષીક/g,"દ્વિવાર્ષિક");
x = x.replace(/ધનીક/g,"ધનિક");
x = x.replace(/ધામધુમ/g,"ધામધૂમ");
x = x.replace(/ધારાશાસ્ત્રિ/g,"ધારાશાસ્ત્રી");
x = x.replace(/ધીક્કાર/g,"ધિક્કાર");
x = x.replace(/ધ્રૂમપાન/g,"ધૂમ્રપાન");
x = x.replace(/ધુર્ત/g,"ધૂર્ત");
x = x.replace(/ધ્રતરાષ્ટ્ર/g,"ધૃતરાષ્ટ્ર");
x = x.replace(/ધેનું/g,"ધેનુ");
x = x.replace(/ધૈર્યતા/g,"ધૈર્ય");
x = x.replace(/નંદીનિ/g,"નંદિની");
x = x.replace(/નંદીની/g,"નંદિની");
x = x.replace(/નાગરીક/g,"નાગરિક");
x = x.replace(/નાણાકિય/g,"નાણાકીય");
x = x.replace(/નામોશિ/g,"નામોશી");
x = x.replace(/નાસ્તીક/g,"નાસ્તિક");
x = x.replace(/નાળીયેર/g,"નાળિયેર");
x = x.replace(/નાળિયેરિ/g,"નાળિયેરી");
x = x.replace(/ની:શસ્ત્ર/g,"નિ:શસ્ત્ર");
x = x.replace(/નિઋતિ/g,"નિઋર્તિ");
x = x.replace(/નિકટવર્તિ/g,"નિકટવર્તી");
x = x.replace(/નીમંત્રીત/g,"નિમંત્રિત");
x = x.replace(/નિમિત/g,"નિમિત્ત");
x = x.replace(/નીમીષ/g,"નિમિષ");
x = x.replace(/નીયામક/g,"નિયામક");
x = x.replace(/નિરાભિમાની/g,"નિરભિમાની");
x = x.replace(/નિરિક્ષક/g,"નિરીક્ષક");
x = x.replace(/નિરૂત્તર/g,"નિરુત્તર");
x = x.replace(/નિરૂપદ્રવી/g,"નિરુપદ્રવી");
x = x.replace(/નીર્દીષ્ટ/g,"નિર્દિષ્ટ");
x = x.replace(/નીર્દેશીકા/g,"નિર્દેશિકા");
x = x.replace(/નીર્ધારીત/g,"નિર્ધારિત");
x = x.replace(/નિર્ધુણ/g,"નિર્ધૃણ");
x = x.replace(/નીર્ભેળ/g,"નિર્ભેળ");
x = x.replace(/નીર્વાસીત/g,"નિર્વાસિત");
x = x.replace(/નિવૃત/g,"નિવૃત્ત");
x = x.replace(/નિશિથ/g,"નિશીથ");
x = x.replace(/નીશ્ચીત/g,"નિશ્ચિત");
x = x.replace(/નિષિધ્ધ/g,"નિષિદ્ધ");
x = x.replace(/નીષીદ્ધ/g,"નિષિદ્ધ");
x = x.replace(/નીષ્ક્રીય/g,"નિષ્ક્રિય");
x = x.replace(/નિષ્ટા/g,"નિષ્ઠા");
x = x.replace(/નીહારીકા/g,"નિહારિકા");
x = x.replace(/નીહીત/g,"નિહિત");
x = x.replace(/નિતિ/g,"નીતિ");
x = x.replace(/નિતિ/g,"નીતિ");
x = x.replace(/નીતિમતા/g,"નીતિમત્તા");
x = x.replace(/નીતિવાન/g,"નીતિમાન");
x = x.replace(/નુકશાન/g,"નુકસાન");
x = x.replace(/નૃસંશ/g,"નૃશંસ");
x = x.replace(/નેતાગિરિ/g,"નેતાગીરી");
x = x.replace(/નૈઋર્ત્ય/g,"નૈઋત્ય");
x = x.replace(/નૈૠત્ય/g,"નૈઋત્ય");
x = x.replace(/નૈતીક/g,"નૈતિક");
x = x.replace(/નૈવેધ/g,"નૈવેદ્ય");
x = x.replace(/નૈષ્ટિક/g,"નૈષ્ઠિક");
x = x.replace(/ન્યાયાધિશ/g,"ન્યાયાધીશ");
x = x.replace(/ન્યુન/g,"ન્યૂન");
x = x.replace(/પન્યાસ/g,"પંન્યાસ");
x = x.replace(/પક્ષપાતપણું/g,"પક્ષપાત");
x = x.replace(/પથીક/g,"પથિક");
x = x.replace(/પત્થર/g,"પથ્થર");
x = x.replace(/પધ્ધતિ/g,"પદ્ધતિ");
x = x.replace(/પદ્મીનિ/g,"પદ્મિની");
x = x.replace(/પદ્મીની/g,"પદ્મિની");
x = x.replace(/પધ્ય/g,"પદ્ય");
x = x.replace(/પરચુરણ/g,"પરચૂરણ");
x = x.replace(/પરાકાષ્ટા/g,"પરાકાષ્ઠા");
x = x.replace(/પરીચીત/g,"પરિચિત");
x = x.replace(/પરિછેદ/g,"પરિચ્છેદ");
x = x.replace(/પરીમીતી/g,"પરિમિતિ");
x = x.replace(/પરિશિષ્ઠ/g,"પરિશિષ્ટ");
x = x.replace(/પરીશીષ્ટ/g,"પરિશિષ્ટ");
x = x.replace(/પરિશિલન/g,"પરિશીલન");
x = x.replace(/પરીસ્થીતી/g,"પરિસ્થિતિ");
x = x.replace(/પરિક્ષ/g,"પરીક્ષ");
x = x.replace(/પરિક્ષા/g,"પરીક્ષા");
x = x.replace(/પરિક્ષિત/g,"પરીક્ષિત");
x = x.replace(/પરિખ/g,"પરીખ");
x = x.replace(/પજર્ન્ય/g,"પર્જન્ય");
x = x.replace(/પર્યૂષણ/g,"પર્યુષણ");
x = x.replace(/પવીત્ર/g,"પવિત્ર");
x = x.replace(/પશ્ચાત(?![ઁ-ૡ])/g,"પશ્ચાત્");
x = x.replace(/પશ્ચાદભૂમિ/g,"પશ્ચાદ્ભૂમિ");
x = x.replace(/પાક્ષીક/g,"પાક્ષિક");
x = x.replace(/પારીતોષીક/g,"પારિતોષિક");
x = x.replace(/પારીભાષીક/g,"પારિભાષિક");
x = x.replace(/પાર્થીવ/g,"પાર્થિવ");
x = x.replace(/(?<![ઁ-ૡ])પિત(?![ઁ-ૡ])/g,"પિત્ત");
x = x.replace(/પીયર/g,"પિયર");
x = x.replace(/પિંછિ/g,"પીંછી");
x = x.replace(/પિડિત/g,"પીડિત");
x = x.replace(/પૂત્ર/g,"પુત્ર");
x = x.replace(/પુત્રવધુ/g,"પુત્રવધૂ");
x = x.replace(/પૂત્રવધુ/g,"પુત્રવધૂ");
x = x.replace(/પૂત્રવધૂ/g,"પુત્રવધૂ");
x = x.replace(/પુનરોક્તિ/g,"પુનરુક્તિ");
x = x.replace(/પુનરોચ્ચાર/g,"પુનરુચ્ચાર");
x = x.replace(/પુનરોદ્ધાર/g,"પુનરુદ્ધાર");
x = x.replace(/પુરાતત્વ/g,"પુરાતત્ત્વ");
x = x.replace(/ષુરૂષ/g,"પુરુષ");
x = x.replace(/પૂષ્કળ/g,"પુષ્કળ");
x = x.replace(/પૂષ્પ/g,"પુષ્પ");
x = x.replace(/પુંછડું/g,"પૂંછડું");
x = x.replace(/પુતળું/g,"પૂતળું");
x = x.replace(/પુતળૂં/g,"પૂતળું");
x = x.replace(/પૂતળૂં/g,"પૂતળું");
x = x.replace(/પુર્ણિમા/g,"પૂર્ણિમા");
x = x.replace(/પૃથ્થકરણ/g,"પૃથક્કરણ");
x = x.replace(/પૃથક્જન/g,"પૃથગ્જન");
x = x.replace(/પૌરર્સ્ત્ય/g,"પૌરસ્ત્ય");
x = x.replace(/પ્રકિર્ણ/g,"પ્રકીર્ણ");
x = x.replace(/પ્રકૃતી/g,"પ્રકૃતિ");
x = x.replace(/પ્રજાસતાક/g,"પ્રજાસત્તાક");
x = x.replace(/પ્રણાલિ/g,"પ્રણાલી");
x = x.replace(/પ્રતીનીધી/g,"પ્રતિનિધિ");
x = x.replace(/પ્રતિબધ્ધ/g,"પ્રતિબદ્ધ");
x = x.replace(/પ્રતિવાદિ/g,"પ્રતિવાદી");
x = x.replace(/પ્રતિસ્પર્ધિ/g,"પ્રતિસ્પર્ધી");
x = x.replace(/પ્રધ્યુમન/g,"પ્રદ્યુમન");
x = x.replace(/પ્રમાણીત/g,"પ્રમાણિત");
x = x.replace(/પ્રસંગોપાત(?![ઁ-ૡ])/g,"પ્રસંગોપાત્");
x = x.replace(/પ્રસંગોપાત/g,"પ્રસંગોપાત્ત");
x = x.replace(/પ્રસીદ્ધી/g,"પ્રસિદ્ધિ");
x = x.replace(/પ્રસૃતિગૃહ/g,"પ્રસૂતિગૃહ");
x = x.replace(/પ્રાણીત/g,"પ્રાણિત");
x = x.replace(/પ્રાણિસૃષ્ટિ/g,"પ્રાણીસૃષ્ટિ");
x = x.replace(/પ્રાથમીક/g,"પ્રાથમિક");
x = x.replace(/પ્રાસંગીક/g,"પ્રાસંગિક");
x = x.replace(/પ્રીય/g,"પ્રિય");
x = x.replace(/પ્રિયવંદા/g,"પ્રિયંવદા");
x = x.replace(/પ્રિતિ/g,"પ્રીતિ");
x = x.replace(/ફરિયાદિ/g,"ફરિયાદી");
x = x.replace(/ફીરસ્તો/g,"ફિરસ્તો");
x = x.replace(/ફૂરસદ/g,"ફુરસદ");
x = x.replace(/ફુમતું/g,"ફૂમતું");
x = x.replace(/ફુમતૂં/g,"ફૂમતું");
x = x.replace(/ફૂમતૂં/g,"ફૂમતું");
x = x.replace(/ફેરીયો/g,"ફેરિયો");
x = x.replace(/ફેસીલિટી/g,"ફેસીલીટી");
x = x.replace(/(?<![ઁ-ૡ])બતી(?![ઁ-ૡ])/g,"બત્તી");
x = x.replace(/બદસુરત/g,"બદસૂરત");
x = x.replace(/બ્હેન/g,"બહેન");
x = x.replace(/બિંદિ/g,"બિંદી");
x = x.replace(/બિનવારસિ/g,"બિનવારસી");
x = x.replace(/બિલ્કુલ/g,"બિલકુલ");
x = x.replace(/બિલાડિ/g,"બિલાડી");
x = x.replace(/બિભત્સ/g,"બીભત્સ");
x = x.replace(/બૂદ્ધ/g,"બુદ્ધ");
x = x.replace(/બુધ્ધિ/g,"બુદ્ધિ");
x = x.replace(/બુધ્ધિ/g,"બુદ્ધિ");
x = x.replace(/બુદ્ધિમતા/g,"બુદ્ધિમત્તા");
x = x.replace(/બૃહસ્પતી/g,"બૃહસ્પતિ");
x = x.replace(/બેસૂમાર/g,"બેસુમાર");
x = x.replace(/બેસુરું/g,"બેસૂરું");
x = x.replace(/બેસુરૂં/g,"બેસૂરું");
x = x.replace(/બેસૂરૂં/g,"બેસૂરું");
x = x.replace(/બેહુદું/g,"બેહૂદું");
x = x.replace(/બેહુદૂં/g,"બેહૂદું");
x = x.replace(/બેહૂદૂં/g,"બેહૂદું");
x = x.replace(/બૌધ્ધ/g,"બૌદ્ધ");
x = x.replace(/બ્રહ્મરંદ્ર/g,"બ્રહ્મરંધ્ર");
x = x.replace(/ભણીત/g,"ભણિત");
x = x.replace(/ભઈબંધ/g,"ભાઈબંધ");
x = x.replace(/ભાગિદારિ/g,"ભાગીદારી");
x = x.replace(/ભાગ્યવશાત(?![ઁ-ૡ])/g,"ભાગ્યવશાત્");
x = x.replace(/ભાનું/g,"ભાનુ");
x = x.replace(/ભીક્ષ/g,"ભિક્ષ");
x = x.replace(/ભીક્ષુ/g,"ભિક્ષુ");
x = x.replace(/ભીસ્તી/g,"ભિસ્તી");
x = x.replace(/ભિંડો/g,"ભીંડો");
x = x.replace(/ભિંત/g,"ભીંત");
x = x.replace(/ભિંસ/g,"ભીંસ");
x = x.replace(/(?<![ઁ-ૡ])ભિતિ(?<![ઁ-ૡ])/g,"ભીતિ");
x = x.replace(/ભિષણ/g,"ભીષણ");
x = x.replace(/ભિષ્મ/g,"ભીષ્મ");
x = x.replace(/ભૂલભૂલામણી/g,"ભુલભુલામણી");
x = x.replace(/ભુંસ/g,"ભૂંસ");
x = x.replace(/ભુપૃષ્ઠ/g,"ભૂપૃષ્ઠ");
x = x.replace(/ભૂમીતિ/g,"ભૂમિતિ");
x = x.replace(/ભૂગુકચ્છ/g,"ભૃગુકચ્છ");
x = x.replace(/ભેદભાવપણું/g,"ભેદભાવ");
x = x.replace(/ભૌગોલીક/g,"ભૌગોલિક");
x = x.replace(/ભૌમીક/g,"ભૌમિક");
x = x.replace(/ભાતૃત્વ/g,"ભ્રાતૃત્વ");
x = x.replace(/ભ્રાન્તી/g,"ભ્રાન્તિ");
x = x.replace(/ભ્રૃણહત્યા/g,"ભ્રૂણહત્યા");
x = x.replace(/મંજીલ/g,"મંજિલ");
x = x.replace(/મધ્યાર્ક/g,"મદ્યાર્ક");
x = x.replace(/મધ્યાન્હ/g,"મધ્યાહ્ન");
x = x.replace(/મનૂષ્ય/g,"મનુષ્ય");
x = x.replace(/મનોવૃતિ/g,"મનોવૃત્તિ");
x = x.replace(/મર્હૂમ/g,"મરહૂમ");
x = x.replace(/મલીન/g,"મલિન");
x = x.replace(/મશહુર/g,"મશહૂર");
x = x.replace(/મશાલચિ/g,"મશાલચી");
x = x.replace(/મસ્જીદ/g,"મસ્જિદ");
x = x.replace(/મહતર/g,"મહત્તર");
x = x.replace(/મહત્વ/g,"મહત્ત્વ");
x = x.replace(/મહાભીનીષ્ક્રમણ/g,"મહાભિનિષ્ક્રમણ");
x = x.replace(/મહોરૂં/g,"મહોરું");
x = x.replace(/માતૃછાયા/g,"માતૃચ્છાયા");
x = x.replace(/માધ્યમીક/g,"માધ્યમિક");
x = x.replace(/માનસીક/g,"માનસિક");
x = x.replace(/માયાવીનિ/g,"માયાવિની");
x = x.replace(/માયાવીની/g,"માયાવિની");
x = x.replace(/માયાવિ/g,"માયાવી");
x = x.replace(/માર્દવતા/g,"માર્દવ");
x = x.replace(/માલિકિ/g,"માલિકી");
x = x.replace(/માહિતિ/g,"માહિતી");
x = x.replace(/મિજબાનિ/g,"મિજબાની");
x = x.replace(/મિજાજિ/g,"મિજાજી");
x = x.replace(/મીતિ/g,"મિતિ");
x = x.replace(/મીત્ર/g,"મિત્ર");
x = x.replace(/મિત્રવત(?![ઁ-ૡ])/g,"મિત્રવત્");
x = x.replace(/મીયાં/g,"મિયાં");
x = x.replace(/મિલ્કત/g,"મિલકત");
x = x.replace(/મીશ્રીત/g,"મિશ્રિત");
x = x.replace(/મિનાકારિ/g,"મીનાકારી");
x = x.replace(/મૂક્કો/g,"મુક્કો");
x = x.replace(/મૂક્ત/g,"મુક્ત");
x = x.replace(/મુત્સદી/g,"મુત્સદ્દી");
x = x.replace(/મુદ્રામાલ/g,"મુદ્દામાલ");
x = x.replace(/મુલત્વી/g,"મુલતવી");
x = x.replace(/મુહુર્ત/g,"મુહૂર્ત");
x = x.replace(/મૂહુર્ત/g,"મુહૂર્ત");
x = x.replace(/મૂહૂર્ત/g,"મુહૂર્ત");
x = x.replace(/મુર્ખ/g,"મૂર્ખ");
x = x.replace(/મુર્ચ્છા/g,"મૂર્ચ્છા");
x = x.replace(/મુર્તિ/g,"મૂર્તિ");
x = x.replace(/મુલ્ય/g,"મૂલ્ય");
x = x.replace(/મૃણાલીનિ/g,"મૃણાલિની");
x = x.replace(/મૃણાલીની/g,"મૃણાલિની");
x = x.replace(/મોકુફ/g,"મોકૂફ");
x = x.replace(/મોરથુથું/g,"મોરથૂથું");
x = x.replace(/મોરથુથૂં/g,"મોરથૂથું");
x = x.replace(/મોરથૂથૂં/g,"મોરથૂથું");
x = x.replace(/મોહિનિ/g,"મોહિની");
x = x.replace(/મોહીનિ/g,"મોહિની");
x = x.replace(/મોહીની/g,"મોહિની");
x = x.replace(/મૌંસુંઝણું/g,"મૌંસૂંઝણું");
x = x.replace(/મૌંસુંઝણૂં/g,"મૌંસૂંઝણું");
x = x.replace(/મૌંસૂંઝણૂં/g,"મૌંસૂંઝણું");
x = x.replace(/મૌખીક/g,"મૌખિક");
x = x.replace(/મૌલીક/g,"મૌલિક");
x = x.replace(/મલેચ્છ/g,"મ્લેચ્છ");
x = x.replace(/યત્કિંચિત(?![ઁ-ૡ])/g,"યત્કિંચિત્");
x = x.replace(/યધ્યપિ/g,"યદ્યાપિ");
x = x.replace(/યાદગિરિ/g,"યાદગીરી");
x = x.replace(/યાદ્રચ્છિક/g,"યાદૃચ્છિક");
x = x.replace(/યાદ્રેશ/g,"યાદૃશ");
x = x.replace(/યાવત્જીવન/g,"યાવજ્જીવન");
x = x.replace(/યુધ્ધ/g,"યુદ્ધ");
x = x.replace(/યોગીનિ/g,"યોગિની");
x = x.replace(/યોગીની/g,"યોગિની");
x = x.replace(/(?<![ઁ-ૡ])યોગિ(?![ઁ-ૡ])/g,"યોગી");
x = x.replace(/રક્તસ્ત્રાવ/g,"રક્તસ્રાવ");
x = x.replace(/રજુઆત/g,"રજૂઆત");
x = x.replace(/રશીયા/g,"રશિયા");
x = x.replace(/રસીક/g,"રસિક");
x = x.replace(/રાષ્ટ્રિય/g,"રાષ્ટ્રીય");
x = x.replace(/રીવાજ/g,"રિવાજ");
x = x.replace(/રિસ્પોન્સિબલ/g,"રિસ્પોન્સીબલ");
x = x.replace(/રિતરિવાજ/g,"રીતરિવાજ");
x = x.replace(/રિતિ/g,"રીતિ");
x = x.replace(/રૂદ્ર/g,"રુદ્ર");
x = x.replace(/રુપાંતર/g,"રૂપાંતર");
x = x.replace(/રુપાળું/g,"રૂપાળું");
x = x.replace(/રુપાળૂં/g,"રૂપાળું");
x = x.replace(/રૂપાળૂં/g,"રૂપાળું");
x = x.replace(/રુબરુ/g,"રૂબરૂ");
x = x.replace(/રેંટીયો/g,"રેંટિયો");
x = x.replace(/રેલ્વે/g,"રેલવે");
x = x.replace(/લક્ષાધીપતી/g,"લક્ષાધિપતિ");
x = x.replace(/લ્હાવો/g,"લહાવો");
x = x.replace(/લાક્ષણીક/g,"લાક્ષણિક");
x = x.replace(/લાઘવતા/g,"લાઘવ");
x = x.replace(/લાવણ્યતા/g,"લાવણ્ય");
x = x.replace(/લીખીતંગ/g,"લિખિતંગ");
x = x.replace(/લીબાસ/g,"લિબાસ");
x = x.replace(/લૂચ્ચો/g,"લુચ્ચો");
x = x.replace(/લૂટારો/g,"લુટારો");
x = x.replace(/લુંટ/g,"લૂંટ");
x = x.replace(/લુંટારો/g,"લૂંટારો");
x = x.replace(/લોલૂપ/g,"લોલુપ");
x = x.replace(/લૌકીક/g,"લૌકિક");
x = x.replace(/વકૃત્વ/g,"વક્તૃત્વ");
x = x.replace(/વટહૂકમ/g,"વટહુકમ");
x = x.replace(/વરિયાળિ/g,"વરિયાળી");
x = x.replace(/વર્તણુંક/g,"વર્તણૂંક");
x = x.replace(/વર્તણૂંક/g,"વર્તણૂક");
x = x.replace(/વહિવટિ/g,"વહીવટી");
x = x.replace(/વાક્દતા/g,"વાગ્દત્તા");
x = x.replace(/વાત્સાયન/g,"વાત્સ્યાયન");
x = x.replace(/વાર્ષીક/g,"વાર્ષિક");
x = x.replace(/વાસ્તવીક/g,"વાસ્તવિક");
x = x.replace(/વાહિનિ/g,"વાહિની");
x = x.replace(/વીકૃતી/g,"વિકૃતિ");
x = x.replace(/વિકેન્દ્રિકરણ/g,"વિકેન્દ્રીકરણ");
x = x.replace(/વીક્રેતા/g,"વિક્રેતા");
x = x.replace(/વીચલીત/g,"વિચલિત");
x = x.replace(/વિચારહિન/g,"વિચારહીન");
x = x.replace(/વીચીત્ર/g,"વિચિત્ર");
x = x.replace(/વીચ્છીન્ન/g,"વિચ્છિન્ન");
x = x.replace(/વીજ્ઞપ્તી/g,"વિજ્ઞપ્તિ");
x = x.replace(/(?<![ઁ-ૡ])વિત/g,"વિત્ત");
x = x.replace(/વિધ્યમાન/g,"વિદ્યમાન");
x = x.replace(/વીદ્યા/g,"વિદ્યા");
x = x.replace(/વિદ્યાપિઠ/g,"વિદ્યાપીઠ");
x = x.replace(/વિદ્યાર્થીનિ/g,"વિદ્યાર્થિની");
x = x.replace(/વીદ્યાર્થીની/g,"વિદ્યાર્થિની");
x = x.replace(/વિદ્યાર્થિ/g,"વિદ્યાર્થી");
x = x.replace(/વિધ્યાર્થી/g,"વિદ્યાર્થી");
x = x.replace(/વીદ્યાર્થી/g,"વિદ્યાર્થી");
x = x.replace(/વીદ્યૂત/g,"વિદ્યુત");
x = x.replace(/વિદ્ધતા/g,"વિદ્વત્તા");
x = x.replace(/વિદ્રતા/g,"વિદ્વત્તા");
x = x.replace(/વિદ્વતા/g,"વિદ્વત્તા");
x = x.replace(/વિદ્યર્થ/g,"વિધ્યર્થ");
x = x.replace(/વિદ્ધંસ/g,"વિધ્વંસ");
x = x.replace(/વિનવણિ/g,"વિનવણી");
x = x.replace(/વીનીમય/g,"વિનિમય");
x = x.replace(/વીનીયોગ /g,"વિનિયોગ ");
x = x.replace(/વિનોદીનિ/g,"વિનોદિની");
x = x.replace(/વીનોદીની/g,"વિનોદિની");
x = x.replace(/વિપરિત/g,"વિપરીત");
x = x.replace(/વીભીન્ન/g,"વિભિન્ન");
x = x.replace(/વિભિષણ/g,"વિભીષણ");
x = x.replace(/વિરોધાભાસિ/g,"વિરોધાભાસી");
x = x.replace(/વિરોધિ/g,"વિરોધી");
x = x.replace(/વિલાસીનિ/g,"વિલાસિની");
x = x.replace(/વીલાસીની/g,"વિલાસિની");
x = x.replace(/વિલિન/g,"વિલીન");
x = x.replace(/વીવીધ/g,"વિવિધ");
x = x.replace(/વીશ્વ/g,"વિશ્વ");
x = x.replace(/વિશ્વસનિય/g,"વિશ્વસનીય");
x = x.replace(/વિષુવવૃત/g,"વિષુવવૃત્ત");
x = x.replace(/વીષ્ણૂ/g,"વિષ્ણુ");
x = x.replace(/વીસંગતી/g,"વિસંગતિ");
x = x.replace(/વિસ્તિર્ણ/g,"વિસ્તીર્ણ");
x = x.replace(/વિંટિ/g,"વીંટી");
x = x.replace(/(?<![ઁ-ૡ])વિણા(?![ઁ-ૡ])/g,"વીણા");
x = x.replace(/વીણાવાદીનિ/g,"વીણાવાદિની");
x = x.replace(/વીણાવાદીની/g,"વીણાવાદિની");
x = x.replace(/વિર્ય/g,"વીર્ય");
x = x.replace(/વ્રંદાવન/g,"વૃંદાવન");
x = x.replace(/વૃતાંત/g,"વૃત્તાંત");
x = x.replace(/વૃધ્ધ/g,"વૃદ્ધ");
x = x.replace(/વૈદગ્ધ/g,"વૈદગ્ધ્ય");
x = x.replace(/વૈર્ધમ્ય/g,"વૈધર્મ્ય");
x = x.replace(/વૈપુલ્યતા/g,"વૈપુલ્ય");
x = x.replace(/વૈવિદ્ય/g,"વૈવિધ્ય");
x = x.replace(/વૈવિધ્યતા/g,"વૈવિધ્ય");
x = x.replace(/વ્યવહારૂ/g,"વ્યવહારુ");
x = x.replace(/વહાલા/g,"વ્હાલા");
x = x.replace(/શકિત/g,"શક્તિ");
x = x.replace(/શક્તિહિન/g,"શક્તિહીન");
x = x.replace(/શબ્દસમૃધ્ધિ/g,"શબ્દસમૃદ્ધિ");
x = x.replace(/શર્મિષ્ટા/g,"શર્મિષ્ઠા");
x = x.replace(/શાબ્દીક/g,"શાબ્દિક");
x = x.replace(/શારિરિક/g,"શારીરિક");
x = x.replace(/શાળાપયોગી/g,"શાળોપયોગી");
x = x.replace(/શિકારિ/g,"શિકારી");
x = x.replace(/શીક્ષ/g,"શિક્ષ");
x = x.replace(/શીક્ષક/g,"શિક્ષક");
x = x.replace(/શીક્ષણ/g,"શિક્ષણ");
x = x.replace(/શીક્ષીકા/g,"શિક્ષિકા");
x = x.replace(/શીથીલ/g,"શિથિલ");
x = x.replace(/શીબીર/g,"શિબિર");
x = x.replace(/શિલ્પિ/g,"શિલ્પી");
x = x.replace(/શીશીર/g,"શિશિર");
x = x.replace(/શીષ્ય/g,"શિષ્ય");
x = x.replace(/શિઘ્ર/g,"શીઘ્ર");
x = x.replace(/શિર્ષક/g,"શીર્ષક");
x = x.replace(/શૂક્ર/g,"શુક્ર");
x = x.replace(/શૂદ્ધ/g,"શુદ્ધ");
x = x.replace(/શુશ્રુષા/g,"શુશ્રૂષા");
x = x.replace(/શૂશ્રુષા/g,"શુશ્રૂષા");
x = x.replace(/શૂશ્રૂષા/g,"શુશ્રૂષા");
x = x.replace(/શુન્ય/g,"શૂન્ય");
x = x.replace(/શ્રૃંખલા/g,"શૃંખલા");
x = x.replace(/શ્રૃંગાર/g,"શૃંગાર");
x = x.replace(/શેત્રંજી/g,"શેતરંજી");
x = x.replace(/શોણીત/g,"શોણિત");
x = x.replace(/શૌર્યતા/g,"શૌર્ય");
x = x.replace(/શ્રધ્ધા/g,"શ્રદ્ધા");
x = x.replace(/શ્રધ્ધાંજલિ/g,"શ્રદ્ધાંજલિ");
x = x.replace(/શ્રાધ્ધ/g,"શ્રાદ્ધ");
x = x.replace(/સ્વશુર/g,"શ્વસુર");
x = x.replace(/શ્વશુર/g,"શ્વસુર");
x = x.replace(/શ્વાસોશ્વાસ/g,"શ્વાસોચ્છવાસ");
x = x.replace(/સ્વેત/g,"શ્વેત");
x = x.replace(/ષષ્ટક/g,"ષટ્ક");
x = x.replace(/ષટકોણ/g,"ષટ્કોણ");
x = x.replace(/ષટપદ/g,"ષટ્પદ");
x = x.replace(/ષડદર્શન/g,"ષડ્દર્શન");
x = x.replace(/ષડયંત્ર્/g,"ષડ્યંત્ર");
x = x.replace(/ષડરિપુ/g,"ષડ્રિપુ");
x = x.replace(/ષષ્ઠીપૂર્તિ/g,"ષષ્ટિપૂર્તિ");
x = x.replace(/સંક્રાન્તી/g,"સંક્રાન્તિ");
x = x.replace(/સંક્ષીપ્ત/g,"સંક્ષિપ્ત");
x = x.replace(/સંદીગ્ધ/g,"સંદિગ્ધ");
x = x.replace(/સન્યાસી/g,"સંન્યાસી");
x = x.replace(/સંપતિ/g,"સંપત્તિ");
x = x.replace(/સંપત્તી/g,"સંપત્તિ");
x = x.replace(/સંપુર્ણ/g,"સંપૂર્ણ");
x = x.replace(/સક્રીય/g,"સક્રિય");
x = x.replace(/સગવડતા/g,"સગવડ");
x = x.replace(/સત્તાધિકારિ/g,"સત્તાધિકારી");
x = x.replace(/સત્વ/g,"સત્ત્વ");
x = x.replace(/સમકાલિન/g,"સમકાલીન");
x = x.replace(/સમીતિ/g,"સમિતિ");
x = x.replace(/સમિક્ષા/g,"સમીક્ષા");
x = x.replace(/સમૂદ્ર/g,"સમુદ્ર");
x = x.replace(/સમુહ/g,"સમૂહ");
x = x.replace(/સન્મુખ/g,"સમ્મુખ");
x = x.replace(/સરોજીનિ/g,"સરોજિની");
x = x.replace(/સરોજીની/g,"સરોજિની");
x = x.replace(/સલુણું/g,"સલૂણું");
x = x.replace(/સલુણૂં/g,"સલૂણું");
x = x.replace(/સલૂણૂં/g,"સલૂણું");
x = x.replace(/સહચારિણિ/g,"સહચારિણી");
x = x.replace(/સહસ્ત્ર/g,"સહસ્ર");
x = x.replace(/સહસ્ત્રલિંગ/g,"સહસ્રલિંગ");
x = x.replace(/સહિસલામત/g,"સહીસલામત");
x = x.replace(/સાંદિપનિ/g,"સાંદીપનિ");
x = x.replace(/સાક્ષાત(?![ઁ-ૡ])/g,"સાક્ષાત્");
x = x.replace(/સાગરિત/g,"સાગરીત");
x = x.replace(/સાત્વીક/g,"સાત્વિક");
x = x.replace(/સાદ્રશ્ય/g,"સાદૃશ્ય");
x = x.replace(/સાનુકુળ/g,"સાનુકૂળ");
x = x.replace(/સાનૂકુળ/g,"સાનુકૂળ");
x = x.replace(/સાનૂકૂળ/g,"સાનુકૂળ");
x = x.replace(/સાફલ્યતા/g,"સાફલ્ય");
x = x.replace(/સાબિતિ/g,"સાબિતી");
x = x.replace(/સામયીક/g,"સામયિક");
x = x.replace(/સામાજીક/g,"સામાજિક");
x = x.replace(/સારથી/g,"સારથિ");
x = x.replace(/સાહસીક/g,"સાહસિક");
x = x.replace(/સાહીત્યીક/g,"સાહિત્યિક");
x = x.replace(/સીક્કો/g,"સિક્કો");
x = x.replace(/સિત્યાશિ/g,"સિત્યાશી");
x = x.replace(/સુદ્ધા/g,"સુધ્ધા");
x = x.replace(/સુપ્રત/g,"સુપરત");
x = x.replace(/સૂષૂપ્ત/g,"સુષુપ્ત");
x = x.replace(/સુહાસીનિ/g,"સુહાસિની");
x = x.replace(/સુહાસીની/g,"સુહાસિની");
x = x.replace(/સુકું/g,"સૂકું");
x = x.replace(/સુકૂં/g,"સૂકું");
x = x.replace(/સૂકૂં/g,"સૂકું");
x = x.replace(/સુક્ષ્મ/g,"સૂક્ષ્મ");
x = x.replace(/સુઝ/g,"સૂઝ");
x = x.replace(/સુત્ર/g,"સૂત્ર");
x = x.replace(/સુનમુન/g,"સૂનમૂન");
x = x.replace(/સુર્ય/g,"સૂર્ય");
x = x.replace(/સુર્યાસ્ત/g,"સૂર્યાસ્ત");
x = x.replace(/સૈનીક/g,"સૈનિક");
x = x.replace(/સૌન્દર્યતા/g,"સૌન્દર્ય");
x = x.replace(/સ્ત્રોતસ્વીની/g,"સ્ત્રોતસ્વિની");
x = x.replace(/સ્ત્રિયોપયોગી/g,"સ્ત્ર્યુપયોગી");
x = x.replace(/સ્થાનીક/g,"સ્થાનિક");
x = x.replace(/સ્થીતિ/g,"સ્થિતિ");
x = x.replace(/સ્થીતીસ્થાપક/g,"સ્થિતિસ્થાપક");
x = x.replace(/સ્નેહાધિન/g,"સ્નેહાધીન");
x = x.replace(/સ્ફુર્તિ/g,"સ્ફૂર્તિ");
x = x.replace(/સ્ત્રગ્ધરા/g,"સ્રગ્ધરા");
x = x.replace(/સ્ત્રાવ/g,"સ્રાવ");
x = x.replace(/સ્ત્રોત/g,"સ્રોત");
x = x.replace(/સ્વચ્છંદિ/g,"સ્વચ્છંદી");
x = x.replace(/સ્વછંદી/g,"સ્વચ્છંદી");
x = x.replace(/સ્વદેશાભિમાનિ/g,"સ્વદેશાભિમાની");
x = x.replace(/સ્વનીયંત્રીત/g,"સ્વનિયંત્રિત");
x = x.replace(/સ્વયંભુ/g,"સ્વયંભૂ");
x = x.replace(/સ્વાભાવીક/g,"સ્વાભાવિક");
x = x.replace(/સ્વામિ/g,"સ્વામી");
x = x.replace(/સ્વાયત/g,"સ્વાયત્ત");
x = x.replace(/સ્વિકાર/g,"સ્વીકાર");
x = x.replace(/સ્વૈચ્છીક/g,"સ્વૈચ્છિક");
x = x.replace(/હરિયાળિ/g,"હરિયાળી");
x = x.replace(/હરિફાઈ/g,"હરીફાઈ");
x = x.replace(/હસ્તલીખીત/g,"હસ્તલિખિત");
x = x.replace(/હિંસ્ત્ર/g,"હિંસ્ર");
x = x.replace(/હિંચકો/g,"હીંચકો");
x = x.replace(/હૂમલો/g,"હુમલો");
x = x.replace(/હૂલ્લડ/g,"હુલ્લડ");
x = x.replace(/હ્રષિકેશ/g,"હૃષીકેશ");
x = x.replace(/હેમાંગીનિ/g,"હેમાંગિની");
x = x.replace(/હેમાંગીની/g,"હેમાંગિની");
x = x.replace(/હૈયાફુટું/g,"હૈયાફૂટું");
x = x.replace(/હૈયાફુટૂં/g,"હૈયાફૂટું");
x = x.replace(/હૈયાફૂટૂં/g,"હૈયાફૂટું");
x = x.replace(/હોંશિયાર/g,"હોશિયાર");
x = x.replace(/હોશીયાર/g,"હોશિયાર");


//PASTE BEFORE THIS
x=x.replace(/[\n]/g,"");
return x;
}


/* The following function was half created by me just to see if I can create sandhi related function. Idea is:
First start from left most character and keep on adding next character until we find a match in the dictionary.
This work is done by gmw(x) function.
Then we need to see that if the next character is any of the hrasva dirghai group character, then sandhi solver ss(x,y) function to be used to find correct letter there.
Also we need to keep on doing until we reach end of the word.
Pending work in this is designing the main loop, also pratyay list in sanskrit to be made available to modify gmw(x) function to give value including the pratyay.


function sandhisplitter(x){
	var w1,w2,w3,w4,w5,w6,w7,w8,w9,i,j,t1,t2,ori;
	w1="";
	w2="";
	w3="";
	w4="";
	w5="";
	w6="";
	w7="";
	w8="";
	w9="";
	ori=x;
	i=1;
	ans="";
	for (i<x.length||ans=="NA";i++){
		if(x.slice(0,1)=="ा"||x.slice(0,1)=="ि"||x.slice(0,1)=="ी"||x.slice(0,1)=="ु"||x.slice(0,1)=="ू"||x.slice(0,1)=="ृ"||x.slice(0,1)=="ॄ"||x.slice(0,1)=="ॅ"||x.slice(0,1)=="ॆ"||x.slice(0,1)=="े"||x.slice(0,1)=="ै"||x.slice(0,1)=="ॉ"||x.slice(0,1)=="ॊ"||x.slice(0,1)=="ो"||x.slice(0,1)=="ौ"){
		x=ss(t1.slice(-1),x.slice(0,1))+x.slice(1);} // checks if first letter of the word is kano matra etc. then it means it is sandhi applied. hence, we have to make it proper.
	{t1=gmw(x);if (gmw(x)=="NA"){ans="NA";}eval("w"+i)=t1;x=x.slice(0,t1.length);}}
	
return w1+w2+w3+w4+w5+w6+w7+w8+w9;	
	}
		
function gmw(x){
	var j;
j=1;	
		for (j<x.length;j++) {t1=vlookup(x.slice(0,j));if(t1!="NA"){return t1;}}
		return "NA";
		}
function ss(x,y){
	var d;
	if(x.length==1){x="अ";}else{x=x.slice(1,2);}
	if(x=="अ"&&y=="ो"){d="उ";}
	
	//RULES TO BE COMPLETED.
	return d;
}
*/
	