// const openModalGIS = document.getElementById("GISDemo");
// const closeModalGIS = document.getElementById("modalExitGIS");
// const currentModalGIS = document.getElementById("currentPageGIS");
// const previousModalGIS = document.getElementById("previousGIS");
// const nextModalGIS = document.getElementById("nextGIS");

let gis = {
    open: document.getElementById("GISDemo"),
    close: document.getElementById("exitGIS"),
    page: document.getElementById("pageGIS"),
    previous: document.getElementById("previousGIS"),
    next: document.getElementById("nextGIS"),
    modal: document.getElementById("modalGIS")
}

let classifier = {
    open: document.getElementById("ClassifierDemo"),
    close: document.getElementById("exitClassifier"),
    page: document.getElementById("pageClassifier"),
    previous: document.getElementById("previousClassifier"),
    next: document.getElementById("nextClassifier"),
    modal: document.getElementById("modalClassifier")
}

let allProjects = [gis, classifier];

for (let i = 0; i < allProjects.length; i++) {
    let project = allProjects[i];

    project.open.addEventListener('click', function () {
        project.modal.className = "modal";
    });

    project.close.addEventListener('click', function () {
        project.modal.className = "modal modal-hidden";
    });
}

