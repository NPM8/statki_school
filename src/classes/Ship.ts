import IPosition from '../interfaces/IPosition';

export default class Ship {
    get Elems(): IPosition[] {
        return this._Elems;
    }

    set Elems(value: IPosition[]) {
        this._Elems = value;
    }
    get Direction(): string {
        return this._Direction;
    }

    set Direction(value: string) {
        this._Direction = value;
    }
    get Position(): IPosition {
        return this._Position;
    }

    set Position(value: IPosition) {
        this._Position = value;
    }

    get size(): number {
        return this.Size;
    }

    public static sound() {
        console.log('Brrr');
    }
    private readonly Size: number;

    private _Position: IPosition;

    private _Direction: string;

    private _Elems: IPosition[];

    constructor(size: number) {
        this.Size = size;
    }

    public setShip(Array: number[][], direction?: string): number[][] {
        if (this.Size === 1) {
            Array[this._Position.x][this._Position.y] = 1;
            return Array;
        } else {
            switch (direction) {
                case 'UP':
                    for (let i = 0; i < this.Size; i++) {
                        const tmp: IPosition = {
                            x: this._Position.x + i,
                            y: this._Position.y,
                        };
                        Array[tmp.x][tmp.y] = 1;
                        this._Elems.push(tmp);
                    }
                    break;
                case 'DOWN':
                    for (let i = 0; i < this.Size; i++) {
                        const tmp: IPosition = {
                            x: this._Position.x - i,
                            y: this._Position.y,
                        };
                        Array[tmp.x][tmp.y] = 1;
                        this._Elems.push(tmp);
                    }
                    break;
                case 'LEFT':
                    for (let i = 0; i < this.Size; i++) {
                        const tmp: IPosition = {
                            x: this._Position.x,
                            y: this._Position.y - i,
                        };
                        Array[tmp.x][tmp.y] = 1;
                        this._Elems.push(tmp);
                    }
                    break;
                case 'RIGHT':
                    for (let i = 0; i < this.Size; i++) {
                        const tmp: IPosition = {
                            x: this._Position.x,
                            y: this._Position.y + i,
                        };
                        Array[tmp.x][tmp.y] = 1;
                        this._Elems.push(tmp);
                    }
                    break;
                default:
                    throw Error('Bad direction');
            }
            return Array;
        }
    }
 }
