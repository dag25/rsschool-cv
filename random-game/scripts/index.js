const sizeBlock = 30;

const game = {
	area: [
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'x'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'x'],
		['x', 'x', 'o', 'o', 'o', 'x', 'o', 'o', 'o', 'x'],
		['o', 'x', 'x', 'o', 'x', 'x', 'x', 'o', 'o', 'x'],
	],
	activeTetramino: {
		x: 3,
		y: 0,
		block: [
			['o', 'x', 'o'],
			['o', 'x', 'o'],
			['x', 'x', 'o'],
		],
		rotateIndex: 0,
		rotation: [
			[
				['o', 'x', 'o'],
				['o', 'x', 'o'],
				['x', 'x', 'o'],
			],
			[
				['x', 'o', 'o'],
				['x', 'x', 'x'],
				['o', 'o', 'o'],
			],
			[
				['o', 'x', 'x'],
				['o', 'x', 'o'],
				['o', 'x', 'o'],
			],
			[
				['o', 'o', 'o'],
				['x', 'x', 'x'],
				['o', 'o', 'x'],
			],

		],
	},
	moveLeft() {
		if (
			this.checkOutPosition(this.activeTetramino.x - 1, this.activeTetramino.y)
		) {
			this.activeTetramino.x -= 1;
		}
	},
	moveRight() {
		if (
			this.checkOutPosition(this.activeTetramino.x + 1, this.activeTetramino.y)
		) {
			this.activeTetramino.x += 1;
		}
	},
	moveDown() {
		if (
			this.checkOutPosition(this.activeTetramino.x, this.activeTetramino.y + 1)
		) {
			this.activeTetramino.y += 1;
		}else {
      this.stopMove();
    }
	},
	rotateTetramino() {
    this.activeTetramino.rotateIndex =
      this.activeTetramino.rotateIndex < 3
        ? this.activeTetramino.rotateIndex + 1
        : 0;

    this.activeTetramino.block = this.activeTetramino.rotation[this.activeTetramino.rotateIndex];
    if (!this.checkOutPosition(this.activeTetramino.x, this.activeTetramino.y)) {
      this.activeTetramino.rotateIndex =
				this.activeTetramino.rotateIndex > 0
					? this.activeTetramino.rotateIndex - 1
					: 3;

			this.activeTetramino.block =
				this.activeTetramino.rotation[this.activeTetramino.rotateIndex];
    }

  },
	viewArea() {
		const area = JSON.parse(JSON.stringify(this.area));

		const { x, y, block: tetramino } = this.activeTetramino;
		for (let i = 0; i < tetramino.length; i++) {
			const row = tetramino[i];

			for (let j = 0; j < row.length; j++) {
				if (row[j] !== 'o') {
					area[y + i][x + j] = tetramino[i][j];
				}
			}
		}
		return area;
	},
	checkOutPosition(x, y) {
		const tetramino = this.activeTetramino.block;
		for (let i = 0; i < tetramino.length; i++) {
			for (let j = 0; j < tetramino[i].length; j++) {
				if (tetramino[i][j] === 'o') continue;

				if (
					!this.area[y + i] ||
					!this.area[y + i][x + j] ||
					this.area[y + i][x + j] !== 'o'
				) {
					return false;
				}
			}
		}
		return true;
	},
  stopMove() {
    const { x, y, block: tetramino } = this.activeTetramino;
		for (let i = 0; i < tetramino.length; i++) {
			const row = tetramino[i];

			for (let j = 0; j < row.length; j++) {
				if (row[j] !== 'o') {
					this.area[y + i][x + j] = tetramino[i][j];
				}
			}
		}
  },
};
game.viewArea();

// рисуем
const container = document.querySelector('.container');

const canvas = document.createElement('canvas');
canvas.classList.add('game-area');
container.append(canvas);

canvas.width = sizeBlock * 10;
canvas.height = sizeBlock * 20;

const context = canvas.getContext('2d');
const showArea = (area) => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (let y = 0; y < area.length; y++) {
    const line = area[y];
    for (let x = 0; x < area.length; x++) {
      const block = line[x];
      if (block !== 'o') {
        context.fillStyle = 'tomato';
        context.strokeStyle = 'white';
				context.fillRect(x * sizeBlock, y * sizeBlock, sizeBlock, sizeBlock);
				context.strokeRect(x * sizeBlock, y * sizeBlock, sizeBlock, sizeBlock);
      }
    }
  }
};
window.addEventListener('keydown', (event) => {
  const key = event.code;
  switch (key) {
    case 'ArrowLeft':
      game.moveLeft();
      showArea(game.viewArea());
      break;
    case 'ArrowRight':
      game.moveRight();
      showArea(game.viewArea());
      break;
    case 'ArrowDown':
      game.moveDown();
      showArea(game.viewArea());
      break;
    case 'ArrowUp':
      game.rotateTetramino();
      showArea(game.viewArea());
      break;

  }

});
showArea(game.viewArea());
