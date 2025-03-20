const qrText = document.getElementById('qr-text');
const sizes = document.getElementById('sizes');
const colorPicker = document.getElementById('color');
const bgColorPicker = document.getElementById('bg-color'); // Background color picker
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const qrContainer = document.querySelector('.qr-body');

let size = parseInt(sizes.value);
let qrColor = colorPicker.value;
let bgColor = bgColorPicker.value;

generateBtn.addEventListener('click', (e) => {
    e.preventDefault();
    isEmptyInput();
});

sizes.addEventListener('change', (e) => {
    size = parseInt(e.target.value);
    isEmptyInput();
});

colorPicker.addEventListener('input', (e) => {
    qrColor = e.target.value;
    isEmptyInput();
});

bgColorPicker.addEventListener('input', (e) => {
    bgColor = e.target.value;
    isEmptyInput();
});

downloadBtn.addEventListener('click', () => {
    let canvas = document.querySelector('.qr-body canvas');
    if (canvas) {
        let imgURL = canvas.toDataURL('image/png');
        downloadBtn.setAttribute("href", imgURL);
    }
});

function isEmptyInput() {
    if (qrText.value.trim().length > 0) {
        generateQRCode();
    } else {
        alert("Enter the text or URL to generate your QR code");
    }
}

function generateQRCode() {
    qrContainer.innerHTML = ""; // Clear previous QR code

    let borderSize = 20; // Border around QR code
    let newSize = parseInt(size) + borderSize * 2;

    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");

    canvas.width = newSize;
    canvas.height = newSize;

    // Set background color
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, newSize, newSize);

    let qrCodeDiv = document.createElement("div");
    let qr = new QRCode(qrCodeDiv, {
        text: qrText.value,
        width: size,
        height: size,
        colorDark: qrColor,
        colorLight: bgColor,
        correctLevel: QRCode.CorrectLevel.H
    });

    qrCodeDiv.querySelector("img").onload = function () {
        ctx.drawImage(this, borderSize, borderSize, size, size);
        qrContainer.innerHTML = "";
        qrContainer.appendChild(canvas);
    };
}
