$(document).ready(function () {

    // Init scrollMagic
    let controller = new ScrollMagic.Controller();

    // build a scence for the arrow fade out
    let scene = new ScrollMagic.Scene({
        triggerElement: '#triggerBackdrop'
    })
    .setClassToggle('.arrow.bounce', 'fade-out')
    .addTo(controller);
});