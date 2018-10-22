import IGameProps from '../interfaces/IGameProps';
import PlayerPlayground from './PlayerPlayground';
import BotPlayground from './BotPlayground';

class Game {
    public playerPlayground: PlayerPlayground;
    public botPlayground: BotPlayground;

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
        this.botPlayground.setPlaypool(props.botElemnt);
        this.playerPlayground.draw(props.playerElement);
        this.playerPlayground.drawPicker(props.playerPicker);
    }

    public startGame() {
        this.botPlayground.allowClick();
    }

    public checkWin() {

    }
}

export default Game;
