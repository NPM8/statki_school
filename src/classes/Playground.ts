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
        this.Ships.sort((a, b) => b.size - a.size);
        console.log(this.Ships);
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
            let iter: number = 0;
            while (random) {
                iter++;
                if (iter === this.Size[0] * this.Size[1]) throw Error('something went wrong');
                const tmpPos: IPosition = this.GenRandomPosition();
                if (this.PlayArray[tmpPos.x][tmpPos.y] === 1 ) {
                    continue;
                } else if (ship.size === 1) {
                    const testArray = this.PlayArray.slice((tmpPos.x - 1 >= 0) ? tmpPos.x - 1 : tmpPos.x, (tmpPos.x + 2 < this.Size[0]) ? tmpPos.x + 2 : tmpPos.x + 1 ).map((p) => {
                        if (tmpPos.y === 0) {
                            return p.slice(0, 2);
                        } else if (tmpPos.y === this.Size[1] - 1) {
                            return p.slice(tmpPos.y - 1);
                        } else {
                            return p.slice(tmpPos.y - 1, tmpPos.y + 2);
                        }
                    });
                    if (testArray.every((p) => p.every((v) => v === 0))) {
                        ship.Position = tmpPos;
                        ship.setShip(this.PlayArray);
                        random = false;
                    } else {
                        continue;
                    }
                } else {
                    ship.Position = tmpPos;
                    let Direction: string;
                    Direction = EDirection[Math.floor(Math.random() * 4 + 1)];
                    switch (Direction) {
                        case 'UP':
                            if (ship.Position.x - ship.size + 1 >= 0) {
                                const toTest = Array.from(this.PlayArray
                                        .slice((ship.Position.x - ship.size >= 0) ? ship.Position.x - ship.size : 0, ship.Position.x + 2),
                                    (p: number[]) => {
                                    if (ship.Position.y === 0) {
                                        return p.slice(0, 2);
                                    } else if (ship.Position.y === this.Size[1] - 1) {
                                        return p.slice(ship.Position.y - 1);
                                    } else {
                                        return p.slice(ship.Position.y - 1, ship.Position.y + 2);
                                    }
                                });
                                console.log('On the roude: ', { test: toTest, pos: ship.Position, start: {x1: (ship.Position.x - 1 >= 0) ? ship.Position.x - 1 : 0, x2: ship.Position.x + ship.size}});
                                // console.log(toTest.every((p) => p.every((v) => v === 0)));
                                if (toTest.every((p) => p.every((v) => v === 0))) {
                                    ship.Position = tmpPos;
                                    ship.setShip(this.PlayArray, Direction);
                                    random = false;
                                }
                            }
                            break;
                        case 'DOWN':
                            if (ship.Position.x + ship.size - 1 <= this.Size[0]) {
                                const toTest = Array.from(this.PlayArray
                                    .slice((ship.Position.x - 1 >= 0) ? ship.Position.x - 1 : 0, (ship.Position.x + ship.size + 1 <= this.Size[0]) ? ship.Position.x + ship.size + 1 : this.Size[0]),
                                    (p: number[]) => {
                                    if (ship.Position.y === 0) {
                                        return p.slice(0, 2);
                                    } else if (ship.Position.y === this.Size[1] - 1) {
                                        return p.slice(ship.Position.y - 1);
                                    } else {
                                        return p.slice(ship.Position.y - 1, ship.Position.y + 2);
                                    }
                                });
                                console.log('Down the path: ', { test: toTest, pos: ship.Position, start: {x1: (ship.Position.x - 1 >= 0) ? ship.Position.x - 1 : 0, x2: ship.Position.x + ship.size}});
                                // console.log(toTest.every((p) => p.every((v) => v === 0)));
                                if (toTest.every((p) => p.every((v) => v === 0))) {
                                    ship.Position = tmpPos;
                                    ship.setShip(this.PlayArray, Direction);
                                    random = false;
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
                                            ? ship.Position.x + 2
                                            : this.Size[0]),
                                    (p) => {
                                        if (ship.Position.y - ship.size + 1 === 0) {
                                            return p.slice(0, ship.Position.y + 2);
                                        } else {
                                            return p.slice((ship.Position.y - ship.size >= 0) ? ship.Position.y - ship.size : 0, (ship.Position.y + 2 <= this.Size[1]) ? ship.Position.y + 2 : this.Size[1]);
                                        }
                                    });
                                console.log('Bad hand', { test: toTest, pos: ship.Position, start: {x1: (ship.Position.x - 1 >= 0) ? ship.Position.x - 1 : 0, x2: ship.Position.x + ship.size}});
                                // console.log(toTest.every((p) => p.every((v) => v === 0)));
                                if (toTest.every((p) => p.every((v) => v === 0))) {
                                    ship.Position = tmpPos;
                                    ship.setShip(this.PlayArray, Direction);
                                    random = false;
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
                                                ? ship.Position.x + 2
                                                : this.Size[0]),
                                    (p) => {
                                        if (ship.Position.y + ship.size === this.Size[1] ) {
                                            return p.slice(ship.Position.y - 1);
                                        } else {
                                            return p.slice((ship.Position.y - 1 >= 0) ? ship.Position.y - 1 : 0, (ship.Position.y + ship.size + 1 <= this.Size[1]) ? ship.Position.y + ship.size + 1 : this.Size[1]);
                                        }
                                    });
                                console.log('Right hand: ', { test: toTest, pos: ship.Position, start: {x1: (ship.Position.x - 1 >= 0) ? ship.Position.x - 1 : 0, x2: ship.Position.x + ship.size}});
                                // console.log(toTest.every((p) => p.every((v) => v === 0)));
                                if (toTest.every((p) => p.every((v) => v === 0))) {
                                    ship.Position = tmpPos;
                                    ship.setShip(this.PlayArray, Direction);
                                    random = false;
                                }
                            }
                            break;
                        default:
                            throw Error('Something went wrong');
                        }
                }
            }
        }
        for(let i = 0; i < this.PlayArray.length; i++ ) {
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
        // console.log('Gen: ', toRet);
        return toRet;
    }


}
