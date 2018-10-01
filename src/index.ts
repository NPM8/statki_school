import Playground from './classes/Playground';
import './style/index.css';


const test: string = 'Hello world';

(function init() {
    const playground = new Playground({
        size: [ 10, 10 ],
        ships: [[ 1, 4], [2, 3], [3, 2], [4, 1]],
    });
    playground.init(document.getElementById('root'));
})();
