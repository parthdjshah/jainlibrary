function setupFavicon() {
    var base = "/jain/common/";
    var version = "?v=4";

    document.querySelectorAll('link[data-parth-favicon]').forEach(function (el) {
        el.remove();
    });

    [
        { rel: "icon", type: "image/x-icon", href: base + "Favicon.ico" + version },
        { rel: "icon", type: "image/png", sizes: "16x16", href: base + "Favicon-16.png" + version },
        { rel: "icon", type: "image/png", sizes: "32x32", href: base + "Favicon-32.png" + version },
        { rel: "icon", type: "image/png", sizes: "48x48", href: base + "Favicon-48.png" + version },
        { rel: "apple-touch-icon", type: "image/png", sizes: "180x180", href: base + "Favicon-180.png" + version }
    ].forEach(function (item) {
        var link = document.createElement("link");
        link.rel = item.rel;
        link.type = item.type;
        if (item.sizes) link.sizes = item.sizes;
        link.href = item.href;
        link.setAttribute("data-parth-favicon", "true");
        document.head.appendChild(link);
    });
}
