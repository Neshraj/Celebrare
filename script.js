const radiusInput = document.getElementById("radius");
const borderDropdown = document.getElementById("selection-dropdown");
const newFieldBtn = document.getElementById("newfieldbtn");
const bodyDiv = document.getElementById("body");
const heightInput = document.getElementById("heightipt");
const widthInput = document.getElementById("widthipt");
const textAligne = document.getElementById("text-position");
const fontSize = document.getElementById("fontsize");
const fontStyle = document.getElementById("font-family");
const fontWidth = document.getElementById("fontwidth");
const textColor = document.getElementById("textcolor");
const bgColor = document.getElementById("bgcolor");
const bgImage = document.getElementById("bgimage");
const setbg = document.getElementById("setbg");

let selectedDiv;

let allFieldsDetails = {};
let divCounter = 0;
let currentlyDragging = null;
let currentlyResizing = null;

newFieldBtn.addEventListener("click", () => {
  const newDiv = document.createElement("div");
  newDiv.className = "stylediv";
  newDiv.textContent = "New field";

  const divId = divCounter++;
  newDiv.id = divId;

  const width = 150;
  const height = 50;
  const top = Math.random() * (bodyDiv.offsetHeight - height);
  const left = Math.random() * (bodyDiv.offsetWidth - width);
  const borderStyle = "solid";
  const borderRadius = 0 + "px";
  const textaligne = "top";
  const fontsize = 16;
  const fontstyle = "Arial";
  const fontwidth = 10;
  const textcolor = "black";
  const bgcolor = "white";
  const bgimage = "";

  newDiv.contentEditable = true;

  newDiv.style.width = width + "px";
  newDiv.style.height = height + "px";
  newDiv.style.top = top + "px";
  newDiv.style.left = left + "px";
  newDiv.style.border = `1px ${borderStyle} black`;
  newDiv.style.borderRadius = borderRadius;
  newDiv.style.fontSize = fontsize;
  newDiv.style.fontFamily = fontstyle;
  newDiv.style.fontWeight = fontwidth;
  newDiv.style.color = textcolor;
  newDiv.style.backgroundColor = bgcolor;
  newDiv.style.backgroundImage = bgimage;

  bodyDiv.appendChild(newDiv);

  allFieldsDetails[divId] = {
    width: width,
    height: height,
    borderstyle: borderStyle,
    borderradius: 0,
    textaligne: textaligne,
    fontsize: fontsize,
    fontstyle: fontstyle,
    fontwidth: fontwidth,
    textcolor: textcolor,
    bgcolor: bgcolor,
    bgimage: bgimage,
  };


  document.getElementById("body").addEventListener("click", (event) => {
    event.stopPropagation();
    event.preventDefault();
    const allDivs = document.querySelectorAll(".stylediv");
    allDivs.forEach((div) => {
      div.style.resize = "none";
    });
  });


  newDiv.addEventListener("click", (event) => {
    event.stopPropagation();
    event.preventDefault();

    const allDivs = document.querySelectorAll(".stylediv");

    selectedDiv = newDiv.id;
    borderDropdown.value = allFieldsDetails[parseInt(newDiv.id)].borderstyle;
    radiusInput.value = allFieldsDetails[parseInt(newDiv.id)].borderradius;
    heightInput.value = allFieldsDetails[parseInt(newDiv.id)].height;
    widthInput.value = allFieldsDetails[parseInt(newDiv.id)].width;
    textAligne.value = allFieldsDetails[parseInt(newDiv.id)].textaligne;
    fontSize.value = allFieldsDetails[parseInt(newDiv.id)].fontsize;
    fontStyle.value = allFieldsDetails[parseInt(newDiv.id)].fontstyle;
    fontWidth.value = allFieldsDetails[parseInt(newDiv.id)].fontwidth;
    textColor.value = allFieldsDetails[parseInt(newDiv.id)].textcolor;
    bgColor.value = allFieldsDetails[parseInt(newDiv.id)].bgcolor;

    newDiv.contentEditable = true;

    let isDragging = false;
    let offsetX = 0,
      offsetY = 0;
    newDiv.style.cursor = "move";

    const startDragging = (event) => {
      isDragging = true;
      offsetX = event.clientX - newDiv.offsetLeft;
      offsetY = event.clientY - newDiv.offsetTop;

      document.addEventListener("mousemove", onDragging);
      document.addEventListener("mouseup", stopDragging);
    };

    const onDragging = (event) => {
      if (isDragging) {
        newDiv.style.left = `${event.clientX - offsetX}px`;
        newDiv.style.top = `${event.clientY - offsetY}px`;
      }
    };

    const stopDragging = () => {
      isDragging = false;
      document.removeEventListener("mousemove", onDragging);
      document.removeEventListener("mouseup", stopDragging);
    };

    newDiv.addEventListener("mousedown", (event) => {
      event.preventDefault();
      startDragging(event);
    });
  });

  radiusInput.addEventListener("input", () => {
    allFieldsDetails[parseInt(selectedDiv)].borderradius = radiusInput.value;
    document.getElementById(
      selectedDiv
    ).style.borderRadius = `${radiusInput.value}px`;
  });

  textColor.addEventListener("input", () => {
    allFieldsDetails[parseInt(selectedDiv)].textcolor = textColor.value;
    document.getElementById(selectedDiv).style.color = textColor.value;
  });

  bgColor.addEventListener("input", () => {
    allFieldsDetails[parseInt(selectedDiv)].bgcolor = bgColor.value;
    document.getElementById(selectedDiv).style.backgroundColor = bgColor.value;
  });

  radiusInput.addEventListener("wheel", () => {
    allFieldsDetails[parseInt(selectedDiv)].borderradius = radiusInput.value;
    document.getElementById(
      selectedDiv
    ).style.borderRadius = `${radiusInput.value}px`;
  });

  borderDropdown.addEventListener("change", () => {
    allFieldsDetails[parseInt(selectedDiv)].borderstyle = borderDropdown.value;
    document.getElementById(
      selectedDiv
    ).style.border = `1px ${borderDropdown.value} black`;
  });

  textAligne.addEventListener("change", () => {
    allFieldsDetails[parseInt(selectedDiv)].textaligne = textAligne.value;
    if (textAligne.value === "top") {
      document.getElementById(selectedDiv).style.justifyContent = "start";
    } else if (textAligne.value === "bottom") {
      document.getElementById(selectedDiv).style.justifyContent = "end";
    } else if (textAligne.value === "center") {
      document.getElementById(selectedDiv).style.justifyContent = "center";
      document.getElementById(selectedDiv).style.alignItems = "center";
    } else if (textAligne.value === "left") {
      document.getElementById(selectedDiv).style.alignItems = "start";
    } else if (textAligne.value === "right") {
      document.getElementById(selectedDiv).style.alignItems = "end";
    }
  });

  fontSize.addEventListener("wheel", (event) => {
    event.preventDefault();

    const step = parseFloat(fontSize.step) || 1;
    const currentValue = parseFloat(fontSize.value) || 0;

    let newValue = event.deltaY < 0 ? currentValue + step : currentValue - step;

    fontSize.value = Math.min(
      Math.max(newValue, parseFloat(fontSize.min)),
      parseFloat(fontSize.max)
    );
  });

  fontSize.addEventListener("input", () => {
    allFieldsDetails[parseInt(selectedDiv)].fontsize = fontSize.value;
    document.getElementById(selectedDiv).style.fontSize = `${fontSize.value}px`;
  });

  fontSize.addEventListener("wheel", () => {
    allFieldsDetails[parseInt(selectedDiv)].fontsize = fontSize.value;
    document.getElementById(selectedDiv).style.fontSize = `${fontSize.value}px`;
  });

  fontWidth.addEventListener("wheel", (event) => {
    event.preventDefault();

    const step = parseFloat(fontWidth.step) || 50;
    const currentValue = parseFloat(fontWidth.value) || 10;

    let newValue = event.deltaY < 0 ? currentValue + step : currentValue - step;
    fontWidth.value = Math.min(
      Math.max(newValue, parseFloat(fontWidth.min)),
      parseFloat(fontWidth.max)
    );
  });

  fontWidth.addEventListener("input", () => {
    allFieldsDetails[parseInt(selectedDiv)].fontwidth = fontWidth.value;
    document.getElementById(selectedDiv).style.fontWeight = fontWidth.value;
  });

  fontWidth.addEventListener("wheel", () => {
    allFieldsDetails[parseInt(selectedDiv)].fontwidth = fontWidth.value;
    document.getElementById(selectedDiv).style.fontWeight = fontWidth.value;
  });

  fontStyle.addEventListener("change", () => {
    allFieldsDetails[parseInt(selectedDiv)].fontstyle = fontStyle.value;
    document.getElementById(selectedDiv).style.fontFamily = fontStyle.value;
  });
});

radiusInput.addEventListener("wheel", (event) => {
  event.preventDefault();
  const step = parseFloat(radiusInput.step) || 1;
  const currentValue = parseFloat(radiusInput.value) || 0;

  if (event.deltaY < 0) {
    const newValue = currentValue + step;
    radiusInput.value = Math.min(newValue, parseFloat(radiusInput.max));
  } else {
    const newValue = currentValue - step;
    radiusInput.value = Math.max(newValue, parseFloat(radiusInput.min));
  }
});

heightInput.addEventListener("wheel", (event) => {
  event.preventDefault();

  const step = parseFloat(heightInput.step) || 1;
  const currentValue = parseFloat(heightInput.value) || 0;

  let newValue = event.deltaY < 0 ? currentValue + step : currentValue - step;

  heightInput.value = Math.min(
    Math.max(newValue, parseFloat(heightInput.min)),
    parseFloat(heightInput.max)
  );
});

widthInput.addEventListener("wheel", (event) => {
  event.preventDefault();

  const step = parseFloat(widthInput.step) || 1;
  const currentValue = parseFloat(widthInput.value) || 0;

  let newValue = event.deltaY < 0 ? currentValue + step : currentValue - step;

  widthInput.value = Math.min(
    Math.max(newValue, parseFloat(widthInput.min)),
    parseFloat(widthInput.max)
  );
});

heightInput.addEventListener("input", () => {
  allFieldsDetails[parseInt(selectedDiv)].height = heightInput.value;
  document.getElementById(selectedDiv).style.height = `${heightInput.value}px`;
});

heightInput.addEventListener("wheel", () => {
  allFieldsDetails[parseInt(selectedDiv)].height = heightInput.value;
  document.getElementById(selectedDiv).style.height = `${heightInput.value}px`;
});

widthInput.addEventListener("input", () => {
  allFieldsDetails[parseInt(selectedDiv)].width = widthInput.value;
  document.getElementById(selectedDiv).style.width = `${widthInput.value}px`;
});

widthInput.addEventListener("wheel", () => {
  allFieldsDetails[parseInt(selectedDiv)].width = widthInput.value;
  document.getElementById(selectedDiv).style.width = `${widthInput.value}px`;
});

bgImage.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const fileURL = URL.createObjectURL(file);
    document.getElementById(
      selectedDiv
    ).style.backgroundImage = `url(${fileURL})`;
    document.getElementById(selectedDiv).style.backgroundPosition = "center";
    document.getElementById(selectedDiv).style.backgroundSize = "contain";
    document.getElementById(selectedDiv).style.backgroundRepeat = "no-repeat";

    console.log(`Temporary File URL: ${fileURL}`);
  }
});

function autoClick() {
  $("#download").click();
}

$(document).ready(function () {
  var element = $("#body");

  $("#download").on("click", function () {
    html2canvas(element, {
      onrendered: function (canvas) {
        var imageData = canvas.toDataURL("image/jpg");
        var newData = imageData.replace(
          /^data:image\/jpg/,
          "data:application/octet-stream"
        );
        $("#download").attr("download", "image.jpg").attr("href", newData);
      },
    });
  });
});
