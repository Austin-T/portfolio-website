$(document).ready(function () {

    // Init scrollMagic
    let controller = new ScrollMagic.Controller();

    // build a scence
    let scene = new ScrollMagic.Scene({
        triggerElement: '#triggerBackdrop'
    })
    .setClassToggle('.coverMe', 'fade-in')
    .addTo(controller);
});