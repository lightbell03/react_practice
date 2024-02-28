import { atom, selector } from "recoil";

export const todoListState = atom<{ id: number; text: string; isComplete: boolean }[]>({
  key: 'todoListState',
  default: [],
})

export const todoListStatsState = selector({
  key: 'todoListStatsState',
  get: ({ get }) => {
    const todoList = get(todoListState);

    return
  }
})