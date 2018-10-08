import IPlaygraundProps from '../interfaces/IPlaygraundProps';
import IPosition from '../interfaces/IPosition';
import Ship from './Ship';

/**
 * Playground class
 */
export default class Playground {

    protected Size: [number, number];
    protected Ships: Ship[];
    protected PlayArray: number[][];
    private ElemsArray: number[][];
    /**
     * Initialazie document
     * @param props - Set of IPlaygroundProps
     */
    constructor(props: IPlaygraundProps) {
        this.Ships = [];
        this.PlayArray = [];
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
    }

    public drawTable(x: Element) {
        for (let i = 0; i < this.PlayArray.length; i++ ) {
            for (let j = 0; j < this.PlayArray[i].length; j++) {
                const tmpObj = document.createElement('div');
                tmpObj.classList.add((this.PlayArray[i][j] === 0)  ? 'white' : 'black');
                x.appendChild(tmpObj);
            }
        }
    }

    public draw(x: Element) {
        for (let i = 0; i < this.PlayArray.length; i++) {
            for (let j = 0; j < this.PlayArray.length; j++) {
                const tmpObj = document.createElement('div');
                x.appendChild(tmpObj);
            }
        }
    }

}
