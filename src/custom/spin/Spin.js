import React, {Component} from "react";
import PropTypes from "prop-types";
import {findDOMNode} from "react-dom";
import classNames from "classnames";
import isCssAnimationSupported from "./isCssAnimationSupported";
import splitObject from "./splitObject";
import omit from "omit.js";

import style from "./Spin.less";


class Spin extends Component {

    constructor(props) {
        super(props);
        const spinning = props.spinning;
        this.state = {
            spinning,
        };
    }

    isNestedPattern() {
        return !!(this.props && this.props.children);
    }

    componentDidMount() {
        if (!isCssAnimationSupported()) {
            // Show text in IE8/9
            findDOMNode(this).className += `${this.props.prefixCls}-show-text`;
        }
    }

    componentWillUnmount() {
        if (this.debounceTimeout) {
            clearTimeout(this.debounceTimeout);
        }
    }

    componentWillReceiveProps(nextProps) {
        const currentSpinning = this.props.spinning;
        const spinning = nextProps.spinning;
        if (this.debounceTimeout) {
            clearTimeout(this.debounceTimeout);
        }
        if (currentSpinning && !spinning) {
            this.debounceTimeout = setTimeout(() => this.setState({spinning}), 300);
        } else {
            this.setState({spinning});
        }
    }

    render() {
        const [{className, size, prefixCls, tip,}, restProps] = splitObject(
            this.props,
            ["className", "size", "prefixCls", "tip"]);

        const {spinning} = this.state;

        const spinClassName = classNames(prefixCls, {
            [`${prefixCls}-sm`]: size === "small",
            [`${prefixCls}-lg`]: size === "large",
            [`${prefixCls}-spinning`]: spinning,
            [`${prefixCls}-show-text`]: !!this.props.tip,
        }, className);

        // fix https://fb.me/react-unknown-prop
        const divProps = omit(restProps, [
            "spinning",
        ]);

        // 改变1. <div {...divProps} className={spinClassName}>
        const spinElement = (
            <div className={spinClassName}>
                <span className={`${prefixCls}-dot`}>
                  <i />
                  <i />
                  <i />
                  <i />
                </span>
                {tip
                    ? <div className={`${prefixCls}-text`}>{tip}</div>
                    : null}
            </div>
        );
        if (this.isNestedPattern()) {
            const containerClassName = classNames({
                [`${prefixCls}-container`]: true,
                [`${prefixCls}-blur`]: spinning,
            });
            return (
                // 改变2. 否则 fade 效果下spin背景将和后面内容叠加
//                <Animate
//                    {...divProps}
//                    component="div"
//                    className={`${prefixCls}-nested-loading`}
//                    transitionName="fade">
//                    {spinning && <div key="loading">{spinElement}</div>}
//                    <div className={containerClassName} key="container">
//                        {this.props.children}
//                    </div>
//                </Animate>

                <div {...divProps} className={`${prefixCls}-nested-loading`}>
                    {spinning && <div key="loading">{spinElement}</div>}
                    <div className={containerClassName} key="container">
                        {this.props.children}
                    </div>
                </div>
            );
        }
        return spinElement;
    }
}


Spin.defaultProps = {
    prefixCls: "lianfan-spin",
    spinning: true,
    size: "default",
};

Spin.propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    spinning: PropTypes.bool,
    size: PropTypes.oneOf(["small", "default", "large"]),
};

export default Spin;
