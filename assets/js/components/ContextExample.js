import React, {createContext} from 'react';

export const ContextExample = createContext();

class TestContextProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    id: 1,
                    firstName: 'Sander',
                    lastName: 'Cokart',
                    age: 21,
                }, {
                    id: 2,
                    firstName: 'Sander',
                    lastName: 'Lanting',
                    age: null,
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

        const columnNames = Object.keys(data);

        columnNames.forEach(columnName => {
            todo[columnName] = data[columnName];
        });

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