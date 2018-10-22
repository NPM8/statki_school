import ILastSelected from '../interfaces/ILastSelected';
import IPlaygraundProps from '../interfaces/IPlaygraundProps';
import IPlaygroundMouseEvent from '../interfaces/IPlaygroundMouseEvent';
import IPosition from '../interfaces/IPosition';
import Playground from './Playground';
import Ship from './Ship';
// import {extends} from 'tslint/lib/configs/latest';

export default class PlayerPlayground extends Playground {
    private _SelectedShipSize: number;
    private _SetShipDirection: string = 'UP';
    private _SelectedShip: Ship;
    private _SelectedPosition: IPosition;
    private _LastSelected: ILastSelected;
    private _IsPosibleToPlaceShip: boolean = false;
    private _SelectedPickerObject: HTMLElement;
    private _CountShips: number = 0;

    constructor(props: IPlaygraundProps) {
        super(props);
        this.mouseInShipHnadler = this.mouseInShipHnadler.bind(this);
        this.mouseOutShipHandler = this.mouseOutShipHandler.bind(this);
        this.clickShipHandler = this.clickShipHandler.bind(this);
        this.mouseInPlaygroundHandler = this.mouseInPlaygroundHandler.bind(this);
        this.clickPlaygroundHandler = this.clickPlaygroundHandler.bind(this);
        this.mouseOutPlaygroundHandler = this.mouseOutPlaygroundHandler.bind(this);
        this.contextmanuPlaygroundHandler = this.contextmanuPlaygroundHandler.bind(this);
    }

    public drawPicker(x: Element) {
        for (const ship of this.Ships) {
            const main = document.createElement('div');
            main.classList.add('ship-hnadler');
            main.addEventListener('mouseenter', this.mouseInShipHnadler);
            main.addEventListener('mouseleave', this.mouseOutShipHandler);
            main.addEventListener('click', this.clickShipHandler);
            for (let i = 0; i < ship.size; i++) {
                const tmp = document.createElement('div');
                tmp.classList.add('base');
                main.appendChild(tmp);
            }
            x.appendChild(main);
        }

    }

    public draw(x: HTMLDivElement) {
        super.draw(x);
        for (const elemsArrayElement of this.ElemsArray) {
            for (const htmlDivElement of elemsArrayElement) {
                htmlDivElement.onclick = this.clickPlaygroundHandler;
                htmlDivElement.addEventListener('contextmenu', this.contextmanuPlaygroundHandler);
                htmlDivElement.addEventListener('mouseenter', this.mouseInPlaygroundHandler);
                htmlDivElement.addEventListener('mouseleave', this.mouseOutPlaygroundHandler);
            }
        }
    }

    public drawTable() {
        super.drawTable(this.MainElement);
        for (const elemsArrayElement of this.ElemsArray) {
            for (const htmlDivElement of elemsArrayElement) {
                htmlDivElement.onclick = this.clickPlaygroundHandler;
                htmlDivElement.addEventListener('contextmenu', this.contextmanuPlaygroundHandler);
                htmlDivElement.addEventListener('mouseenter', this.mouseInPlaygroundHandler);
                htmlDivElement.addEventListener('mouseleave', this.mouseOutPlaygroundHandler);
            }
        }
    }

    private mouseInShipHnadler(evt: IPlaygroundMouseEvent) {
        evt.stopPropagation();
        evt.target.classList.add('blue');
    }

    private mouseOutShipHandler(evt: IPlaygroundMouseEvent) {
        evt.stopPropagation();
        evt.target.classList.remove('blue');
    }

    private tmpSetShip(color: string, ship: Ship, direction: ('UP'|'RIGHT'), position: IPosition) {
        console.log('tmSet: ', {color, ship, direction, position});
        switch (direction) {
            case 'UP':
                for (let i = 0; i < ship.size; i++) {
                    const tmp: IPosition = {
                        x: position.x - i,
                        y: position.y,
                    };
                    this.ElemsArray[tmp.x][tmp.y].classList.add(`${color}-ship`);
                }
                break;
            case 'RIGHT':
                for (let i = 0; i < ship.size; i++) {
                    const tmp: IPosition = {
                        x: position.x,
                        y: position.y + i,
                    };
                    this.ElemsArray[tmp.x][tmp.y].classList.add(`${color}-ship`);
                }
                break;
            default:
                throw Error('Bad direction');
        }
        this._LastSelected = {
            color,
            direction,
            position,
            ship,
        };
    }

    private tmpUnSetShip() {
        if (this._LastSelected) {
            const {color, ship, direction, position} = this._LastSelected;
            console.log('tmUnSet: ', {color, ship, direction, position});
            switch (direction) {
                case 'UP':
                    for (let i = 0; i < ship.size; i++) {
                        const tmp: IPosition = {
                            x: position.x - i,
                            y: position.y,
                        };
                        this.ElemsArray[tmp.x][tmp.y].classList.remove(`${color}-ship`);
                    }
                    break;
                case 'RIGHT':
                    for (let i = 0; i < ship.size; i++) {
                        const tmp: IPosition = {
                            x: position.x,
                            y: position.y + i,
                        };
                        this.ElemsArray[tmp.x][tmp.y].classList.remove(`${color}-ship`);
                    }
                    break;
                default:
                    throw Error('Bad direction');
            }
            this._LastSelected = null;
        }
        this._IsPosibleToPlaceShip = false;
    }

    private mouseInPlaygroundHandler(evt: IPlaygroundMouseEvent) {
        evt.stopPropagation();
        const ship = this.Ships.find((value) => {
            if (value.size === this._SelectedShipSize && value.Position == null) {
                return true;
            } else {
                return false;
            }
        });

        this._SelectedShip = ship;

        const position = {
            x: this.ElemsArray.findIndex((value) => {
                return !!~value.indexOf(evt.target);
            }),
            y: 0,
        };

        position.y = this.ElemsArray[position.x].indexOf(evt.target);

        this._SelectedPosition = position;
        console.log(position);
        console.log(this._SelectedShip);

        switch (this._SetShipDirection) {
            case 'UP':
                if (this._SelectedPosition.x < this._SelectedShip.size) {
                    this._SelectedPosition.x = this._SelectedShip.size - 1;
                }
                if (this._SelectedPosition.x - ship.size + 1 >= 0) {
                    const toTest = Array.from(this.PlayArray
                            .slice((this._SelectedPosition.x - ship.size >= 0) ? this._SelectedPosition.x - ship.size : 0, this._SelectedPosition.x + 2),
                        (p: number[]) => {
                            if (this._SelectedPosition.y === 0) {
                                return p.slice(0, 2);
                            } else if (this._SelectedPosition.y === this.Size[1] - 1) {
                                return p.slice(this._SelectedPosition.y - 1);
                            } else {
                                return p.slice(this._SelectedPosition.y - 1, this._SelectedPosition.y + 2);
                            }
                        });
                    console.log('On the roude: ', { test: toTest, pos: this._SelectedPosition, start: {x1: (this._SelectedPosition.x - 1 >= 0) ? this._SelectedPosition.x - 1 : 0, x2: this._SelectedPosition.x + ship.size}});
                    // console.log(toTest.every((p) => p.every((v) => v === 0)));
                    if (toTest.every((p) => p.every((v) => v === 0))) {
                        this.tmpSetShip('green', this._SelectedShip, this._SetShipDirection, this._SelectedPosition);
                        this._IsPosibleToPlaceShip = true;
                    } else  {
                        this.tmpSetShip('red', this._SelectedShip, this._SetShipDirection, this._SelectedPosition);
                    }
                }
                break;
            case 'RIGHT':
                if (this._SelectedPosition.y >= this.Size[1] - (this._SelectedShip.size - 1)) {
                    this._SelectedPosition.y = this.Size[1] - this._SelectedShip.size;
                }
                if (this._SelectedPosition.y + ship.size - 1 <= this.Size[1]) {
                    const toTest = Array.from(this.PlayArray
                            .slice(
                                (this._SelectedPosition.x - 1 >= 0)
                                    ? this._SelectedPosition.x - 1
                                    : 0,
                                (this._SelectedPosition.x + 1 <= this.Size[0] - 1)
                                    ? this._SelectedPosition.x + 2
                                    : this.Size[0]),
                        (p) => {
                            if (this._SelectedPosition.y + ship.size === this.Size[1] ) {
                                return p.slice(this._SelectedPosition.y - 1);
                            } else {
                                return p.slice((this._SelectedPosition.y - 1 >= 0) ?
                                    this._SelectedPosition.y - 1 : 0,
                                    (this._SelectedPosition.y + ship.size + 1 <= this.Size[1]) ?
                                        this._SelectedPosition.y + ship.size + 1 : this.Size[1],
                                );
                            }
                        });
                    console.log('Right hand: ', { test: toTest, pos: this._SelectedPosition, start: {x1: (this._SelectedPosition.x - 1 >= 0) ? this._SelectedPosition.x - 1 : 0, x2: this._SelectedPosition.x + ship.size}});
                    // console.log(toTest.every((p) => p.every((v) => v === 0)));
                    if (toTest.every((p) => p.every((v) => v === 0))) {
                        this.tmpSetShip('green', this._SelectedShip, this._SetShipDirection, this._SelectedPosition);
                        this._IsPosibleToPlaceShip = true;
                    } else {
                        this.tmpSetShip('red', this._SelectedShip, this._SetShipDirection, this._SelectedPosition);
                    }
                }
                break;
            default:
                throw Error('Something went wrong');
        }
    }

    private mouseOutPlaygroundHandler(evt: Event) {
        evt.stopPropagation();
        this.tmpUnSetShip();
    }

    private clickPlaygroundHandler(evt: IPlaygroundMouseEvent) {
        evt.preventDefault();
        evt.stopPropagation();
        console.log('Red button is: ', {button: evt.button, posibility: this._IsPosibleToPlaceShip });
        if (evt.button === 0) {
            if (this._IsPosibleToPlaceShip === true) {
                this._SelectedShip.Position = this._SelectedPosition;
                this.PlayArray = this._SelectedShip.setShip(this.PlayArray, this._SetShipDirection);
                console.log('Afterset: ', this.PlayArray, this._SelectedShip, this._SelectedPosition);
                while (this.MainElement.firstChild) {
                    this.MainElement.removeChild(this.MainElement.firstChild);
                }
                this.drawTable();
                this._SelectedShipSize = null;
                this._SelectedPickerObject.onclick = null;
                this._SelectedPickerObject.classList.add('disabled');
                this._SelectedPickerObject.classList.remove('green');
                this._CountShips++;
                if (this._CountShips === this.Ships.length) {
                    this.GameObject.startGame();
                }

            }
        }
    }

    private contextmanuPlaygroundHandler(evt: IPlaygroundMouseEvent) {
        evt.preventDefault();
        evt.stopPropagation();
        this._SetShipDirection = (this._SetShipDirection === 'UP') ? 'RIGHT' : 'UP';
        console.log('test', this._SetShipDirection);
        // this.mouseInPlaygroundHandler(evt);
    }

    private clickShipHandler(evt: IPlaygroundMouseEvent) {
        evt.stopPropagation();
        const target = evt.path[0].classList.contains('ship-hnadler') ? evt.path[0] : evt.path[1];
        console.log(target);
        if (!target.classList.contains('green') && !this._SelectedShipSize && !target.classList.contains('disabled')) {
            this._SelectedPickerObject = target;
            this._SelectedShipSize = target.children.length;
            target.classList.add('green');
            target.classList.remove('blue');
        } else if (target.classList.contains('green')) {
            this._SelectedShipSize = null;
            target.classList.remove('green');
        }
    }
}
