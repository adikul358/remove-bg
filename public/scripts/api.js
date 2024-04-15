(async function getImage() {
        filename = getCookie("FILENAME")
        if (!filename) { window.location = "/" }
        const res_og = await fetch("/api/preview", {
          headers: {
            'Content-Type': 'text/plain'
          },
          method: "POST",
          body: filename,
        });
        previewfilename = getCookie("PREVIEWNAME")
        const res = await fetch("/api/preview", {
          headers: {
            'Content-Type': 'text/plain'
          },
          method: "POST",
          body: previewfilename,
        });
        const og_image = await res_og.blob();
        const prev_image = await res.blob();
        const ogEl = document.getElementById("original")
        const prevEl = document.getElementById("preview")
        ogEl.src = URL.createObjectURL(og_image);
        prevEl.src = URL.createObjectURL(prev_image);
        downloadBtn.href = URL.createObjectURL(prev_image);
        setTimeout(() => {
          ogEl.classList.remove("hidden")
          prevEl.classList.remove("hidden")
        }, 500)


      })()