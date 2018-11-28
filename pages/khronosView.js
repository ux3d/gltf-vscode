(function() {
    'use strict';

window.KhronosView = function() {
    // Tracks if this engine is currently the active engine.
    var enabled = false;

	var canvas = null;
    var viewer = null;
	
    this.cleanup = function() {
		if (viewer != null)
		{
			viewer.currentlyRendering = false;
			viewer = null;
		}
		
		window.removeEventListener('resize', onWindowResize);
        enabled = false;
	};

    function onWindowResize() {
	}

    this.startPreview = function() {
		var gltfFileName = document.getElementById('gltfFileName').textContent;
		var gltfRootPath = document.getElementById('gltfRootPath').textContent;

		viewer = gltf_rv('canvas', 'assets/models/2.0/model-index.json', false, undefined, window.KHRONOS_BASE_URL, gltfFileName, gltfRootPath);

		if (viewer)
		{
			console.log("Khronos Viewer started.");
		}
		else
		{
			console.log("Khronos Viewer failed.");
		}
		
		enabled = true;
		window.addEventListener('resize', onWindowResize);
    };
};
})();
