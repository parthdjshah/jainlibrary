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
        '</p><p>In HTML version, you can select any text or just click on the page of book to use ChatGPT AI to ask any qustions. ' +
        'Please refer <a href="http://parthfinvest.in/jain/AIhelper.html" rel="noopener noreferrer" target="_blank">here</a> for further details. You can use Google translate to translate it to language you want and even convert to audio format as well with Text2Speech Softwares.</p><p>In EPUB version, you can use <a href="https://play.google.com/store/apps/details?id=com.gmail.jxlab.app.reasily&pcampaignid=web_share">Reasily Software</a> to view the EPUB file in mobile. It has AI, translate, notes writing, highlighting etc. features as well. Refer <a href="https://youtu.be/fn-9ItuBHeM?si=JULnWKffPTxpPxKH">this video</a> for further help' +
      '</p>' +

      '<p style="text-align:center;"> Feel free to: ' +
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



  /* ---------------- SMART ANNOTATION ---------------- */

  /*
     Smart Annotation
     ----------------
     Uses the Google Sheets API directly from the browser.

     IMPORTANT:
     Set SMART_ANNOTATION_CLIENT_ID to the OAuth 2.0 Web Application
     client ID created in Google Cloud Console.

     The user supplies the Google Sheet URL. The script stores only the
     spreadsheet ID and annotation preference in localStorage.
  */

  function initSmartAnnotations() {

    var CONFIG_KEY = "parthSmartAnnotationConfig";
    var CLIENT_ID = "YOUR_GOOGLE_OAUTH_CLIENT_ID.apps.googleusercontent.com";
    var SCOPES = "https://www.googleapis.com/auth/spreadsheets";
    var DISCOVERY_DOC =
      "https://sheets.googleapis.com/$discovery/rest?version=v4";

    var SHEET_NAME = "Annotations";
    var HEADER = [
      "AnnotationID",
      "PageName",
      "SelectedText",
      "PrefixText",
      "SuffixText",
      "StartPath",
      "StartOffset",
      "EndPath",
      "EndOffset",
      "Style",
      "CreatedAt",
      "UpdatedAt"
    ];

    var config = null;
    var tokenClient = null;
    var googleReady = false;
    var pendingSelection = null;
    var applyingRemoteAnnotations = false;

    function readConfig() {
      try {
        return JSON.parse(localStorage.getItem(CONFIG_KEY) || "null");
      } catch (e) {
        return null;
      }
    }

    function saveConfig(c) {
      localStorage.setItem(CONFIG_KEY, JSON.stringify(c));
      config = c;
    }

    function pageName() {
      var p = location.pathname.split("/").pop();
      return decodeURIComponent(p || "unknown.html");
    }

    function spreadsheetIdFromUrl(url) {
      var m = String(url || "").match(
        /docs\.google\.com\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/
      );
      return m ? m[1] : null;
    }

    function injectStyles() {
      if (document.getElementById("smartAnnotationStyles")) return;

      var s = document.createElement("style");
      s.id = "smartAnnotationStyles";
      s.textContent =
        ".smart-annotation{position:relative;}" +
        ".smart-annotation-blue{background:#b9d9ff;}" +
        ".smart-annotation-yellow{background:#fff59d;}" +
        ".smart-annotation-green{background:#b7e4c7;}" +
        ".smart-annotation-underline{text-decoration:underline;text-decoration-thickness:2px;}" +
        ".smart-annotation-bold{font-weight:700;}" +
        ".smart-annotation-italic{font-style:italic;}" +
        "#smartAnnotationToolbar{" +
          "position:fixed;display:none;z-index:2147483000;" +
          "background:#fff;border:1px solid #bbb;border-radius:10px;" +
          "box-shadow:0 4px 18px rgba(0,0,0,.25);padding:5px;" +
          "white-space:nowrap;" +
        "}" +
        "#smartAnnotationToolbar button{" +
          "border:0;background:#f7f7f7;border-radius:6px;" +
          "min-width:34px;height:34px;margin:2px;cursor:pointer;" +
          "font-size:16px;" +
        "}" +
        "#smartAnnotationToolbar button:hover{background:#e5e5e5;}" +
        "#smartAnnotationDialog{" +
          "position:fixed;inset:0;display:none;align-items:center;justify-content:center;" +
          "z-index:2147482999;background:rgba(0,0,0,.45);" +
        "}" +
        "#smartAnnotationBox{" +
          "background:#fff;color:#222;width:min(520px,calc(100vw - 30px));" +
          "padding:22px;border-radius:12px;box-shadow:0 8px 35px rgba(0,0,0,.35);" +
          "font-family:Arial,sans-serif;" +
        "}" +
        "#smartAnnotationBox h3{margin:0 0 12px;}" +
        "#smartAnnotationBox p{line-height:1.5;}" +
        "#smartAnnotationSheetLink{" +
          "box-sizing:border-box;width:100%;padding:10px;margin:8px 0 14px;" +
          "border:1px solid #aaa;border-radius:6px;" +
        "}" +
        ".smart-annotation-dialog-actions{display:flex;gap:8px;justify-content:flex-end;flex-wrap:wrap;}" +
        ".smart-annotation-dialog-actions button{padding:9px 14px;border-radius:7px;border:1px solid #aaa;cursor:pointer;}" +
        "#smartAnnotationEnable{font-weight:700;}" +
        "#smartAnnotationStatus{" +
          "position:fixed;right:12px;bottom:12px;display:none;" +
          "z-index:2147482998;background:#222;color:#fff;padding:8px 12px;" +
          "border-radius:8px;font:13px Arial,sans-serif;" +
        "}";
      document.head.appendChild(s);
    }

    function createDialog() {
      if (document.getElementById("smartAnnotationDialog")) return;

      var d = document.createElement("div");
      d.id = "smartAnnotationDialog";
      d.className = "book-common-ui";
      d.innerHTML =
        '<div id="smartAnnotationBox">' +
          '<h3>📝 Smart Annotation</h3>' +
          '<p>If you want to enable smart annotation (underline, bold, italic and highlighting) in this book, please provide your own Google Sheet link.</p>' +
          '<p style="font-size:13px;color:#555;">You can use the same Google Sheet for all books on this website. Your annotations are stored in your own Google account.</p>' +
          '<input id="smartAnnotationSheetLink" type="url" placeholder="https://docs.google.com/spreadsheets/d/..." autocomplete="off">' +
          '<div id="smartAnnotationDialogMessage" style="color:#b00020;min-height:20px;"></div>' +
          '<div class="smart-annotation-dialog-actions">' +
            '<button id="smartAnnotationSkip">Skip</button>' +
            '<button id="smartAnnotationEnable">Enable Smart Annotation</button>' +
          '</div>' +
        '</div>';
      document.body.appendChild(d);

      document.getElementById("smartAnnotationSkip").addEventListener("click", function () {
        saveConfig({ enabled: false });
        d.style.display = "none";
      });

      document.getElementById("smartAnnotationEnable").addEventListener("click", function () {
        var url = document.getElementById("smartAnnotationSheetLink").value.trim();
        var id = spreadsheetIdFromUrl(url);
        var msg = document.getElementById("smartAnnotationDialogMessage");

        if (!id) {
          msg.textContent = "Please enter a valid Google Sheets URL.";
          return;
        }

        saveConfig({
          enabled: true,
          spreadsheetId: id,
          sheetName: SHEET_NAME
        });

        d.style.display = "none";
        createSmartAnnotationSettingsButton();
        authorizeGoogle(true);
      });
    }

    function showSetupDialog() {
      createDialog();
      var d = document.getElementById("smartAnnotationDialog");
      var link = document.getElementById("smartAnnotationSheetLink");
      var msg = document.getElementById("smartAnnotationDialogMessage");

      msg.textContent = "";

      if (config && config.spreadsheetId) {
        link.value =
          "https://docs.google.com/spreadsheets/d/" +
          config.spreadsheetId +
          "/edit";
      } else {
        link.value = "";
      }

      d.style.display = "flex";
    }

    function createToolbar() {
      if (document.getElementById("smartAnnotationToolbar")) return;

      var t = document.createElement("div");
      t.id = "smartAnnotationToolbar";
      t.className = "book-common-ui";

      t.innerHTML =
        '<button data-ann="underline" title="Underline">U</button>' +
        '<button data-ann="bold" title="Bold"><b>B</b></button>' +
        '<button data-ann="italic" title="Italic"><i>I</i></button>' +
        '<button data-ann="blue" title="Blue highlight">🟦</button>' +
        '<button data-ann="yellow" title="Yellow highlight">🟨</button>' +
        '<button data-ann="green" title="Green highlight">🟩</button>' +
        '<button data-ann="remove" title="Remove annotation">✕</button>';

      document.body.appendChild(t);

      t.querySelectorAll("[data-ann]").forEach(function (b) {
        b.addEventListener("mousedown", function (e) {
          e.preventDefault();
        });

        b.addEventListener("click", function () {
          var action = this.getAttribute("data-ann");
          hideToolbar();

          if (pendingSelection) {
            applyAnnotation(pendingSelection.range, action);
          }
        });
      });
    }

    function hideToolbar() {
      var t = document.getElementById("smartAnnotationToolbar");
      if (t) t.style.display = "none";
    }

    function showToolbar(range) {
      var t = document.getElementById("smartAnnotationToolbar");
      if (!t) return;

      var r = range.getBoundingClientRect();
      t.style.display = "block";

      var x = Math.max(
        5,
        Math.min(
          r.left,
          window.innerWidth - t.offsetWidth - 5
        )
      );

      var y = r.bottom + 8;

      if (y + t.offsetHeight > window.innerHeight - 5) {
        y = r.top - t.offsetHeight - 8;
      }

      if (y < 5) y = 5;

      t.style.left = x + "px";
      t.style.top = y + "px";
    }

    function getTextNodes(root) {
      var nodes = [];
      var walker = document.createTreeWalker(
        root,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: function (node) {
            if (!node.nodeValue) return NodeFilter.FILTER_REJECT;
            if (
              node.parentElement &&
              node.parentElement.closest(".book-common-ui")
            ) {
              return NodeFilter.FILTER_REJECT;
            }
            return NodeFilter.FILTER_ACCEPT;
          }
        }
      );

      var n;
      while ((n = walker.nextNode())) nodes.push(n);
      return nodes;
    }

    function nodePath(node) {
      if (!node) return "";

      var parts = [];
      var current = node;

      while (
        current &&
        current !== document.body &&
        current.parentNode
      ) {
        var parent = current.parentNode;
        var index = Array.prototype.indexOf.call(
          parent.childNodes,
          current
        );

        parts.unshift(index);
        current = parent;
      }

      return parts.join("/");
    }

    function nodeFromPath(path) {
      if (!path) return null;

      var parts = path.split("/").map(function (x) {
        return parseInt(x, 10);
      });

      var node = document.body;

      for (var i = 0; i < parts.length; i++) {
        if (!node || !node.childNodes) return null;
        node = node.childNodes[parts[i]];
      }

      return node;
    }

    function selectedPrefixSuffix(range) {
      var full = document.body.innerText || "";
      var text = range.toString();

      var pos = full.indexOf(text);

      if (pos < 0) {
        return { prefix: "", suffix: "" };
      }

      return {
        prefix: full.substring(Math.max(0, pos - 80), pos),
        suffix: full.substring(
          pos + text.length,
          pos + text.length + 80
        )
      };
    }

    function makeAnnotation(range, style) {
      var text = range.toString();

      if (!text.trim()) return null;

      var ps = selectedPrefixSuffix(range);

      return {
        AnnotationID:
          "ann-" +
          Date.now().toString(36) +
          "-" +
          Math.random().toString(36).slice(2, 9),

        PageName: pageName(),
        SelectedText: text,
        PrefixText: ps.prefix,
        SuffixText: ps.suffix,

        StartPath: nodePath(range.startContainer),
        StartOffset: range.startOffset,
        EndPath: nodePath(range.endContainer),
        EndOffset: range.endOffset,

        Style: style,
        CreatedAt: new Date().toISOString(),
        UpdatedAt: new Date().toISOString()
      };
    }

    function styleClasses(style) {
      return String(style || "")
        .split("|")
        .filter(Boolean)
        .map(function (x) {
          return "smart-annotation-" + x;
        })
        .join(" ");
    }

    function wrapRange(range, style) {
      if (range.collapsed) return [];

      var span = document.createElement("span");
      span.className =
        "smart-annotation " + styleClasses(style);
      span.dataset.annotationStyle = style;

      try {
        var fragment = range.extractContents();
        span.appendChild(fragment);
        range.insertNode(span);
      } catch (e) {
        console.warn("Smart Annotation: unable to wrap selection.", e);
        return [];
      }

      return [span];
    }

    function unwrapAnnotationElement(el) {
      if (!el || !el.parentNode) return;

      var parent = el.parentNode;

      while (el.firstChild) {
        parent.insertBefore(el.firstChild, el);
      }

      parent.removeChild(el);
      parent.normalize();
    }

    function removeAnnotationsFromRange(range) {
      var spans = Array.prototype.slice.call(
        document.querySelectorAll(".smart-annotation")
      );

      spans.forEach(function (span) {
        try {
          if (range.intersectsNode(span)) {
            unwrapAnnotationElement(span);
          }
        } catch (e) {}
      });
    }

    function applyAnnotation(range, action) {
      if (!range || range.collapsed) return;

      var annotation = makeAnnotation(range, action);

      if (!annotation) return;

      if (action === "remove") {
        var ids = [];

        document.querySelectorAll(".smart-annotation").forEach(function (span) {
          try {
            if (range.intersectsNode(span)) {
              if (span.dataset.annotationId) {
                ids.push(span.dataset.annotationId);
              }
              unwrapAnnotationElement(span);
            }
          } catch (e) {}
        });

        if (config && config.enabled && ids.length) {
          ids.forEach(deleteAnnotationById);
        }

        window.getSelection().removeAllRanges();
        return;
      }

      var spans = wrapRange(range, action);

      if (spans.length) {
        /*
          Keep the annotation ID on the DOM element so a later "remove"
          operation can remove the corresponding spreadsheet row.
        */
        spans.forEach(function (span) {
          span.dataset.annotationId = annotation.AnnotationID;
        });
      }

      if (config && config.enabled) {
        saveAnnotation(annotation);
      }

      window.getSelection().removeAllRanges();
    }

    function ensureGoogleLibraries(callback) {
      if (
        window.gapi &&
        window.google &&
        window.google.accounts &&
        window.google.accounts.oauth2
      ) {
        loadGapiClient(callback);
        return;
      }

      var pending = window.__smartAnnotationGoogleCallbacks =
        window.__smartAnnotationGoogleCallbacks || [];

      pending.push(callback);

      if (!document.getElementById("smartGapiScript")) {
        var gapiScript = document.createElement("script");
        gapiScript.id = "smartGapiScript";
        gapiScript.src = "https://apis.google.com/js/api.js";
        gapiScript.async = true;
        gapiScript.onload = function () {
          loadGapiClient(function () {
            runGoogleCallbacks();
          });
        };
        document.head.appendChild(gapiScript);
      }

      if (!document.getElementById("smartGisScript")) {
        var gisScript = document.createElement("script");
        gisScript.id = "smartGisScript";
        gisScript.src = "https://accounts.google.com/gsi/client";
        gisScript.async = true;
        gisScript.onload = function () {
          runGoogleCallbacks();
        };
        document.head.appendChild(gisScript);
      }
    }

    function runGoogleCallbacks() {
      if (
        !window.gapi ||
        !window.google ||
        !window.google.accounts ||
        !window.google.accounts.oauth2
      ) return;

      loadGapiClient(function () {
        var list =
          window.__smartAnnotationGoogleCallbacks || [];

        window.__smartAnnotationGoogleCallbacks = [];

        list.forEach(function (cb) {
          try { cb(); } catch (e) {}
        });
      });
    }

    function loadGapiClient(callback) {
      if (googleReady) {
        callback();
        return;
      }

      if (!window.gapi) return;

      gapi.load("client", function () {
        gapi.client.init({
          discoveryDocs: [DISCOVERY_DOC]
        }).then(function () {
          googleReady = true;

          if (!tokenClient) {
            tokenClient =
              google.accounts.oauth2.initTokenClient({
                client_id: CLIENT_ID,
                scope: SCOPES,
                callback: ""
              });
          }

          callback();
        }).catch(function (err) {
          console.error("Smart Annotation Google API init error", err);
        });
      });
    }

    function authorizeGoogle(afterAuthorize) {
      if (
        !CLIENT_ID ||
        CLIENT_ID.indexOf("YOUR_GOOGLE") === 0
      ) {
        alert(
          "Smart Annotation needs the Google OAuth Client ID in book-common.js. " +
          "Replace YOUR_GOOGLE_OAUTH_CLIENT_ID.apps.googleusercontent.com first."
        );
        return;
      }

      ensureGoogleLibraries(function () {
        if (!tokenClient) {
          alert("Google authorization is not ready yet.");
          return;
        }

        tokenClient.callback = function (response) {
          if (response.error) {
            console.error(response);
            alert("Google authorization was not completed.");
            return;
          }

          gapi.client.setToken(response);

          /*
             Whether this authorization was triggered by first-time setup
             or by an already-configured book, we need to initialize/load
             the annotation sheet after authorization.
          */
          initializeAnnotationSheet();
        };

        var existingToken =
          gapi.client.getToken && gapi.client.getToken();

        tokenClient.requestAccessToken({
          prompt: existingToken ? "" : "consent"
        });
      });
    }

    function apiRequest(method, url, body) {
      var token =
        gapi.client.getToken &&
        gapi.client.getToken();

      if (!token || !token.access_token) {
        return Promise.reject(
          new Error("Google authorization required.")
        );
      }

      return fetch(url, {
        method: method,
        headers: {
          Authorization: "Bearer " + token.access_token,
          "Content-Type": "application/json"
        },
        body: body ? JSON.stringify(body) : undefined
      }).then(function (r) {
        if (!r.ok) {
          return r.text().then(function (txt) {
            throw new Error(txt || ("HTTP " + r.status));
          });
        }
        return r.json();
      });
    }

    function sheetApi() {
      return gapi.client.sheets.spreadsheets;
    }

    function initializeAnnotationSheet() {
      if (!config || !config.spreadsheetId) return;

      /*
        The batchUpdate delete operation needs the numeric sheet/tab ID,
        not merely the tab name.
      */
      gapi.client.sheets.spreadsheets.get({
        spreadsheetId: config.spreadsheetId
      }).then(function (metaResponse) {
        var sheets =
          metaResponse.result &&
          metaResponse.result.sheets || [];

        var found = null;

        for (var i = 0; i < sheets.length; i++) {
          var props = sheets[i].properties;
          if (props && props.title === SHEET_NAME) {
            found = props;
            break;
          }
        }

        if (!found) {
          return gapi.client.sheets.spreadsheets.batchUpdate({
            spreadsheetId: config.spreadsheetId,
            resource: {
              requests: [{
                addSheet: {
                  properties: {
                    title: SHEET_NAME
                  }
                }
              }]
            }
          }).then(function (created) {
            var added =
              created.result &&
              created.result.replies &&
              created.result.replies[0] &&
              created.result.replies[0].addSheet;

            window.__smartAnnotationSheetId =
              added &&
              added.properties &&
              added.properties.sheetId;

            return true;
          });
        }

        window.__smartAnnotationSheetId = found.sheetId;
        return false;
      }).then(function (createdSheet) {
        return gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: config.spreadsheetId,
          range: SHEET_NAME + "!A1:L1"
        });
      }).then(function (response) {
        var values =
          response.result &&
          response.result.values;

        if (
          values &&
          values.length &&
          values[0].length
        ) {
          loadAnnotations();
          return;
        }

        return gapi.client.sheets.spreadsheets.values.update({
          spreadsheetId: config.spreadsheetId,
          range: SHEET_NAME + "!A1:L1",
          valueInputOption: "RAW",
          resource: { values: [HEADER] }
        }).then(function () {
          loadAnnotations();
        });
      }).catch(function (err) {
        console.error("Smart Annotation sheet error", err);
        alert(
          "Could not access the Google Sheet. Please check that the link is correct and that you authorized Google Sheets access."
        );
      });
    }

    function loadAnnotations() {
      if (!config || !config.spreadsheetId) return;

      showStatus("Loading annotations…");

      gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: config.spreadsheetId,
        range: SHEET_NAME + "!A2:L"
      }).then(function (response) {
        var rows =
          response.result &&
          response.result.values || [];

        var annotations = rows
          .map(rowToAnnotation)
          .filter(function (a) {
            return a && a.PageName === pageName();
          });

        applyingRemoteAnnotations = true;

        annotations.forEach(function (a) {
          restoreAnnotation(a);
        });

        applyingRemoteAnnotations = false;

        showStatus(
          annotations.length +
          " annotation" +
          (annotations.length === 1 ? "" : "s") +
          " loaded"
        );
      }).catch(function (err) {
        applyingRemoteAnnotations = false;
        console.error("Smart Annotation load error", err);
        showStatus("Could not load annotations");
      });
    }

    function rowToAnnotation(row) {
      if (!row || !row[0]) return null;

      return {
        AnnotationID: row[0] || "",
        PageName: row[1] || "",
        SelectedText: row[2] || "",
        PrefixText: row[3] || "",
        SuffixText: row[4] || "",
        StartPath: row[5] || "",
        StartOffset: Number(row[6] || 0),
        EndPath: row[7] || "",
        EndOffset: Number(row[8] || 0),
        Style: row[9] || "",
        CreatedAt: row[10] || "",
        UpdatedAt: row[11] || ""
      };
    }

    function findTextFallback(annotation) {
      var text = annotation.SelectedText;
      if (!text) return null;

      var nodes = getTextNodes(document.body);

      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        var p = n.nodeValue.indexOf(text);

        if (p >= 0) {
          var r = document.createRange();
          r.setStart(n, p);
          r.setEnd(n, p + text.length);
          return r;
        }
      }

      return null;
    }

    function restoreAnnotation(annotation) {
      var start = nodeFromPath(annotation.StartPath);
      var end = nodeFromPath(annotation.EndPath);
      var range = null;

      if (start && end) {
        try {
          range = document.createRange();
          range.setStart(
            start,
            Math.min(
              annotation.StartOffset,
              start.nodeType === 3
                ? start.nodeValue.length
                : start.childNodes.length
            )
          );
          range.setEnd(
            end,
            Math.min(
              annotation.EndOffset,
              end.nodeType === 3
                ? end.nodeValue.length
                : end.childNodes.length
            )
          );

          if (range.toString() !== annotation.SelectedText) {
            range = null;
          }
        } catch (e) {
          range = null;
        }
      }

      if (!range) {
        range = findTextFallback(annotation);
      }

      if (!range || !range.toString().trim()) return;

      var restored = wrapRange(range, annotation.Style);

      restored.forEach(function (span) {
        span.dataset.annotationId = annotation.AnnotationID;
      });
    }

    function annotationRows() {
      return [
        "AnnotationID",
        "PageName",
        "SelectedText",
        "PrefixText",
        "SuffixText",
        "StartPath",
        "StartOffset",
        "EndPath",
        "EndOffset",
        "Style",
        "CreatedAt",
        "UpdatedAt"
      ];
    }

    function annotationToRow(a) {
      return [
        a.AnnotationID,
        a.PageName,
        a.SelectedText,
        a.PrefixText,
        a.SuffixText,
        a.StartPath,
        a.StartOffset,
        a.EndPath,
        a.EndOffset,
        a.Style,
        a.CreatedAt,
        a.UpdatedAt
      ];
    }

    function findAnnotationRow(annotationId) {
      return gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: config.spreadsheetId,
        range: SHEET_NAME + "!A2:L"
      }).then(function (response) {
        var rows =
          response.result &&
          response.result.values || [];

        for (var i = 0; i < rows.length; i++) {
          if (String(rows[i][0]) === String(annotationId)) {
            return i + 2;
          }
        }

        return null;
      });
    }

    function saveAnnotation(annotation) {
      if (applyingRemoteAnnotations) return;
      if (!config || !config.enabled) return;

      if (!googleReady || !gapi.client.getToken()) {
        authorizeGoogle(false);
        return;
      }

      showStatus("Saving annotation…");

      findAnnotationRow(annotation.AnnotationID)
        .then(function (rowNumber) {
          if (rowNumber) {
            return gapi.client.sheets.spreadsheets.values.update({
              spreadsheetId: config.spreadsheetId,
              range:
                SHEET_NAME + "!A" +
                rowNumber + ":L" + rowNumber,
              valueInputOption: "RAW",
              resource: {
                values: [annotationToRow(annotation)]
              }
            });
          }

          return gapi.client.sheets.spreadsheets.values.append({
            spreadsheetId: config.spreadsheetId,
            range: SHEET_NAME + "!A:L",
            valueInputOption: "RAW",
            insertDataOption: "INSERT_ROWS",
            resource: {
              values: [annotationToRow(annotation)]
            }
          });
        })
        .then(function () {
          showStatus("Annotation saved");
        })
        .catch(function (err) {
          console.error("Smart Annotation save error", err);
          showStatus("Could not save annotation");
        });
    }

    function deleteAnnotationById(annotationId) {
      if (!config || !config.spreadsheetId || !annotationId) return;

      if (!googleReady || !gapi.client.getToken()) {
        return;
      }

      showStatus("Removing annotation…");

      findAnnotationRow(annotationId)
        .then(function (rowNumber) {
          if (!rowNumber) return null;

          /*
             Delete the whole spreadsheet row. The Sheets API batchUpdate
             removes the row without disturbing the other annotations.
          */
          return gapi.client.sheets.spreadsheets.batchUpdate({
            spreadsheetId: config.spreadsheetId,
            resource: {
              requests: [{
                deleteDimension: {
                  range: {
                    sheetId: window.__smartAnnotationSheetId,
                    dimension: "ROWS",
                    startIndex: rowNumber - 1,
                    endIndex: rowNumber
                  }
                }
              }]
            }
          });
        })
        .then(function () {
          showStatus("Annotation removed");
        })
        .catch(function (err) {
          console.error("Smart Annotation delete error", err);
          showStatus("Could not remove annotation");
        });
    }

    function showStatus(text) {
      var s = document.getElementById("smartAnnotationStatus");

      if (!s) {
        s = document.createElement("div");
        s.id = "smartAnnotationStatus";
        s.className = "book-common-ui";
        document.body.appendChild(s);
      }

      s.textContent = text;
      s.style.display = "block";

      clearTimeout(s._hideTimer);

      s._hideTimer = setTimeout(function () {
        s.style.display = "none";
      }, 2200);
    }

    function createSmartAnnotationSettingsButton() {
      if (document.getElementById("smartAnnotationSettingsButton")) return;

      var b = document.createElement("button");
      b.id = "smartAnnotationSettingsButton";
      b.className = "book-common-ui";
      b.type = "button";
      b.title = "Smart Annotation settings";
      b.setAttribute("aria-label", "Smart Annotation settings");
      b.textContent = "📝";
      b.style.cssText =
        "position:fixed;right:12px;bottom:62px;z-index:2147482997;" +
        "width:42px;height:42px;border:1px solid #aaa;border-radius:50%;" +
        "background:#fff;cursor:pointer;font-size:20px;" +
        "box-shadow:0 2px 8px rgba(0,0,0,.2);";

      b.addEventListener("click", function () {
        createDialog();
        var d = document.getElementById("smartAnnotationDialog");
        var link = document.getElementById("smartAnnotationSheetLink");
        var msg = document.getElementById("smartAnnotationDialogMessage");

        msg.textContent = "";
        link.value =
          config && config.spreadsheetId
            ? "https://docs.google.com/spreadsheets/d/" +
              config.spreadsheetId + "/edit"
            : "";

        d.style.display = "flex";
      });

      document.body.appendChild(b);
    }

    function showSelectionToolbar() {
      if (!config || !config.enabled) return;

      var s = window.getSelection();

      if (!s || s.rangeCount === 0 || !s.toString().trim()) {
        hideToolbar();
        return;
      }

      var range = s.getRangeAt(0);

      if (
        range.commonAncestorContainer &&
        range.commonAncestorContainer.parentElement &&
        range.commonAncestorContainer.parentElement.closest &&
        range.commonAncestorContainer.parentElement.closest(
          ".book-common-ui"
        )
      ) {
        hideToolbar();
        return;
      }

      pendingSelection = {
        range: range.cloneRange()
      };

      showToolbar(range);
    }

    document.addEventListener("selectionchange", function () {
      setTimeout(showSelectionToolbar, 80);
    });

    document.addEventListener("mouseup", function (e) {
      if (
        e.target.closest &&
        e.target.closest(
          "#smartAnnotationToolbar,#smartAnnotationDialog"
        )
      ) return;

      setTimeout(showSelectionToolbar, 30);
    });

    document.addEventListener("touchend", function () {
      setTimeout(showSelectionToolbar, 100);
    });

    document.addEventListener("scroll", hideToolbar, {
      passive: true
    });

    injectStyles();
    createToolbar();

    config = readConfig();

    if (config && config.enabled) {
      createSmartAnnotationSettingsButton();
    }

    if (!config) {
      createDialog();

      /*
        Give the page a moment to finish rendering before displaying
        the first-use dialog.
      */
      setTimeout(function () {
        showSetupDialog();
      }, 700);

      return;
    }

    if (!config.enabled) return;

    /*
      Google authentication is deliberately requested only after the
      user has opted into Smart Annotation.
    */
    authorizeGoogle(false);
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
    initSmartAnnotations();
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
