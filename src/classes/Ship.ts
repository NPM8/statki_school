export default class Ship {
    private Size: number;
    constructor(size: number) {
        this.Size = size;
    }

    sound() {
        console.log("Brrr");
    }
}
