import { createSlice } from '@reduxjs/toolkit';
import { v4 } from 'uuid';

const initialTask = [
    {
        id: 0,
        title: "Backlog",
        cards: [
            {
                id: v4(),
                name: "Task 1",
                stage: 0
            },
            {
                id: v4(),
                name: "Task 2",
                stage: 0
            }
        ]
    },
    {
        id: 1,
        title: "To Do",
        cards: []
    },
    {
        id: 2,
        title: "Inprogress",
        cards: []
    },
    {
        id: 3,
        title: "Done",
        cards: []
    }
]

const TodoSlice = createSlice({
    name: "todo",

    initialState: {
        todoList: initialTask
    },

    reducers: {
        // Reducer function to add card in first board
        addTodo: (state, action) => {
            const todoList = state.todoList;

            todoList[0].cards = [...todoList[0].cards, {
                id: v4(),
                name: action.payload,
                stage: 0
            }]

            state = { ...state, todoList };
        },

        // Reducer function to remove card from particular board
        removeTodo: (state, action) => {
            const todoList = state.todoList;

            // Destructuring of boardId and id
            const { boardId, id } = action.payload;

            const cardIndex = todoList[boardId].cards.findIndex((item) => item.id === id);
            todoList[boardId].cards.splice(cardIndex, 1);

            state = { ...state, todoList }
        },

        // Reducer function to move card to next board
        goForwardTodo: (state, action) => {
            const todoList = state.todoList;

            // Destructuring of boardId and id
            const { boardId, id } = action.payload;
            const next_board_id = boardId + 1;

            if (next_board_id <= 3) {
                const cardIndex = todoList[boardId].cards.findIndex((item) => item.id === id);

                // To store card that is going to be delete
                const removed_card = todoList[boardId].cards[cardIndex];

                // Deletion of card
                todoList[boardId].cards.splice(cardIndex, 1);

                // Adding deleted card to next board (i.e board + 1)
                todoList[next_board_id].cards.push(removed_card);

                state = { ...state, todoList }
            }
            else {
                return;
            }
        },

        // Reducer function to move card to previous board
        goBackwardTodo: (state, action) => {
            const todoList = state.todoList;

            // Destructuring of boardId and id
            const { boardId, id } = action.payload;

            const prev_board_id = boardId - 1;

            if (prev_board_id >= 0) {
                const cardIndex = todoList[boardId].cards.findIndex((item) => item.id === id);

                // To store card that is going to be delete
                const removed_card = todoList[boardId].cards[cardIndex];

                //Deletion of card
                todoList[boardId].cards.splice(cardIndex, 1);

                // Adding deleted card to previous board (i.e board - 1)
                todoList[prev_board_id].cards.push(removed_card);

                state = { ...state, todoList }
            }
            else {
                return;
            }
        }
    }
}

);

// Action creators are generated for each case reducer function
export const { addTodo, removeTodo, goForwardTodo, goBackwardTodo } = TodoSlice.actions;
export default TodoSlice.reducer;