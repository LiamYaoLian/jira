import React from "react";
import {Table} from "antd";
const numeral = require('numeral');

export const EvmTable = (props: React.ComponentProps<typeof Table>) => {
  // TODO to finish
  const dataSource = [
    {
      task: 'Master Service Agreement (MSA)',
      bac: 2323.8,
      pv: 2323.8,
      ev: 2323.8,
      ac: 3039.5,
      cv: -715.7,
      sv: 0,
      cpi: 0.764533640401382,
      spi: 1,
      eac: 3039.5,
      etc: 0,
      vac: -715.7,
      plannedProgress: 1,
      actualProgress: 0.9,
      progressDelay: 0.1,
    },
    {
      task: 'Statement of Work (SOW)',
      bac: 1987.2,
      pv: 1987.2,
      ev: 1987.2,
      ac: 1778.2,
      cv: 209,
      sv: 0,
      cpi: 1.11753458553594,
      spi: 1,
      eac: 1778.2,
      etc: 0,
      vac: 209,
      plannedProgress: 1,
      actualProgress: 0.9,
      progressDelay: 0.1,
    }, {
      task: 'Project Charter',
      bac: 2728.1,
      pv: 2728.1,
      ev: 2728.1,
      ac: 1905.5,
      cv: 822.6,
      sv: 0,
      cpi: 1.43169771713461,
      spi: 1,
      eac: 1905.5,
      etc: 0,
      vac: 822.6,
      plannedProgress: 1,
      actualProgress: 0.9,
      progressDelay: 0.1,
    }, {
      task: 'Project Kick-off',
      bac: 942.8,
      pv: 942.8,
      ev: 942.8,
      ac: 1231.2,
      cv: -288.4,
      sv: 0,
      cpi: 0.765756985055231,
      spi: 1,
      eac: 1231.2,
      etc: 0,
      vac: -288.4,
      plannedProgress: 1,
      actualProgress: 0.9,
      progressDelay: 0.1,
    }, {
      task: 'Project Kick-off Deck',
      bac: 2288.8,
      pv: 2288.8,
      ev: 2288.8,
      ac: 1613.5,
      cv: 675.3,
      sv: 0,
      cpi: 1.41853114347691,
      spi: 1,
      eac: 1613.5,
      etc: 0,
      vac: 675.3,
      plannedProgress: 1,
      actualProgress: 0.9,
      progressDelay: 0.1,
    }, {
      task: 'Pre Kick-off Meeting',
      bac: 1710.9,
      pv: 1710.9,
      ev: 1710.9,
      ac: 2328.8,
      cv: -617.9,
      sv: 0,
      cpi: 0.734670216420474,
      spi: 1,
      eac: 2328.8,
      etc: 0,
      vac: -617.9,
      plannedProgress: 1,
      actualProgress: 0.9,
      progressDelay: 0.1,
    }, {
      task: 'Kick-off Meeting',
      bac: 2197.8,
      pv: 2197.8,
      ev: 2197.8,
      ac: 1702.1,
      cv: 495.7,
      sv: 0,
      cpi: 1.29122848246284,
      spi: 1,
      eac: 1702.1,
      etc: 0,
      vac: 495.7,
      plannedProgress: 1,
      actualProgress: 0.9,
      progressDelay: 0.1,
    }, {
      task: 'Request for Quote (RFQ)',
      bac: 3052.4,
      pv: 3052.4,
      ev: 3052.4,
      ac: 3431.6,
      cv: -379.2,
      sv: 0,
      cpi: 0.889497610444108,
      spi: 1,
      eac: 3431.6,
      etc: 0,
      vac: -379.2,
      plannedProgress: 1,
      actualProgress: 0.9,
      progressDelay: 0.1,
    }, {
      task: 'Project Plan',
      bac: 1185.3,
      pv: 1185.3,
      ev: 1185.3,
      ac: 721.1,
      cv: 464.2,
      sv: 0,
      cpi: 1.64373873249203,
      spi: 1,
      eac: 721.1,
      etc: 0,
      vac: 464.2,
      plannedProgress: 1,
      actualProgress: 0.9,
      progressDelay: 0.1,
    }, {
      task: 'Sample Provider Options',
      bac: 763.1,
      pv: 763.1,
      ev: 763.1,
      ac: 1222,
      cv: -458.9,
      sv: 0,
      cpi: 0.624468085106383,
      spi: 1,
      eac: 1222,
      etc: 0,
      vac: -458.9,
      plannedProgress: 1,
      actualProgress: 0.9,
      progressDelay: 0.1,
    }, {
      task: 'Procurement Planning',
      bac: 1827.7,
      pv: 1827.7,
      ev: 1827.7,
      ac: 1688.5,
      cv: 139.2,
      sv: 0,
      cpi: 1.0824400355345,
      spi: 1,
      eac: 1688.5,
      etc: 0,
      vac: 139.2,
      plannedProgress: 1,
      actualProgress: 0.9,
      progressDelay: 0.1,
    }, {
      task: 'Need Analysis',
      bac: 2267.3,
      pv: 2267.3,
      ev: 2267.3,
      ac: 1833.4,
      cv: 433.9,
      sv: 0,
      cpi: 1.23666412130468,
      spi: 1,
      eac: 1833.4,
      etc: 0,
      vac: 433.9,
      plannedProgress: 1,
      actualProgress: 0.9,
      progressDelay: 0.1,
    }, {
      task: 'Sample/Panel Providers',
      bac: 2403.2,
      pv: 2403.2,
      ev: 2403.2,
      ac: 3036.2,
      cv: -633,
      sv: 0,
      cpi: 0.791515710427508,
      spi: 1,
      eac: 3036.2,
      etc: 0,
      vac: -633,
      plannedProgress: 1,
      actualProgress: 0.9,
      progressDelay: 0.1,
    }
  ];

  return <Table dataSource={dataSource}
                scroll={{x:'10rem', y: '45rem'}}
                columns={[
                  {title: 'Task', dataIndex: 'task', key: 'task', width: '20rem'},
                  {
                    title: 'BAC', dataIndex: 'bac', key: 'bac', width: '10rem',
                    render: (text, record, index) => {
                      return <>{numeral(record.bac).format('$0,0.0')}</>;
                    }
                  },
                  {title: 'PV', dataIndex: 'pv', key: 'pv', width: '10rem',
                    render: (text, record, index) => {
                      return <>{numeral(record.pv).format('$0,0.0')}</>;
                    }
                  },
                  {title: 'EV', dataIndex: 'ev', key: 'ev', width: '10rem',
                    render: (text, record, index) => {
                      return <>{numeral(record.ev).format('$0,0.0')}</>;
                    }
                  },
                  {title: 'AC', dataIndex: 'ac', key: 'ac', width: '10rem',
                    render: (text, record, index) => {
                      return <>{numeral(record.ac).format('$0,0.0')}</>;
                    }
                  },
                  {title: 'CV', dataIndex: 'cv', key: 'cv', width: '10rem',
                    render: (text, record, index) => {
                      return <>{numeral(record.cv).format('$0,0.0')}</>;
                    }
                  },
                  {title: 'SV', dataIndex: 'sv', key: 'sv', width: '10rem',
                    render: (text, record, index) => {
                      return <>{numeral(record.sv).format('$0,0.0')}</>;
                    }
                  },
                  {title: 'CPI', dataIndex: 'cpi', key: 'cpi', width: '10rem',
                    render: (text, record, index) => {
                      return <>{Math.round(record.cpi * 100)/100}</>;
                    }
                  },
                  {title: 'SPI', dataIndex: 'spi', key: 'spi', width: '10rem',
                    render: (text, record, index) => {
                      return <>{Math.round(record.spi * 100)/100}</>;
                    }
                  },
                  {title: 'EAC', dataIndex: 'eac', key: 'eac', width: '10rem',
                    render: (text, record, index) => {
                      return <>{numeral(record.eac).format('$0,0.0')}</>;
                    }
                  },
                  {title: 'ETC', dataIndex: 'etc', key: 'etc', width: '10rem',
                    render: (text, record, index) => {
                      return <>{numeral(record.etc).format('$0,0.0')}</>;
                    }
                  },
                  {title: 'VAC', dataIndex: 'vac', key: 'vac', width: '10rem',
                    render: (text, record, index) => {
                      return <>{numeral(record.vac).format('$0,0.0')}</>;
                    }
                  },
                  {title: 'Planned(%)', dataIndex: 'plannedProgress', key: 'plannedProgress', width: '15rem',
                    render: (text, record, index) => {
                      return <>{numeral(record.plannedProgress).format('0%')}</>;
                    }
                  },
                  {title: 'Actual(%)', dataIndex: 'actualProgress', key: 'actualProgress', width: '15rem',
                    render: (text, record, index) => {
                      return <>{numeral(record.actualProgress).format('0%')}</>;
                    }
                  },
                  {title: 'Progress Delay', dataIndex: 'progressDelay', key: 'progressDelay', width: '15rem',
                    render: (text, record, index) => {
                      return <>{numeral(record.progressDelay).format('0%')}</>;
                    }
                  },
                ]}>
  </Table>
}
