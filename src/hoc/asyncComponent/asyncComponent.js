import React, { Component } from 'react';

const asyncComponent = (importComponent) => {
    return class extends Component {
        state = {
            component: null,
        };

        async loadComponent() {
            const cmp = await importComponent();
            this.setState({component: cmp.default});
        }

        componentDidMount() {
            this.loadComponent().then();
        }

        render() {
            const C = this.state.component;
            return C ? <C {...this.props}/> : null;
        }
    }
};

export default asyncComponent;