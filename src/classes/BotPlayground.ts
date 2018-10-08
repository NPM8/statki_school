import Playground from "./Playground";
import IPosition from '../interfaces/IPosition';
// import {extends} from 'tslint/lib/configs/latest';
enum EDirection {
    UP = 1,
    RIGHT,
    DOWN,
    LEFT,
}

export default class BotPlayground extends Playground {

    private init(x: Element): void {
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
                                            return p.slice((ship.Position.y - 1 >= 0) ?
                                                ship.Position.y - 1 : 0,
                                                (ship.Position.y + ship.size + 1 <= this.Size[1]) ?
                                                    ship.Position.y + ship.size + 1 : this.Size[1],
                                            );
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
