import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { Header } from '../components/Header';
import { createBrowserHistory } from "history";

// import {WaterQualityTestPage} from '../components/WaterQualityTestPage';
import {WelcomePage} from '../components/WelcomePage';
import WaterQualityTestPage from '../components/WaterQualityTestPage';
import NotFoundPage from '../components/NotFoundPage';
import WaterTestQualitySubmission from '../components/WaterTestQualitySubmission';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                    <Route path="/" component={ WelcomePage } exact={true}/>
                    <Route path="/address" component={ WaterTestQualitySubmission } exact={true}/>
                    <Route path="/test" component={ WaterQualityTestPage } exact={true}/>
            </Switch>

        </div>
    </BrowserRouter>
);

export default AppRouter;