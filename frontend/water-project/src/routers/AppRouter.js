import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, browserHistory,Switch, Route, Link } from "react-router-dom";
import { Header } from '../components/Header';

// import {WaterQualityTestPage} from '../components/WaterQualityTestPage';
import {WelcomePage} from '../components/WelcomePage';
import WaterQualityTestPage from '../components/WaterQualityTestPage';
import NotFoundPage from '../components/NotFoundPage';
import WaterTestQualitySubmission from '../components/WaterTestQualitySubmission';

const AppRouter = (props) => (
    <BrowserRouter history={browserHistory}>
        <div>
            <Header />
            <Switch>
                        <Route path="/" component={ WelcomePage }  exact={true}></Route>
                        <Route path="/address" component={ WaterTestQualitySubmission} exact={true}></Route>
                        <Route path="/test" component={ WaterQualityTestPage} exact={true}></Route>
                        <Route path="*" to path="/" component={NotFoundPage}></Route>

            </Switch>

        </div>
    </BrowserRouter>
);

export default AppRouter;
