/* book-common.js
   Common UI and behaviour for all Jain book HTML pages.
*/

(function () {
  "use strict";

  function createCommonUI() {

    if (!document.getElementById("myBtn")) {
      var topButton = document.createElement("button");
      topButton.id = "myBtn";
      topButton.title = "Go to top";
      topButton.textContent = "Top";
      topButton.className = "book-common-ui";
      document.body.appendChild(topButton);
    }

    if (!document.querySelector(".zoom-controls")) {
      var zoom = document.createElement("div");
      zoom.className = "zoom-controls book-common-ui";
      zoom.innerHTML =
        '<button id="zoomIn">A+</button>' +
        '<button id="zoomOut">A−</button>';
      document.body.appendChild(zoom);
    }

    if (!document.getElementById("aiBookButton")) {
      var aiButton = document.createElement("button");
      aiButton.id = "aiBookButton";
      aiButton.title = "Ask AI about this book";
      aiButton.setAttribute("aria-label", "Ask AI about this book");
      aiButton.innerHTML = "&#129302;";
      aiButton.className = "book-common-ui";
      document.body.appendChild(aiButton);
    }

    if (!document.getElementById("aiSelectMenu")) {
      var menu = document.createElement("div");
      menu.id = "aiSelectMenu";
      menu.className = "book-common-ui";
      menu.innerHTML =
        '<div class="ai-menu-title">&#129302; Ask AI about selection</div>' +
        '<button data-ai-action="Explain">&#128998; Explain</button>' +
        '<button data-ai-action="Give example">&#128161; Give example</button>' +
        '<button data-ai-action="Analyze">&#128269; Analyze</button>' +
        '<button data-ai-action="Why?">&#10067; Why?</button>' +
        '<button data-ai-action="Challenge the author">&#9878; Challenge the author</button>' +
        '<button data-ai-action="Connect with earlier ideas">&#128279; Connect with earlier ideas</button>' +
        '<button data-ai-action="Summarize">&#128221; Summarize</button>' +
        '<button data-ai-action="Test me">&#129504; Test me</button>' +
        '<button data-ai-action="Ask my own question">&#128172; Ask my own question</button>';
      document.body.appendChild(menu);
    }

    if (!document.getElementById("aiAskDialog")) {
      var dialog = document.createElement("div");
      dialog.id = "aiAskDialog";
      dialog.className = "book-common-ui";
      dialog.innerHTML =
        '<div id="aiAskBox">' +
          '<h3>&#129302; Ask AI about this book</h3>' +
          '<div id="aiSelectedPreview"></div>' +
          '<textarea id="aiQuestion" placeholder="Type your question..."></textarea>' +
          '<div class="ai-actions">' +
            '<button id="aiOpenChatGPT">Open in ChatGPT</button>' +
            '<button id="aiCancel">Cancel</button>' +
          '</div>' +
        '</div>';
      document.body.appendChild(dialog);
    }
  }


  /* ---------------- BOOK DOWNLOAD / INFO LINKS ---------------- */

  function initBookLinks() {
    /*
      The HTML filename is taken from the current page URL.
      Example:
        .../1-Acharanga Sutra Part 1.html
      becomes:
        http://parthfinvest.in/jain/1-Acharanga Sutra Part 1.epub
        http://parthfinvest.in/jain/1-Acharanga Sutra Part 1.pdf
    */

    if (document.getElementById("book-common-links")) return;

    var pageName = location.pathname.split("/").pop();

    if (!pageName) return;

    var htmlName = decodeURIComponent(pageName);

    /*
      Remove .html / .htm from the current filename.
      The remaining filename is used for EPUB and PDF.
    */
    var baseName = htmlName.replace(/\.(html?|HTML?)$/, "");

    if (!baseName || baseName === htmlName) return;

    var epubUrl =
      "http://parthfinvest.in/jain/EPUB/" +
      encodeURIComponent(baseName) +
      ".epub";

    var pdfUrl =
      "http://parthfinvest.in/jain/PDF/" +
      encodeURIComponent(baseName) +
      ".pdf";

    var container = document.createElement("div");
    container.id = "book-common-links";

    container.innerHTML =
      '<p>' +
        '<a href="' + epubUrl + '"' +
        ' rel="noopener noreferrer" target="_blank">' +
          '<img src="https://st4.depositphotos.com/1024345/41391/v/450/depositphotos_413917200-stock-illustration-vector-purple-icon-epub-file.jpg"' +
          ' style="width:50px;height:60px;" title="EPUB" alt="EPUB"/>' +
          'Link to EPUB File of this Book' +
        '</a>' +
      '</p>' +

      '<p>' +
        '<a href="' + pdfUrl + '"' +
        ' rel="noopener noreferrer" target="_blank">' +
          '<img src="https://img.icons8.com/office/80/000000/export-pdf.png"' +
          ' style="width:50px;height:60px;" title="PDF" alt="PDF"/>' +
          'Link to Original PDF File of this Book' +
        '</a>' +
      '</p>' +

      '<p class="block_2">' +
        'This book have been converted by Parth Shah from Original PDF file to its Unicode reflowable html format with manual reformatting. ' +
        'The same is converted to EPUB for easy viewing. All rights of original book are owned by the original publisher and this is an attempt to provide easy viewable copy for Gyan Seva. ' +
        'You can use reference to this book to AI to ask any qustions, translate it to language you want and even convert to audio format as well. ' +
        'Please refer <a href="http://parthfinvest.in/jain/AIhelper.html" rel="noopener noreferrer" target="_blank">here</a> for further details:' +
      '</p>' +

      '<p style="text-align:center;">' +
        '<a href="https://forms.gle/fedKyRf67kqVpwDE7"' +
        ' target="_blank" rel="noopener">📝 Give Feedback / Report an Error</a>' +
      '</p>';

    /*
      Insert as the first element inside <body>.
    */
    document.body.insertBefore(
      container,
      document.body.firstChild
    );
  }


  /* ---------------- TOP BUTTON ---------------- */

  function initTopButton() {
    var mybutton = document.getElementById("myBtn");
    if (!mybutton) return;

    function scrollFunction() {
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        mybutton.style.display = "block";
      } else {
        mybutton.style.display = "none";
      }
    }

    window.addEventListener("scroll", scrollFunction, { passive: true });

    mybutton.addEventListener("click", function () {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    });

    scrollFunction();
  }


  /* ---------------- ZOOM ---------------- */

  function initZoom() {
    var zoomIn = document.getElementById("zoomIn");
    var zoomOut = document.getElementById("zoomOut");

    if (!zoomIn || !zoomOut) return;

    var zoomLevel = 1;

    function applyZoom() {
      document.body.querySelectorAll("*").forEach(function (el) {

        /* Never resize the common UI itself. */
        if (el.closest(".book-common-ui")) return;

        if (!el.dataset.originalFontSize) {
          var size = parseFloat(getComputedStyle(el).fontSize);
          if (!isNaN(size)) {
            el.dataset.originalFontSize = size;
          }
        }

        var originalSize = parseFloat(el.dataset.originalFontSize);

        if (!isNaN(originalSize)) {
          el.style.fontSize =
            (originalSize * zoomLevel) + "px";
        }
      });
    }

    zoomIn.addEventListener("click", function () {
      zoomLevel = Math.min(2, zoomLevel + 0.1);
      applyZoom();
    });

    zoomOut.addEventListener("click", function () {
      zoomLevel = Math.max(0.6, zoomLevel - 0.1);
      applyZoom();
    });
  }


  /* ---------------- AI ---------------- */

  function initAI() {

    var selectedText = "";
    var selectedContext = "";

    function getSelectionText() {
      var s = window.getSelection ? window.getSelection() : null;
      return s ? s.toString().trim() : "";
    }

    function getSectionContext() {
      var s = window.getSelection();

      if (!s || s.rangeCount === 0) return "";

      var node = s.anchorNode;

      if (node && node.nodeType === 3) {
        node = node.parentElement;
      }

      if (!node) return "";

      var headings = Array.prototype.slice.call(
        document.querySelectorAll('[id^="index"]')
      ).filter(function (el) {
        return /^index[0-9]+$/.test(el.id);
      });

      var current = null;

      for (var i = 0; i < headings.length; i++) {
        var el = headings[i];
        var pos = el.compareDocumentPosition(node);

        if (pos & Node.DOCUMENT_POSITION_FOLLOWING) {
          current = el;
        }
      }

      return current ? current.textContent.trim() : "";
    }

    function makePrompt(action, customQuestion) {

      var book =
        document.title ||
        location.pathname.split("/").pop();

      var bookUrl = window.location.href;

      var q =
        customQuestion ||
        action ||
        "Explain";

      var prompt =
        'I am reading the book "' + book + '".\n\n' +
        'The book is available at this URL:\n' +
        bookUrl + '\n\n' +
        'Please answer based primarily on this book and the selected passage below. ' +
        'Do not invent information that is not supported by the passage or book. ' +
        'If the passage is ambiguous, say so.\n\n';

      if (selectedContext) {
        prompt +=
          "Section/context: " +
          selectedContext +
          "\n\n";
      }

      if (selectedText) {
        prompt +=
          "Selected passage:\n" +
          selectedText +
          "\n\n";
      }

      prompt +=
        "Task: " + q + "\n\n";

      prompt +=
        "Use the language of the selected passage when practical. " +
        "For religious or philosophical material, distinguish what the text says " +
        "from explanation or interpretation.";

      return prompt;
    }

    function openDialog(text, action) {

      selectedText = text || "";
      selectedContext = getSectionContext();

      document.getElementById("aiSelectedPreview").textContent =
        selectedText ||
        "No passage selected. You can ask a question about the book.";

      var question =
        document.getElementById("aiQuestion");

      question.value =
        action === "Ask my own question"
          ? ""
          : (action || "");

      document.getElementById("aiAskDialog").style.display =
        "flex";

      setTimeout(function () {
        question.focus();
      }, 50);
    }

    function closeDialog() {
      document.getElementById("aiAskDialog").style.display =
        "none";
    }

    function showSelectionMenu() {

      var text = getSelectionText();
      var menu = document.getElementById("aiSelectMenu");

      if (!text) {
        menu.style.display = "none";
        return;
      }

      selectedText = text;
      selectedContext = getSectionContext();

      var s = window.getSelection();

      if (!s || s.rangeCount === 0) return;

      var range = s.getRangeAt(0);
      var r = range.getBoundingClientRect();

      menu.style.display = "block";

      var x = Math.max(
        10,
        Math.min(
          r.left,
          window.innerWidth -
          menu.offsetWidth -
          10
        )
      );

      var y = r.bottom + 8;

      if (
        y + menu.offsetHeight >
        window.innerHeight - 10
      ) {
        y =
          r.top -
          menu.offsetHeight -
          8;
      }

      if (y < 10) y = 10;

      menu.style.left = x + "px";
      menu.style.top = y + "px";
    }

    document.addEventListener(
      "selectionchange",
      function () {
        setTimeout(showSelectionMenu, 100);
      }
    );

    document.addEventListener(
      "mouseup",
      function (e) {

        if (
          e.target.closest &&
          e.target.closest("#aiSelectMenu")
        ) {
          return;
        }

        setTimeout(showSelectionMenu, 20);
      }
    );

    document.addEventListener(
      "touchend",
      function () {
        setTimeout(showSelectionMenu, 80);
      }
    );

    document.addEventListener(
      "scroll",
      function () {
        var menu =
          document.getElementById("aiSelectMenu");

        if (menu) menu.style.display = "none";
      },
      { passive: true }
    );

    document
      .querySelectorAll(
        "#aiSelectMenu [data-ai-action]"
      )
      .forEach(function (btn) {

        btn.addEventListener(
          "click",
          function () {

            var action =
              this.getAttribute("data-ai-action");

            document.getElementById(
              "aiSelectMenu"
            ).style.display = "none";

            openDialog(
              selectedText,
              action
            );
          }
        );
      });

    document
      .getElementById("aiBookButton")
      .addEventListener(
        "click",
        function () {

          var text =
            getSelectionText();

          openDialog(
            text,
            "Ask my own question"
          );
        }
      );

    document
      .getElementById("aiCancel")
      .addEventListener(
        "click",
        closeDialog
      );

    document
      .getElementById("aiAskDialog")
      .addEventListener(
        "click",
        function (e) {

          if (e.target === this) {
            closeDialog();
          }
        }
      );

    document
      .getElementById("aiOpenChatGPT")
      .addEventListener(
        "click",
        function () {

          var q =
            document
              .getElementById("aiQuestion")
              .value
              .trim();

          if (!q) {
            q =
              "Explain the selected passage.";
          }

          var prompt =
            makePrompt("", q);

          window.open(
            "https://chatgpt.com/?q=" +
            encodeURIComponent(prompt),
            "_blank",
            "noopener"
          );
        }
      );
  }


  /* ---------------- GOOGLE ANALYTICS ---------------- */

  function initAnalytics() {

    var gaId = "G-B2Q39Z3BC9";

    var script = document.createElement("script");
    script.async = true;
    script.src =
      "https://www.googletagmanager.com/gtag/js?id=" +
      gaId;

    document.head.appendChild(script);

    window.dataLayer =
      window.dataLayer || [];

    window.gtag = function () {
      window.dataLayer.push(arguments);
    };

    window.gtag(
      "js",
      new Date()
    );

    window.gtag(
      "config",
      gaId
    );
  }


  /* ---------------- INITIALIZE ---------------- */

  function init() {
    initBookLinks();
    createCommonUI();
    initTopButton();
    initZoom();
    initAI();
    initAnalytics();
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      init
    );
  } else {
    init();
  }

})();
