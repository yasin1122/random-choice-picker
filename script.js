// Get the necessary DOM elements
const tagsEl = document.getElementById("tags")
const textarea = document.getElementById("textarea")

// Set focus on the textarea when the page loads
textarea.focus()

// Listen for keyup event on the textarea
textarea.addEventListener("keyup", (e) => {
    createTags(e.target.value) // Call createTags function when a key is released

    // Check if the Enter key is pressed
    if (e.key === "Enter") {
        setTimeout(() => {
            e.target.value = "" // Clear the textarea after pressing Enter
        }, 10)

        randomSelect() // Call randomSelect function to start random selection
    }
})

// Function to create tags from the input text
function createTags(input) {
    // Split the input text by space, remove whitespace, and create an array of tags
    const tags = input
        .split(" ")
        .filter((tag) => tag.trim() !== "")
        .map((tag) => tag.trim())

    tagsEl.innerHTML = "" // Clear the tags container

    // Create and append a span element for each tag
    tags.forEach((tag) => {
        const tagEl = document.createElement("span")
        tagEl.classList.add("tag")
        tagEl.innerText = tag
        tagsEl.appendChild(tagEl)
    })
}

// Function to perform random selection of tags
function randomSelect() {
    const times = 30 // Number of times to highlight and unhighlight tags

    const interval = setInterval(() => {
        const randomTag = pickRandomTag() // Get a random tag element

        if (randomTag !== undefined) {
            highlightTag(randomTag) // Highlight the random tag

            setTimeout(() => {
                unHighlightTag(randomTag) // Unhighlight the random tag after a delay
            }, 100)
        }
    }, 100) // Interval between highlighting and unhighlighting tags

    setTimeout(() => {
        clearInterval(interval) // Stop the interval after the specified number of times

        setTimeout(() => {
            const randomTag = pickRandomTag() // Get a random tag element

            highlightTag(randomTag) // Highlight the final random tag
        }, 100)
    }, times * 100) // Delay before selecting the final random tag
}

// Function to pick a random tag from the list
function pickRandomTag() {
    const tags = document.querySelectorAll(".tag") // Get all tag elements
    return tags[Math.floor(Math.random() * tags.length)] // Return a random tag element
}

// Function to highlight a tag by adding the highlight class
function highlightTag(tag) {
    tag.classList.add("highlight")
}

// Function to unhighlight a tag by removing the highlight class
function unHighlightTag(tag) {
    tag.classList.remove("highlight")
}
