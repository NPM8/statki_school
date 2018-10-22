export default interface IGameProps {
    size: [number, number];
    ships: Array<[number, number]>;
    playerElement: HTMLDivElement;
    playerPicker: HTMLDivElement;
    botElemnt: HTMLDivElement;
}
