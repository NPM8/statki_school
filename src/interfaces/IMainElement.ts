export default interface IMainElement extends HTMLDivElement {
    children: HTMLCollectionOf<HTMLDivElement>|HTMLCollection;
}
