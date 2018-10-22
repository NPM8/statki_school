export default interface IPlaygroundMouseEvent extends MouseEvent {
    target: HTMLDivElement;
    path: HTMLElement[];
}
