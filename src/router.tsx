import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

import App from "./app";

const AppRouter: React.SFC<any> = (): React.ReactElement<any> => (
    <HashRouter>
        <App />
    </HashRouter>
);

export { AppRouter };
