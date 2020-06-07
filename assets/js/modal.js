// Outline the content to be added to the GIS Data Hub window
let GIScontent = [
    ["./images/python.png", "This is the first page"],
    ["./images/swift.png", "This is the second page"],
    ["./images/c.png", "This is the third page"]
];

// Outline the content to be added to the GIS Data Hub window
let ClassifierContent = [
    ["./images/python.png", "This is the first page"],
    ["./images/swift.png", "This is the second page"],
    ["./images/c.png", "This is the third page"]
];

// The GIS Data Hub Modal Popup Window
let gis = {
    open: document.getElementById("GISDemo"),
    close: document.getElementById("exitGIS"),
    page: document.getElementById("pageGIS"),
    previous: document.getElementById("previousGIS"),
    next: document.getElementById("nextGIS"),
    modal: document.getElementById("modalGIS"),
    text: document.getElementById("textGIS"),
    image: document.getElementById("imageGIS"),
    content: GIScontent,
    totalPages: GIScontent.length
}

// The Facial Recognition Classifiier Popup Window
let classifier = {
    open: document.getElementById("ClassifierDemo"),
    close: document.getElementById("exitClassifier"),
    page: document.getElementById("pageClassifier"),
    previous: document.getElementById("previousClassifier"),
    next: document.getElementById("nextClassifier"),
    modal: document.getElementById("modalClassifier"),
    text: document.getElementById("textClassifier"),
    image: document.getElementById("imageClassifier"),
    content: ClassifierContent,
    totalPages: ClassifierContent.length
}

let allProjects = [gis, classifier];

for (let i = 0; i < allProjects.length; i++) {
    let project = allProjects[i];

    project.open.addEventListener('click', function () {
        // Open the modal window when 'open' is clicked
        project.modal.className = "modal";
    });

    project.close.addEventListener('click', function () {
        // Hide the modal window when 'closed' is clicked
        project.modal.className = "modal modal-hidden";
    });

    project.previous.addEventListener('click', function () {
        // Go to the previous page when 'previous is clicked
        previousPage(project);
    });

    project.next.addEventListener('click', function () {
        // Go to the next page when 'next' is clicked
        nextPage(project);
    });
}

function previousPage(project) {
    // This function changes the content of the modal popup
    // window to reflect the previous page, on the condition
    // that a previous page does exist

    let currentPage = Number(project.page.innerHTML[0]);
    let nextPage = currentPage - 1;

    if (nextPage == 0) {
        // we do not want to do any actions here
        return;
    }
    if (nextPage == 1) {
        // set the 'previous' button to a dead button
        project.previous.className = "smallDeadButton marginFull";
    }
    if (currentPage == project.totalPages) {
        // set the 'next' button to a live button
        project.next.className = "smallButton marginFull";
    }

    // Reset the image
    project.image.src = project.content[nextPage - 1][0];

    // Reset the text
    project.text.innerHTML = project.content[nextPage - 1][1];

    // Reset the page number
    project.page.innerHTML = String(nextPage) + "/" + String(project.totalPages);
    
}

function nextPage(project) {
    // This function changes the content of the modal popup
    // window to reflect the next page, on the condition
    // that the next does exist

    let currentPage = Number(project.page.innerHTML[0]);
    let nextPage = currentPage + 1;

    if (currentPage == project.totalPages) {
        // we do not want to do any actions here
        return;
    }
    if (nextPage == project.totalPages) {
        // set the 'next' button to a dead button
        project.next.className = "smallDeadButton marginFull";
    }
    if (currentPage == 1) {
        // set the 'previous' button to a live button
        project.previous.className = "smallButton marginFull";
    }

    // Reset the image
    project.image.src = project.content[nextPage - 1][0];

    // Reset the text
    project.text.innerHTML = project.content[nextPage - 1][1];

    // Reset the page number
    project.page.innerHTML = String(nextPage) + "/" + String(project.totalPages);
    
}

// Add an event listener to set the correct number of "total pages" for each project demo