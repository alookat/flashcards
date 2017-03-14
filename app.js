const engText = "In September, my girlfriend and I go to Spain.";
const espText = "En septiembre, mi novia y yo vamos a España."

const section = document.querySelector("section");
const engP = document.getElementById("eng-p");
const espP = document.getElementById("esp-p");
const resetButton = document.querySelector("button#reset");
const revealButton = document.querySelector("button#reveal");
const editButton = document.querySelector("button#edit");

const espWords = espText.split(" ");

engP.textContent = engText;

resetButton.setAttribute("disabled");

for (let i = 0; i < espWords.length; i += 1) {
  let espSpan = document.createElement("span");
  let espSpanSpace = document.createElement("span")

  espSpanSpace.textContent = " ";
  espSpan.style.backgroundColor = "white";
  espSpan.style.color = "white";
  espSpan.style.boxShadow = "0 3px 6px #ccc";
  espSpan.textContent = espWords[i];
  espP.appendChild(espSpan);
  espP.appendChild(espSpanSpace);
  let shown = false;

  espSpan.addEventListener("click", (e) => {
    if (shown === false) {
			resetButton.removeAttribute("disabled");
      espSpan.style.backgroundColor = "";
      espSpan.style.color = "";
      espSpan.style.boxShadow = "";
      shown = true;
    } else if (shown === true) {
      espSpan.style.backgroundColor = "white";
      espSpan.style.color = "white";
      espSpan.style.boxShadow = "0 3px 6px #ccc"
      shown = false;
    }
  });

  resetButton.addEventListener("click", (e) => {
    espSpan.style.backgroundColor = "white";
    espSpan.style.color = "white";
    espSpan.style.boxShadow = "0 3px 6px #ccc";
    shown = false;
		resetButton.setAttribute("disabled");
		revealButton.removeAttribute("disabled");
  });

  revealButton.addEventListener("click", (e) => {
    espSpan.style.backgroundColor = "";
    espSpan.style.color = "";
    espSpan.style.boxShadow = "";
    shown = true;
		revealButton.setAttribute("disabled");
		resetButton.removeAttribute("disabled");
  });
}

editButton.addEventListener("click", (e) => {
	if (editButton.textContent === "Edit") {
    console.log("edit button clicked")
		const engInput = document.createElement("input");
		const espInput = document.createElement("input");

    // const section = editButton.parentNode;
    const engP = document.getElementById("eng-p");
    const espP = document.getElementById("esp-p");

		engInput.type = "text";
		engInput.value = engP.textContent;
		section.insertBefore(engInput, engP);
		section.removeChild(engP);
    // console.log(engP.parentNode);
    //
		espInput.type = "text";
		espInput.value = espP.textContent;
		section.insertBefore(espInput, espP);
		section.removeChild(espP);

		editButton.textContent = "Save";

	} else if (editButton.textContent === "Save") {
    console.log("save button clicked")
		const engInput = section.firstElementChild;
		const espInput = section.firstElementChild.nextElementSibling;

    // console.log(engInput, espInput);
    //
		const engP = document.createElement("p");
    engP.setAttribute("id", "eng-p");

		const espP = document.createElement("p");
    espP.setAttribute("id", "esp-p");
    //
		engP.textContent = engInput.value;
		// espP.textContent = espInput.value;
    //
		section.insertBefore(engP, engInput);
    section.removeChild(engInput);
    //


		editButton.textContent = "Edit";

    const espWords = espInput.value.split(" ");

    for (let i = 0; i < espWords.length; i += 1) {
      let espSpan = document.createElement("span");
      let espSpanSpace = document.createElement("span")

      espSpanSpace.textContent = " ";
      espSpan.style.backgroundColor = "white";
      espSpan.style.color = "white";
      espSpan.style.boxShadow = "0 3px 6px #ccc";
      espSpan.textContent = espWords[i];
      espP.appendChild(espSpan);
      espP.appendChild(espSpanSpace);
      let shown = false;

      espSpan.addEventListener("click", (e) => {
        if (shown === false) {
    			resetButton.removeAttribute("disabled");
          espSpan.style.backgroundColor = "";
          espSpan.style.color = "";
          espSpan.style.boxShadow = "";
          shown = true;
        } else if (shown === true) {
          espSpan.style.backgroundColor = "white";
          espSpan.style.color = "white";
          espSpan.style.boxShadow = "0 3px 6px #ccc"
          shown = false;
        }
      });

      resetButton.addEventListener("click", (e) => {
        espSpan.style.backgroundColor = "white";
        espSpan.style.color = "white";
        espSpan.style.boxShadow = "0 3px 6px #ccc";
        shown = false;
    		resetButton.setAttribute("disabled");
    		revealButton.removeAttribute("disabled");
      });

      revealButton.addEventListener("click", (e) => {
        espSpan.style.backgroundColor = "";
        espSpan.style.color = "";
        espSpan.style.boxShadow = "";
        shown = true;
    		revealButton.setAttribute("disabled");
    		resetButton.removeAttribute("disabled");
      });
    }

    section.insertBefore(espP, espInput);
		section.removeChild(espInput);

	}

});
