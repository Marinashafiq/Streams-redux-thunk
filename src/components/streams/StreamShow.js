import React from 'react';
import { fetchStream } from '../../actions';
import { connect } from 'react-redux';


class StreamShow extends React.Component{

    componentDidMount() {
        console.log(this.props);
        this.props.fetchStream(this.props.match.params.id);
    }

    renderContent() {
        if (!this.props.stream) {
            return (
                <div>
                    ...Loading
                </div>
            )
        } else {
            return (
                <div>
                    <h1>{this.props.stream.title}</h1>
                    <h5>{this.props.stream.description}</h5>
                </div>
            )
        }
    }

    render(){
        return <div>{this.renderContent()}</div>
    } 
};

const mapStateToProps = (state, ownProps) => {
    console.log(ownProps);
    console.log(state);
    return { stream: state.streams[ownProps.match.params.id] }
}


export default connect(mapStateToProps,{fetchStream})(StreamShow) ;