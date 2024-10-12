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



  preview() {
    this.container.textContent = '';
    const preview = document.createElement('div');
    preview.innerHTML = 'Press Enter <br> to start the game';
    this.container.append(preview);
    preview.style.cssText = `
    grid-column: 1/3;
    padding: 50px;
    border: 1px solid black;
    font-size: 24px;
    text-align: center;`;
  }
  init(){
    this.canvas.style.gridArea = 'game';
    this.container.textContent = '';
    this.canvas.classList.add('game-area');

    this.container.append(this.canvas);

    this.canvas.width = SIZE_BLOCK * COLUMNS;
    this.canvas.height = SIZE_BLOCK * ROWS;
  }

  createBlockScore(){
    const scoreBlock = document.createElement('div');
    scoreBlock.style.cssText = `
      grid-area: score;
      padding: 20px;
      border: 1px solid black;
      font-size: 18px;
      text-align: center;
    `;
    const linesElem = document.createElement('p');
    const scoreElem = document.createElement('p');
    const levelElem = document.createElement('p');
    const recordElem = document.createElement('p');

    scoreBlock.append(
      linesElem,
      scoreElem,
      levelElem,
      recordElem,
    );
    this.container.append(scoreBlock);
    return (lines,score,level,record) => {
      linesElem.textContent = `lines: ${lines}`;
      scoreElem.textContent = `score: ${score}`;
      levelElem.textContent = `level: ${level}`;
      recordElem.textContent = `record: ${record}`;
    }
  }
  createBlockNextTetramino(){
    const tetraminoBlock = document.createElement('div');
    tetraminoBlock.style.cssText = `
      width: ${SIZE_BLOCK * 4}px;
      height: ${SIZE_BLOCK * 4}px;
      grid-area: next;
      padding: 10px;
      border: 1px solid black;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    tetraminoBlock.append(canvas);
    this.container.append(tetraminoBlock);

    return (tetramino) => {
      canvas.width = SIZE_BLOCK * tetramino.length;
      canvas.height = SIZE_BLOCK * tetramino.length;
      context.clearRect(0, 0, canvas.width, canvas.height);

      for (let y = 0; y < tetramino.length; y++) {
        const line = tetramino[y];

        for (let x = 0; x < line.length; x++) {
          const block = line[x];
          if (block !== 'o') {
            context.fillStyle = this.colors[block];
            context.strokeStyle = 'white';
            context.fillRect(
              x * SIZE_BLOCK,
              y * SIZE_BLOCK,
              SIZE_BLOCK,
              SIZE_BLOCK);
            context.strokeRect(
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

  showArea(area) {
    const context = this.canvas.getContext('2d');
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let y = 0; y < area.length; y++) {
      const line = area[y];
      for (let x = 0; x < area.length; x++) {
        const block = line[x];
        if (block !== 'o') {
          context.fillStyle = this.colors[block];
          context.strokeStyle = 'white';
          context.fillRect(
            x * SIZE_BLOCK,
            y * SIZE_BLOCK,
            SIZE_BLOCK,
            SIZE_BLOCK
          );
          context.strokeRect(
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
