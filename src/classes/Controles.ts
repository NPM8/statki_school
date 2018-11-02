import IControles from '../interfaces/IControles';
import Game from './Game';

class Controles {
    private _main: HTMLDivElement;
    private _info: HTMLDivElement;
    private _startControler: HTMLDivElement;
    private _game: Game;

    constructor({object, game }: IControles) {
        this._main = object;
        this._game = game;
        this._info = document.createElement('div');
        this.handleStartButtonClick = this.handleStartButtonClick.bind(this);
    }

    public initInfo() {
        this._main.appendChild(this._info);
        this._info.innerText = 'Ustaw statki!';
        this._info.classList.add('info');
    }

    public infoSet(text: string) {
        this._info.innerText = text;
    }

    public initGameStart() {
        this.infoSet('Kliknij start aby rozpocząć');
        this._startControler = document.createElement('div');
        const tmp = document.createElement('button');
        tmp.innerText = 'START';
        tmp.onclick = this.handleStartButtonClick;
        this._startControler.appendChild(tmp);
        this._main.appendChild(this._startControler);
    }

    public disableGameStart() {
        this._main.removeChild(this._startControler);
        this.makeMove();
    }

    public makeMove() {
        this.infoSet('Wykonaj ruch');
    }

    public botMove() {
        this.infoSet('Ruch Bota');
    }

    public makeItRed() {
        this._info.classList.add('info-red');
        setTimeout(() => this._info.classList.remove('info-red'), 200);
    }

    private handleStartButtonClick() {
        this._game.startGameClick();
        this.disableGameStart();
    }
}

export default Controles;
