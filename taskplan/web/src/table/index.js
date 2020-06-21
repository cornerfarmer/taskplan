import React from 'react';
import ReactDOM from 'react-dom';
import TableApp from './TableApp'

require('../less/table.less');
require('../fonts/fonts.css');

ReactDOM.render(
    <TableApp/>,
    document.getElementById('root')
);