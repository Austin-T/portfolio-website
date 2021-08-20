// Outline the content to be added to the GIS Data Hub window
let GIScontent = [
    ["./images/searchGIS.gif", "Search through over 12,000 trusted collections of data with a keyword search, or select the most appropriate category."],
    ["./images/filterGIS2.gif", "Filter datasets by content type, access privilege, tags, category, and date"],
    ["./images/datasetGIS.gif", "Use a preview to examine a dateset befor you download it. If it is not what you were looking for, see closely related material."],
    ["./images/initiativeGIS.gif", "View graphic representations of Alberta's most important data, relating to environmental initiatives. See live metrics for the most up to date stats on the health of our environment."],
    ["./images/storymapGIS.gif", "Walk through interactive 'story maps' that combine important data sets to paint a larger picture."],
    ["./images/dashboardsGIS.gif", "Play with interactive dashboards and maps. Find data related to a specific location or region."]
];

// Outline the content to be added to the Facial Expression Classifier window
let ClassifierContent = [
    ["./images/testgif.gif", "A full demo will be available soon"]
];

// Outline the content to be added to the Twitter Analytics Tool window
let AnalystContent = [
    ["./images/metaAnalyst.gif", "View high-level account information on your targeted twitter page."],
    ["./images/audienceAnalyst.gif", "See how your audience is tweeting about your brand: a deep learning model is used to conduct sentiment analysis on the most recent tweets that are mentioning your name."],
    ["./images/engagementAnalyst.gif", "View the total amount of favourites and retweets that your account is recieving on a daily basis. Evaluate your performance over time."],
    ["./images/hashtagAnalyst.gif", "Observe the correlation between the hashtags you are using, and the level of engagement that twitter users have with the associated posts."],
    ["./images/tweetsAnalyst.gif", "See your top performing tweets from the last month. For each tweet, sentiment analysis is conducted on it's responses, and the level of positive feedback is displayed. Also, check out your likes and retweets."],
    ["./images/sortAnalyst.gif", "Organize your top tweets based on likes, retweets, or feedback."],
];

// The GIS Data Hub Modal Popup Window
let gis = {
    open1: document.getElementById("GISDemo"),
    open2: document.getElementById("GISDemoI"),
    open3: document.getElementById("GISDemoT"),
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
    open1: document.getElementById("ClassifierDemo"),
    open2: document.getElementById("ClassifierDemoI"),
    open3: document.getElementById("ClassifierDemoT"),
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

// The Twitter Analytics Tool Popup Window
let analyst = {
    open1: document.getElementById("AnalystDemo"),
    open2: document.getElementById("AnalystDemoI"),
    open3: document.getElementById("AnalystDemoT"),
    close: document.getElementById("exitAnalyst"),
    page: document.getElementById("pageAnalyst"),
    previous: document.getElementById("previousAnalyst"),
    next: document.getElementById("nextAnalyst"),
    modal: document.getElementById("modalAnalyst"),
    text: document.getElementById("textAnalyst"),
    image: document.getElementById("imageAnalyst"),
    content: AnalystContent,
    totalPages: AnalystContent.length
}

let allProjects = [gis, classifier, analyst];

for (let i = 0; i < allProjects.length; i++) {
    let project = allProjects[i];

    project.open1.addEventListener('click', function () {
        // Open the modal window when 'open' is clicked
        project.modal.className = "modal";
    });

    project.open2.addEventListener('click', function () {
        // Open the modal window when the image is clicked
        project.modal.className = "modal";
    });

    project.open3.addEventListener('click', function () {
        // Open the modal window when the title is clicked
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

// Create event listeners for external links
document.getElementById("PathfinderDemoT").addEventListener('click', function () {
    // Open the link for the pthfinder project
    window.open("https://austin-t.github.io/Pathfinder/");
});
document.getElementById("PathfinderDemoI").addEventListener('click', function () {
    // Open the link for the pthfinder project
    window.open("https://austin-t.github.io/Pathfinder/");
});
