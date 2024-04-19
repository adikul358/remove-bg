import { getImageURLs } from "./api.js";

const eraseBtn = document.getElementById("erase");
const brushMenu = document.getElementById("brushMenu");
const brushSizeInput = document.getElementById("brushSize");
const resetBtn = document.getElementById("reset");
const doneBtn = document.getElementById("doneBtn");
const downloadBtn = document.getElementById("downloadBtn");

const canvas = new fabric.Canvas('canvas', {isDrawingMode: false});
canvas.freeDrawingBrush.color = 'rgba(217,0,0,1)';
canvas.freeDrawingBrush.width = parseInt(brushSizeInput.value);

eraseBtn.addEventListener("click", () => {
  brushMenu.classList.remove("hidden")
  brushMenu.classList.add("flex")
  eraseBtn.classList.remove("bg-white")
  eraseBtn.classList.add("text-white")
  eraseBtn.classList.add("bg-[rgb(217,0,0)]")
  canvas.isDrawingMode = true
})

brushSizeInput.addEventListener("change", (e) => {
  canvas.freeDrawingBrush.width = parseInt(e.target.value);
})

downloadBtn.addEventListener("click", () => {
  // canvas.backgroundImage.opacity = 0
  canvas.forEachObject((o) => {
    if (o.path) {
      o.opacity = 0
    }
  })
  const imageData = canvas.toDataURL({
      format: 'png',
      quality: 1
  });
  var a = document.createElement('a');
  a.href = imageData;
  a.download = "removebg.png";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  canvas.forEachObject((o) => {
    if (o.path) {
      o.opacity = 1
    }
  })
  // canvas.backgroundImage.opacity = 0.2
})

doneBtn.addEventListener("click", async () => {
  doneBtn.textContent = "Processing..."
  // canvas.backgroundImage.opacity = 0
  const imageData = canvas.toDataURL({
      format: 'png',
      quality: 1
  });

  // canvas.backgroundImage.opacity = 0.2

  let new_img = await (await fetch("/api/removebrush", {
    method: "POST",
    headers: {
      'Content-Type': "application/json"
    },
    body: JSON.stringify({
      imageData: imageData
    }),
  })).blob()

  const new_img_url = URL.createObjectURL(new_img)
  console.dir(new_img_url)

  canvas.forEachObject((o) => {
    canvas.remove(o)
  })

  canvas.isDrawingMode = false;
  brushMenu.classList.remove("flex")
  brushMenu.classList.add("hidden")
  eraseBtn.classList.remove("text-white")
  eraseBtn.classList.remove("bg-[rgb(217,0,0)]")
  eraseBtn.classList.add("bg-white")

  fabric.Image.fromURL(new_img_url, function(img) {
    scaleRatio = Math.min(canvas.width / img.width, canvas.height / img.height);
    img.set({
        scaleX: scaleRatio,
        scaleY: scaleRatio,
        left: canvas.width / 2,
        top: canvas.height / 2,
        originX: 'middle',
        originY: 'middle',
        selectable: false,
    })
    canvas.add(img);
  })
  doneBtn.textContent = "Done"


})

resetBtn.addEventListener("click", () => {
  brushMenu.classList.remove("flex")
  brushMenu.classList.add("hidden")
  eraseBtn.classList.remove("text-white")
  eraseBtn.classList.remove("bg-[rgb(217,0,0)]")
  eraseBtn.classList.add("bg-white")

  canvas.isDrawingMode = false
  canvas.forEachObject((o) => {
    canvas.remove(o)
  })
  fabric.Image.fromURL(prevURL, function(img) {
  scaleRatio = Math.min(canvas.width / img.width, canvas.height / img.height);
  img.set({
      scaleX: scaleRatio,
      scaleY: scaleRatio,
      left: canvas.width / 2,
      top: canvas.height / 2,
      originX: 'middle',
      originY: 'middle',
      selectable: false,
  })
  canvas.add(img);
})
})

const parentDiv = document.getElementById("canvas-parent");
canvas.setWidth(parentDiv.clientWidth);
canvas.setHeight(parentDiv.clientHeight);

const { ogURL, prevURL } = await getImageURLs()
let scaleRatio;
// fabric.Image.fromURL(ogURL, function(img) {
//   scaleRatio = Math.min(canvas.width / img.width, canvas.height / img.height);
//   canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
//       opacity: 0.2,
//       scaleX: scaleRatio,
//       scaleY: scaleRatio,
//       left: canvas.width / 2,
//       top: canvas.height / 2,
//       originX: 'middle',
//       originY: 'middle'
//   });
// })
fabric.Image.fromURL(prevURL, function(img) {
  scaleRatio = Math.min(canvas.width / img.width, canvas.height / img.height);
  img.set({
      scaleX: scaleRatio,
      scaleY: scaleRatio,
      left: canvas.width / 2,
      top: canvas.height / 2,
      originX: 'middle',
      originY: 'middle',
      selectable: false,
  })
  canvas.add(img);
})
