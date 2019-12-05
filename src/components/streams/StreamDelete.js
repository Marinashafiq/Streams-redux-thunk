import React from 'react';
import Modal from '../Modal';
import history from '../../history';
import { fetchStream, deleteStream } from '../../actions';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

class StreamDelete extends React.Component {

    componentDidMount() {
        console.log(this.props);
        // this.props.fetchStreams();
        this.props.fetchStream(this.props.match.params.id);
    }

    renderActions() {
        const id = this.props.match.params.id;
        return (
            <React.Fragment>
                <button className="ui negative button" onClick={() => this.props.deleteStream(id)}>Delete</button>
                <Link className="ui cancel button" to="/">Cancel</Link>
            </React.Fragment >
        )
    }

    renderContent() {
        if (!this.props.stream) {
            return 'Are you sure you want to delete this stream ?'
        } else {
            return `Are you sure you want to delete the stream with title ${this.props.stream.title} ?`
        }
    }

    render() {
        return (
            <div>
                Stream Delete
                <Modal
                    title="Delete Stream"
                    content={this.renderContent()}
                    actions={this.renderActions()}
                    onDismiss={() => history.push('/')}
                />
            </div>
        );
    }

};

const mapStateToProps = (state, ownProps) => {
    console.log(ownProps);
    console.log(state);
    return { stream: state.streams[ownProps.match.params.id] }
}


export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);