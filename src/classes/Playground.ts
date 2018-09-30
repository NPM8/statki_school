import Ship from 'Ship';
import IPlaygraundProps from '../interfaces/IPlaygraundProps';
import IPosition from '../interfaces/IPosition';
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
    private Map = Array<Element>();
    /**
     * Initialazie document
     * @param props - Set of IPlaygroundProps
     */
    constructor(props: IPlaygraundProps) {
        this.Size = props.size;
        for (const ship of props.ships) {
            for (let i = 0; i < ship[0]; i++) {
                const tmp  = new Ship(ship[1]);
                this.Ships.push(tmp);
            }
        }
        this.Ships.sort((a, b) => a.size - b.size);
    }

    public init(x: Element): void {
        for (const ship of this.Ships) {
            let random: boolean = true;
            while (random) {
                const tmpPos: IPosition = this.GenRandomPosition();
                if (this.PlayArray[tmpPos.x][tmpPos.y] === 1 ) {
                    continue;
                } else if (ship.size === 1) {
                    ship.Position = tmpPos;
                    ship.setShip(this.PlayArray);
                    random = false;
                } else {
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
                                    console.table(toTest);
                                    console.log(toTest.every((p) => p.every((v) => v === 0)));
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
                                    console.table(toTest);
                                    console.log(toTest.every((p) => p.every((v) => v === 0)));
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
                                    console.table(toTest);
                                    console.log(toTest.every((p) => p.every((v) => v === 0)));
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
                                    console.table(toTest);
                                    console.log(toTest.every((p) => p.every((v) => v === 0)));
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
    }

    private GenRandomPosition(): IPosition {
        const toRet: IPosition = {
            x: null, y: null,
        };
        toRet.x = Math.floor(Math.random() * (this.Size[0] - 1));
        toRet.y = Math.floor(Math.random() * (this.Size[1] - 1));
        return toRet;
    }


}
