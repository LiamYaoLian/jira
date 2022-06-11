import React from "react";
import {Table} from "antd";
const numeral = require('numeral');

export const EvmTable = (props: React.ComponentProps<typeof Table>) => {
  return <Table dataSource={props.dataSource}
                scroll={{x:'10rem', y: '45rem'}}
                columns={[
                  {title: 'Task', dataIndex: 'name', key: 'name', width: '20rem'},
                  {
                    title: 'BAC', dataIndex: 'bac', key: 'bac', width: '10rem',
                    render: (text, record, index) => {
                      return <>{numeral((record as any).bac).format('$0,0.0')}</>;
                    }
                  },
                  {title: 'PV', dataIndex: 'pv', key: 'pv', width: '10rem',
                    render: (text, record, index) => {
                      
                      return <>{numeral((record as any).pv).format('$0,0.0')}</>;
                    }
                  },
                  {title: 'EV', dataIndex: 'ev', key: 'ev', width: '10rem',
                    render: (text, record, index) => {
                      
                      return <>{numeral((record as any).ev).format('$0,0.0')}</>;
                    }
                  },
                  {title: 'AC', dataIndex: 'ac', key: 'ac', width: '10rem',
                    render: (text, record, index) => {
                      
                      return <>{numeral((record as any).ac).format('$0,0.0')}</>;
                    }
                  },
                  {title: 'CV', dataIndex: 'cv', key: 'cv', width: '10rem',
                    render: (text, record, index) => {
                      
                      return <>{numeral((record as any).cv).format('$0,0.0')}</>;
                    }
                  },
                  {title: 'SV', dataIndex: 'sv', key: 'sv', width: '10rem',
                    render: (text, record, index) => {
                      
                      return <>{numeral((record as any).sv).format('$0,0.0')}</>;
                    }
                  },
                  {title: 'CPI', dataIndex: 'cpi', key: 'cpi', width: '10rem',
                    render: (text, record, index) => {
                      
                      return <>{Math.round((record as any).cpi * 100)/100}</>;
                    }
                  },
                  {title: 'SPI', dataIndex: 'spi', key: 'spi', width: '10rem',
                    render: (text, record, index) => {
                      
                      return <>{Math.round((record as any).spi * 100)/100}</>;
                    }
                  },
                  {title: 'EAC', dataIndex: 'eac', key: 'eac', width: '10rem',
                    render: (text, record, index) => {
                      
                      return <>{numeral((record as any).eac).format('$0,0.0')}</>;
                    }
                  },
                  {title: 'ETC', dataIndex: 'etc', key: 'etc', width: '10rem',
                    render: (text, record, index) => {
                      
                      return <>{numeral((record as any).etc).format('$0,0.0')}</>;
                    }
                  },
                  {title: 'VAC', dataIndex: 'vac', key: 'vac', width: '10rem',
                    render: (text, record, index) => {
                      
                      return <>{numeral((record as any).vac).format('$0,0.0')}</>;
                    }
                  },
                  {title: 'Planned(%)', dataIndex: 'plannedProgress', key: 'plannedProgress', width: '15rem',
                    render: (text, record, index) => {
                      
                      return <>{numeral((record as any).plannedProgress).format('0%')}</>;
                    }
                  },
                  {title: 'Actual(%)', dataIndex: 'actualProgress', key: 'actualProgress', width: '15rem',
                    render: (text, record, index) => {
                      
                      return <>{numeral((record as any).actualProgress).format('0%')}</>;
                    }
                  },
                  {title: 'Progress Delay', dataIndex: 'progressDelay', key: 'progressDelay', width: '15rem',
                    render: (text, record, index) => {
                      
                      return <>{numeral((record as any).progressDelay).format('0%')}</>;
                    }
                  },
                ]}>
  </Table>
}
