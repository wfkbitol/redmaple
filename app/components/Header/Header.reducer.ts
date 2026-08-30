type State = {
    isMenuOpen: boolean
}

export const init: State = {
    isMenuOpen: false
}

type ChangeIsMenuOpenAction = { type: "changeIsMenuOpen", payload: boolean };
function changeIsMenuOpen(_state: State, action: ChangeIsMenuOpenAction): Pick<State, "isMenuOpen"> {
    return { isMenuOpen: action.payload };
}

type Action = ChangeIsMenuOpenAction;

const handlers: { [T in Action["type"]]: (state: State, action: Extract<Action, { type: T }>) => Partial<State> } = {
    changeIsMenuOpen,
};
export function reducer(state: State, action: Action) {
    const handler = handlers[action.type];
    const result = handler(state, action);
    return { ...state, ...result };
}