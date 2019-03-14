import React from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import {Icon} from "antd";
import Modal from "./Modal";
import ActionButton from "./ActionButton";
// NOTE: LocaleProvider 用的是 antd/es/locale-provider/index.js 的代码
// LocaleProvider 会调用 antd/es/modal/locale 的 changeConfirmLocale
import {getConfirmLocale} from "antd/es/modal/locale";

import "./style/index.less";

const IS_REACT_16 = !!ReactDOM.createPortal;

const ConfirmDialog = props => {
    // const { onCancel, onOk, close, zIndex, afterClose, visible } = props;
    // const iconType = props.iconType || "question-circle";
    // const okType = props.okType || "primary";
    // const prefixCls = props.prefixCls || "ant-confirm";

    // // 默认为 true, 保持向下兼容
    // const okCancel = ("okCancel" in props) ? props.okCancel! : true;
    // const width = props.width || 416;
    // const style = props.style || {};

    // // 默认为 false, 保持旧版默认行为
    // const maskClosable = props.maskClosable === undefined ? false : props.maskClosable;

    const {
        iconType,
        prefixCls = "ant-custom-confirm",
        okCancel = true,  // 默认为 true, 保持向下兼容
        width = 360,
        style = {},
        maskClosable = false, // 默认为 false, 保持旧版默认行为

        closable = false,    //默认为 false, 保持向下兼容
        onCancel,
        onOk,
        okType = "warning",
        okPlacement = "left",


        zIndex,
        visible,

        close,
        afterClose,
    } = props;


    const runtimeLocale = getConfirmLocale();
    const okText = props.okText ||
        (okCancel
            ? runtimeLocale.okText
            : runtimeLocale.justOkText);
    const cancelText = props.cancelText || runtimeLocale.cancelText;

    const classString = classNames(
        prefixCls,
        `${prefixCls}-${props.type}`,
        props.className,
    );


    let buttons;
    if (okPlacement === "left") {
        const okButton = (
            <ActionButton key="ok"
                          type={okType}
                          actionFn={onOk}
                          closeModal={close}
                          autoFocus
                          style={{marginRight: 24, width: 120, padding: 0, fontSize: 16}}>
                {okText}
            </ActionButton>);


        const cancelButton = okCancel && (
            <ActionButton key="cancel"
                          actionFn={onCancel}
                          closeModal={close}
                          style={{width: 120, padding: 0}}>
                {cancelText}
            </ActionButton>);

        buttons = [okButton, cancelButton];

    } else {
        const cancelButton = okCancel && (
            <ActionButton key="cancel"
                          actionFn={onCancel}
                          closeModal={close}
                          style={{marginRight: 24, width: 120, padding: 0, fontSize: 16}}>

                {cancelText}
            </ActionButton>);

        const okButton = (
            <ActionButton key="ok"
                          type={okType}
                          actionFn={onOk}
                          closeModal={close}
                          autoFocus
                          style={{width: 120, padding: 0}}>
                {okText}
            </ActionButton>);

        buttons = [cancelButton, okButton];
    }


    return (
        <Modal className={classString}
               onCancel={close.bind(this, {triggerCancel: true})}
               visible={visible}
               title=""
               transitionName="zoom"
               footer=""
               maskTransitionName="fade"
               maskClosable={maskClosable}
               style={style}
               width={width}
               zIndex={zIndex}
               afterClose={afterClose}>
            <div style={{display: "flex", flexDirection: "column"}}>
                <div style={{
                    flex: "none",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 48,
                    borderBottom: "1px solid #CCCCCC",
                    background: "#DFE2E4",
                    position: "relative",
                }}>
                    <div style={{
                        color: "#333333",
                        fontSize: 20,
                    }}>
                        {
                            iconType
                                ? <Icon type={iconType}
                                        style={{color: "#F6A623", marginRight: "10px"}}/>
                                : null
                        }
                        {props.title}
                    </div>
                    {
                        closable ?
                            <Icon type="close"
                                  style={{position: "absolute", right: 16, cursor: "pointer", fontSize: 20, lineHeight:'48px'}}
                                  onClick={() => {
                                      close();
                                  }}/> :
                            null
                    }
                </div>
                <div style={{
                    flex: "none",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "32px 32px 24px",
                    fontSize: 14,
                    color: "#333333",
                }}>
                    {props.content}
                </div>
                <div style={{
                    flex: "none",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    borderTop: "1px solid #CCCCCC",
                    padding: "10px 24px",
                }}>
                    <div>
                        {
                            buttons
                        }
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default function confirm(config) {
    let div = document.createElement("div");
    document.body.appendChild(div);

    function close(...args: any[]) {
        if (IS_REACT_16) {
            render({...config, close, visible: false, afterClose: destroy.bind(this, ...args)});
        } else {
            destroy(...args);
        }
    }

    function destroy(...args: any[]) {
        const unmountResult = ReactDOM.unmountComponentAtNode(div);
        if (unmountResult && div.parentNode) {
            div.parentNode.removeChild(div);
        }
        const triggerCancel = args &&
            args.length &&
            args.some(param => param && param.triggerCancel);
        if (config.onCancel && triggerCancel) {
            config.onCancel(...args);
        }
    }

    function render(props: any) {
        ReactDOM.render(<ConfirmDialog {...props} />, div);
    }

    render({...config, visible: true, close});

    return {
        destroy: close,
    };
}


