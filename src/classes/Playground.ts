import IPlaygraundProps from '../interfaces/IPlaygraundProps';
import IPosition from '../interfaces/IPosition';
import Ship from './Ship';
enum EDirection {
    UP = 1,
    RIGHT,
    DOWN,
    LEFT,
}

/**
 * Playground class
 */
export default class Playground {

    private Size: [number, number];
    private Ships: Ship[];
    private PlayArray: number[][];
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
        this.Ships.sort((a, b) => a.size - b.size);
        for (let i = 0; i < this.Size[0]; i++) {
            this.PlayArray.push([]);
            for (let j = 0; j < this.Size[1]; j++) {
                this.PlayArray[i].push(0);
            }
        }
    }

    public init(x: Element): void {
        for (const ship of this.Ships) {
            // console.table(this.PlayArray);
            let random: boolean = true;
            while (random) {
                const tmpPos: IPosition = this.GenRandomPosition();
                if (this.PlayArray[tmpPos.x][tmpPos.y] === 1 ) {
                    continue;
                } else if (ship.size === 1) {
                    console.log('Ship: ', ship.size);
                    const testArray = this.PlayArray.slice(tmpPos.x + 1, tmpPos.x - 1).map((p) => {
                        console.log('Try: ', p);
                        if (tmpPos.y === 0) {
                            return p.slice(0, 1);
                        } else if (tmpPos.y === this.Size[1] - 1) {
                            return p.slice(0, tmpPos.y - 1);
                        } else {
                            return p.slice(tmpPos.y - 1, tmpPos.y + 1);
                        }
                    });
                    console.log(testArray);
                    if (testArray.every((p) => p.every((v) => v === 0))) {
                        ship.Position = tmpPos;
                        ship.setShip(this.PlayArray);
                        random = false;
                    } else {
                        continue;
                    }
                } else {
                    ship.Position = tmpPos;
                    let randomDir: boolean = true;
                    let Direction: string;
                    while (randomDir) {
                        Direction = EDirection[Math.floor(Math.random() * 4 + 1)];
                        switch (Direction) {
                            case 'UP':
                                if (ship.Position.x - ship.size + 1 >= 0) {
                                    const toTest = Array.from(this.PlayArray
                                            .slice(ship.Position.x + ship.size - 1, ship.Position.x + 1),
                                        (p: number[]) => {
                                        if (ship.Position.y === 0) {
                                            return p.slice(0, 2);
                                        } else if (ship.Position.y === this.Size[1] - 1) {
                                            return p.slice(ship.Position.y - 1);
                                        } else {
                                            return p.slice(ship.Position.y - 1, ship.Position.y + 2);
                                        }
                                    });
                                    // console.table(toTest);
                                    // console.log(toTest.every((p) => p.every((v) => v === 0)));
                                    if (toTest.every((p) => p.every((v) => v === 0))) {
                                        randomDir = false;
                                    }
                                }
                                break;
                            case 'DOWN':
                                if (ship.Position.x + ship.size - 1 <= this.Size[0]) {
                                    const toTest = Array.from(this.PlayArray
                                        .slice(ship.Position.x, ship.Position.x + 1),
                                        (p: number[]) => {
                                        if (ship.Position.y === 0) {
                                            return p.slice(0, 2);
                                        } else if (ship.Position.y === this.Size[1] - 1) {
                                            return p.slice(ship.Position.y - 1);
                                        } else {
                                            return p.slice(ship.Position.y - 1, ship.Position.y + 2);
                                        }
                                    });
                                    // console.table(toTest);
                                    // console.log(toTest.every((p) => p.every((v) => v === 0)));
                                    if (toTest.every((p) => p.every((v) => v === 0))) {
                                        randomDir = false;
                                    }
                                }
                                break;
                            case 'LEFT':
                                if (ship.Position.y - ship.size + 1 >= 0) {
                                    const toTest = Array.from(this.PlayArray
                                        .slice(
                                            (ship.Position.x - 1 >= 0)
                                                ? ship.Position.x - 1
                                                : 0,
                                            (ship.Position.x + 1 <= this.Size[0] - 1)
                                                ? ship.Position.x + 1
                                                : this.Size[0]),
                                        (p) => {
                                            if (ship.Position.y + ship.size - 1 === this.Size[1] - 1) {
                                                return p.slice(ship.Position.y - 1);
                                            } else {
                                                return p.slice(ship.Position.y - ship.size + 1, ship.Position.y + 1);
                                            }
                                        });
                                    // console.table(toTest);
                                    // console.log(toTest.every((p) => p.every((v) => v === 0)));
                                    if (toTest.every((p) => p.every((v) => v === 0))) {
                                        randomDir = false;
                                    }
                                }
                                break;
                            case 'RIGHT':
                                if (ship.Position.y + ship.size - 1 <= this.Size[1]) {
                                    const toTest = Array.from(this.PlayArray
                                            .slice(
                                                (ship.Position.x - 1 >= 0)
                                                    ? ship.Position.x - 1
                                                    : 0,
                                                (ship.Position.x + 1 <= this.Size[0] - 1)
                                                    ? ship.Position.x + 1
                                                    : this.Size[0]),
                                        (p) => {
                                            if (ship.Position.y + ship.size - 1 === this.Size[1] - 1) {
                                                return p.slice(ship.Position.y - 1);
                                            } else {
                                                return p.slice(ship.Position.y - 1, ship.Position.y + ship.size + 1);
                                            }
                                        });
                                    // console.table(toTest);
                                    // console.log(toTest.every((p) => p.every((v) => v === 0)));
                                    if (toTest.every((p) => p.every((v) => v === 0))) {
                                        randomDir = false;
                                    }
                                }
                                break;
                            default:
                                throw Error('Something went wrong');
                        }
                    }
                    ship.Position = tmpPos;
                    ship.setShip(this.PlayArray, Direction);
                    random = false;
                }
            }
        }
        for (let i = 0; i < this.PlayArray.length; i++) {
            for (let j = 0; j < this.PlayArray[i].length; j++) {
                const tmpObj = document.createElement('div');
                tmpObj.classList.add((this.PlayArray[i][j] === 0)  ? 'white' : 'black');
                x.appendChild(tmpObj);
            }
        }
    }

    private GenRandomPosition(): IPosition {
        const toRet: IPosition = {
            x: null, y: null,
        };
        toRet.x = Math.abs(Math.floor(Math.random() * this.Size[0]) - 1);
        // toRet.x = (toRet.x < 0) ? 0 : toRet.x;
        toRet.y = Math.abs(Math.floor(Math.random() * this.Size[1]) - 1);
        // toRet.y = (toRet.y < 0) ? 0 : toRet.y;
        console.log('Gen: ', toRet);
        return toRet;
    }


}
