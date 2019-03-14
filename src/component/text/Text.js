import React, {Component} from "react";
import PropTypes from "prop-types";
import {Tooltip} from "antd";
import _ from "lodash";
import cn from "classnames";

import "./Text.scss";


export default class Text extends Component {
    static propTypes = {
        children: PropTypes.string,
        prefixCls: PropTypes.string,
        className: PropTypes.string,
    };

    static defaultProps = {
        children: null,
        prefixCls: "numas-text",
        className: null,
    };

    constructor(props) {
        super(props);

        this._saveRef = this._saveRef.bind(this);

        this.state = {
            hasToolTip: false,
        };
    }

    componentDidMount() {
        this._update();
    }

    componentDidUpdate() {
        this._update();
    }


    _saveRef(el) {
        this.textRef = el;
    }

    _update() {
        const {hasToolTip} = this.state;


        let val;
        if (this.textRef == null) {
            val = false;
        } else {
            val = this.textRef.offsetWidth < this.textRef.scrollWidth;
        }

        if (hasToolTip !== val) {
            this.setState({
                hasToolTip: val,
            });
        }
    }

    render() {
        const {
            children: text,
            className,
            prefixCls,
            ...restProps
        } = this.props;

        const {
            hasToolTip,
        } = this.state;

        const cls = cn(prefixCls, className);

        const content = (
            <span
                {...restProps}
                className={cls}
                ref={this._saveRef}
            >
                {
                    text
                }
            </span>);


        return hasToolTip
            ? (
                <Tooltip
                    placement="top"
                    title={text}
                >
                    {
                        content
                    }
                </Tooltip>)
            : content;
    }
}


// https://stackoverflow.com/questions/5474871/html-how-can-i-show-tooltip-only-when-ellipsis-is-activated
// HTML - how can I show tooltip ONLY when ellipsis is activated

// http://blog.travisgosselin.com/css-ellipsis-html-tooltip/
// CSS Ellipsis & HTML Tooltip


// https://docs.telerik.com/kendo-ui/controls/layout/tooltip/how-to/show-on-ellipsis
//     <style>
//       td{
//         max-width: 200px;
//         white-space: nowrap;
//         text-overflow: ellipsis;
//         overflow: hidden;
//       }
//
//       [role="tooltip"]{
//         visibility: hidden;
//       }
//     </style>
//     <div id="example">
//       <table>
//         <tr>
//           <td>short text</td>
//         </tr>
//         <tr>
//           <td>veryverylongtextthatdoesnotfitinthecontainer</td>
//         </tr>
//       </table>
//     </div>
//     <script>
//       $("#example").kendoTooltip({
//         filter: "td",
//         show: function(e){
//           if(this.content.text() !=""){
//             $('[role="tooltip"]').css("visibility", "visible");
//           }
//         },
//         hide: function(){
//           $('[role="tooltip"]').css("visibility", "hidden");
//         },
//         content: function(e){
//           var element = e.target[0];
//           if(element.offsetWidth < element.scrollWidth){
//             return e.target.text();
//           }else{
//             return "";
//           }
//         }
//       })
//     </script>
