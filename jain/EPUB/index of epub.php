<html>
<head>
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-B2Q39Z3BC9"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-B2Q39Z3BC9');
</script>
    <meta charset="UTF-8">
    <title>File Index</title>
    <style>
        body { font-family: sans-serif; padding: 20px; line-height: 1.6; }
        ul { list-style-type: none; padding: 0; }
        li { margin-bottom: 8px; }
        a { text-decoration: none; color: #007bff; }
        a:hover { text-decoration: underline; }
        .file-icon { margin-right: 10px; }
    </style>
</head>
<body>

    <h2>Project Files</h2>
    <ul>
        <?php
        // Define the directory to scan ( "." means the current folder )
        $dir = ".";
        
        // Open the directory
        if ($handle = opendir($dir)) {
            while (false !== ($entry = readdir($handle))) {
                // Ignore the current script and hidden system files
                if ($entry != "." && $entry != ".." && $entry != "index.php") {
                    echo "<li><span class='file-icon'>📄</span><a href='$entry'>$entry</a></li>";
                }
            }
            closedir($handle);
        }
        ?>
    </ul>

</body>
</html>
</html>
