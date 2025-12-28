//Get the button "alert.window.location.href = 'q'& location.pathname &'.html';"
var mybutton = document.getElementById("myBtn");
var myIndButton = document.getElementById("myIndex");
var mynexTopButton = document.getElementById("nexTop");
    mybutton.style.display = "block";
    myIndButton.style.display = "block";
    mynexTopButton.style.display = "block";

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
    myIndButton.style.display = "block";
    mynexTopButton.style.display = "block";
	} else {
    mybutton.style.display = "none";
    myIndButton.style.display = "none";
    mynexTopButton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
function NexPg() {
var url =window.location.pathname;
var FilNum,mainpa,restpa;
mainpa=url.substring(0,url.indexOf('.')-2);
restpa=url.slice(-5);
FilNum=Number(url.substring(url.lastIndexOf('.')-2).slice(0,2))+1;
FilNum=FilNum.toString();
if(FilNum.length < 2){
      FilNum = '0' + FilNum;
}

window.location.href = mainpa+FilNum+restpa;

}