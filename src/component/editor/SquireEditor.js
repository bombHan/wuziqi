/**
 * Created by wyt on 2017/9/14.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Upload, message, Col, Row, Select, Popover} from 'antd';
import Squire from './util/squire-raw';
import styles from './SquireEditor.scss';
import DescendingOrderGrey from '../../asset/image/descendingOrderGrey.svg';
import StarSvg from "../../asset/icon/star-inline.svg";
import SquareSvg from "../../asset/icon/square-inline.svg";
import CrossSvg from "../../asset/icon/snow.svg";
import TriangleSvg from "../../asset/icon/triangle-inline.svg";
import RoundSvg from "../../asset/icon/round-inline.svg";
import OrderListSvg from '../../asset/icon/orderList-inline.svg';
import DisorderListSvg from '../../asset/icon/disorderList-inline.svg';
import LeftAlignSvg from '../../asset/icon/leftAlign-inline.svg';
import CenterAlignSvg from '../../asset/icon/middleAlign-inline.svg';
import RightAlignSvg from '../../asset/icon/rightAlign-inline.svg';
import hollowStarIcon from '../../asset/icon/hollowStar-inline.svg';
import hollowRoundIcon from '../../asset/icon/hollowRound-inline.svg';
import hollowSquareIcon from '../../asset/icon/hollowSquare-inline.svg';
import hollowTriangleIcon from '../../asset/icon/hollowTriangle-inline.svg';
import _ from 'lodash';

export default class SquireEditor extends React.Component {
    constructor(props) {
        super(props);
        this.editorValueChanged = this.editorValueChanged.bind(this);
        const defaultValue = 'value' in props && props.value;
        this.state = {
            defaultValue,
            bold: false,
            italic: false,
            underline: false,
            strikethrough: false,
            color: '#333',
            colorVisible: false,
            shapeVisible: false,
            alignment: null,
            ordered: false,
            unOrdered: false,
        }
    }

    componentDidMount() {
        // console.log(this.state.defaultValue);
        this.editor = new Squire(
            // ReactDOM.findDOMNode(this.refs.editor), { blockTag: 'p'}
            ReactDOM.findDOMNode(this.refs.editor), {blockTag: 'p', contentEditable: !this.props.readOnly}
        );
        this.editor.addEventListener('blur', this.editorValueChanged);
        this.editor.setHTML(this.state.defaultValue);
        this.editor.addEventListener('paste', this.editorValueChanged);


    }

    componentWillReceiveProps(nextProps) {

        if ('value' in nextProps && nextProps.value !== this.state.defaultValue) {

            function replaceAll(str) {
                if (str.indexOf('contenteditable="true"') !== -1) {
                    str = str.replace('contenteditable="true"', 'contenteditable="false"')
                    return replaceAll(str);
                }
                else return str;
            };
            let str = nextProps.value;
            // let str = '<div><p contenteditable="true">111</p><p contenteditable="true">222</p></div>'
            if (str) {
                let abc = replaceAll(str);
                this.editor.setHTML(abc);
            } else {
                this.editor.setHTML(str);
            }
        }
    }

    componentDidUnMount() {
        this.editor.removeEventListener('blur', this.editorValueChanged);
        this.editor.removeEventListener('paste', this.editorValueChanged);
        this.editor = null;
    }

    editorValueChanged(e) {

        // 过滤 ZERO WIDTH SPACE
        let abc = e.target.innerHTML.replace(/\u200B/g, "");

        if (e.target.innerHTML.indexOf('contenteditable') !== -1) {

            let abc = e.target.innerHTML.replace('contenteditable="true"', 'contenteditable="false"')
        }
        this.setState({defaultValue: abc});
        if (typeof this.props.onChange === 'function' && this.state.defaultValue !== this.props.value) {
            this.props.onChange(this.state.defaultValue);

        } else {
        }
    }

    render() {
        const {bold, italic, underline, strikethrough, colorVisible, shapeVisible, ordered, unOrdered} = this.state;
        const  scrollTopTurnBack = () => {
            const scrollTop = this.refs.editor.scrollTop;
            setTimeout(() => {
                this.refs.editor.scrollTop = scrollTop;
            }, 100);
        };
        const {readOnly} = this.props;
        const colorArray = ["#F85853", "#F7A018", "#4BD368", "#00CCFF", "#876DD9", "#999999", '#000'];
        const shapeArray = [
            {name: "Star", shape: StarSvg},
            {name: "Triangle", shape: TriangleSvg},
            {name: "Square", shape: SquareSvg},
            {name: "Round", shape: RoundSvg},
            {name: "Cross", shape: CrossSvg},
            {name: 'HollowStar', shape: hollowStarIcon},
            {name: 'HollowTriangle', shape: hollowTriangleIcon},
            {name: 'HollowSquare', shape: hollowSquareIcon},
            {name: 'HollowRound', shape: hollowRoundIcon},
        ];
        const content_color = <div style={{display: 'flex', flexWrap: 'wrap', width: '80px'}}>
            {_.map(colorArray, (data, index) => (

                <span style={{
                    display: 'inline-block',
                    width: '15px',
                    height: '15px',
                    margin: '2px',
                    backgroundColor: data
                }}
                      onClick={() => {
                          scrollTopTurnBack();
                          this.editor.setTextColour(data);
                          this.setState({color: data, colorVisible: false})
                      }}
                      key={index}
                >

                    </span>

            ))}
        </div>;
        const content_shape = <div>
            {_.map(shapeArray, (data, index) => (
                <span style={{display: 'inline-block', width: '15px', height: '15px', margin: '2px'}}
                      onClick={() => {
                          let defaultValue = this.state.defaultValue;
                          if (data.name == 'Round') {
                              scrollTopTurnBack();
                              this.editor.insertPlainText('●', true);

                          } else if (data.name == 'Star') {
                              scrollTopTurnBack();
                              this.editor.insertPlainText('★', true);
                              {/*defaultValue += '★'*/
                              }
                          } else if (data.name == 'Triangle') {
                              scrollTopTurnBack();
                              this.editor.insertPlainText('▲', true);
                              {/*defaultValue += '▲'*/
                              }
                          } else if (data.name == 'Cross') {
                              scrollTopTurnBack();
                              this.editor.insertPlainText('※', true);
                              {/*defaultValue += '※'*/
                              }
                          } else if (data.name == 'Square') {
                              scrollTopTurnBack();
                              this.editor.insertPlainText('■', true);
                              {/*defaultValue += '■'*/
                              }
                          } else if (data.name == 'HollowStar') {
                              scrollTopTurnBack();
                              this.editor.insertPlainText('☆', true);
                              {/*defaultValue += '☆'*/
                              }
                          } else if (data.name == 'HollowRound') {
                              scrollTopTurnBack();
                              this.editor.insertPlainText('○', true);
                              {/*defaultValue += '○'*/
                              }
                          } else if (data.name == 'HollowSquare') {
                              scrollTopTurnBack();
                              this.editor.insertPlainText('□', true);
                              {/*defaultValue += '□'*/
                              }
                          } else if (data.name == 'HollowTriangle') {
                              scrollTopTurnBack();
                              this.editor.insertPlainText('△', true);
                              {/*defaultValue += '△'*/
                              }
                          }
                          this.setState({shapeVisible: false});
                      }}
                      key={index}
                >
                    <data.shape/>
                </span>
            ))}
        </div>;

        let toolBar = (
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                borderBottom: '1px solid #eee',
                backgroundColor: '#F1F4F6',
                padding: '6px 10px',
                alignItems:'center'
            }}>
                {bold ?
                    <span onClick={() => {
                        scrollTopTurnBack();
                        this.editor.removeBold();
                        this.setState({bold: false});
                    }}
                          className={styles.button2}
                    >B</span>
                    : <span onClick={() => {
                        scrollTopTurnBack();
                        this.editor.bold();
                        this.setState({bold: true});
                    }}
                            className={styles.button1}
                    >B</span>
                }
                {italic ?
                    <span onClick={() => {
                        scrollTopTurnBack();
                        this.editor.removeItalic();
                        this.setState({italic: false})
                    }}
                          className={styles.button2}
                    ><i>I</i></span>
                    : <span onClick={() => {
                        scrollTopTurnBack();
                        this.editor.italic();
                        this.setState({italic: true})
                    }}
                            className={styles.button1}
                    ><i>I</i></span>
                }
                {underline ?
                    <span onClick={() => {
                        scrollTopTurnBack();
                        this.editor.removeUnderline();
                        this.setState({underline: false})
                    }}
                          className={styles.button2}
                    ><u>U</u></span>
                    : <span onClick={() => {
                        scrollTopTurnBack();
                        this.editor.underline();
                        this.setState({underline: true})
                    }}
                            className={styles.button1}
                    ><u>U</u></span>
                }
                {strikethrough ?
                    <span onClick={() => {
                        scrollTopTurnBack();
                        this.editor.removeStrikethrough();
                        this.setState({strikethrough: false});
                    }}
                          className={styles.button2} style={{textDecoration: 'line-through'}}
                    >S</span>
                    : <span onClick={() => {
                        scrollTopTurnBack();
                        this.editor.strikethrough();
                        this.setState({strikethrough: true})
                    }}
                            className={styles.button1} style={{textDecoration: 'line-through'}}
                    >S</span>
                }
                <span style={{margin: '0 12px', cursor: 'pointer'}}>
                     <Popover placement="bottom" title={null} content={content_color} visible={colorVisible}
                              trigger="click"
                              onVisibleChange={(value) => {
                                  this.setState({colorVisible: value})
                              }}
                     >
                        <span onClick={() => {
                            this.setState({colorVisible: true})
                        }}
                        >
                            <span style={{
                                marginTop: '6px',
                                marginRight: '4px',
                                display: 'inline-block',
                                width: '15px',
                                height: '15px',
                                borderRadius: '4px',
                                backgroundColor: this.state.color
                            }}/>
                            <DescendingOrderGrey style={{marginBottom: '4px'}}/>

                        </span>
                     </Popover>
                </span>
                {
                    ordered ? (
                        <OrderListSvg style={{color: '#06c', margin: '6px 8px', cursor: 'pointer'}}
                                      onClick={() => {
                                          scrollTopTurnBack();
                                          this.setState({ordered: false, unOrdered: false});
                                          this.editor.removeList('modifyBlocks', this.refs['editor']);
                                      }}
                        />
                    ) : (
                        <OrderListSvg style={{color: '#222', margin: '6px 8px', cursor: 'pointer'}}
                                      onClick={() => {
                                          scrollTopTurnBack();
                                          this.setState({ordered: true, unOrdered: false});
                                          this.editor.makeOrderedList('modifyBlocks', this.refs['editor']);

                                      }}
                        />
                    )
                }
                {
                    unOrdered ? (
                        <DisorderListSvg style={{color: '#06c', margin: '6px 8px', cursor: 'pointer'}}
                                         onClick={() => {
                                             scrollTopTurnBack();
                                             this.editor.removeList('modifyBlocks', this.refs['editor']);
                                             this.setState({unOrdered: false, ordered: false})
                                         }}
                        />
                    ) : (
                        <DisorderListSvg style={{color: '#222', margin: '6px 8px', cursor: 'pointer'}}
                                         onClick={() => {
                                             scrollTopTurnBack();
                                             this.editor.makeUnorderedList('modifyBlocks', this.refs['editor']);
                                             this.setState({unOrdered: true, ordered: false})
                                         }}
                        />
                    )
                }
                {
                    this.state.alignment == 'left' ? (
                        <LeftAlignSvg style={{color: '#06c', margin: '6px 8px', cursor: 'pointer'}}
                                      onClick={() => {
                                          scrollTopTurnBack();
                                          this.editor.setTextAlignment(null);
                                          this.setState({alignment: null})
                                      }}

                        />
                    ) : (
                        <LeftAlignSvg style={{color: '#222', margin: '6px 8px', cursor: 'pointer'}}
                                      onClick={() => {
                                          scrollTopTurnBack();
                                          this.editor.setTextAlignment('left');
                                          this.setState({alignment: 'left'})
                                      }}

                        />
                    )
                }
                {
                    this.state.alignment == 'center' ? (
                        <CenterAlignSvg style={{color: '#06c', margin: '6px 8px', cursor: 'pointer'}}
                                        onClick={() => {
                                            scrollTopTurnBack();
                                            this.editor.setTextAlignment(null);
                                            this.setState({alignment: null})
                                        }}

                        />
                    ) : (
                        <CenterAlignSvg style={{color: '#222', margin: '6px 8px', cursor: 'pointer'}}
                                        onClick={() => {
                                            scrollTopTurnBack();
                                            this.editor.setTextAlignment('center');
                                            this.setState({alignment: 'center'})
                                        }}

                        />
                    )
                }
                {
                    this.state.alignment == 'right' ? (
                        <RightAlignSvg style={{color: '#06c', margin: '6px 8px', cursor: 'pointer'}}
                                       onClick={() => {
                                           scrollTopTurnBack();
                                           this.editor.setTextAlignment(null);
                                           this.setState({alignment: null})
                                       }}

                        />
                    ) : (
                        <RightAlignSvg style={{color: '#222', margin: '6px 8px', cursor: 'pointer'}}
                                       onClick={() => {
                                           scrollTopTurnBack();
                                           this.editor.setTextAlignment('right');
                                           this.setState({alignment: 'right'})
                                       }}

                        />
                    )
                }


                <Select onChange={(e) => {
                    scrollTopTurnBack();
                    this.editor.setFontSize(e)
                }} style={{width: '80px', height: '28px', margin: '0 8px'}} defaultValue="15px">
                    <Select.Option value='10px'>10px</Select.Option>
                    <Select.Option value='12px'>12px</Select.Option>
                    <Select.Option value='14px' selected>14px</Select.Option>
                    <Select.Option value='16px'>16px</Select.Option>
                    <Select.Option value='18px'>18px</Select.Option>
                    <Select.Option value='20px'>20px</Select.Option>
                    <Select.Option value='22px'>22px</Select.Option>
                    <Select.Option value='24px'>24px</Select.Option>

                </Select>

                <span style={{margin: '0 8px'}}>

                      <Popover placement="bottom" title={null} content={content_shape} visible={shapeVisible}
                               trigger="click"
                               onVisibleChange={(value) => {
                                   this.setState({shapeVisible: value})
                               }}
                      >
                        <Button onClick={() => {
                            this.setState({shapeVisible: true})
                        }}
                        >
                            图形
                        </Button>
                     </Popover>
                </span>

            </div>
        );
        return (
            <div style={{width: '100%', height: '100%', margin: '0', display: 'flex', flexDirection: 'column'}}>
                {readOnly ? null : toolBar}
                <div style={{flex: '1', overflow: 'scroll', outline: 'none', padding: ' 10px', fontSize: '15px'}}
                     ref="editor" className={styles.editor}>

                </div>

            </div>
        );
    }
}
