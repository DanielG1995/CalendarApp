import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from "react-router-dom";
import { startCheking } from '../actions/auth';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { PublicRoute } from './PublicRoutes';
import { PrivateRoute } from './PrivateRoute';
export const AppRouter = () => {
    const dispatch = useDispatch();
    const { cheking, uid } = useSelector(state => state.auth)
    useEffect(() => {
        dispatch(startCheking());
    }, [dispatch])
    return (cheking) ?
        (<h5>Espere......</h5>) :
        (<Router>
            <Switch>
                <PublicRoute isAuth={!!uid} path="/login" exact component={LoginScreen} />
                <PrivateRoute isAuth={!!uid} exact path="/" component={CalendarScreen} />
                <Redirect to='/' />
            </Switch>
        </Router>
        )
}
