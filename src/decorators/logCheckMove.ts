export default function logMove(target: any, name: string, descriptor: any) {
    const orgFunction = descriptor.value;
    descriptor.value = function (...args: any[]) {
        const res = orgFunction.apply(this, args);
        if (res) {
            console.log('niestety trafiłeś');
        } else {
            const arr = ['Hahaha', 'Pódło', 'Eat the Ground!'];
            console.log(arr[Math.floor(Math.random() * 2)]);
        }
        return res;
    };
}
