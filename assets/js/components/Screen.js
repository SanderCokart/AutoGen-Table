import React, {useContext} from 'react';
import AutoGenTable from './AutoGenTable';
import {ContextExample} from './ContextExample';

function Screen() {
    const context = useContext(ContextExample);


    return (

        <div>
            <AutoGenTable data={context.data} deleteFunction={context.deleteTodo} updateFunction={context.updateTodo} createFunction={context.createTodo}/>
        </div>
    );
}

export default Screen;