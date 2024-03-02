import { useState } from "react"

export const TodoInput = ({ addTodo }) => {

    const [title, setTitle] = useState('');

    const handleAddTodo = (e) => {
        if (e.key.toLowerCase() === 'enter') {
            addTodo(title);
            setTitle('');
        }
    }

    return (
        <div className="mt-6 relative">
            <input
                className="focus:shadow-lg font-Inter focus:shadow-blue-800 pl-12 w-full py-4 bg-gray-700 rounded-xl outline-none transition-all duration-300 ease-in-out"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => handleAddTodo(e)}
                placeholder="Agregar tarea..."
            />
        </div>
    )
}
