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


                {/*TABLE HEADER START*/}
                <thead>
                <tr>

                    {/*GENERATE COLUMNS*/}
                    {columns.map(text => (
                        <th key={'col' + text}>{text}</th>
                    ))}


                    <th>
                        Actions
                    </th>
                </tr>
                </thead>
                {/*TABLE HEADER END*/}


                <tbody>
                <tr>

                    {/*TOP ADD SECTION OF THE TABLE START*/}
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
                    {/*TOP ADD SECTION OF THE TABLE END*/}


                    {/*CREATE BUTTON START*/}
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
                    {/*CREATE BUTTON END*/}


                </tr>


                {/*UPDATE AND DATA FIELDS*/}
                {props.data.map((item, index) => (
                    <tr key={index}>


                        {/*SHOW EDIT INPUT OR THE COLUMN ITEM START*/}
                        {columns.map(text => (
                            <td key={'field' + text}>
                                {
                                    editIsClicked === item.id && text !== 'id' ?

                                    <input type="text" value={state[text].val} onChange={event => {
                                        state[text].fn(event.target.value);
                                    }}/>
                                                                               :
                                    item[text] === null || item[text] === undefined || item[text] === '' ? 'N/A' : item[text]
                                }
                            </td>
                        ))}
                        {/*SHOW EDIT INPUT OR THE COLUMN ITEM END*/}


                        <td>

                            {/*DATA BUTTONS START*/}
                            {/*IF EDIT IS CLICKED REPLACE THE EDIT AND DELETE BUTTON FOR DONE AND CANCEL BUTTONS / MUST MATCH ID*/}
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
                            {/*DATA BUTTONS END*/}
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