// The two strings: before and after translation
const engText = "In September, my girlfriend and I go to Spain.";
const espText = "En septiembre, mi novia y yo vamos a España."
// Store the split after-translation string somewhere
// const espWords = espText.split(" ");

// Access elements from the DOM
const section = document.querySelector("section");
const engP = document.getElementById("eng-p");
const espP = document.getElementById("esp-p");
const resetButton = document.querySelector("button#reset");
const revealButton = document.querySelector("button#reveal");
const editButton = document.querySelector("button#edit");




// Start with inability to reset
resetButton.setAttribute("disabled");

// Define span styles
let spanStyles = {
  covered: (span) => {
    span.style.backgroundColor = "white";
    span.style.color = "white";
    span.style.boxShadow = "0 3px 6px #ccc";
  },
  shown: (span) => {
    span.style.backgroundColor = "";
    span.style.color = "";
    span.style.boxShadow = "";
  }
}

// Loop over split after-translation
function splitWords(string, parent) {
  // Store the split after-translation string
  let words = string.split(" ");

  // Loop over each part of the string
  for (let i = 0; i < words.length; i += 1) {
    // Create a span for each word and space in-between
    let espSpan = document.createElement("span");
    let espSpanSpace = document.createElement("span")

    // Set defaults: covered-up style, textContent
    spanStyles.covered(espSpan);
    espSpanSpace.textContent = " ";
    espSpan.textContent = words[i];

    // Add these spans to the main after-translation paragraph
    parent.appendChild(espSpan);
    parent.appendChild(espSpanSpace);

    // Create listeners for Reset/Reveal buttons
    resetButton.addEventListener("click", (e) => {
      spanStyles.covered(espSpan);
      shown = false;
      resetButton.setAttribute("disabled");
      revealButton.removeAttribute("disabled");
    });

    revealButton.addEventListener("click", (e) => {
      spanStyles.shown(espSpan);
      shown = true;
      revealButton.setAttribute("disabled");
      resetButton.removeAttribute("disabled");
    });
  }
}

// Set the first paragraph as the before-translation string
engP.textContent = engText;
// Set the second paragraph as the after-translation string, already split
splitWords(espText, espP);

// Bubble up to spans to hide/show indivual reveals/hides
section.addEventListener("click", (e) => {
  if (e.target.tagName === "SPAN") {
    // Set boolean for easy switching
    let shown = false;
    let selectSpan = e.target;
    if (shown === false) {
  		resetButton.removeAttribute("disabled");
      spanStyles.shown(selectSpan);

      shown = true;
    } else if (shown === true) {
      resetButton.setAttribute("disabled");
      spanStyles.covered(selectSpan);

      shown = false;
    }
  }
});


// DANGER ZONE
editButton.addEventListener("click", (e) => {
	if (editButton.textContent === "Edit") {
    editButton.textContent = "Save";

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



	} else if (editButton.textContent === "Save") {
    editButton.textContent = "Edit";

    resetButton.removeAttribute("disabled");
    revealButton.removeAttribute("disabled");
    resetButton.setAttribute("disabled");

		const engInput = section.firstElementChild;
		const engP = document.createElement("p");
    engP.setAttribute("id", "eng-p");
    engP.textContent = engInput.value;

    section.insertBefore(engP, engInput);
    section.removeChild(engInput);


    const espInput = section.firstElementChild.nextElementSibling;
		let espP = document.createElement("p");
    espP.setAttribute("id", "esp-p");

    splitWords(espInput.value, espP);

    section.insertBefore(espP, espInput);
		section.removeChild(espInput);

	}

});
