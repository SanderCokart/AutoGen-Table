import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';

function AutoGenTable(props) {
    const [editIsClicked, setEditIsClicked] = useState();
    const [edit, setEdit] = useState();

    const state = {};

    const columns = Object.keys(props.data[0]);

    for (const prop of columns) {
        const resultArr = useState();
        state[prop] = {
            val: resultArr[0],
            fn: resultArr[1],
        };
    }

    const add = {};

    for (const prop of columns) {
        const resultArr = useState('');
        add[prop] = {
            val: resultArr[0],
            fn: resultArr[1],
        };
    }

    return (
        <div>
            <table border={1}>
                <thead>
                <tr>
                    {columns.map(text => (
                        <th key={'col' + text}>{text}</th>
                    ))}
                    <th>
                        Actions
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    {columns.map(text => (
                        <td key={'add ' + text}>
                            {text !== 'id' && (
                                <Fragment>
                                    {typeof add[text].val === 'string' && (
                                        <input type="text" value={add[text].val} onChange={event => {
                                            add[text].fn(event.target.value);
                                        }}/>
                                    )}
                                </Fragment>
                            )}
                        </td>
                    ))}
                    <td>
                        <button onClick={() => {
                            let data = {};
                            columns.map(text => {
                                data[text] = add[text].val;
                            });
                            props.createFunction(data);
                            columns.map(text => {
                                add[text].fn('');
                            });
                            setEditIsClicked(null);
                        }}>Add
                        </button>
                    </td>
                </tr>
                {props.data.map((item, index) => (
                    <tr key={index}>
                        {columns.map(text => (
                            <td key={'field' + text}>
                                {
                                    editIsClicked === item.id ?
                                    <input type="text" value={state[text].val} onChange={event => {
                                        state[text].fn(event.target.value);
                                    }}/>
                                                              :
                                    item[text]
                                }
                            </td>
                        ))}
                        <td>

                            {editIsClicked === item.id ?
                             <Fragment>
                                 <button onClick={() => {
                                     let data = {};
                                     columns.map(text => {
                                         data[text] = state[text].val;
                                     });
                                     props.updateFunction(item.id, data);
                                     setEditIsClicked(null);
                                     setEdit('');
                                 }}>Done
                                 </button>
                                 <button onClick={() => {
                                     setEditIsClicked(null);
                                     setEdit('');
                                 }}>Cancel
                                 </button>
                             </Fragment>
                                                       :
                             <Fragment>
                                 <button onClick={() => {
                                     setEditIsClicked(item.id);
                                     columns.map(text => {
                                         state[text].fn(item[text]);
                                     });
                                 }}>Edit
                                 </button>
                                 <button onClick={() => {
                                     props.deleteFunction(item.id);
                                 }}>Delete
                                 </button>
                             </Fragment>
                            }


                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

AutoGenTable.propTypes = {
    data: PropTypes.array.isRequired,
    createFunction: PropTypes.func.isRequired,
    updateFunction: PropTypes.func.isRequired,
    deleteFunction: PropTypes.func.isRequired,
};

export default AutoGenTable;