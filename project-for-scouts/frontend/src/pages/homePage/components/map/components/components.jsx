import React from 'react';

const ComponentRenderer = (component) => {
    return <div>
        {component}
    </div>
};

export default ComponentRenderer;

<ComponentRenderer component={<div></div>}></ComponentRenderer>