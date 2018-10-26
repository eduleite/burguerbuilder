import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router";

import classes from './Auth.module.css';
import Input from '../../components/UI/Input/Inputs';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from "../../shared/utility";

const initialControlsState = {
    email: {
        elementType: 'input',
        elementConfig: {
            type: 'email',
            placeholder: 'Mail Address'
        },
        value: '',
        validation: {
            required: true,
            isEmail: true
        },
        valid: false,
        touched: false
    },
    password: {
        elementType: 'input',
        elementConfig: {
            type: 'password',
            placeholder: 'Password'
        },
        value: '',
        validation: {
            required: true,
            minLength: 6
        },
        valid: false,
        touched: false
    }
};

function Auth(props) {

    const [controls, setControls] = React.useState(initialControlsState);
    const [isSignup, setIsSignup] = React.useState(true);

    function onFirstRender() {
        if (!props.isBuilding && props.authRedirectPath !== '/') {
            props.onSetAuthRedirectPath();
        }
    }

    React.useEffect(onFirstRender, []);

    function inputChangedHandler(event, controlName) {
        const updatedControls = updateObject(controls, {
            [controlName]: updateObject(controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, controls[controlName].validation),
                touched: true
            })
        });
        setControls(updatedControls);
    }

    function submitHandler(event) {
        event.preventDefault();
        props.onAuth(controls.email.value, controls.password.value, isSignup);
    }

    function switchSignupHandler() {
        setIsSignup(prevIsSignup => !prevIsSignup);
    }

    function render() {
        if (props.isAuthenticated) {
            return <Redirect to={props.authRedirectPath} />
        }

        const formElementsArray = [];
        for (let key in controls) {
            formElementsArray.push({
                id: key,
                config: controls[key]
            });
        }

        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => inputChangedHandler(event, formElement.id)}
            />
        ));

        if (props.loading) {
            form = <Spinner/>;
        }

        let errorMessage = null;
        if (props.error) {
            errorMessage = (
                <p>{props.error.message}</p>
            );
        }

        return (
            <div className={classes.Auth}>
                {errorMessage}
                <form onSubmit={submitHandler}>
                    {form}
                    <Button btnType="Success">Submit</Button>
                </form>
                <Button btnType="Danger" clicked={switchSignupHandler}>Switch to {isSignup ? 'Signin' : 'Signup'}</Button>
            </div>
        );
    }

    return render();
}

function mapStateToProps(state) {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        isBuilding: state.burguerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/"))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);