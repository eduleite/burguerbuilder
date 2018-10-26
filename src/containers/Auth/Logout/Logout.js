import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

function Logout(props) {
    React.useEffect(() => {
        props.onLogout();
    }, []);

    return (
        <Redirect to="/"/>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        onLogout: () => dispatch(actions.logout())
    };
}

export default connect(null, mapDispatchToProps)(Logout);