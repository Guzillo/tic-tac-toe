export function Player(id, mark) {
    const getId = () => id;
    const getMark = () => mark;
    return {
        getId, getMark
    };
}
