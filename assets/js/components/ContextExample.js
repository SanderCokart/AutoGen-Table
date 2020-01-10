import React, {createContext} from 'react';

export const ContextExample = createContext();

class TestContextProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    id: 1,
                    task: 'taskdata1',
                    category: 'categorydata1',
                    stuff: 'hello',
                    test: 'test'
                }, {
                    id: 2,
                    task: 'taskdata2',
                    category: 'categorydata2',
                    stuff: 'hello',
                    test: 'test'
                },
            ],
        };
    }

    deleteTodo(id) {
        let todos = [...this.state.data];
        let todo = todos.find((todo) => todo.id === id);
        todos.splice(todos.indexOf(todo), 1);
        this.setState({
            data: todos,
        });
    }


    updateTodo(id, data) {
        let todos = [...this.state.data];
        let todo = todos.find(todo => todo.id === id);

        todo.task = data.task;
        todo.category = data.category;
        todo.stuff = data.stuff;

        console.log(todos);

        this.setState({
            data: todos,
        });

    }

    createTodo(data) {
        console.log(data);

        let todos = [...this.state.data];
        todos.push(data);
        this.setState({
            data: todos,
        });
    }


    render() {
        return (
            <ContextExample.Provider value={{
                ...this.state,
                deleteTodo: this.deleteTodo.bind(this),
                updateTodo: this.updateTodo.bind(this),
                createTodo: this.createTodo.bind(this),
            }}>
                {this.props.children}
            </ContextExample.Provider>
        );
    }
}

export default TestContextProvider;