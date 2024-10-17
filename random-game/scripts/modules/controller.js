export class Controller {
  pressed = 0;

  constructor(game, view) {
    this.game = game;
    this.view = view;
  }
  init(codeKey) {
    window.addEventListener('keydown', event => {
      if (event.code === codeKey && this.pressed === 0) {
        this.pressed = 1;
        this.view.init();
        this.start();
        // window.removeEventListener('keydown', event);
        // return;
      }else if (event.code === codeKey && this.pressed === 2) {
        this.pressed = 1;
				this.view.init();
				this.game.restart();

        this.view.showArea(this.game.viewArea);
        const showScore = this.view.createBlockScore();
				const showNextTetramino = this.view.createBlockNextTetramino();
				this.game.createUpdatePanels(showScore, showNextTetramino);
        this.view.createBlockInstructions();
      }
    });
  }
  start() {
    this.view.showArea(this.game.viewArea());
    const showScore = this.view.createBlockScore();
    const showNextTetramino = this.view.createBlockNextTetramino();
    const showInstruction = this.view.createBlockInstructions();
    this.game.createUpdatePanels(showScore, showNextTetramino, showInstruction);

    const tick = () => {
      const time = (1100 - 100 * this.game.level);

      if (this.game.gameOver) {
        this.view.gameOver();
        this.pressed = 2;
        this.game.musicsound.pause();
        // this.game.gameOverSound.play();
      }

      setTimeout(
				() => {
					// if (this.game.gameOver) return;

					this.game.moveDown();
					this.view.showArea(this.game.viewArea());
					tick();
				},
				time > 100 ? time : 100 - 2 * this.game.level,
			);
    };
    tick();

    window.addEventListener('keydown', event => {
      const key = event.code;

      switch (key) {
        case 'ArrowLeft':
          this.game.moveLeft();
          this.view.showArea(this.game.viewArea());
          break;
        case 'ArrowRight':
          this.game.moveRight();
          this.view.showArea(this.game.viewArea());
          break;
        case 'ArrowDown':
          this.game.moveDown();
          this.view.showArea(this.game.viewArea());
          break;
        case 'ArrowUp':
          this.game.rotateTetramino();
          this.view.showArea(this.game.viewArea());
          break;
      }
    });
  };
}
