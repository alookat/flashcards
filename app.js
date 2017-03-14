// The two strings: before and after translation
const engText = "In September, my girlfriend and I go to Spain.";
const espText = "En septiembre, mi novia y yo vamos a España."
// Store the split after-translation string somewhere
const espWords = espText.split(" ");

// Access elements from the DOM
const section = document.querySelector("section");
const engP = document.getElementById("eng-p");
const espP = document.getElementById("esp-p");
const resetButton = document.querySelector("button#reset");
const revealButton = document.querySelector("button#reveal");
const editButton = document.querySelector("button#edit");

// Set the first paragraph as the before-translation string
engP.textContent = engText;

// Start with inability to reset
resetButton.setAttribute("disabled");

// Loop over split after-translation
for (let i = 0; i < espWords.length; i += 1) {
  // Create a span for each word and space in-between
  let espSpan = document.createElement("span");
  let espSpanSpace = document.createElement("span")

  // Define span styles
  let spanStyles = {
    covered: () => {
      espSpan.style.backgroundColor = "white";
      espSpan.style.color = "white";
      espSpan.style.boxShadow = "0 3px 6px #ccc";
    },
    shown: () => {
      espSpan.style.backgroundColor = "";
      espSpan.style.color = "";
      espSpan.style.boxShadow = "";
    }
  }

  // Set defaults: covered-up style, textContent
  spanStyles.covered();
  espSpanSpace.textContent = " ";
  espSpan.textContent = espWords[i];

  // Add these spans to the main after-translation paragraph
  espP.appendChild(espSpan);
  espP.appendChild(espSpanSpace);

  // Set boolean for easy switching
  let shown = false;

  espSpan.addEventListener("click", (e) => {
    if (shown === false) {
			resetButton.removeAttribute("disabled");
      spanStyles.shown();

      shown = true;
    } else if (shown === true) {
      resetButton.setAttribute("disabled");
      spanStyles.covered();

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
    console.log("edit button clicked");
    resetButton.setAttribute("disabled");
    revealButton.setAttribute("disabled");


		const engInput = document.createElement("input");
		const espInput = document.createElement("input");

    const engP = document.getElementById("eng-p");
    const espP = document.getElementById("esp-p");

		engInput.type = "text";
		engInput.value = engP.textContent;
		section.insertBefore(engInput, engP);
		section.removeChild(engP);

		espInput.type = "text";
		espInput.value = espP.textContent;
		section.insertBefore(espInput, espP);
		section.removeChild(espP);

		editButton.textContent = "Save";

	} else if (editButton.textContent === "Save") {
    console.log("save button clicked");
    resetButton.removeAttribute("disabled");
    revealButton.removeAttribute("disabled");
    resetButton.setAttribute("disabled");

		const engInput = section.firstElementChild;
		const espInput = section.firstElementChild.nextElementSibling;

		const engP = document.createElement("p");
    engP.setAttribute("id", "eng-p");

		const espP = document.createElement("p");
    espP.setAttribute("id", "esp-p");

		engP.textContent = engInput.value;

		section.insertBefore(engP, engInput);
    section.removeChild(engInput);

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
