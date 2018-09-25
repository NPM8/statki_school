import Ship from './classes/Ship';

let test: string = 'Hello world';

function init() {
    const ship = new Ship(5);
    ship.sound();
}

init();
