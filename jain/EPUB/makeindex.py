import os
import html

BASE_DIR = os.getcwd()
OUTPUT_FILE = "index.html"

# 🔴 ONLY these file types will be listed
INCLUDE_EXTS = {".pdf", ".epub"}

ICON_MAP = {
    ".pdf":  "https://img.icons8.com/color/120/pdf.png",
    ".epub": "https://img.icons8.com/color/120/ebook.png",
}

DEFAULT_ICON = "https://img.icons8.com/color/120/file.png"

def human_size(size):
    for unit in ["B", "KB", "MB", "GB"]:
        if size < 1024:
            return f"{size:.1f} {unit}"
        size /= 1024
    return f"{size:.1f} TB"

def js_escape(s):
    """Escape string for single-quoted JavaScript string"""
    return s.replace("\\", "\\\\").replace("'", "\\'")

items = sorted(os.listdir(BASE_DIR), key=str.lower)

with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    f.write("""<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-B2Q39Z3BC9"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-B2Q39Z3BC9');
</script>
<script>
function trackDownload(filename) {
  gtag('event', 'download', {
    event_category: 'EPUB',
    event_label: filename,
    transport_type: 'beacon'
  });
}
</script>
<title>File Index</title>
<style>
body {
    font-family: Arial, sans-serif;
}
table {
    border-collapse: collapse;
    width: 100%;
}
th, td {
    border: 1px solid #ccc;
    padding: 6px 8px;
    vertical-align: middle;
}
th {
    background: #f0f0f0;
}
.icon {
    width: 1.2em;
    height: 1.2em;
    vertical-align: text-bottom;
}
</style>

<!-- Example tracking stub (replace with your real code) -->
<script>
function trackDownload(filename) {
    console.log("Download:", filename);
    // send to analytics here
}
</script>

</head>
<body>

<h1>File Index</h1>

<table>
<tr>
    <th></th>
    <th>File</th>
    <th>Size</th>
</tr>
""")

    for name in items:
        if name in (OUTPUT_FILE, __file__):
            continue

        path = os.path.join(BASE_DIR, name)
        if not os.path.isfile(path):
            continue

        ext = os.path.splitext(name)[1].lower()
        if ext not in INCLUDE_EXTS:
            continue

        safe_html = html.escape(name)
        safe_js = js_escape(name)
        size = human_size(os.path.getsize(path))
        icon = ICON_MAP.get(ext, DEFAULT_ICON)

        f.write(f"""
<tr>
    <td align="center"><img src="{icon}" class="icon"></td>
    <td>
        <a href="{safe_html}"
           onclick="trackDownload('{safe_js}')">
           {safe_html}
        </a>
    </td>
    <td align="right">{size}</td>
</tr>
""")

    f.write("""
</table>

</body>
</html>
""")

print("index.html created with download tracking hooks.")
