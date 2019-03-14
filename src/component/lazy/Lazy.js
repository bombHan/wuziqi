import React, {Component} from "react"

// Lazy Component for bundle-loader

export default class Lazy extends Component {

    constructor(...args) {
        super(...args);

        this.state = {
            mod: null  // short for "module" but that"s a keyword in js, so "mod"
        }
    }

    componentWillMount() {
        this.load(this.props)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.load !== this.props.load) {
            this.load(nextProps)
        }
    }

    load(props) {
        this.setState({
            mod: null
        });
        props.load((mod) => {
            this.setState({
                // handle both es imports and cjs
                mod: mod.default
                    ? mod.default
                    : mod
            })
        })
    }

    render() {
        return this.state.mod
            ? this.props.children(this.state.mod)
            : null
    }
}