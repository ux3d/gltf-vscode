/*global BABYLON,mainViewModel,gltfViewer,ko*/

var gl = null;
var canvas = null;

(function() {
    'use strict';

window.KhronosView = function() {
    // Tracks if this engine is currently the active engine.
    //var canvas = null;
    var viewer = null;

    /**
    * @function cleanup
    * Perform any cleanup that needs to happen to stop rendering the current model.
    * This is called right before the active engine for the preview window is switched.
    */
    this.cleanup = function() {
    };

    function getWebGlContext()
    {
        const parameters = { alpha: false, antialias: false };
        const names = [ "webgl", "experimental-webgl" ];
        let context;
        for (const name of names)
        {
            context = canvas.getContext(name, parameters);
            if (context)
            {
                return context;
            }
        }
    }


    this.startPreview = function() {
        canvas = document.getElementById('khronosRenderCanvas');
        if (!canvas)
        {
            console.warn("Failed to retrieve the WebGL canvas!");
            return null;
        }

        gl = getWebGlContext();
        if (!gl)
        {
            console.warn("Failed to get an WebGL rendering context!");
        }

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
