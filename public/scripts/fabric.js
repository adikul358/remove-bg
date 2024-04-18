import { getImageURLs } from "./api.js";
const canvas = new fabric.Canvas('canvas', {isDrawingMode: false});

let MODE = "none";
const eraseBtn = document.getElementById("erase");
const restoreBtn = document.getElementById("restore");
const resetBtn = document.getElementById("reset");

eraseBtn.addEventListener("click", () => {
  // MODE = (MODE == "erase") ? "none" : "erase";
  MODE = "erase";
  eraseBtn.classList.remove("bg-white")
  eraseBtn.classList.add("text-white")
  eraseBtn.classList.add("bg-[rgb(217,0,0)]")
  restoreBtn.classList.remove("text-white")
  restoreBtn.classList.remove("bg-[rgb(4,200,0)]")
  restoreBtn.classList.add("bg-white")
  canvas.isDrawingMode = !(MODE == "none")
  canvas.freeDrawingBrush.color = 'rgba(217,0,0,0.5)';
  canvas.freeDrawingBrush.width = 30;
})

restoreBtn.addEventListener("click", () => {
  // MODE = (MODE == "restore") ? "none" : "restore";
  MODE = "restore";
  restoreBtn.classList.remove("bg-white")
  restoreBtn.classList.add("text-white")
  restoreBtn.classList.add("bg-[rgb(4,200,0)]")
  eraseBtn.classList.remove("text-white")
  eraseBtn.classList.remove("bg-[rgb(217,0,0)]")
  eraseBtn.classList.add("bg-white")

  canvas.isDrawingMode = !(MODE == "none")
  canvas.freeDrawingBrush.color = 'rgba(4, 217, 0, 0.5)';
  canvas.freeDrawingBrush.width = 30;
})

resetBtn.addEventListener("click", () => {
  // MODE = (MODE == "restore") ? "none" : "restore";
  MODE = "none";
  eraseBtn.classList.remove("text-white")
  eraseBtn.classList.remove("bg-[rgb(217,0,0)]")
  eraseBtn.classList.add("bg-white")
  restoreBtn.classList.remove("text-white")
  restoreBtn.classList.remove("bg-[rgb(4,200,0)]")
  restoreBtn.classList.add("bg-white")

  canvas.isDrawingMode = false
  canvas.forEachObject((o) => {
    if (o.path) {
      canvas.remove(o)
    }
  })
})

const parentDiv = document.getElementById("canvas-parent");
canvas.setWidth(parentDiv.clientWidth);
canvas.setHeight(parentDiv.clientHeight);

const { ogURL, prevURL } = await getImageURLs()
let scaleRatio;
fabric.Image.fromURL(ogURL, function(img) {
  scaleRatio = Math.min(canvas.width / img.width, canvas.height / img.height);
  canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
      opacity: 0.2,
      scaleX: scaleRatio,
      scaleY: scaleRatio,
      left: canvas.width / 2,
      top: canvas.height / 2,
      originX: 'middle',
      originY: 'middle'
  });
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