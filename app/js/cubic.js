void function main(root = document.body) {
	let canvas_1 = document.getElementById('canvas_1');
	const container = document.querySelector('.canvas-container');
	const cubeControlButton = document.querySelectorAll('.cube-control__button');
	const cubeControlButtonRevers = document.querySelector('.cube-control__reverse-button');


	// Создаём рендерер
	const renderer = new THREE.WebGLRenderer({canvas: canvas_1, antialias: true, alpha: true});
	//const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
	renderer.setSize(canvas_1.clientWidth, canvas_1.clientHeight);

	// window.addEventListener('resize', () => {
	// 	canvas_1 = document.getElementById('canvas_1');
	// 	renderer.setSize(canvas_1.clientWidth, canvas_1.clientHeight);
	// })
	// Вставляем канвас в html
	//root.appendChild(renderer.domElement);

	// Создаём сцену
	const scene = new THREE.Scene();
	// scene.background = new THREE.Color(0x204550);
	window.scene = scene;
	// Создаём камеру
	const camera = new THREE.PerspectiveCamera(60, canvas_1.clientWidth / canvas_1.clientHeight, 1, 10000);
	camera.position.set(-200, 200, 250);

	// Создаём управление камерой
	const orbit = new THREE.OrbitControls(camera, container); //

	//orbit.autoRotate = true;
	orbit.enableDamping = true;
	orbit.dampingFactor = 0.5;
	//orbit.enableKeys = false;
	orbit.enablePan = false;
	orbit.enableZoom = false;




	// Добавляем немнго света
	scene.add(new THREE.AmbientLight(0xF7F7F7));
	
	// Запускаем перерисовку
	void function animate() {
		TWEEN.update();
		orbit.update();
		renderer.render(scene, camera);
		requestAnimationFrame(animate);
	}();


	void function initializeCube() {
		// Создаём константу-размер малого кубика
		const SIZE_OF_PIECE = 65;
		const SIZE_OF_PIECE_WITH_GAPS = SIZE_OF_PIECE * 1.02;
		// Создаём константы для сторон
		const FRONT = 'front',
					BACK = 'back',
					TOP = 'top',
					BOTTOM = 'bottom',
					LEFT = 'left',
					RIGHT = 'right';

		const cube3x3 = new Array(26).fill(null).map(() => ({
			colors: new Array(6).fill(''),
			position: new Array(3).fill(0)
		}));

		void function initialize3x3() {
			getSide(FRONT, cube3x3).forEach(({colors, position}, index) => {
				colors[0] = 'white' + '-' + index;
				position[0] = 1;
			});
			getSide(BACK, cube3x3).forEach(({colors, position}, index) => {
				colors[1] = 'orange' + '-' + index;
				position[0] = -1;
			});
			getSide(TOP, cube3x3).forEach(({colors, position}, index) => {
				colors[2] = 'yellow' + '-' + index;
				position[1] = 1;
			});
			getSide(BOTTOM, cube3x3).forEach(({colors, position}, index) => {
				colors[3] = 'blue' + '-' + index;
				position[1] = -1;
			});
			getSide(LEFT, cube3x3).forEach(({colors, position}, index) => {
				colors[4] = 'red' + '-' + index;
				position[2] = 1;
			});
			getSide(RIGHT, cube3x3).forEach(({colors, position}, index) => {
				colors[5] = 'green' + '-' + index;
				position[2] = -1;
			});
		}();

		function getSide(side, array) {
			switch (side) {
				case FRONT:
					return array.slice(0, 9);
				case BACK:
					return array.slice(17);
				case TOP:
					return [
						...array.slice(0, 3),
						...array.slice(9, 12),
						...array.slice(17, 20),
					];
				case BOTTOM:
					return [
						...array.slice(6, 9),
						...array.slice(14, 17),
						...array.slice(23, 26),
					];
				case LEFT:
					return [
						array[0],
						array[3],
						array[6],
						array[9],
						array[12],
						array[14],
						array[17],
						array[20],
						array[23],
					];
				case RIGHT:
					return [
						array[2],
						array[5],
						array[8],
						array[11],
						array[13],
						array[16],
						array[19],
						array[22],
						array[25],
					];
			}
		}

		const createPiece = (function () {

			const loader = new THREE.TextureLoader();

			const BLACK_MATERIAL = new THREE.MeshBasicMaterial({color: 0x000000});

				const RED_MATERIAL = [],
					WHITE_MATERIAL = [],
					ORANGE_MATERIAL = [],
					YELLOW_MATERIAL = [],
					GREEN_MATERIAL = [],
					BLUE_MATERIAL = [];

				for (let i = 1; i < 10; i++) {
					BLUE_MATERIAL.push(
						new THREE.MeshBasicMaterial({map: loader.load(`../images/cubic/blue/${i}.jpg`)})
					)
					RED_MATERIAL.push(
						new THREE.MeshBasicMaterial({map: loader.load(`../images/cubic/red/${i}.jpg`)})
					)
					YELLOW_MATERIAL.push(
						new THREE.MeshBasicMaterial({map: loader.load(`../images/cubic/yellow/${i}.jpg`)})
					)
					WHITE_MATERIAL.push(
						new THREE.MeshBasicMaterial({map: loader.load(`../images/cubic/white/${i}.jpg`)})
					)
					GREEN_MATERIAL.push(
						new THREE.MeshBasicMaterial({map: loader.load(`../images/cubic/green/${i}.jpg`)})
					)
					ORANGE_MATERIAL.push(
						new THREE.MeshBasicMaterial({map: loader.load(`../images/cubic/orange/${i}.jpg`)})
					)
				}
				
			const pieceGeometry = new THREE.BoxGeometry(SIZE_OF_PIECE, SIZE_OF_PIECE, SIZE_OF_PIECE);

			function mapColor(color) {
				switch (color) {
					case 'white':
						return WHITE_MATERIAL;
					case 'orange':
						return ORANGE_MATERIAL;
					case 'green':
						return GREEN_MATERIAL;
					case 'red-1':
						return new_RED_MATERIAL[0];
					case 'yellow':
						return YELLOW_MATERIAL;
					case 'blue':
						return BLUE_MATERIAL;
					default:
						return BLACK_MATERIAL;
				}
			} // Убрать

			function mapColor2(color) {
					for (let i = 0; i < 9; i++) {
						switch (color) {
							case `white-${i}`:
								return WHITE_MATERIAL[i];
							case `orange-${i}`:
								return ORANGE_MATERIAL[i];
							case `green-${i}`:
								return GREEN_MATERIAL[i];
							case `red-${i}`:
								return RED_MATERIAL[i];
							case `yellow-${i}`:
								return YELLOW_MATERIAL[i];
							case `blue-${i}`:
								return BLUE_MATERIAL[i];
						}
					}
					switch (color) {
						default:
							return BLACK_MATERIAL;
					}
			}

			return (colors) => new THREE.Mesh(pieceGeometry, colors.map(mapColor2));
		})();

		const allPieces = [];
		cube3x3.forEach(({colors, position: [x, y, z]}) => {
			const smallPiece = createPiece(colors);
			smallPiece.position.set(
				SIZE_OF_PIECE_WITH_GAPS * x,
				SIZE_OF_PIECE_WITH_GAPS * y,
				SIZE_OF_PIECE_WITH_GAPS * z
			);
			allPieces.push(smallPiece);
			scene.add(smallPiece);
		});


		void function controller() {
			const control = new THREE.Object3D();
			window.control = control;
			window.pieces = allPieces;

			scene.add(control);
			const tween = new TWEEN.Tween({delta: 0});
			tween.to({delta: 1}, 350);
			let axis, clockwise;
			const ninetyDegrees = Math.PI / 2;
			const rotatingSide = [];
			tween.onStart(() => {
				control.rotation.set( 0, 0, 0 );
				control.updateMatrixWorld(true);
				rotatingSide.forEach((box) => {
					box.updateMatrixWorld(true);
					THREE.SceneUtils.attach(box, scene, control);
				});
			});
			tween.onUpdate(({delta}) => {
				control.rotation[axis] = (ninetyDegrees * clockwise * delta);
			});
			tween.onComplete((tick) => {
				control.updateMatrixWorld(true);
				rotatingSide.forEach((box) => {
					box.updateMatrixWorld(true);
					THREE.SceneUtils.detach(box, control, scene);
				});
				rotatingSide.length = 0;
				tick.delta = 0;
			});

			window.addEventListener('keydown', function handleKeyDown({keyCode, shiftKey}) {
				if (tween.isPlaying())
					return;
				clockwise = shiftKey ? -1 : 1;
				let filtered;
				switch (keyCode) {
					case 81: // q
						axis = 'x';
						filtered = allPieces.filter(({position: {x}}) => x > SIZE_OF_PIECE);
						filtered.forEach(item => rotatingSide.push(item));
						tween.start();
						break;
					case 65: // a
						axis = 'x';
						filtered = allPieces.filter(({position: {x}}) => x < -SIZE_OF_PIECE);
						filtered.forEach(item => rotatingSide.push(item));
						tween.start();
						break;
					case 87: // w
						axis = 'y';
						filtered = allPieces.filter(({position: {y}}) => y > SIZE_OF_PIECE);
						filtered.forEach(item => rotatingSide.push(item));
						tween.start();
						break;
					case 83: // s
						axis = 'y';
						filtered = allPieces.filter(({position: {y}}) => y < -SIZE_OF_PIECE);
						filtered.forEach(item => rotatingSide.push(item));
						tween.start();
						break;
					case 69: // e
						axis = 'z';
						filtered = allPieces.filter(({position: {z}}) => z > SIZE_OF_PIECE);
						filtered.forEach(item => rotatingSide.push(item));
						tween.start();
						break;
					case 68: // d
						axis = 'z';
						filtered = allPieces.filter(({position: {z}}) => z < -SIZE_OF_PIECE);
						filtered.forEach(item => rotatingSide.push(item));
						tween.start();
						break;
				}
			});

			let shiftDown
				cubeControlButtonRevers.addEventListener("mousedown", () => {
					shiftDown = true
				})
				cubeControlButtonRevers.addEventListener("mouseup", () => {
					shiftDown = false
				})
			cubeControlButton.forEach((e) => {
				e.addEventListener("click", () => {
					if (tween.isPlaying())
					return;
					clockwise = shiftDown ? -1 : 1;
					console.log(clockwise)
					switch (e.innerHTML) {
						case "q": // q
						axis = 'x';
						filtered = allPieces.filter(({position: {x}}) => x > SIZE_OF_PIECE);
						filtered.forEach(item => rotatingSide.push(item));
						tween.start();
						break;
						case "a": // a
						axis = 'x';
						filtered = allPieces.filter(({position: {x}}) => x < -SIZE_OF_PIECE);
						filtered.forEach(item => rotatingSide.push(item));
						tween.start();
						break;
					case "w": // w
						axis = 'y';
						filtered = allPieces.filter(({position: {y}}) => y > SIZE_OF_PIECE);
						filtered.forEach(item => rotatingSide.push(item));
						tween.start();
						break;
					case "s": // s
						axis = 'y';
						filtered = allPieces.filter(({position: {y}}) => y < -SIZE_OF_PIECE);
						filtered.forEach(item => rotatingSide.push(item));
						tween.start();
						break;
					case "e": // e
						axis = 'z';
						filtered = allPieces.filter(({position: {z}}) => z > SIZE_OF_PIECE);
						filtered.forEach(item => rotatingSide.push(item));
						tween.start();
						break;
					case "d": // d
						axis = 'z';
						filtered = allPieces.filter(({position: {z}}) => z < -SIZE_OF_PIECE);
						filtered.forEach(item => rotatingSide.push(item));
						tween.start();
						break;
					}
				});
			});
		}();
	}();
}();
