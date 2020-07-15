const layerStack = [] as (string | number | null)[];

const clearStack = () => void layerStack.splice(0, layerStack.length);

function runInLayer<T>(func: () => T): T;
function runInLayer<T>(label: string | number, func: () => T): T;
function runInLayer<T>(p1: string | number | (() => T), p2?: () => T) {
    const func = (p2 ?? p1) as () => T;
    const label = (p2 ? p1 : null) as string | number;

    const isRoot = layerStack.length === 0;

    layerStack.push(label);

    try { return func(); }
    catch (error) {
        if (isRoot) {
            const locationStr = layerStack.filter(v => v).join('.');
            clearStack();

            throw new Error(`Error at ${locationStr}: ${error}`);
        }
        else throw error;
    }
}

export default { runInLayer };