import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return {

    };
}

class InfoEmployee extends Component {
    render() {
        return (
            <div>
                info
            </div>
        );
    }
}

export default connect(
    mapStateToProps,mapDispatchToProps
)(InfoEmployee);