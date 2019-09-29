import { combineReducers } from 'redux';
import {login} from "./login";
import {tableFilters, buttonFilterList} from "./filter-button";
import {table} from "./table";
import {user} from "./user";

export default combineReducers({
    login,
    table,
    tableFilters,
    buttonFilterList,
    user
});

