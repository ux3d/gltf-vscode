/*global BABYLON,mainViewModel,gltfViewer,ko*/
(function() {
    'use strict';

window.KhronosView = function() {
    // Tracks if this engine is currently the active engine.
    var canvas = null;
    var viewer = null;

    /**
    * @function cleanup
    * Perform any cleanup that needs to happen to stop rendering the current model.
    * This is called right before the active engine for the preview window is switched.
    */
    this.cleanup = function() {
    };

    this.startPreview = function() {
        canvas = document.getElementById('khronosRenderCanvas');

        viewer = new gltfViewer(canvas, undefined, true, undefined);

        var gltfRootPath = document.getElementById('gltfRootPath').textContent;
        var gltfFile = document.getElementById('gltfFileName').textContent;
        viewer.loadFromPath(gltfFile, gltfRootPath);

        canvas.onmousedown = viewer.onMouseDown.bind(viewer);
        document.onmouseup = viewer.onMouseUp.bind(viewer);
        document.onmousemove = viewer.onMouseMove.bind(viewer);
        canvas.onwheel = viewer.onMouseWheel.bind(viewer);
        canvas.ontouchstart = viewer.onTouchStart.bind(viewer);
        document.ontouchend = viewer.onTouchEnd.bind(viewer);
        document.ontouchmove = viewer.onTouchMove.bind(viewer);

        canvas.ondrop = viewer.dropEventHandler.bind(viewer);
        canvas.ondragover = viewer.dragOverHandler.bind(viewer);
    };
};
})();
