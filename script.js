const qrText = document.getElementById('qr-text');
const sizes = document.getElementById('sizes');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const qrContainer = document.querySelector('.qr-body');

let size = parseInt(sizes.value);

generateBtn.addEventListener('click', (e) => {
    e.preventDefault();
    isEmptyInput();
});

sizes.addEventListener('change', (e) => {
    size = parseInt(e.target.value);
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

    let borderSize = 20; // White border size
    let newSize = parseInt(size) + borderSize * 2;

    // Create a new canvas
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");

    canvas.width = newSize;
    canvas.height = newSize;

    // Fill the background with white
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, newSize, newSize);

    // Generate QR code directly on a hidden div
    let qrCodeDiv = document.createElement("div");
    let qr = new QRCode(qrCodeDiv, {
        text: qrText.value,
        width: size,
        height: size,
        colorDark: "#000",
        colorLight: "#fff",
        correctLevel: QRCode.CorrectLevel.H
    });

    // Instantly retrieve the QR code and draw it on the canvas
    qrCodeDiv.querySelector("img").onload = function () {
        ctx.drawImage(this, borderSize, borderSize, size, size);
        qrContainer.innerHTML = "";
        qrContainer.appendChild(canvas);
    };
}
