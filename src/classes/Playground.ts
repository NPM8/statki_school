import Ship from 'Ship';
/**
 * For Playground Class
 *
 * @size number of pools
 * @ships array of ships types tuples ([amount, size])
 */
interface IPlaygraundProps {
    size: [number, number];
    ships: Array<[number, number]>;
}

/**
 * Playground class
 */
export default class Playground {
    private Size: [number, number];
    private Ships: Ship[];

    /**
     * Initialazie document
     * @param props - Set of IPlaygroundProps
     */
    constructor(props: IPlaygraundProps) {
        this.Size = props.size;
        for (let a: number of props.size) {
            a[0]
        }
    }

}
