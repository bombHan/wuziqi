import React from 'react';
import ReactDOM from 'react-dom';
import {debounce} from 'lodash';
import {Pagination, Table} from 'antd';

import AutoSizer from '../autosizer/AutoSizer';


class LfTable extends React.Component {

    state = {
        tableHeaderHeight: 0,
        paginationHeight: 0,
        pagination: {
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: total => `共 ${total} 条`,
            defaultCurrent: 1,
            total: 0,
            pageSize: 20,
            pageSizeOptions: ['10', '20', '30', '50', '100']
        }
    }

    constructor(...args) {
        super(...args);
        this.onResize = this.onResize.bind(this);
        this.deboundResize = debounce(this.onResize, 250);
    }

    componentDidMount() {
        window.addEventListener('resize', this.deboundResize);
        this.deboundResize();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.deboundResize);
    }

    componentWillReceiveProps(nextProps) {
        let pagination = {...this.state.pagination, ...nextProps.pagination}

        this.setState({
            pagination: pagination
        }, this.onResize);
    }

    onResize() {

        let el = ReactDOM.findDOMNode(this);

        let thead = document.querySelector('thead', el);
        let pagination = document.querySelector('.lf-pagination-wrapper', el);

        let theadHeightCss = window.getComputedStyle(thead).height;
        let theadHeight = parseInt(theadHeightCss.substring(0, theadHeightCss.length - 2), 10);

        let paginationHeight = 0;
        if (pagination) {
            let paginationHeightCss = window.getComputedStyle(pagination).height;
            paginationHeight = parseInt(paginationHeightCss.substring(0, paginationHeightCss.length - 2), 10);
        }

        if (this.state.tableHeaderHeight != theadHeight || this.state.paginationHeight != paginationHeight) {

            this.setState({
                tableHeaderHeight: theadHeight,
                paginationHeight: paginationHeight
            });
        }
    }

    render() {

        let props = {...this.props, pagination: false};
        let pagination = this.props.pagination;

        let scrollX = 0;

        for (let i = 0; i < props.columns.length; i++) {
            let column = props.columns[i];
            if (column.width && typeof(column.width) === 'number') {
                scrollX += column.width;
            } else {
                scrollX = 0;
                break;
            }
        }

        if (scrollX) {
            scroll.x = scrollX;
        }

        return (
            <AutoSizer>
                {
                    ({height, width}) => (
                        <div style={{height: height, width: width, display: 'flex', flexDirection: 'column'}}>
                            <div style={{flex: 1}}>
                                <Table {...props} scroll={{
                                    ...scroll,
                                    y: (height - this.state.paginationHeight - this.state.tableHeaderHeight)
                                }}></Table>
                            </div>
                            <div className='lf-pagination-wrapper' style={{flex: 'none'}}>
                                <Pagination
                                    style={{marginTop: 12, textAlign: 'right'}} {...this.state.pagination}></Pagination>
                            </div>
                        </div>
                    )
                }
            </AutoSizer>
        );
    }
}

export default LfTable;
