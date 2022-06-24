import { atom } from 'recoil';

export interface Todos {
    id: number,
    title: string,
    content: string,
    isCompleted: boolean
}

export const todoTitleState = atom<string>({
    key: 'todoTitle',
    default: ''
});

export const todoContentState = atom<string>({
    key: 'todoContent',
    default: ''
});

export const todosState = atom<Array<Todos>>({
    key: 'todos',
    default: [{
        id: 1,
        title: '기본 TODO',
        content: `REACT TODO APP 만들기
            - react-query
            - recoil
            - tailwindcss
        `,
        isCompleted: false
    }]
})