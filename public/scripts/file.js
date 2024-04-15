const dropArea = document.querySelector(".drag-area");
const dragFile = dropArea.querySelector(".drag-file");
const button = dropArea.querySelector(".file-input-button");
const input = dropArea.querySelector(".file-input");

button.onclick = () => {
  input.click();
};

input.addEventListener("change", function (e) {
  const target = e.target;
  setttingFileValue(target);
});


dropArea.addEventListener("dragover", (event) => {
  event.preventDefault(); 
  dropArea.classList.add("bg-white");
  dropArea.classList.add("border-4");
  dragFile.textContent = "Release to upload file";
	for (el of document.querySelectorAll(".upload-supplement")) {
		el.classList.add("invisible")
	}
});

dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("bg-white");
  dropArea.classList.remove("border-4");
  dragFile.textContent = "Drag and drop image here";
	for (el of document.querySelectorAll(".upload-supplement")) {
		el.classList.remove("invisible")
	}
});

dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  const target = e.dataTransfer;
  dropArea.classList.remove("bg-white");
  dropArea.classList.remove("border-4");
  dragFile.textContent = "Drag and drop image here";
	for (el of document.querySelectorAll(".upload-supplement")) {
		el.classList.remove("invisible")
	}
  setttingFileValue(target);
});

const setttingFileValue = async (target) => {
  const fileSize = target.files[0].size;
  let filesizeErrorMessage = document.getElementById("filesize-error");
  let filetypeErrorMessage = document.getElementById("filetype-error");
  let sizeInMB = Number.parseFloat(fileSize / (1024 * 1024)).toFixed(2);

	const fileTypes = ["image/png","image/jpg","image/jpeg"]

	if (!fileTypes.includes(target.files[0].type)) {
		filesizeErrorMessage.classList.add("hidden");
		filetypeErrorMessage.classList.remove("hidden");
  } else if (sizeInMB > 5) {
		filetypeErrorMessage.classList.add("hidden");
		filesizeErrorMessage.classList.remove("hidden");
	} else {
		filetypeErrorMessage.classList.add("hidden");
		filesizeErrorMessage.classList.add("hidden");

		// var reader = new FileReader();
		// const previmage = document.getElementById('preview-image')
		// reader.onload = function(e) {
		// 		previmage.src = e.target.result;
		// }
		// reader.readAsDataURL(target.files[0]);
		// setTimeout(() => previmage.classList.remove("hidden"), 500)

		const formData = new FormData();
		formData.append("main-image", target.files[0]);
		formData.append("size", "auto");
		
		dragFile.textContent = "Uploading...";
		for (el of document.querySelectorAll(".upload-supplement")) {
			el.classList.add("invisible")
		}

		const upload_res = await (await fetch("/api/upload", {
			method: "POST",
			body: formData,
		})).text()

		dragFile.textContent = "Processing...";

		const preview_res = await (await fetch("/api/removebg", {
			method: "POST",
			headers: {'Content-Type': 'text/plain'},
			body: upload_res,
		})).text()

		// dragFile.textContent = "Redirecting...";
		document.cookie = `FILENAME=${upload_res}`;
		document.cookie = `PREVIEWNAME=${preview_res}`;
		setTimeout(() => window.location = "/upload", 2000)
  }
};
