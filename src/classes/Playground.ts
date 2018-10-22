import IMainElement from '../interfaces/IMainElement';
import IPlaygraundProps from '../interfaces/IPlaygraundProps';
import IPosition from '../interfaces/IPosition';
import Game from './Game';
import Ship from './Ship';

/**
 * BotPlayground class
 */
export default class Playground {

    protected Size: [number, number];
    protected Ships: Ship[];
    public OCount: number = 0;
    protected PlayArray: number[][];
    protected ElemsArray: HTMLDivElement[][];
    protected MainElement: IMainElement;
    protected GameObject: Game;
    protected clickPosibilyty: boolean = true;

    /**
     * Initialazie document
     * @param props - Set of IPlaygroundProps
     */
    constructor(props: IPlaygraundProps) {
        this.GameObject = props.game;
        this.Ships = [];
        this.PlayArray = [];
        this.ElemsArray = [];
        this.Size = props.size;
        for (const ship of props.ships) {
            for (let i = 0; i < ship[0]; i++) {
                const tmp  = new Ship(ship[1]);
                this.Ships.push(tmp);
            }
        }
        console.log(this.Ships);
        this.Ships.sort((a, b) => b.size - a.size);
        console.log(this.Ships);
        for (let i = 0; i < this.Size[0]; i++) {
            this.PlayArray.push([]);
            for (let j = 0; j < this.Size[1]; j++) {
                this.PlayArray[i].push(0);
            }
        }
        for (let i = 0; i < this.Size[0]; i++) {
            this.ElemsArray.push([]);

        }
    }

    public checkMove(pos: IPosition): boolean {
        console.log('Chcekc move: ', this.ElemsArray[pos.x][pos.y].innerHTML);
        return this.ElemsArray[pos.x][pos.y].innerHTML === '';
    }

    public makeMove(pos: IPosition) {
        this.ElemsArray[pos.x][pos.y].innerHTML = (this.PlayArray[pos.x][pos.y] === 0) ? 'x' : 'o';
        console.log('Make move: ', this.ElemsArray[pos.x][pos.y].innerHTML);
    }

    public drawTable(x: Element) {
        this.ElemsArray = [];
        for (let i = 0; i < this.PlayArray.length; i++ ) {
            this.ElemsArray.push([]);
            for (let j = 0; j < this.PlayArray[i].length; j++) {
                const tmpObj = document.createElement('div');
                tmpObj.classList.add((this.PlayArray[i][j] === 0)  ? 'white' :
                    (this.PlayArray[i][j] === 2) ? 'green' :
                    (this.PlayArray[i][j] === 3) ? 'red' : 'black');
                this.ElemsArray[i].push(tmpObj);
                x.appendChild(tmpObj);
            }
        }
    }

    public draw(x: HTMLDivElement) {
        this.MainElement = x;
        for (let i = 0; i < this.PlayArray.length; i++) {
            for (let j = 0; j < this.PlayArray.length; j++) {
                const tmpObj = document.createElement('div');
                this.ElemsArray[i].push(tmpObj);
                x.appendChild(tmpObj);
            }
        }
    }

}
