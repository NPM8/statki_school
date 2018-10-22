import Ship from '../classes/Ship';
import IPosition from './IPosition';

export default interface ILastSelected {
    position: IPosition;
    ship: Ship;
    direction: ('UP'|'RIGHT');
    color: string;
}
