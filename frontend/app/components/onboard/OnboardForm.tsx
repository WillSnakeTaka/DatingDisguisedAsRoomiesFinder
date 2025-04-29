// components/OnboardForm.tsx
'use client';
import type { Todo } from '@/app/actions/getTodos';


export default function OnboardForm({ todos }: { todos: Todo[] }) {
    return (
        <div>
            <h2>OnboardForm</h2>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>{todo.title}</li>
                ))
                }
            </ul>
        </div>
    );
}