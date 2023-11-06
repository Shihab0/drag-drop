const DragArea = document.querySelector(".appBody");
const DragText = DragArea.querySelector("h1");
const button = DragArea.querySelector("button");
const input = DragArea.querySelector("input");
let MyFile;

button.onclick = () => {
  input.click();
};

input.addEventListener("change", function () {
  MyFile = this.files[0];
  DragArea.classList.add("active");
  showFile();
});

DragArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  DragArea.classList.add("active");
  DragText.innerText = "Release to upload file";
});
DragArea.addEventListener("dragleave", (e) => {
  e.preventDefault();
  DragArea.classList.remove("active");
  DragText.innerText = "Drag & Drop";
});

DragArea.addEventListener("drop", (e) => {
  e.preventDefault();
  console.log("Drop event triggered.");
  MyFile = e.dataTransfer.files[0];
  showFile();
});

function showFile() {
  let fileType = MyFile.type;
  let validation = ["image/jpg", "image/jpeg", "image/png", "image/svg+xml"];

  if (validation.includes(fileType)) {
    let fileReader = new FileReader();
    fileReader.onload = () => {
      let imgUrl = fileReader.result;
      let img = `<img src="${imgUrl}" alt="" />`;
      DragArea.innerHTML = img;
    };
    fileReader.readAsDataURL(MyFile);
  } else {
    alert("File is not valid");
    DragArea.classList.remove("active");
    DragText.innerText = "Drag & Drop";
  }
}
