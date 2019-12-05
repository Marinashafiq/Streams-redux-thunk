import React from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';
import { Link } from "react-router-dom";

class StreamList extends React.Component {

    componentDidMount() {
        this.props.fetchStreams();
    }

    renderAdmin(stream) {
        if (stream.userId === this.props.currentUserId) {
            console.log("trueee")
            return (
                <div class="extra content">
                    <div class="ui two buttons">
                        <Link to={`/streams/edit/${stream.id}`} className="ui green basic button">
                            Edit
                    </Link>
                        <Link to={`/streams/delete/${stream.id}`} className="ui red basic button">
                            Delete
                    </Link>

                    </div>
                </div>
                // <div className="right floated content">
                //     <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
                //         Edit
                //     </Link>
                //     <Link to={`/streams/delete/${stream.id}`} className="ui button negative">
                //         Delete
                //     </Link>
                // </div>
            );
        }

    }

    renderStreamList() {
        return this.props.streams.map(stream => {
            return (
                <div className="column" key={stream.id}>
                    <div className="ui link card">
                        <div className="content">
                            <div className="header">
                                <Link to={`/streams/${stream.id}`} className="header">{stream.title}</Link>
                            </div>
                            {/* <div className="meta">Scientist</div> */}
                            <div className="description">
                                {stream.description}
                            </div>
                            {this.renderAdmin(stream)}
                        </div>
                    </div>
                </div>
                // <div className="item" key={stream.id}>
                //     {this.renderAdmin(stream)}
                //     <i className="large divided middle aligned icon camera" />
                //     <div className="content">
                //         <Link to={`/streams/${stream.id}`} className="header">{stream.title}</Link>
                //         <div className="description">{stream.description}</div>
                //     </div>
                // </div>
            )
        })
    }


    renderCreate() {
        if (this.props.isSignedIn) {
            return (
                <div style={{ textAlign: 'right' }} className="right floated content">
                    <Link to="/streams/new" className="ui button positive">Create Stream</Link>
                </div>
            )
        }
    }

    render() {
        console.log(this.props.streams);
        return (
            <div>
                <div role="list" className="ui horizontal very relaxed list" style={{ width : '100%'}}>
                    <div role="listitem" className="item">
                         <h2 className="ui left floated header">Streams</h2>
                    </div>
                    <div role="listitem" className="item right floated" style={{ float : 'right'}}> 
                        {this.renderCreate()}
                    </div>
                </div>
                {/* <div className="headerSpacing"> 
                    
                   
                </div> */}
                <div className="ui container four column grid">
                    {this.renderStreamList()}
                </div>
                {/* <div className="ui celled list">
                    {this.renderStreamList()}
                </div> */}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    }
}

export default connect(mapStateToProps, { fetchStreams })(StreamList);