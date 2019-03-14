import React from "react";
import PropTypes from "prop-types";
import Dialog from "rc-dialog";
import UiUtil from "../../util/UiUtil";
import {Button} from "antd";
import LocaleReceiver from "antd/lib/locale-provider/LocaleReceiver";
// NOTE: LocaleProvider 用的是 antd/es/locale-provider/index.js 的代码
// LocaleProvider 会调用 antd/es/modal/locale 的 changeConfirmLocale
import {getConfirmLocale} from "antd/es/modal/locale";

let mousePosition;
let mousePositionEventBinded;

export default class Modal extends React.Component {

    static defaultProps = {
        prefixCls: "ant-custom-modal",
        width: 520,
        transitionName: "zoom",
        maskTransitionName: "fade",
        confirmLoading: false,
        visible: false,
        okType: "primary",
    };

    static propTypes = {
        prefixCls: PropTypes.string,
        onOk: PropTypes.func,
        onCancel: PropTypes.func,
        okText: PropTypes.node,
        cancelText: PropTypes.node,
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        confirmLoading: PropTypes.bool,
        visible: PropTypes.bool,
        align: PropTypes.object,
        footer: PropTypes.node,
        title: PropTypes.node,
        closable: PropTypes.bool,
    };

    handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        const onCancel = this.props.onCancel;
        if (onCancel) {
            onCancel(e);
        }
    };

    handleOk = (e: React.MouseEvent<HTMLButtonElement>) => {
        const onOk = this.props.onOk;
        if (onOk) {
            onOk(e);
        }
    };

    componentDidMount() {
        if (mousePositionEventBinded) {
            return;
        }
        // 只有点击事件支持从鼠标位置动画展开
        UiUtil.addEventListener(document.documentElement, "click", (e: MouseEvent) => {
            mousePosition = {
                x: e.pageX,
                y: e.pageY,
            };
            // 100ms 内发生过点击事件，则从点击位置动画展示
            // 否则直接 zoom 展示
            // 这样可以兼容非点击方式展开
            setTimeout(() => mousePosition = null, 100);
        });
        mousePositionEventBinded = true;
    }

    renderFooter = locale => {
        const {okText, okType, cancelText, confirmLoading} = this.props;
        return (
            <div>
                <Button onClick={this.handleCancel}>
                    {cancelText || locale.cancelText}
                </Button>
                <Button type={okType}
                        loading={confirmLoading}
                        onClick={this.handleOk}>

                    {okText || locale.okText}
                </Button>
            </div>
        );
    };

    render() {
        const {footer, visible} = this.props;

        const defaultFooter = (
            <LocaleReceiver componentName="Modal"
                            defaultLocale={getConfirmLocale()}>
                {this.renderFooter}
            </LocaleReceiver>
        );

        return (
            <Dialog {...this.props}
                    footer={footer === undefined ? defaultFooter : footer}
                    visible={visible}
                    mousePosition={mousePosition}
                    onClose={this.handleCancel}/>
        );
    }
}



