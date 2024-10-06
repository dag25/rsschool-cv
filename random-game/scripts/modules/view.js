import { SIZE_BLOCK, COLUMNS, ROWS } from '../index.js';

export class View {
  constructor(container) {
    this.container = container;
    this.preview();
  }

  colors = {
	I: '#dd00c7',
  J: '#45B749',
  L: '#ff7c7c',
  O: '#FFD700',
  2: '#2196F3',
  T: '#07ffda',
  S: '#FF5722',
  };

  canvas = document.createElement('canvas');
  context = this.canvas.getContext('2d');

  preview(container) {
    const title = document.createElement('p');
    title.style.textAlign = 'center';
    title.textContent = 'Push Enter to start the game';
    title.className = 'title';
    this.container.append(title);
  }
  init(){
    this.canvas.classList.add('game-area');

    this.container.append(this.canvas);

    this.canvas.width = SIZE_BLOCK * COLUMNS;
    this.canvas.height = SIZE_BLOCK * ROWS;
  }

  showArea(area) {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let y = 0; y < area.length; y++) {
      const line = area[y];
      for (let x = 0; x < area.length; x++) {
        const block = line[x];
        if (block !== 'o') {
          this.context.fillStyle = this.colors[block];
          this.context.strokeStyle = 'white';
          this.context.fillRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK);
          this.context.strokeRect(
						x * SIZE_BLOCK,
						y * SIZE_BLOCK,
						SIZE_BLOCK,
						SIZE_BLOCK,
					);
        }
      }
    }
  };
}
