
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
import MenuItem from '@material-ui/core/MenuItem';
import ArrowBack from '@material-ui/icons/ArrowBack';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { VictoryAxis, VictoryLabel, VictoryLine } from 'victory';
import { defineMessages, IntlProvider, FormattedMessage } from 'react-intl';
import localeJSON from './resources/locale.json';
import CustomTable from './CustomTable';
import Constants from './Constants';

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
 * Create React Component for API Created Analytics
 * @class APICreatedAnalytics
 * @extends {Widget}
 */
class APICreatedAnalytics extends Widget {
    /**
     * Creates an instance of APICreatedAnalytics.
     * @param {any} props @inheritDoc
     * @memberof APICreatedAnalytics
     */
    constructor(props) {
        super(props);

        this.styles = {
            button: {
                backgroundColor: '#1d216b',
                width: '40%',
                height: '10%',
                color: '#fff',
                marginTop: '3%',
            },
            headingWrapper: {
                height: '10%',
                margin: 'auto',
                width: '97%',
            },
            formWrapper: {
                width: '97%',
                height: '10%',
                margin: 'auto',
            },
            formControl: {
                margin: 5,
                minWidth: 120,
            },
            selectEmpty: {
                marginTop: 10,
            },
            form: {
                display: 'flex',
                flexWrap: 'wrap',
            },
            axisYears: {
                grid: {
                    stroke: tick => (tick === 0 ? 'transparent' : '#313f46'),
                    strokeWidth: 1,
                },
                axis: { stroke: '#fff', strokeWidth: 1 },
                ticks: {
                    size: 5,
                    stroke: '#fff',
                    strokeWidth: 1,
                },
            },
            labelOne: {
                fill: '#fff',
                fontFamily: 'inherit',
                fontSize: 8,
                fontStyle: 'italic',
            },
            axisOne: {
                grid: {
                    stroke: tick => (tick === 0 ? 'transparent' : '#313f46'),
                    strokeWidth: 1,
                },
                axis: { stroke: '#fff', strokeWidth: 1 },
                ticks: { strokeWidth: 0 },
                tickLabels: {
                    fill: '#fff',
                    fontFamily: 'inherit',
                    fontSize: 8,
                },
            },
            lineOne: {
                data: { stroke: '#fff', strokeWidth: 2 },
            },
        };

        this.state = {
            width: this.props.glContainer.width,
            height: this.props.glContainer.height,
            createdBy: 'all',
            timeTo: null,
            timeFrom: null,
            dataSet: [],
            tableData: [],
            xAxis: [],
            maxCount: 0,
        };

        this.props.glContainer.on('resize', () => this.setState({
            width: this.props.glContainer.width,
            height: this.props.glContainer.height,
        }));

        this.handlePublisherParameters = this.handlePublisherParameters.bind(this);
        this.assembleQuery = this.assembleQuery.bind(this);
        this.handleDataReceived = this.handleDataReceived.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
     * @memberof APICreatedAnalytics
     * */
    handlePublisherParameters(receivedMsg) {
        this.setState({
            timeFrom: receivedMsg.from,
            timeTo: receivedMsg.to,
        }, this.assembleQuery);
    }

    /**
     * Formats the siddhi query using selected options
     * @memberof APICreatedAnalytics
     * */
    assembleQuery() {
        const { queryParamKey, creadtedByKeys } = Constants;
        const { timeFrom, timeTo } = this.state;
        const queryParam = super.getGlobalState(queryParamKey);
        let createdBy = creadtedByKeys.all;

        if (queryParam.createdBy) {
            createdBy = queryParam.createdBy;
        }
        this.state.createdBy = createdBy;
        this.setQueryParam(createdBy);

        if (this.state.providerConfig) {
            const dataProviderConfigs = _.cloneDeep(this.state.providerConfig);
            let { query } = dataProviderConfigs.configs.config.queryData;
            query = query
                .replace('{{timeFrom}}', Moment(timeFrom).format('YYYY-MM-DD HH:mm:ss.SSSSSSSSS'))
                .replace('{{timeTo}}', Moment(timeTo).format('YYYY-MM-DD HH:mm:ss.SSSSSSSSS'))
                .replace('{{querystring}}', this.state.createdBy === creadtedByKeys.me ? "AND CREATED_BY=='{{creator}}'" : '')
                .replace('{{creator}}', super.getCurrentUser().username);
            dataProviderConfigs.configs.config.queryData.query = query;
            super.getWidgetChannelManager().subscribeWidget(this.props.id, this.handleDataReceived, dataProviderConfigs);
        }
    }

    /**
     * Formats data retrieved and loads to the widget
     * @param {object} message - data retrieved
     * @memberof APICreatedAnalytics
     * */
    handleDataReceived(message) {
        if (message.data) {
            const { createdBy } = this.state;
            const xAxis = [];
            const dataSet = [];
            const tableData = [];
            let maxCount = 0;

            this.setState({ dataSet: [], tableData: [] });

            let index = 0;
            message.data.forEach((dataUnit) => {
                dataSet.push({ x: new Date(dataUnit[3]).getTime(), y: dataUnit[4] + index++ });
                tableData.push([(dataUnit[1] + ' ' + dataUnit[2]).toString(), Moment(dataUnit[3]).format('YYYY-MMM-DD hh:mm:ss')]);
            });

            maxCount = dataSet[dataSet.length - 1].y;

            const first = new Date(dataSet[0].x).getTime();
            const last = new Date(dataSet[dataSet.length - 1].x).getTime();
            const interval = (last - first) / 10;

            let amount = 0;
            xAxis.push(first);
            for (let i = 1; i <= 10; i++) {
                amount = interval * i;
                xAxis.push(new Date(first + amount).getTime());
            }

            this.setState({
                dataSet, tableData, xAxis, maxCount,
            });
            this.setQueryParam(createdBy);
        }
    }

    /**
     * Updates query param values
     * @param {string} createdBy - API Created By menu option selected
     * @memberof APICreatedAnalytics
     * */
    setQueryParam(createdBy) {
        const { queryParamKey } = Constants;
        super.setGlobalState(queryParamKey, { createdBy });
    }

    /**
     * Handle Select Change
     * @param {Event} event - listened event
     * @memberof APICreatedAnalytics
     * */
    handleChange(event) {
        this.setQueryParam(event.target.value);
        super.getWidgetChannelManager().unsubscribeWidget(this.props.id);
        this.assembleQuery();
    }

    /**
     * Return the content of APICreatedAnalytics widget
     * @returns {ReactElement} Render the content of API Created Analytics widget
     * @memberof APICreatedAnalytics
     * */
    getApiCount() {
        const themeName = this.props.muiTheme.name;

        return (
            <div
                style={{
                    padding: '2.5% 1.5%',
                    height: '85%',
                    background: themeName === 'dark' ? '#0e1e33' : '#fff',
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
                        <FormattedMessage id='widget.heading' defaultMessage='API CREATED OVER TIME' />
                    </div>
                </div>
                <div style={this.styles.formWrapper}>
                    <form style={this.styles.form} noValidate autoComplete='off'>
                        <FormControl style={this.styles.formControl}>
                            <InputLabel shrink htmlFor='createdBy-label-placeholder'>
                                Created By
                            </InputLabel>
                            <Select
                                value={this.state.createdBy}
                                onChange={this.handleChange}
                                input={<Input name='createdBy' id='createdBy-label-placeholder' />}
                                displayEmpty
                                name='createdBy'
                                style={this.styles.selectEmpty}
                            >
                                <MenuItem value='all'>All</MenuItem>
                                <MenuItem value='me'>Me</MenuItem>
                            </Select>
                        </FormControl>
                    </form>
                </div>
                <div style={{height:'80%'}}>
                    <div style={{width:'70%',float:'left',height:'100%'}}>
                        <svg viewBox='200 50 300 300'style={{height:'100%',width:'100%'}}>
                            <VictoryLabel
                                x={30}
                                y={65}
                                style={this.styles.labelOne}
                                text='COUNT'
                            />
                            <g transform='translate(0, 40)'>
                                <VictoryAxis
                                    scale='time'
                                    standalone={false}
                                    width={700}
                                    style={this.styles.axisYears}
                                    label="CREATED TIME"
                                    tickValues={this.state.xAxis}
                                    tickFormat={
                                        (x) => {
                                            return Moment(x).format('YY/MM/DD hh:mm');
                                        }
                                    }
                                    tickLabelComponent={<VictoryLabel dx={-5} dy={-5} angle = {-40} style = {{
                                        fill: '#fff',
                                        fontFamily: '#fff',
                                        fontSize: 8,
                                    }} />}
                                    axisLabelComponent={<VictoryLabel dy={20} style={{ fill: '#fff',
                                        fontFamily: 'inherit',
                                        fontSize: 8,
                                        fontStyle: 'italic'}} />}
                                />
                                <VictoryAxis
                                    dependentAxis
                                    domain={[1, this.state.maxCount]}
                                    width={700}
                                    offsetX={50}
                                    orientation='left'
                                    standalone={false}
                                    style={this.styles.axisOne}
                                />
                                <VictoryLine
                                    data={this.state.dataSet}
                                    width={700}
                                    domain={{
                                        x: [this.state.xAxis[0], this.state.xAxis[this.state.xAxis.length - 1]],
                                        y: [1, this.state.maxCount],
                                    }}

                                    scale={{ x: 'time', y: 'linear' }}
                                    standalone={false}
                                    style={this.styles.lineOne}
                                />
                            </g>
                        </svg>
                    </div>
                    <div style={{width:'30%',float:'right',height:'100%',textAlign:'right'}}>
                        <CustomTable
                            tableData={this.state.tableData}
                        />
                        <Button
                            variant='contained'
                            color='secondary'
                            style={this.styles.button}
                            onClick={() => {
                                window.location.href = '/portal/dashboards/apimanalytics/API-Created';
                            }}
                        >
                            <ArrowBack />
                            Back
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    /**
     * @inheritDoc
     * @returns {ReactElement} Render the API Created Analytics widget
     * @memberof APICreatedAnalytics
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
                                    defaultMessage='Cannot fetch provider configuration for API Created Analytics widget'
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
                            {this.getApiCount()}
                        </Scrollbars>
                    </MuiThemeProvider>
                </IntlProvider>
            );
        }
    }
}

global.dashboard.registerWidget('APICreatedAnalytics', APICreatedAnalytics);
