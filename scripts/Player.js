export function Player(id, mark, name) {
    const getName = () => name;
    const getId = () => id;
    const getMark = () => mark;
    return {
        getId, getMark, getName
    };
}
