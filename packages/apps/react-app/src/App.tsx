import React, { useRef } from 'react';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { useRecoilState } from 'recoil';
import { todoContentState, Todos, todosState, todoTitleState } from './store/todo';
import produce from 'immer';


function App() {
  // const todoList = useQuery('todos', 'http://localhost:4000/todoList')
  const [todos, setTodos] = useRecoilState<Array<Todos>>(todosState);
  const [todoTitle, setTodoTitle] = useRecoilState<string>(todoTitleState);
  const [todoContent, setTodoContent] = useRecoilState<string>(todoContentState);
  const todoNumber = useRef(1);
  
  const deleteTodo = (id: number) => {
    setTodos(produce(draft => draft.filter(x => x.id !== id)))
  }
  const addTodo = () => {
    setTodos(produce(draft => {
      draft.push({
        id: ++todoNumber.current,
        title: todoTitle,
        content: todoContent,
        isCompleted: false
      })
      return draft;
    }))
  }
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    switch(name) {
      case 'title':
        setTodoTitle(produce(draft => draft = value))
        break;
      case 'content':
        setTodoContent(produce(draft => draft = value))
        break;
      default: break;
    }
  }

  return (  
    <div className="App">
      <div>TodoList (recoil, react-query, tailwindcss)</div>
      <div style={{ display: "flex", flexFlow: "column", width: "300px"}}>
      {
        todos.map(todo => (
          <div style={{ display: "flex", width: "300px"}}>
            <div>{todo.title}</div>
            <div>({todo.isCompleted ? 'O' : '-'})</div>
            <button onClick={() => deleteTodo(todo.id)}>삭제</button>
          </div>
        ))
      }
      </div>
      <div style={{display: "flex", flexFlow: "column", width: "300px"}}>
        title <input name="title" value={todoTitle} onChange={onChange} />
        content <textarea name="content" value={todoContent} onChange={onChange} style={{height: "100px"}} />
        <button onClick={() => addTodo()}>추가</button>
      </div>

    </div>
  );
}

export default App;
