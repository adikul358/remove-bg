const canvas = new fabric.Canvas('canvas', {isDrawingMode: false});

canvas.setBackgroundImage('sample.jpg', canvas.renderAll.bind(canvas));

canvas.freeDrawingBrush.color = 'green';
canvas.freeDrawingBrush.width = 50;

$('#draw').on('click', function () {
    canvas.isDrawingMode = !canvas.isDrawingMode;
});

$('#remove').on('click', function () {
    canvas.isDrawingMode = false;
    canvas.remove(canvas.getActiveObject());
});

canvas.on('selection:created', function () {
    $('#remove').prop('disabled', '');
});
canvas.on('selection:cleared', function () {
    $('#remove').prop('disabled', 'disabled');
});


$('#api').on('click', function () {
    const imageData = canvas.toDataURL({
        format: 'png',
        quality: 1
    });
    removeBgFromImage(imageData);
    // $('#svg').html('<h1>SVG:</h1><br>' + canvas.toSVG());
});


$('#file-input').on('change', function (e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function (f) {
        const data = f.target.result;
        fabric.Image.fromURL(data, function (img) {
            canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
                backgroundImageOpacity: 0.5,
                backgroundImageStretch: false
            });
        });
    };

    reader.readAsDataURL(file);
});


// REMOVE BG API
function removeBgFromImage(imageData) {
    const apiKey = ''; // Replace with your actual API key
    // const endpoint = 'https://api.remove.bg/v1.0/removebg';

    const base64Data = imageData.split(',')[1];

    // const formData = new FormData();
    // formData.append('image_file', imageData.split(',')[1]);
    // formData.append('size', 'auto');

    // const requestOptions = {
    //     method: 'POST',
    //     body: formData,
    //     headers: {
    //         'X-Api-Key': apiKey,
    //     },
    // };

    fetch('/api/removebg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        //   'X-Api-Key': apiKey
        },
        body: JSON.stringify({
          image_file_b64: base64Data
        })
      })
      .then(response => response.blob())
      .then(blob => {
        // Handle the response blob (e.g., create an image element and set the src)
        const imageUrl = URL.createObjectURL(blob);
        const img = new Image();
        img.src = imageUrl;
        document.body.appendChild(img);
      })
      .catch(error => {
        console.error('Error:', error);
      });
}
