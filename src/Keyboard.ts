export enum Key {
    SHIFT = 16,
    CTRL = 17,
    ALT = 18,
    SPACE = 32,
    ENTER = 13,
    NUMBER_0 = 48,
    NUMBER_1 = 49,
    NUMBER_2 = 50,
    NUMBER_3 = 51,
    NUMBER_4 = 52,
    NUMBER_5 = 53,
    NUMBER_6 = 54,
    NUMBER_7 = 55,
    NUMBER_8 = 56,
    NUMBER_9 = 57,
    A = 65,
    B = 66,
    C = 67,
    D = 68,
    E = 69,
    F = 70,
    G = 71,
    H = 72,
    I = 73,
    J = 74,
    K = 75,
    L = 76,
    M = 77,
    N = 78,
    O = 79,
    P = 80,
    Q = 81,
    R = 82,
    S = 83,
    T = 84,
    U = 85,
    V = 86,
    W = 87,
    X = 88,
    Y = 89,
    Z = 90,
}

export class Keyboard {
    private keyStates: Array<boolean> = [];

    /** 判断一个按键是否被按下了 */
    public isKeyPressed(key: Key) {
        return this.keyStates[key];
    }

    /**
     * @returns true if any of the keys are pressed.
     */
    public isKeysPressed(keys: Array<Key>): boolean {
        for (const key of keys) {
            if (this.keyStates[key]) {
                return true;
            }
        }
        return false;
    }

    public constructor() {
        window.addEventListener('keydown', event => {
            this.keyStates[event.keyCode] = true;
        });
        window.addEventListener('keyup', event => {
            this.keyStates[event.keyCode] = false;
        });
    }
}
