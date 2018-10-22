/**
 * For BotPlayground Class
 *
 * @size number of pools
 * @ships array of ships types tuples ([amount, size])
 */
import Game from '../classes/Game';

export default interface IPlaygraundProps {
    size: [number, number];
    ships: Array<[number, number]>;
    game: Game;
}
