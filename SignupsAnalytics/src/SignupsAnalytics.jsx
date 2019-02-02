
/*
 *  Copyright (c) 2019, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 *  WSO2 Inc. licenses this file to you under the Apache License,
 *  Version 2.0 (the "License"); you may not use this file except
 *  in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing,
 *  software distributed under the License is distributed on an
 *  "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 *  KIND, either express or implied.  See the License for the
 *  specific language governing permissions and limitations
 *  under the License.
 *
 */

import React from 'react';
import Widget from '@wso2-dashboards/widget';
import { Scrollbars } from 'react-custom-scrollbars';
import Moment from 'moment';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {
    VictoryAxis, VictoryLabel, VictoryLine, VictoryTooltip,
} from 'victory';
import { defineMessages, IntlProvider, FormattedMessage } from 'react-intl';
import localeJSON from './resources/locale.json';
import CustomTable from './CustomTable';

const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
    },
    typography: {
        useNextVariants: true,
    },
});

const lightTheme = createMuiTheme({
    palette: {
        type: 'light',
    },
    typography: {
        useNextVariants: true,
    },
});

/**
 * Language
 * @type {string}
 */
const language = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage;

/**
 * Language without region code
 */
const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];

/**
 * Create React Component for Signups Analytics
 * @class SignupsAnalytics
 * @extends {Widget}
 */
class SignupsAnalytics extends Widget {
    /**
     * Creates an instance of SignupsAnalytics.
     * @param {any} props @inheritDoc
     * @memberof SignupsAnalytics
     */
    constructor(props) {
        super(props);

        this.styles = {
            headingWrapper: {
                height: '10%',
                margin: 'auto',
                width: '97%',
            },
            form: {
                display: 'flex',
                flexWrap: 'wrap',
            },
            formControl: {
                margin: 5,
                minWidth: 120,
            },
            selectEmpty: {
                marginTop: 10,
            },
            dataWrapper: {
                height: '80%',
                marginTop: '2%',
            },
            chartWrapper: {
                width: '70%',
                height: '100%',
                float: 'left',
            },
            svgWrapper: {
                height: '100%',
                width: '100%',
            },
            tooltip: {
                fill: '#fff',
                fontSize: 8,
            },
            tableWrapper: {
                width: '30%',
                height: '100%',
                float: 'right',
                textAlign: 'right',
            },
            button: {
                backgroundColor: '#1d216b',
                width: '40%',
                height: '10%',
                color: '#fff',
                marginTop: '3%',
            },
        };

        this.state = {
            width: this.props.glContainer.width,
            height: this.props.glContainer.height,
            timeTo: null,
            timeFrom: null,
            chartData: [],
            tableData: [],
            xAxisTicks: [],
            maxCount: 0,
        };

        this.props.glContainer.on('resize', () => this.setState({
            width: this.props.glContainer.width,
            height: this.props.glContainer.height,
        }));

        this.handlePublisherParameters = this.handlePublisherParameters.bind(this);
        this.assembleQuery = this.assembleQuery.bind(this);
        this.handleDataReceived = this.handleDataReceived.bind(this);
    }

    componentDidMount() {
        const locale = (languageWithoutRegionCode || language || 'en');
        this.setState({ localeMessages: defineMessages(localeJSON[locale]) || {} });

        super.getWidgetConfiguration(this.props.widgetID)
            .then((message) => {
                this.setState({
                    providerConfig: message.data.configs.providerConfig,
                }, () => super.subscribe(this.handlePublisherParameters));
            })
            .catch((error) => {
                console.error("Error occurred when loading widget '" + this.props.widgetID + "'. " + error);
                this.setState({
                    faultyProviderConf: true,
                });
            });
    }

    componentWillUnmount() {
        super.getWidgetChannelManager().unsubscribeWidget(this.props.id);
    }

    /**
     * Retrieve params from publisher - DateTimeRange
     * @memberof SignupsAnalytics
     * */
    handlePublisherParameters(receivedMsg) {
        this.setState({
            timeFrom: receivedMsg.from,
            timeTo: receivedMsg.to,
        }, this.assembleQuery);
    }

    /**
     * Formats the siddhi query using selected options
     * @memberof SignupsAnalytics
     * */
    assembleQuery() {
        const { timeFrom, timeTo } = this.state;

        if (this.state.providerConfig) {
            const dataProviderConfigs = _.cloneDeep(this.state.providerConfig);
            let { query } = dataProviderConfigs.configs.config.queryData;
            query = query
                .replace('{{timeFrom}}', Moment(timeFrom).format('YYYY-MM-DD HH:mm:ss.SSSSSSSSS'))
                .replace('{{timeTo}}', Moment(timeTo).format('YYYY-MM-DD HH:mm:ss.SSSSSSSSS'));
            dataProviderConfigs.configs.config.queryData.query = query;
            super.getWidgetChannelManager().subscribeWidget(this.props.id, this.handleDataReceived, dataProviderConfigs);
        }
    }

    /**
     * Formats data retrieved and loads to the widget
     * @param {object} message - data retrieved
     * @memberof SignupsAnalytics
     * */
    handleDataReceived(message) {
        const { createdBy } = this.state;

        if (message.data.length !== 0) {
            const xAxisTicks = [];
            const chartData = [];
            const tableData = [];
            let index = 0;

            this.setState({ chartData: [], tableData: [] });

            message.data.forEach((dataUnit) => {
                chartData.push({
                    x: new Date(dataUnit[1]).getTime(),
                    y: dataUnit[2] + index,
                    label: 'CREATED_TIME:' + Moment(dataUnit[1]).format('YYYY-MMM-DD hh:mm:ss') + '\nCOUNT:' + (dataUnit[2] + index++),
                });
                tableData.push([
                    dataUnit[0].toString(),
                    Moment(dataUnit[1]).format('YYYY-MMM-DD hh:mm:ss'),
                ]);
            });

            const maxCount = chartData[chartData.length - 1].y;

            const first = new Date(chartData[0].x).getTime();
            const last = new Date(chartData[chartData.length - 1].x).getTime();
            const interval = (last - first) / 10;
            let duration = 0;
            xAxisTicks.push(first);
            for (let i = 1; i <= 10; i++) {
                duration = interval * i;
                xAxisTicks.push(new Date(first + duration).getTime());
            }

            this.setState({
                chartData, tableData, xAxisTicks, maxCount,
            });
        } else {
            this.setState({ chartData: [], tableData: [] });
        }
    }

    /**
     * Return the data for widget
     * @returns {ReactElement} Render the data of Signups Analytics widget
     * @memberof SignupsAnalytics
     * */
    getDataChart() {
        const { tableData, chartData } = this.state;
        const themeName = this.props.muiTheme.name;

        if (tableData.length !== 0 && chartData.length !== 0) {
            return (
                <div style={this.styles.dataWrapper}>
                    <div style={this.styles.chartWrapper}>
                        <svg viewBox='200 50 300 300' style={this.styles.svgWrapper}>
                            <VictoryLabel
                                x={30}
                                y={65}
                                style={{
                                    fill: themeName === 'dark' ? '#fff' : '#000',
                                    fontFamily: 'inherit',
                                    fontSize: 8,
                                    fontStyle: 'italic',
                                }}
                                text='COUNT'
                            />
                            <g transform='translate(0, 40)'>
                                <VictoryAxis
                                    scale='time'
                                    standalone={false}
                                    width={700}
                                    style={{
                                        grid: {
                                            stroke: tick => (tick === 0 ? 'transparent' : '#313f46'),
                                            strokeWidth: 1,
                                        },
                                        axis: {
                                            stroke: themeName === 'dark' ? '#fff' : '#000',
                                            strokeWidth: 1,
                                        },
                                        ticks: {
                                            size: 5,
                                            stroke: themeName === 'dark' ? '#fff' : '#000',
                                            strokeWidth: 1,
                                        },
                                    }}
                                    label='SIGNED UP TIME'
                                    tickValues={this.state.xAxisTicks}
                                    tickFormat={
                                        (x) => {
                                            return Moment(x).format('YY/MM/DD hh:mm');
                                        }
                                    }
                                    tickLabelComponent={(
                                        <VictoryLabel
                                            dx={-5}
                                            dy={-5}
                                            angle={-40}
                                            style={{
                                                fill: themeName === 'dark' ? '#fff' : '#000',
                                                fontFamily: themeName === 'dark' ? '#fff' : '#000',
                                                fontSize: 8,
                                            }}
                                        />
                                    )}
                                    axisLabelComponent={(
                                        <VictoryLabel
                                            dy={20}
                                            style={{
                                                fill: themeName === 'dark' ? '#fff' : '#000',
                                                fontFamily: 'inherit',
                                                fontSize: 8,
                                                fontStyle: 'italic',
                                            }}
                                        />
                                    )}
                                />
                                <VictoryAxis
                                    dependentAxis
                                    domain={[1, this.state.maxCount]}
                                    width={700}
                                    offsetX={50}
                                    orientation='left'
                                    standalone={false}
                                    style={{
                                        grid: {
                                            stroke: tick => (tick === 0 ? 'transparent' : '#313f46'),
                                            strokeWidth: 1,
                                        },
                                        axis: {
                                            stroke: themeName === 'dark' ? '#fff' : '#000',
                                            strokeWidth: 1,
                                        },
                                        ticks: {
                                            strokeWidth: 0,
                                        },
                                        tickLabels: {
                                            fill: themeName === 'dark' ? '#fff' : '#000',
                                            fontFamily: 'inherit',
                                            fontSize: 8,
                                        },
                                    }}
                                />
                                <VictoryLine
                                    data={this.state.chartData}
                                    labels={d => d.label}
                                    width={700}
                                    domain={{
                                        x: [this.state.xAxisTicks[0], this.state.xAxisTicks[this.state.xAxisTicks.length - 1]],
                                        y: [1, this.state.maxCount],
                                    }}
                                    scale={{ x: 'time', y: 'linear' }}
                                    standalone={false}
                                    style={{
                                        data: {
                                            stroke: themeName === 'dark' ? '#fff' : '#000',
                                            strokeWidth: 2,
                                        },
                                    }}
                                    labelComponent={(
                                        <VictoryTooltip
                                            orientation='right'
                                            pointerLength={0}
                                            cornerRadius={2}
                                            flyoutStyle={{
                                                fill: '#000',
                                                fillOpacity: '0.5',
                                                strokeWidth: 1,
                                            }}
                                            style={this.styles.tooltip}
                                        />
                                    )}
                                />
                            </g>
                        </svg>
                    </div>
                    <div style={this.styles.tableWrapper}>
                        <CustomTable
                            tableData={this.state.tableData}
                        />
                        <Button
                            variant='contained'
                            color='secondary'
                            style={this.styles.button}
                            onClick={() => {
                                window.location.href = '/portal/dashboards/apimanalytics/home';
                            }}
                        >
                            <ArrowBack />
                            <FormattedMessage id='back.btn' defaultMessage='BACK' />
                        </Button>
                    </div>
                </div>
            );
        } else {
            return (
                <div style={this.styles.dataWrapper}>
                    <Paper
                        elevation={1}
                        style={{
                            padding: '4%',
                            border: '1px solid #fff',
                            height: '10%',
                            marginTop: '5%',
                        }}
                    >
                        <Typography variant='h5' component='h3'>
                            <FormattedMessage id='nodata.error.heading' defaultMessage='No Data Available !' />
                        </Typography>
                        <Typography component='p'>
                            <FormattedMessage
                                id='nodata.error.body'
                                defaultMessage='No matching data available for the selected options.'
                            />
                        </Typography>
                    </Paper>
                </div>
            );
        }
    }

    /**
     * Return the content of SignupsAnalytics widget
     * @returns {ReactElement} Render the content of Signups Analytics widget
     * @memberof SignupsAnalytics
     * */
    getSignups() {
        const themeName = this.props.muiTheme.name;

        return (
            <div
                style={{
                    background: themeName === 'dark' ? '#0e1e33' : '#fff',
                    height: '85%',
                    padding: '2.5% 1.5%',
                    margin: '1.5%',
                }}
            >
                <div style={this.styles.headingWrapper}>
                    <div style={{
                        borderBottom: themeName === 'dark' ? '1px solid #fff' : '1px solid #02212f',
                        width: '40%',
                        paddingBottom: '15px',
                        textAlign: 'left',
                        fontWeight: 'normal',
                        letterSpacing: 1.5,
                    }}
                    >
                        <FormattedMessage id='widget.heading' defaultMessage='DEVELOPER SIGNUPS OVER TIME' />
                    </div>
                </div>
                {this.getDataChart()}
            </div>
        );
    }

    /**
     * @inheritDoc
     * @returns {ReactElement} Render the Signups Analytics widget
     * @memberof SignupsAnalytics
     */
    render() {
        const themeName = this.props.muiTheme.name;
        const { localeMessages } = this.state;

        if (this.state.faultyProviderConfig === true) {
            return (
                <IntlProvider locale={language} messages={localeMessages}>
                    <div
                        style={{
                            margin: 'auto',
                            width: '50%',
                            marginTop: '20%',
                        }}
                    >
                        <Paper
                            elevation={1}
                            style={{
                                padding: '5%',
                                border: '2px solid #4555BB',
                            }}
                        >
                            <Typography variant='h5' component='h3'>
                                <FormattedMessage id='config.error.heading' defaultMessage='Configuration Error !' />
                            </Typography>
                            <Typography component='p'>
                                <FormattedMessage
                                    id='config.error.body'
                                    defaultMessage='Cannot fetch provider configuration for Signups Overtime widget'
                                />
                            </Typography>
                        </Paper>
                    </div>
                </IntlProvider>
            );
        } else {
            return (
                <IntlProvider locale={language} messages={localeMessages}>
                    <MuiThemeProvider
                        theme={themeName === 'dark' ? darkTheme : lightTheme}
                    >
                        <Scrollbars
                            style={{ height: this.state.height }}
                        >
                            {this.getSignups()}
                        </Scrollbars>
                    </MuiThemeProvider>
                </IntlProvider>
            );
        }
    }
}

global.dashboard.registerWidget('SignupsAnalytics', SignupsAnalytics);
