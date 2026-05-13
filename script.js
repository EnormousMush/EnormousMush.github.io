/* ============ Animal popup ============ */
const animalData = {
    elephant: {
        title: 'Elephant',
        description: 'Chunky tasks that you have to complete in the present. A real analysis homework assignment would fall under this category.'
    },
    beaver: {
        title: 'Beaver',
        description: 'Tasks that connect directly with your future goals. Prepping for grad school applications would fall under this category.'
    },
    owl: {
        title: 'Owl',
        description: 'Tasks that are directed by yourself to learn things that you are interested in. Self-learning a new coding language would fall under here.'
    },
    dolphin: {
        title: 'Dolphin',
        description: 'Tasks that are considered creative and revolve around your hobbies and interests. Producing a new song would fall under here.'
    },
    bookworm: {
        title: 'Bookworm',
        description: 'Tasks that are considered "reading a book." Self-explanatory.'
    },
    bees: {
        title: 'Bees',
        description: 'Tasks that are related to planning and planning only.'
    }
};

const overlay = document.getElementById('popupOverlay');
const popupTitle = document.getElementById('popupTitle');
const popupDescription = document.getElementById('popupDescription');
const popupClose = document.querySelector('.popup-close');

document.querySelectorAll('.animal-block').forEach(block => {
    block.addEventListener('click', () => {
        const animal = block.dataset.animal;
        const data = animalData[animal];
        if (!data) return;
        popupTitle.textContent = data.title;
        popupDescription.textContent = data.description;
        overlay.classList.add('active');
    });
});

function hidePopup() {
    overlay.classList.remove('active');
}

popupClose.addEventListener('click', hidePopup);
overlay.addEventListener('click', (e) => {
    if (e.target === overlay) hidePopup();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hidePopup();
});

/* ============ STL Viewer ============ */
(function initSTLViewer() {
    const container = document.getElementById('stl-viewer');
    if (!container || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    function resize() {
        const size = container.clientWidth;
        renderer.setSize(size, size);
        camera.aspect = 1;
        camera.updateProjectionMatrix();
    }

    renderer.setClearColor(0x0a0a0a, 0);
    container.appendChild(renderer.domElement);

    const light1 = new THREE.DirectionalLight(0xffffff, 0.8);
    light1.position.set(1, 1, 1);
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0xffffff, 0.5);
    light2.position.set(-1, -1, -1);
    scene.add(light2);

    scene.add(new THREE.AmbientLight(0x404040));

    const loader = new THREE.STLLoader();
    loader.load(
        'https://dl.dropboxusercontent.com/scl/fi/t0i3fnsmpq8z92l1pljzk/V1.stl?rlkey=hn7m7ke4f7jg5fucjsgk2lfqg&st=lom8b1r7',
        (geometry) => {
            const material = new THREE.MeshPhongMaterial({
                color: 0xcccccc,
                specular: 0x111111,
                shininess: 50
            });
            const mesh = new THREE.Mesh(geometry, material);
            geometry.center();
            geometry.computeBoundingBox();
            const size = new THREE.Vector3();
            geometry.boundingBox.getSize(size);
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 100 / maxDim;
            mesh.scale.set(scale, scale, scale);
            scene.add(mesh);
        },
        undefined,
        (error) => console.log('STL load error:', error)
    );

    camera.position.z = 100;

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2;

    container.addEventListener('pointerdown', () => {
        controls.autoRotate = false;
    });

    resize();
    window.addEventListener('resize', resize);

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();
})();