import IGameProps from '../interfaces/IGameProps';
import BotPlayground from './BotPlayground';
import Controles from './Controles';
import PlayerPlayground from './PlayerPlayground';

class Game {
    public playerPlayground: PlayerPlayground;
    public botPlayground: BotPlayground;
    public controls: Controles;

    constructor(props: IGameProps) {
        this.playerPlayground = new PlayerPlayground({
            size: props.size,
            ships: props.ships,
            game: this,
        });
        this.botPlayground = new BotPlayground({
            size: props.size,
            ships: props.ships,
            game: this,
        });
        this.controls = new Controles({object: props.controls, game: this});
        this.controls.initInfo();
        this.botPlayground.setPlaypool(props.botElemnt);
        this.playerPlayground.draw(props.playerElement);
        this.playerPlayground.drawPicker(props.playerPicker);
    }

    public startGame() {
        this.controls.initGameStart();
    }

    public startGameClick() {
        this.botPlayground.allowClick();
    }

    public checkWin() {

    }
}

export default Game;
