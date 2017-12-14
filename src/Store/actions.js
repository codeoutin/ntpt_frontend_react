
export const ADD_SERVER = 'ADD_SERVER';

export const DEFAULT_SERVERS = {
    camundaServer: "127.0.0.1:8080",
    jenkinsServer: "127.0.0.1:8001",
    gitlabServer: "127.0.0.1:8002",
    mongodbServer: "127.0.0.1:8003",
    sonarqubeServer: "127.0.0.1:8004"
}

export function addServer(name, address){
    return {
        type: ADD_SERVER, 
        name,
        address
    };
}