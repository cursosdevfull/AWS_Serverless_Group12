export const main = async (event: any) => {
    console.log('step01', event);
    return { step: "step01", items: [1, 2, 3, 4, 5] };
}