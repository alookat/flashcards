// The two strings: before and after translation
const fromText = "In September, my girlfriend and I go to Spain.";
const toText = "En septiembre, mi novia y yo vamos a España."

// Access elements from the DOM
const section = document.querySelector("section");
const fromP = document.getElementById("eng-p");
const toP = document.getElementById("esp-p");
const resetButton = document.querySelector("button#reset");
const revealButton = document.querySelector("button#reveal");
const editButton = document.querySelector("button#edit");

// Start with inability to reset
resetButton.setAttribute("disabled");

// Define card/span styles
let cardStyles = {
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

// Create function to loop over after-translation string
function splitWords(string, parent) {
  // Store the split after-translation string
  let words = string.split(" ");

  // Loop over each part of the string
  for (let i = 0; i < words.length; i += 1) {
    // Create a span for each word and space in-between
    let toCard = document.createElement("span");
    let spanSpace = document.createElement("span")

    // Set defaults: covered-up style, textContent
    cardStyles.covered(toCard);
    spanSpace.textContent = " ";
    toCard.textContent = words[i];

    // Add these spans to the main after-translation paragraph
    parent.appendChild(toCard);
    parent.appendChild(spanSpace);

    // Create listeners for Reset/Reveal buttons
    resetButton.addEventListener("click", (e) => {
      cardStyles.covered(toCard);
      shown = false;
      resetButton.setAttribute("disabled");
      revealButton.removeAttribute("disabled");
    });

    revealButton.addEventListener("click", (e) => {
      cardStyles.shown(toCard);
      shown = true;
      revealButton.setAttribute("disabled");
      resetButton.removeAttribute("disabled");
    });
  }
}

// Set the first paragraph as the before-translation string
fromP.textContent = fromText;

// Set the second paragraph as the after-translation string, already split
splitWords(toText, toP);

// Detect and act on clicks on spans
// Bubble up to spans to hide/show indivual reveals/hides
section.addEventListener("click", (e) => {
  if (e.target.tagName === "SPAN") {
    // Set boolean for easy switching
    let shown = false;
    let selectSpan = e.target;
    if (shown === false) {
  		resetButton.removeAttribute("disabled");
      cardStyles.shown(selectSpan);
      shown = true;
    } else if (shown === true) {
      resetButton.setAttribute("disabled");
      cardStyles.covered(selectSpan);
      shown = false;
    }
  }
});


// Re-do all of this if the edit button is clicked, and then clicked again (saved)
editButton.addEventListener("click", (e) => {
  // Normal to Edit mode
	if (editButton.textContent === "Edit") {
    // Prepare button for switch back to Save(d)
    editButton.textContent = "Save";

    // Disable all flashcards resetting/revealing whilst editing
    resetButton.setAttribute("disabled");
    revealButton.setAttribute("disabled");

    // Create input, fill with existing P content, remove P
    // Refactor me
		const fromInput = document.createElement("input");
    const fromP = document.getElementById("eng-p");
		fromInput.type = "text";
		fromInput.value = fromP.textContent;
		section.insertBefore(fromInput, fromP);
		section.removeChild(fromP);
    // Same as above
    const toInput = document.createElement("input");
    const toP = document.getElementById("esp-p");
		toInput.type = "text";
		toInput.value = toP.textContent;
		section.insertBefore(toInput, toP);
		section.removeChild(toP);
	}
  // Edit mode to Normal
  else if (editButton.textContent === "Save") {
    // Prepare button for switch back to Edit
    editButton.textContent = "Edit";

    // Re-enable resetting and revealing of flashcards
    resetButton.removeAttribute("disabled");
    revealButton.removeAttribute("disabled");
    // Disable reset for now, since flashcards will start covered
    resetButton.setAttribute("disabled");

    // Create P, fill with existing input content, remove input
    // Refactor me
		const fromInput = section.firstElementChild;
		const fromP = document.createElement("p");
    fromP.setAttribute("id", "eng-p");
    fromP.textContent = fromInput.value;
    section.insertBefore(fromP, fromInput);
    section.removeChild(fromInput);
    // *Similar* to above
    const toInput = section.firstElementChild.nextElementSibling;
		let toP = document.createElement("p");
    toP.setAttribute("id", "esp-p");
    splitWords(toInput.value, toP);
    section.insertBefore(toP, toInput);
		section.removeChild(toInput);
	}
});
