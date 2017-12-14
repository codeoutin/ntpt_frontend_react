import { DEFAULT_SERVERS,ADD_SERVER } from ' ./actions';

const initialState = DEFAULT_SERVERS;

function addServer(state = initialState, action) {
    switch(action.type) {
        case ADD_SERVER:
            return Object.assign({},state,{
                cammundaServer = action.address
            })
        default:
            return state;
    } 
}