
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
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { VictoryPie, VictoryLegend, VictoryTooltip } from 'victory';
import { defineMessages, IntlProvider, FormattedMessage } from 'react-intl';
import localeJSON from './resources/locale.json';
import CustomTable from './CustomTable';

const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
    },
});

const lightTheme = createMuiTheme({
    palette: {
        type: 'light',
    },
});

const queryParamKey = 'subscribers';

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
 * Create React Component for Top Subscribers
 * @class TopSubscribers
 * @extends {Widget}
 */
class TopSubscribers extends Widget {
    /**
     * Creates an instance of TopSubscribers.
     * @param {any} props @inheritDoc
     * @memberof TopSubscribers
     */
    constructor(props) {
        super(props);

        this.styles = {
            headingWrapper: {
                height: '10%',
                margin: 'auto',
                width: '90%',
            },
            formWrapper: {
                width: '90%',
                height: '15%',
                margin: 'auto',
            },
            form: {
                width: '30%',
                marginLeft: '5%',
                marginTop: '5%',
                display: 'flex',
                flexWrap: 'wrap',
            },
            textField: {
                marginLeft: 8,
                marginRight: 8,
                width: 200,
            },
        };

        this.state = {
            width: this.props.glContainer.width,
            height: this.props.glContainer.height,
            data: [],
            legenddata: [],
            limit: 0,
            localeMessages: {},
        };

        this.props.glContainer.on('resize', () => this.setState({
            width: this.props.glContainer.width,
            height: this.props.glContainer.height,
        }));

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
                }, this.assembleQuery);
            })
            .catch((error) => {
                console.error("Error occurred when loading widget '" + this.props.widgetID + "'. " + error);
                this.setState({
                    faultyProviderConfig: true,
                });
            });
    }

    componentWillUnmount() {
        super.getWidgetChannelManager().unsubscribeWidget(this.props.id);
    }

    /**
     * Formats the siddhi query using selected options
     * @memberof TopSubscribers
     * */
    assembleQuery() {
        const queryParam = super.getGlobalState(queryParamKey);
        let limit = 5;

        if (queryParam.limit) {
            limit = queryParam.limit;
        }

        this.setState({ limit, data: [] });
        this.setQueryParam(limit);

        if (this.state.providerConfig) {
            const dataProviderConfigs = _.cloneDeep(this.state.providerConfig);
            let { query } = dataProviderConfigs.configs.config.queryData;
            query = query
                .replace('{{limit}}', limit);
            dataProviderConfigs.configs.config.queryData.query = query;
            super.getWidgetChannelManager().subscribeWidget(this.props.id, this.handleDataReceived, dataProviderConfigs);
        }
    }

    /**
     * Formats data retrieved and loads to the widget
     * @param {object} message - data retrieved
     * @memberof TopSubscribers
     * */
    handleDataReceived(message) {
        if (message.data) {
            const { limit } = this.state;
            const legenddata = [];
            const data = [];
            let sum = 0;
            let percentage = 0;
            message.data.forEach((dataUnit) => {
                if (!legenddata.includes({ name: dataUnit[0] })) {
                    legenddata.push({ name: dataUnit[0] });
                }
                sum += dataUnit[1];
            });
            message.data.forEach((dataUnit) => {
                percentage = (dataUnit[1] / sum) * 100;
                data.push([dataUnit[0], dataUnit[1], dataUnit[0] + ' : ' + percentage.toFixed(2) + '%']);
            });
            this.setState({ legenddata, data });
            this.setQueryParam(limit);
        }
    }

    /**
     * Updates query param values
     * @param {number} limit - data limitation value
     * @memberof TopSubscribers
     * */
    setQueryParam(limit) {
        super.setGlobalState(queryParamKey, { limit });
    }

    /**
     * updates query param values
     * @param {Event} event - listened event
     * @memberof TopSubscribers
     * */
    handleChange(event) {
        const queryParam = super.getGlobalState(queryParamKey);
        this.setQueryParam(event.target.value);
        this.setState({ limit: queryParam.limit });
        super.getWidgetChannelManager().unsubscribeWidget(this.props.id);
        this.assembleQuery();
    }

    /**
     * Return the content of TopSubscribers widget
     * @returns {ReactElement} Render the content of Top Subscribers widget
     * @memberof TopSubscribers
     * */
    getSubscribers() {
        const themeName = this.props.muiTheme.name;

        return (
            <div style={{
                backgroundColor: themeName === 'dark' ? '#0e1e33' : '#fff',
                width: '80%',
                margin: '5% auto',
                padding: '10% 5%',
            }}
            >
                <div style={this.styles.headingWrapper}>
                    <h3 style={{
                        borderBottom: themeName === 'dark' ? '1px solid #fff' : '1px solid #02212f',
                        paddingBottom: '10px',
                        margin: 'auto',
                        textAlign: 'left',
                        fontWeight: 'normal',
                        letterSpacing: 1.5,
                    }}
                    >
                        <FormattedMessage id='widget.heading' defaultMessage='TOP SUBSCRIBERS' />
                    </h3>
                </div>
                <div style={this.styles.formWrapper}>
                    <form style={this.styles.form} noValidate autoComplete='off'>
                        <TextField
                            id='limit-number'
                            label={<FormattedMessage id='limit' defaultMessage='Limit :' />}
                            value={this.state.limit}
                            onChange={this.handleChange}
                            type='number'
                            style={this.styles.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin='normal'
                        />
                    </form>
                </div>
                <div>
                    <svg viewBox='0 0 700 500'>
                        <VictoryPie
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
                                    style={{ fill: '#fff', fontSize: 25 }}
                                />
                            )}
                            width={500}
                            height={500}
                            standalone={false}
                            padding={{
                                left: 50, bottom: 50, top: 50, right: 50,
                            }}
                            colorScale={['#385dbd', '#030d8a', '#59057b', '#ab0e86', '#e01171', '#ffe2ff']}
                            data={this.state.data}
                            x={0}
                            y={1}
                            labels={d => d[2]}
                        />
                        <VictoryLegend
                            standalone={false}
                            colorScale={['#385dbd', '#030d8a', '#59057b', '#ab0e86', '#e01171', '#ffe2ff']}
                            x={500}
                            y={20}
                            gutter={20}
                            rowGutter={{ top: 0, bottom: -10 }}
                            style={{
                                labels: {
                                    fill: '#9e9e9e',
                                    fontSize: 25,
                                },
                            }}
                            data={this.state.legenddata}
                        />
                    </svg>
                    <CustomTable
                        tableData={this.state.data}
                    />
                </div>
            </div>
        );
    }

    /**
     * @inheritDoc
     * @returns {ReactElement} Render the Top Subscribers widget
     * @memberof TopSubscribers
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
                                    defaultMessage='Cannot fetch provider configuration for TOP SUBSCRIBERS widget'
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
                            {this.getSubscribers()}
                        </Scrollbars>
                    </MuiThemeProvider>
                </IntlProvider>
            );
        }
    }
}

global.dashboard.registerWidget('TopSubscribers', TopSubscribers);
