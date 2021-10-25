export function assert(val: any, msg?: string): asserts val {
    if (!msg) msg = "Error: " + val + " is not true";
    if (!val) throw new Error(msg);
}