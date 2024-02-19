const qrTextElement = document.querySelector(".qr-text");
const SelectSizesElement = document.getElementById("sizes");
const qrImageElement = document.querySelector(".qr-body");
const generateBtn = document.querySelector(".generate-btn");
const downloadBtn = document.querySelector(".download-btn");

let size = SelectSizesElement.value;

generateBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    isEmptyInput();
});

SelectSizesElement.addEventListener("change", (e)=>{
    size = e.target.value;
    isEmptyInput();
})

function isEmptyInput(){
    qrTextElement.value.length > 0 ? generateQRCode() : alert("Please enter text or URL to generate QR Code")
}

function generateQRCode(){
    
    qrImageElement.innerHTML = ""
    new QRCode(qrImageElement, {
        text : qrTextElement.value,
        width : size,
        height : size,
        colorLight : "#fff",
        colorDark : "#000",

    });
}




downloadBtn.addEventListener("click", () => {
    let img = document.querySelector(".qr-body img");

    if (img !== null) {
        // If an image is found, set the download link to the image source
        let imgAttribute = img.src;
        downloadBtn.setAttribute("href", imgAttribute);
    } else {
        // If no image is found, create a blank canvas and download it
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        let canvasSize = parseInt(size);

        canvas.width = canvasSize;
        canvas.height = canvasSize;

        // Draw a blank square on the canvas
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Set the download link to the data URL of the blank canvas
        downloadBtn.setAttribute("href", canvas.toDataURL());
    }
});
