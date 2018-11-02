import Game from './classes/Game';
import './style/index.css';


(function init(root) {
    const botElemnt = document.createElement('div');
    botElemnt.id = 'bot';
    const playerElement = document.createElement('div');
    playerElement.id = 'player';
    const playerPicker = document.createElement('div');
    const controls = document.createElement('div');
    controls.id = 'controls';

    root.appendChild(playerPicker);
    root.appendChild(playerElement);
    root.appendChild(controls);
    root.appendChild(botElemnt);
    // playground.init();
    // playground.drawTable(document.getElementById('root'));
    const game = new Game({
        size: [ 10, 10 ],
        ships: [[ 1, 4], [2, 3], [3, 2], [4, 1]],
        playerElement,
        botElemnt,
        playerPicker,
        controls,
    });
})(document.getElementById('root'));
