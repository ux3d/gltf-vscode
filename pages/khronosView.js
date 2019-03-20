(function() {
    'use strict';

window.KhronosView = function() {
    var enabled = false;
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

    function subscribeToAnimUI(anim) {
        anim.active.subscribe(function(newValue) {
            if(viewer === undefined)
            {
                return;
            }

            viewer.setAnimation(anim.index);

            if (!newValue) {
                viewer.renderingParameters.animationTimer.pause();
            } else {
                viewer.renderingParameters.animationTimer.unpause();
            }
        });
    }

    function updateAnimationsUI(gltf) {
        if(gltf.animations === undefined)
        {
            return;
        }

        let koAnimations = [];
        for (var i = 0; i < gltf.animations.length; i++) {
            var anim = {
                index: i,
                name:  gltf.animations[i].name || i,
                active: ko.observable(false)
            };

            subscribeToAnimUI(anim);
            koAnimations.push(anim);
        }

        mainViewModel.animations(koAnimations);
        mainViewModel.anyAnimChanged();
    }

    this.startPreview = function() {
		var gltfFileName = document.getElementById('gltfFileName').textContent;
        var gltfRootPath = document.getElementById('gltfRootPath').textContent;

        mainViewModel.hasBackground(false);

        viewer = gltf_rv.gltf_rv('canvas', '', undefined, false, undefined, window.KHRONOS_BASE_URL, gltfRootPath + "/" + gltfFileName);

		if (viewer)
		{
            viewer.setGltfLoadedCallback(function(gltf)
            {
                updateAnimationsUI(gltf);
            });

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
