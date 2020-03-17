import React from 'react';

const controllerContext = React.createContext({
    controller: () => {},
    lessButton: {}
});

export default controllerContext;