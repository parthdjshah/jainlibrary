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

    /*
      Smart Annotation - production version
      --------------------------------------
      1. First visit: optional setup dialog.
      2. User chooses a Google Sheet through Google Picker.
      3. The selected Sheet ID is stored in localStorage for this site.
      4. The same Sheet is reused automatically on every book.
      5. "Not now" is remembered; setup is not shown again automatically.
      6. 🔎 opens a searchable annotation viewer for the current book.
      7. 📝 opens settings and allows changing the selected Sheet.

      IMPORTANT: Put your Google Cloud Browser API key in PICKER_API_KEY.
      The OAuth client ID below is the client shown in your Google Cloud
      project. Client IDs are not secrets; the API key should be restricted
      to your website and the required Google APIs.
    */

    var CONFIG_KEY = "parthSmartAnnotationConfig";
    var CLIENT_ID = "1014387999684-i3il5dt1gu0jo2h53a8jeldeib85rlmg.apps.googleusercontent.com";
    var PICKER_API_KEY = "AIzaSyBAXkic0VuCBHQXCkFZsnOSVe3OCWCr_5A";
    var GOOGLE_APP_ID = "1014387999684";
    var SCOPES = "https://www.googleapis.com/auth/drive.file";
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
    var pickerReady = false;
    var googleLibrariesLoading = false;
    var googleLibraryCallbacks = [];
    var pendingSelection = null;
    var applyingRemoteAnnotations = false;
    var currentPageAnnotations = [];
    var currentAnnotationIndex = -1;

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

    function pageDisplayName() {
      return pageName().replace(/\.html?$/i, "");
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
        ".smart-annotation-focus{outline:3px solid #ff9800;outline-offset:2px;border-radius:2px;}" +
        "#smartAnnotationToolbar{position:fixed;display:none;z-index:2147483000;background:#fff;border:1px solid #bbb;border-radius:10px;box-shadow:0 4px 18px rgba(0,0,0,.25);padding:5px;white-space:nowrap;}" +
        "#smartAnnotationToolbar button{border:0;background:#f7f7f7;border-radius:6px;min-width:34px;height:34px;margin:2px;cursor:pointer;font-size:16px;}" +
        "#smartAnnotationToolbar button:hover{background:#e5e5e5;}" +
        "#smartAnnotationStatus{position:fixed;right:12px;bottom:12px;display:none;z-index:2147482998;background:#222;color:#fff;padding:8px 12px;border-radius:8px;font:13px Arial,sans-serif;}" +
        ".smartAnnotationFloat{position:fixed;right:12px;z-index:2147482997;width:42px;height:42px;border:1px solid #aaa;border-radius:50%;background:#fff;cursor:pointer;font-size:19px;box-shadow:0 2px 8px rgba(0,0,0,.2);padding:0;}" +
        "#smartAnnotationFindButton{bottom:112px;}" +
        "#smartAnnotationSettingsButton{bottom:62px;}" +
        "#smartAnnotationSetup{position:fixed;inset:0;display:none;align-items:center;justify-content:center;z-index:2147482999;background:rgba(0,0,0,.45);}" +
        "#smartAnnotationSetupBox{background:#fff;color:#222;width:min(540px,calc(100vw - 30px));padding:22px;border-radius:14px;box-shadow:0 8px 35px rgba(0,0,0,.35);font-family:Arial,sans-serif;}" +
        "#smartAnnotationSetupBox h3{margin:0 0 12px;font-size:21px;}" +
        "#smartAnnotationSetupBox p{line-height:1.55;}" +
        ".smartAnnotationActions{display:flex;gap:9px;justify-content:flex-end;flex-wrap:wrap;margin-top:18px;}" +
        ".smartAnnotationActions button{padding:10px 15px;border-radius:8px;border:1px solid #aaa;cursor:pointer;background:#fff;}" +
        ".smartAnnotationPrimary{font-weight:700;}" +
        "#smartAnnotationViewer{position:fixed;inset:0;display:none;align-items:center;justify-content:center;z-index:2147482996;background:rgba(0,0,0,.45);}" +
        "#smartAnnotationViewerBox{background:#fff;color:#222;width:min(720px,calc(100vw - 24px));max-height:min(80vh,760px);display:flex;flex-direction:column;border-radius:14px;box-shadow:0 8px 35px rgba(0,0,0,.35);font-family:Arial,sans-serif;}" +
        "#smartAnnotationViewerHeader{padding:16px 18px;border-bottom:1px solid #ddd;display:flex;align-items:center;gap:10px;}" +
        "#smartAnnotationViewerHeader h3{margin:0;flex:1;font-size:20px;}" +
        "#smartAnnotationSearch{margin:12px 16px;padding:10px;border:1px solid #aaa;border-radius:8px;font-size:15px;}" +
        "#smartAnnotationList{overflow:auto;padding:0 12px 12px;flex:1;}" +
        ".smartAnnotationItem{border:1px solid #ddd;border-radius:9px;margin:8px 4px;padding:10px;cursor:pointer;background:#fff;}" +
        ".smartAnnotationItem:hover{background:#f6f6f6;}" +
        ".smartAnnotationItem.active{border-color:#ff9800;background:#fff8e8;}" +
        ".smartAnnotationItemText{font-size:15px;line-height:1.45;margin-bottom:6px;}" +
        ".smartAnnotationItemMeta{font-size:12px;color:#666;}" +
        "#smartAnnotationViewerFooter{border-top:1px solid #ddd;padding:10px 14px;display:flex;gap:8px;align-items:center;flex-wrap:wrap;}" +
        "#smartAnnotationViewerFooter button{padding:8px 12px;border:1px solid #aaa;border-radius:7px;background:#fff;cursor:pointer;}" +
        "#smartAnnotationCount{font-size:13px;color:#555;margin-right:auto;}" +
        "#smartAnnotationSettingsBox{background:#fff;color:#222;width:min(560px,calc(100vw - 30px));padding:22px;border-radius:14px;box-shadow:0 8px 35px rgba(0,0,0,.35);font-family:Arial,sans-serif;}" +
        "#smartAnnotationSettings{position:fixed;inset:0;display:none;align-items:center;justify-content:center;z-index:2147482999;background:rgba(0,0,0,.45);}" +
        "#smartAnnotationSheetInfo{background:#f7f7f7;border-radius:8px;padding:11px;line-height:1.5;word-break:break-word;}";
      document.head.appendChild(s);
    }

    function createSetupDialog() {
      if (document.getElementById("smartAnnotationSetup")) return;

      var d = document.createElement("div");
      d.id = "smartAnnotationSetup";
      d.className = "book-common-ui";
      d.innerHTML =
        '<div id="smartAnnotationSetupBox">' +
          '<h3>📝 Smart Annotation</h3>' +
          '<p>If you want to enable smart annotation in this book, you can underline, bold, italicise, and highlight selected text.</p>' +
          '<p>Your annotations are saved in a Google Sheet that <strong>you choose</strong>. The same Sheet can be used automatically for all books on this website.</p>' +
          '<p style="font-size:13px;color:#555;">You do not need to register for an account on this website.</p>' +
          '<div id="smartAnnotationSetupMessage" style="color:#b00020;min-height:20px;"></div>' +
          '<div class="smartAnnotationActions">' +
            '<button id="smartAnnotationNotNow">Not now</button>' +
            '<button id="smartAnnotationChoose" class="smartAnnotationPrimary">Choose Google Sheet</button>' +
          '</div>' +
        '</div>';
      document.body.appendChild(d);

      document.getElementById("smartAnnotationNotNow").addEventListener("click", function () {
        saveConfig({ enabled:false, skipped:true });
        d.style.display = "none";
      });

      document.getElementById("smartAnnotationChoose").addEventListener("click", function () {
        chooseGoogleSheet();
      });

      d.addEventListener("click", function (e) {
        if (e.target === d) d.style.display = "none";
      });
    }

    function showFirstUseDialog() {
      createSetupDialog();
      var d = document.getElementById("smartAnnotationSetup");
      var msg = document.getElementById("smartAnnotationSetupMessage");
      if (msg) msg.textContent = "";
      d.style.display = "flex";
    }

    function createFloatingButtons() {
      if (!document.getElementById("smartAnnotationFindButton")) {
        var find = document.createElement("button");
        find.id = "smartAnnotationFindButton";
        find.className = "smartAnnotationFloat book-common-ui";
        find.type = "button";
        find.title = "Find and show my annotations on this page";
        find.setAttribute("aria-label", "Find and show my annotations on this page");
        find.textContent = "🔎";
        find.addEventListener("click", function () {
          openAnnotationViewer();
        });
        document.body.appendChild(find);
      }

      if (!document.getElementById("smartAnnotationSettingsButton")) {
        var settings = document.createElement("button");
        settings.id = "smartAnnotationSettingsButton";
        settings.className = "smartAnnotationFloat book-common-ui";
        settings.type = "button";
        settings.title = "Smart Annotation settings";
        settings.setAttribute("aria-label", "Smart Annotation settings");
        settings.textContent = "📝";
        settings.addEventListener("click", function () {
          openSettings();
        });
        document.body.appendChild(settings);
      }
    }

    function createSettingsDialog() {
      if (document.getElementById("smartAnnotationSettings")) return;

      var d = document.createElement("div");
      d.id = "smartAnnotationSettings";
      d.className = "book-common-ui";
      d.innerHTML =
        '<div id="smartAnnotationSettingsBox">' +
          '<h3 style="margin-top:0;">📝 Smart Annotation Settings</h3>' +
          '<p>Choose the Google Sheet that should store your annotations. This setting is saved in this browser for the website and reused automatically on other books.</p>' +
          '<div id="smartAnnotationSheetInfo">No Google Sheet selected.</div>' +
          '<div id="smartAnnotationSettingsMessage" style="color:#b00020;min-height:20px;margin-top:8px;"></div>' +
          '<div class="smartAnnotationActions">' +
            '<button id="smartAnnotationDisable">Turn off</button>' +
            '<button id="smartAnnotationChange" class="smartAnnotationPrimary">Choose / Change Google Sheet</button>' +
            '<button id="smartAnnotationSettingsClose">Close</button>' +
          '</div>' +
        '</div>';
      document.body.appendChild(d);

      document.getElementById("smartAnnotationSettingsClose").addEventListener("click", function () {
        d.style.display = "none";
      });

      document.getElementById("smartAnnotationChange").addEventListener("click", function () {
        chooseGoogleSheet();
      });

      document.getElementById("smartAnnotationDisable").addEventListener("click", function () {
        saveConfig({ enabled:false, skipped:true });
        d.style.display = "none";
      });

      d.addEventListener("click", function (e) {
        if (e.target === d) d.style.display = "none";
      });
    }

    function updateSettingsDialog() {
      createSettingsDialog();
      var info = document.getElementById("smartAnnotationSheetInfo");
      if (!info) return;

      if (config && config.spreadsheetId) {
        var link = config.spreadsheetUrl ||
          ("https://docs.google.com/spreadsheets/d/" + config.spreadsheetId + "/edit");
        info.innerHTML =
          "<strong>Current Google Sheet:</strong><br>" +
          escapeHtml(config.spreadsheetName || "Selected spreadsheet") +
          '<br><a href="' + escapeHtml(link) + '" target="_blank" rel="noopener">Open Google Sheet</a>';
      } else {
        info.textContent = "No Google Sheet selected.";
      }
    }

    function openSettings() {
      createSettingsDialog();
      updateSettingsDialog();
      document.getElementById("smartAnnotationSettings").style.display = "flex";
    }

    function escapeHtml(value) {
      return String(value == null ? "" : value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
    }

    function createToolbar() {
      if (document.getElementById("smartAnnotationToolbar")) return;

      var t = document.createElement("div");
      t.id = "smartAnnotationToolbar";
      t.className = "book-common-ui";
      t.innerHTML =
        '<button data-smart-style="underline" title="Underline">U</button>' +
        '<button data-smart-style="bold" title="Bold"><strong>B</strong></button>' +
        '<button data-smart-style="italic" title="Italic"><em>I</em></button>' +
        '<button data-smart-style="blue" title="Blue highlight">🔵</button>' +
        '<button data-smart-style="yellow" title="Yellow highlight">🟡</button>' +
        '<button data-smart-style="green" title="Green highlight">🟢</button>' +
        '<button data-smart-style="remove" title="Remove annotation">✕</button>';
      document.body.appendChild(t);

      t.querySelectorAll("[data-smart-style]").forEach(function (btn) {
        btn.addEventListener("mousedown", function (e) { e.preventDefault(); });
        btn.addEventListener("click", function () {
          var style = this.getAttribute("data-smart-style");
          if (!pendingSelection || !pendingSelection.range) return;
          applyAnnotation(pendingSelection.range, style);
          pendingSelection = null;
          hideToolbar();
        });
      });
    }

    function showToolbar(range) {
      var t = document.getElementById("smartAnnotationToolbar");
      if (!t) return;
      var rect = range.getBoundingClientRect();
      var x = rect.left + (rect.width / 2) - 130;
      var y = rect.top - 50;
      if (x < 8) x = 8;
      if (x + 270 > window.innerWidth) x = window.innerWidth - 278;
      if (y < 8) y = rect.bottom + 8;
      t.style.left = x + "px";
      t.style.top = y + "px";
      t.style.display = "block";
    }

    function hideToolbar() {
      var t = document.getElementById("smartAnnotationToolbar");
      if (t) t.style.display = "none";
    }

    function showSelectionToolbar() {
      if (!config || !config.enabled) return;

      var s = window.getSelection();
      if (!s || s.rangeCount === 0 || !s.toString().trim()) {
        hideToolbar();
        return;
      }

      var range = s.getRangeAt(0);
      var node = range.commonAncestorContainer;
      var parent = node && node.nodeType === 1 ? node : node && node.parentElement;
      if (parent && parent.closest && parent.closest(".book-common-ui")) {
        hideToolbar();
        return;
      }

      pendingSelection = { range: range.cloneRange() };
      showToolbar(range);
    }

    document.addEventListener("selectionchange", function () {
      setTimeout(showSelectionToolbar, 80);
    });

    document.addEventListener("mouseup", function (e) {
      if (e.target.closest && e.target.closest(".book-common-ui")) return;
      setTimeout(showSelectionToolbar, 30);
    });

    document.addEventListener("touchend", function () {
      setTimeout(showSelectionToolbar, 100);
    });

    document.addEventListener("scroll", hideToolbar, { passive:true });

    function getTextNodes(root) {
      var result = [];
      var walker = document.createTreeWalker(
        root,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: function (node) {
            if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
            var p = node.parentElement;
            if (p && p.closest && p.closest(".book-common-ui")) return NodeFilter.FILTER_REJECT;
            return NodeFilter.FILTER_ACCEPT;
          }
        }
      );
      var n;
      while ((n = walker.nextNode())) result.push(n);
      return result;
    }

    function nodePath(node) {
      var path = [];
      var n = node;
      while (n && n !== document.body) {
        var parent = n.parentNode;
        if (!parent) break;
        var index = Array.prototype.indexOf.call(parent.childNodes, n);
        path.unshift(index);
        n = parent;
      }
      return path.join("/");
    }

    function nodeFromPath(path) {
      if (!path) return null;
      var parts = String(path).split("/").filter(function (x) { return x !== ""; });
      var n = document.body;
      for (var i = 0; i < parts.length; i++) {
        var idx = Number(parts[i]);
        if (!n || !n.childNodes || !n.childNodes[idx]) return null;
        n = n.childNodes[idx];
      }
      return n;
    }

    function surroundingText(range, count) {
      var all = getTextNodes(document.body);
      var selected = range.toString();
      var startNode = range.startContainer;
      var endNode = range.endContainer;
      var si = all.indexOf(startNode);
      var ei = all.indexOf(endNode);
      var prefix = "";
      var suffix = "";

      if (si >= 0) {
        prefix = all[si].nodeValue.slice(Math.max(0, range.startOffset - count), range.startOffset);
      }
      if (ei >= 0) {
        suffix = all[ei].nodeValue.slice(range.endOffset, range.endOffset + count);
      }
      return { prefix: prefix, suffix: suffix, selected: selected };
    }

    function makeAnnotation(range, style) {
      if (!range || range.collapsed) return null;
      var around = surroundingText(range, 120);
      var now = new Date().toISOString();
      return {
        AnnotationID: "ann-" + Date.now() + "-" + Math.random().toString(36).slice(2, 9),
        PageName: pageName(),
        SelectedText: around.selected,
        PrefixText: around.prefix,
        SuffixText: around.suffix,
        StartPath: nodePath(range.startContainer),
        StartOffset: range.startOffset,
        EndPath: nodePath(range.endContainer),
        EndOffset: range.endOffset,
        Style: style,
        CreatedAt: now,
        UpdatedAt: now
      };
    }

    function styleClasses(style) {
      return String(style || "").split("|").filter(Boolean).map(function (x) {
        return "smart-annotation-" + x;
      }).join(" ");
    }

    function wrapRange(range, style, annotationId) {
      if (!range || range.collapsed) return [];
      var span = document.createElement("span");
      span.className = "smart-annotation " + styleClasses(style);
      span.dataset.annotationStyle = style;
      if (annotationId) span.dataset.annotationId = annotationId;
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
      while (el.firstChild) parent.insertBefore(el.firstChild, el);
      parent.removeChild(el);
      parent.normalize();
    }

    function applyAnnotation(range, action) {
      if (!range || range.collapsed) return;
      if (action === "remove") {
        var ids = [];
        Array.prototype.slice.call(document.querySelectorAll(".smart-annotation")).forEach(function (span) {
          try {
            if (range.intersectsNode(span)) {
              if (span.dataset.annotationId) ids.push(span.dataset.annotationId);
              unwrapAnnotationElement(span);
            }
          } catch (e) {}
        });
        if (config && config.enabled) ids.forEach(deleteAnnotationById);
        window.getSelection().removeAllRanges();
        return;
      }

      var annotation = makeAnnotation(range, action);
      if (!annotation) return;
      var spans = wrapRange(range, action, annotation.AnnotationID);
      if (spans.length && config && config.enabled) saveAnnotation(annotation);
      window.getSelection().removeAllRanges();
    }

    function ensureGoogleLibraries(callback) {
      if (googleReady && pickerReady && tokenClient) {
        callback();
        return;
      }

      googleLibraryCallbacks.push(callback);

      var needGapi = !window.gapi;
      var needGis = !window.google || !window.google.accounts || !window.google.accounts.oauth2;

      if (needGapi && !document.getElementById("smartGapiScript")) {
        var gs = document.createElement("script");
        gs.id = "smartGapiScript";
        gs.src = "https://apis.google.com/js/api.js";
        gs.async = true;
        gs.onload = function () { loadGoogleLibraries(); };
        document.head.appendChild(gs);
      }

      if (needGis && !document.getElementById("smartGisScript")) {
        var gis = document.createElement("script");
        gis.id = "smartGisScript";
        gis.src = "https://accounts.google.com/gsi/client";
        gis.async = true;
        gis.onload = function () { loadGoogleLibraries(); };
        document.head.appendChild(gis);
      }

      loadGoogleLibraries();
    }

    function loadGoogleLibraries() {
      if (googleReady && pickerReady && tokenClient) {
        flushGoogleLibraryCallbacks();
        return;
      }
      if (googleLibrariesLoading) return;
      if (!window.gapi || !window.google || !window.google.accounts || !window.google.accounts.oauth2) return;

      googleLibrariesLoading = true;

      gapi.load("client", function () {
        gapi.client.init({ discoveryDocs:[DISCOVERY_DOC] }).then(function () {
          googleReady = true;
          if (!tokenClient) {
            tokenClient = google.accounts.oauth2.initTokenClient({
              client_id: CLIENT_ID,
              scope: SCOPES,
              callback: ""
            });
          }

          if (google.picker) {
            pickerReady = true;
            googleLibrariesLoading = false;
            flushGoogleLibraryCallbacks();
            return;
          }

          gapi.load("picker", function () {
            pickerReady = !!(window.google && google.picker);
            googleLibrariesLoading = false;
            flushGoogleLibraryCallbacks();
          });
        }).catch(function (err) {
          googleLibrariesLoading = false;
          console.error("Smart Annotation Google API init error", err);
        });
      });
    }

    function flushGoogleLibraryCallbacks() {
      if (!googleReady || !pickerReady || !tokenClient) return;
      var list = googleLibraryCallbacks.slice();
      googleLibraryCallbacks = [];
      list.forEach(function (cb) {
        try { cb(); } catch (e) { console.error(e); }
      });
    }

    function authorizeGoogle(onAuthorized) {
      if (!CLIENT_ID || CLIENT_ID.indexOf("YOUR_GOOGLE") === 0) {
        alert("Smart Annotation needs the Google OAuth Client ID configured in the script.");
        return;
      }
      if (!PICKER_API_KEY || PICKER_API_KEY.indexOf("YOUR_GOOGLE") === 0) {
        alert("Smart Annotation needs the Google Picker Browser API key configured in the script.");
        return;
      }

      ensureGoogleLibraries(function () {
        var existingToken = gapi.client.getToken && gapi.client.getToken();
        tokenClient.callback = function (response) {
          if (response.error) {
            console.error(response);
            alert("Google authorization was not completed.");
            return;
          }
          gapi.client.setToken(response);
          if (typeof onAuthorized === "function") onAuthorized(response);
        };
        tokenClient.requestAccessToken({ prompt: existingToken ? "" : "" });
      });
    }

    function chooseGoogleSheet() {
      authorizeGoogle(function (response) {
        if (!google.picker) {
          alert("Google Picker is not ready yet. Please try again.");
          return;
        }

        var token = gapi.client.getToken();
        var docsView = new google.picker.DocsView(google.picker.ViewId.SPREADSHEETS)
          .setMimeTypes("application/vnd.google-apps.spreadsheet")
          .setIncludeFolders(false);

        var picker = new google.picker.PickerBuilder()
          .setAppId(GOOGLE_APP_ID)
          .setDeveloperKey(PICKER_API_KEY)
          .setOAuthToken(token.access_token)
          .addView(docsView)
          .setTitle("Choose your Smart Annotation Google Sheet")
          .setCallback(function (data) {
            if (data.action === google.picker.Action.PICKED) {
              var doc = data.docs && data.docs[0];
              if (!doc || !doc.id) return;

              saveConfig({
                enabled: true,
                skipped: false,
                spreadsheetId: doc.id,
                spreadsheetName: doc.name || "Google Sheet",
                spreadsheetUrl: doc.url || ("https://docs.google.com/spreadsheets/d/" + doc.id + "/edit"),
                selectedByPicker: true,
                sheetName: SHEET_NAME
              });

              var setup = document.getElementById("smartAnnotationSetup");
              if (setup) setup.style.display = "none";
              var settings = document.getElementById("smartAnnotationSettings");
              if (settings) settings.style.display = "none";
              updateSettingsDialog();
              initializeAnnotationSheet();
            }
          })
          .build();

        picker.setVisible(true);
      });
    }

    function sheetApi() {
      return gapi.client.sheets.spreadsheets;
    }

    function initializeAnnotationSheet() {
      if (!config || !config.spreadsheetId) return;
      var token = gapi.client.getToken && gapi.client.getToken();
      if (!token || !token.access_token) return;

      showStatus("Preparing annotations…");

      sheetApi().get({ spreadsheetId:config.spreadsheetId }).then(function (meta) {
        var sheets = meta.result && meta.result.sheets || [];
        var found = null;
        for (var i = 0; i < sheets.length; i++) {
          if (sheets[i].properties && sheets[i].properties.title === SHEET_NAME) {
            found = sheets[i].properties;
            break;
          }
        }

        if (found) {
          window.__smartAnnotationSheetId = found.sheetId;
          return null;
        }

        return sheetApi().batchUpdate({
          spreadsheetId:config.spreadsheetId,
          resource:{ requests:[{ addSheet:{ properties:{ title:SHEET_NAME } } }] }
        }).then(function (created) {
          var added = created.result && created.result.replies && created.result.replies[0] && created.result.replies[0].addSheet;
          window.__smartAnnotationSheetId = added && added.properties && added.properties.sheetId;
        });
      }).then(function () {
        return gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId:config.spreadsheetId,
          range:SHEET_NAME + "!A1:L1"
        });
      }).then(function (response) {
        var values = response.result && response.result.values;
        if (values && values.length && values[0].length) return;
        return gapi.client.sheets.spreadsheets.values.update({
          spreadsheetId:config.spreadsheetId,
          range:SHEET_NAME + "!A1:L1",
          valueInputOption:"RAW",
          resource:{ values:[HEADER] }
        });
      }).then(function () {
        loadAnnotations();
      }).catch(function (err) {
        console.error("Smart Annotation sheet error", err);
        showStatus("Could not access the selected Google Sheet");
      });
    }

    function loadAnnotations() {
      if (!config || !config.spreadsheetId) return;
      var token = gapi.client.getToken && gapi.client.getToken();
      if (!token || !token.access_token) return;

      showStatus("Loading annotations…");
      gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId:config.spreadsheetId,
        range:SHEET_NAME + "!A2:L"
      }).then(function (response) {
        var rows = response.result && response.result.values || [];
        currentPageAnnotations = rows.map(rowToAnnotation).filter(function (a) {
          return a && a.PageName === pageName();
        });

        applyingRemoteAnnotations = true;
        currentPageAnnotations.forEach(function (a) { restoreAnnotation(a); });
        applyingRemoteAnnotations = false;
        showStatus(currentPageAnnotations.length + " annotation" + (currentPageAnnotations.length === 1 ? "" : "s") + " loaded");
        refreshAnnotationViewer();
      }).catch(function (err) {
        applyingRemoteAnnotations = false;
        console.error("Smart Annotation load error", err);
        showStatus("Could not load annotations");
      });
    }

    function rowToAnnotation(row) {
      if (!row || !row[0]) return null;
      return {
        AnnotationID:row[0] || "",
        PageName:row[1] || "",
        SelectedText:row[2] || "",
        PrefixText:row[3] || "",
        SuffixText:row[4] || "",
        StartPath:row[5] || "",
        StartOffset:Number(row[6] || 0),
        EndPath:row[7] || "",
        EndOffset:Number(row[8] || 0),
        Style:row[9] || "",
        CreatedAt:row[10] || "",
        UpdatedAt:row[11] || ""
      };
    }

    function annotationRows() {
      return currentPageAnnotations || [];
    }

    function saveAnnotation(annotation) {
      if (!config || !config.spreadsheetId || applyingRemoteAnnotations) return;
      var token = gapi.client.getToken && gapi.client.getToken();
      if (!token || !token.access_token) return;

      var row = [
        annotation.AnnotationID,
        annotation.PageName,
        annotation.SelectedText,
        annotation.PrefixText,
        annotation.SuffixText,
        annotation.StartPath,
        annotation.StartOffset,
        annotation.EndPath,
        annotation.EndOffset,
        annotation.Style,
        annotation.CreatedAt,
        annotation.UpdatedAt
      ];

      gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId:config.spreadsheetId,
        range:SHEET_NAME + "!A:L",
        valueInputOption:"RAW",
        insertDataOption:"INSERT_ROWS",
        resource:{ values:[row] }
      }).then(function () {
        currentPageAnnotations.push(annotation);
        refreshAnnotationViewer();
        showStatus("Annotation saved");
      }).catch(function (err) {
        console.error("Smart Annotation save error", err);
        showStatus("Could not save annotation");
      });
    }

    function findAnnotationRow(annotationId) {
      return gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId:config.spreadsheetId,
        range:SHEET_NAME + "!A2:A"
      }).then(function (response) {
        var values = response.result && response.result.values || [];
        for (var i = 0; i < values.length; i++) {
          if (values[i] && values[i][0] === annotationId) return i + 2;
        }
        return null;
      });
    }

    function deleteAnnotationById(annotationId) {
      if (!config || !config.spreadsheetId || !annotationId) return;
      var token = gapi.client.getToken && gapi.client.getToken();
      if (!token || !token.access_token) return;

      findAnnotationRow(annotationId).then(function (rowNumber) {
        if (!rowNumber) return null;
        if (typeof window.__smartAnnotationSheetId !== "number") return null;
        return sheetApi().batchUpdate({
          spreadsheetId:config.spreadsheetId,
          resource:{ requests:[{ deleteDimension:{ range:{ sheetId:window.__smartAnnotationSheetId, dimension:"ROWS", startIndex:rowNumber-1, endIndex:rowNumber } } }] }
        });
      }).then(function () {
        currentPageAnnotations = currentPageAnnotations.filter(function (a) { return a.AnnotationID !== annotationId; });
        refreshAnnotationViewer();
        showStatus("Annotation removed");
      }).catch(function (err) {
        console.error("Smart Annotation delete error", err);
        showStatus("Could not remove annotation");
      });
    }

    function findTextFallback(annotation) {
      var text = annotation.SelectedText;
      if (!text) return null;
      var nodes = getTextNodes(document.body);
      for (var i = 0; i < nodes.length; i++) {
        var p = nodes[i].nodeValue.indexOf(text);
        if (p >= 0) {
          var r = document.createRange();
          r.setStart(nodes[i], p);
          r.setEnd(nodes[i], p + text.length);
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
          range.setStart(start, Math.min(annotation.StartOffset, start.nodeType === 3 ? start.nodeValue.length : start.childNodes.length));
          range.setEnd(end, Math.min(annotation.EndOffset, end.nodeType === 3 ? end.nodeValue.length : end.childNodes.length));
          if (range.toString() !== annotation.SelectedText) range = null;
        } catch (e) { range = null; }
      }

      if (!range) range = findTextFallback(annotation);
      if (!range || !range.toString()) return;

      var spans = wrapRange(range, annotation.Style, annotation.AnnotationID);
      spans.forEach(function (span) { span.dataset.annotationId = annotation.AnnotationID; });
    }

    function ensureViewer() {
      if (document.getElementById("smartAnnotationViewer")) return;

      var d = document.createElement("div");
      d.id = "smartAnnotationViewer";
      d.className = "book-common-ui";
      d.innerHTML =
        '<div id="smartAnnotationViewerBox">' +
          '<div id="smartAnnotationViewerHeader"><h3>🔎 My annotations</h3><button id="smartAnnotationViewerClose">✕</button></div>' +
          '<input id="smartAnnotationSearch" type="search" placeholder="Search annotations on this page..." autocomplete="off">' +
          '<div id="smartAnnotationList"></div>' +
          '<div id="smartAnnotationViewerFooter">' +
            '<span id="smartAnnotationCount">0 annotations</span>' +
            '<button id="smartAnnotationPrev">← Previous</button>' +
            '<button id="smartAnnotationNext">Next →</button>' +
            '<button id="smartAnnotationViewerSettings">📝 Settings</button>' +
          '</div>' +
        '</div>';
      document.body.appendChild(d);

      document.getElementById("smartAnnotationViewerClose").addEventListener("click", function () { d.style.display = "none"; });
      document.getElementById("smartAnnotationSearch").addEventListener("input", refreshAnnotationViewer);
      document.getElementById("smartAnnotationPrev").addEventListener("click", function () { navigateAnnotation(-1); });
      document.getElementById("smartAnnotationNext").addEventListener("click", function () { navigateAnnotation(1); });
      document.getElementById("smartAnnotationViewerSettings").addEventListener("click", function () {
        d.style.display = "none";
        openSettings();
      });
      d.addEventListener("click", function (e) { if (e.target === d) d.style.display = "none"; });
    }

    function openAnnotationViewer() {
      ensureViewer();
      refreshAnnotationViewer();
      document.getElementById("smartAnnotationViewer").style.display = "flex";
    }

    function filteredAnnotations() {
      var q = (document.getElementById("smartAnnotationSearch") || {}).value || "";
      q = q.trim().toLowerCase();
      if (!q) return annotationRows();
      return annotationRows().filter(function (a) {
        return String(a.SelectedText || "").toLowerCase().indexOf(q) >= 0 ||
               String(a.Style || "").toLowerCase().indexOf(q) >= 0;
      });
    }

    function styleLabel(style) {
      return String(style || "").split("|").filter(Boolean).join(", ");
    }

    function refreshAnnotationViewer() {
      var list = document.getElementById("smartAnnotationList");
      if (!list) return;
      var items = filteredAnnotations();
      var count = document.getElementById("smartAnnotationCount");
      if (count) count.textContent = items.length + " annotation" + (items.length === 1 ? "" : "s") + " on this page";

      list.innerHTML = "";
      if (!items.length) {
        list.innerHTML = '<div style="padding:24px;text-align:center;color:#666;">No annotations found on this page.</div>';
        return;
      }

      items.forEach(function (a, idx) {
        var item = document.createElement("div");
        item.className = "smartAnnotationItem";
        item.dataset.annotationId = a.AnnotationID;
        item.innerHTML =
          '<div class="smartAnnotationItemText">' + escapeHtml(a.SelectedText) + '</div>' +
          '<div class="smartAnnotationItemMeta">' + escapeHtml(styleLabel(a.Style)) + (a.CreatedAt ? " • " + escapeHtml(new Date(a.CreatedAt).toLocaleString()) : "") + '</div>';
        item.addEventListener("click", function () {
          showAnnotationOnPage(a);
        });
        list.appendChild(item);
      });
    }

    function showAnnotationOnPage(annotation) {
      var span = null;
      document.querySelectorAll(".smart-annotation").forEach(function (el) {
        if (!span && el.dataset.annotationId === annotation.AnnotationID) span = el;
      });
      if (!span) {
        var range = findTextFallback(annotation);
        if (range) {
          var spans = wrapRange(range, annotation.Style, annotation.AnnotationID);
          span = spans[0];
        }
      }
      if (!span) {
        showStatus("Could not locate this annotation in the page");
        return;
      }

      document.querySelectorAll(".smart-annotation-focus").forEach(function (el) { el.classList.remove("smart-annotation-focus"); });
      span.classList.add("smart-annotation-focus");
      span.scrollIntoView({ behavior:"smooth", block:"center" });
      currentAnnotationIndex = annotationRows().findIndex(function (a) { return a.AnnotationID === annotation.AnnotationID; });

      document.querySelectorAll(".smartAnnotationItem").forEach(function (el) { el.classList.remove("active"); });
      var active = null;
      document.querySelectorAll(".smartAnnotationItem").forEach(function (el) {
        if (!active && el.dataset.annotationId === annotation.AnnotationID) active = el;
      });
      if (active) active.classList.add("active");

      setTimeout(function () { span.classList.remove("smart-annotation-focus"); }, 1800);
    }

    function navigateAnnotation(direction) {
      var items = annotationRows();
      if (!items.length) return;
      var index = currentAnnotationIndex;
      if (index < 0) index = direction > 0 ? -1 : 0;
      index = (index + direction + items.length) % items.length;
      currentAnnotationIndex = index;
      showAnnotationOnPage(items[index]);
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
      clearTimeout(s.__timer);
      s.__timer = setTimeout(function () { s.style.display = "none"; }, 2200);
    }

    injectStyles();
    createToolbar();
    createFloatingButtons();
    createSetupDialog();
    createSettingsDialog();
    ensureViewer();

    config = readConfig();

    /*
      First-ever visit only: show the optional setup dialog.
      If the user selects Not now, skipped=true prevents this from
      appearing automatically on every book.
    */
    if (!config) {
      setTimeout(showFirstUseDialog, 700);
      return;
    }

    updateSettingsDialog();

    if (!config.enabled || !config.spreadsheetId) {
      return;
    }

    /*
      If the browser still contains a configuration created by the previous
      pasted-URL version, require one-time migration through Picker. This is
      necessary because the new drive.file permission is deliberately tied to
      the file selected through Google Picker. After migration, books open
      without any setup question.
    */
    if (!config.selectedByPicker) {
      openSettings();
      var legacyMsg = document.getElementById("smartAnnotationSettingsMessage");
      if (legacyMsg) legacyMsg.textContent = "Please choose this Sheet once through Google Picker to upgrade Smart Annotation permissions.";
      return;
    }

    /* Existing production configuration: no setup question. */
    authorizeGoogle(function () {
      initializeAnnotationSheet();
    });
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
