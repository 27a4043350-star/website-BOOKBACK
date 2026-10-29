(() => {
  const script = document.currentScript;
  const placeholder = document.querySelector("[data-site-footer]");

  if (!script || !placeholder) {
    console.error("Không tìm thấy vị trí chèn footer.");
    return;
  }

  const indexUrl = new URL("../../index.html", script.src);

  fetch(indexUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Không tải được index.html: ${response.status}`);
      }
      return response.text();
    })
    .then((html) => {
      const indexDocument = new DOMParser().parseFromString(html, "text/html");
      const sourceFooter = indexDocument.querySelector("footer.site-footer");

      if (!sourceFooter) {
        throw new Error("Không tìm thấy footer trong index.html.");
      }

      const footer = document.importNode(sourceFooter, true);
      footer.querySelectorAll("a[href]").forEach((link) => {
        const href = link.getAttribute("href");
        if (href && !href.startsWith("#")) {
          link.href = new URL(href, indexUrl).href;
        }
      });

      if (!document.getElementById("top")) {
        document.body.id = "top";
      }

      placeholder.replaceWith(footer);
    })
    .catch((error) => {
      console.error("Không thể chèn footer từ index.html.", error);
    });
})();
