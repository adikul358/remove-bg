export async function getImageURLs() {
  const filename = getCookie("FILENAME")
  if (!filename) { window.location = "/" }
  const res_og = await fetch("/api/preview", {
    headers: {
      'Content-Type': 'text/plain'
    },
    method: "POST",
    body: filename,
  });
  const previewfilename = getCookie("PREVIEWNAME")
  const res = await fetch("/api/preview", {
    headers: {
      'Content-Type': 'text/plain'
    },
    method: "POST",
    body: previewfilename,
  });
  const og_image = await res_og.blob();
  const prev_image = await res.blob();
  const ogURL = URL.createObjectURL(og_image);
  const prevURL = URL.createObjectURL(prev_image);

  // TODO: Add to seperate script
  downloadBtn.href = URL.createObjectURL(prev_image);

  return {ogURL, prevURL}
}