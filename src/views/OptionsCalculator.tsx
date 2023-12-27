import React, { useState, useEffect, CSSProperties } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  } from 'chart.js';
import { Line } from 'react-chartjs-2';
  
  // Register the components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

import './loggedInViews.css';

interface ChartData {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor?: string;
      borderColor?: string;
      borderWidth?: number;
    }[];
    options?: {
        scales?: {
            x?: {
                ticks?: {
                    color?: string;
                };
            };
            y?: {
                ticks?: {
                    color?: string;
                };
            };
        };
        plugins?: {
            legend?: {
                labels?: {
                    color?: string;
                };
            };
        };
    };
}

const OptionsCalculator = () => {
    const [containerHeight, setContainerHeight] = useState(window.innerHeight - 80);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [chartData, setChartData] = useState<ChartData>({ labels: [], datasets: [] });

    const [startDate, setStartDate] = useState('2023-12-27');
    const [strikePrice, setStrikePrice] = useState(5.0);
    const [underlyingPrice, setUnderlyingPrice] = useState(3.625);
    const [volatility, setVolatility] = useState(0.92257);
    const [annualGrowthRate, setAnnualGrowthRate] = useState(4.0);
    const [dividendYield, setDividendYield] = useState(0.00);
    const [riskFreeRate, setRiskFreeRate] = useState(0.039);
    const [maturityDate, setMaturityDate] = useState('2024-03-15');

    
    const isMobile = windowWidth < 600;

    useEffect(() => {
        const handleResize = () => {
            setContainerHeight(window.innerHeight - 80);
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        // Fetch videos on component mount
        fetchPrices();

        // Cleanup event listener
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const fetchPrices = async () => {
        try {
            const postData = {
                start_date: startDate,
                strike_price: strikePrice,
                underlying_price: underlyingPrice,
                volatility: volatility,
                annual_growth_rate: annualGrowthRate,
                raw_dividend_yield: dividendYield,
                raw_risk_free_rate: riskFreeRate,
                maturity_date: maturityDate
            };
            const response = await axios.post('https://api.evanwaller.com/calculate_option_prices', postData);
            //const response = await axios.post('http://127.0.0.1:8000/calculate_option_prices', postData);
            setChartData({
                labels: response.data.dates,  // Your array of labels (e.g., dates)
                datasets: [
                    {
                        label: 'Call Option Prices',
                        data: response.data.call_prices,
                        borderColor: 'green',  // Set the border color to green for call option prices
                        borderWidth: 1.5         // Optional: Set the border width
                    },
                    {
                        label: 'Put Option Prices',
                        data: response.data.put_prices,
                        borderColor: 'red',    // Set the border color to red for put option prices
                        borderWidth: 1.5         // Optional: Set the border width
                    }
                ],
                options: {
                    scales: {
                        x: {
                            ticks: {
                                color: 'white' // Change x-axis labels color
                            }
                        },
                        y: {
                            ticks: {
                                color: 'white' // Change y-axis labels color
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            labels: {
                                color: 'white' // Change legend text color
                            }
                        }
                    }
                }
            });
        } catch (error) {
            console.error('Error fetching prices', error);
        }
    };

    const chartOptions = {
        scales: {
            x: {
                ticks: {
                    color: 'white' // Change x-axis labels color
                }
            },
            y: {
                ticks: {
                    color: 'white' // Change y-axis labels color
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    color: 'white' // Change legend text color
                }
            }
        }
    };

    const inputLabelStyle: CSSProperties = {
        height: '44px', // use height to ensure exact height rather than min/max
        lineHeight: '40px', // align text vertically
        textAlign: 'center',
        // ... other styles
        padding: '0px',
    };
    
    const inputStyle: CSSProperties = {
        height: '40px', // use height to ensure exact height rather than min/max
        // ... other styles
        padding: '0px',
        margin: '0px',
        width:'fit-content'
    };


    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh',}}>
            <div className="moving-background"></div> 
            <div className='navbar-div'> {/*This is 80px*/}
                <NavBar title="Binomial Options Calculator" /> 
            </div>
            <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center', 
                width: '100%',
                maxHeight: `${containerHeight}px`,
                // backgroundColor: '#343541',
                marginTop: '80px',
            }}>
                <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'flex-start', 
                    alignItems: 'center', 
                    width: isMobile ? '95%' : '50%',
                    maxHeight: `${containerHeight}px`,
                }}>
                    <Line data={chartData} options={chartOptions}/>
                    <button style={{marginTop: '20px'}} onClick={fetchPrices}>Calculate Prices</button>
                    <div style={{ 
                        display: 'flex', 
                        flexDirection: 'row', 
                        justifyContent: 'flex-start', 
                        alignItems: 'flex-start', 
                        width: '100%',
                        height: `auto`,
                        overflowY: 'scroll',
                        marginTop: '20px'
                    }}>
                        <div style={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            justifyContent: 'flex-start', 
                            alignItems: 'flex-end', 
                            width: '50%',
                            maxHeight: `100%`,
                            overflowY: 'scroll',
                            paddingRight: '5px'
                        }}>
                            <label style={inputLabelStyle}>Start Date</label>
                            <label style={inputLabelStyle}>Maturity Date</label>
                            <label style={inputLabelStyle}>Strike Price</label>
                            <label style={inputLabelStyle}>Underlying Price</label>
                            <label style={inputLabelStyle}>Implied Volatility</label>
                            <label style={inputLabelStyle}>Annual Growth Rate</label>
                            <label style={inputLabelStyle}>Dividend Yield</label>
                            <label style={inputLabelStyle}>Risk Free Rate</label>
                        </div>
                        <div style={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            justifyContent: 'flex-start', 
                            alignItems: 'space-between', 
                            width: '50%',
                            maxHeight: `100%`,
                            overflowY: 'scroll',
                            paddingLeft: '5px'
                        }}>
                            <input type="date" value={startDate} style={inputStyle} onChange={(e) => setStartDate(e.target.value)} />
                            <input type="date" value={maturityDate} style={inputStyle} onChange={(e) => setMaturityDate(e.target.value)} />
                            <input type="number" value={strikePrice} style={inputStyle} onChange={(e) => setStrikePrice(parseFloat(e.target.value))} />
                            <input type="number" value={underlyingPrice} style={inputStyle} onChange={(e) => setUnderlyingPrice(parseFloat(e.target.value))} />
                            <input type="number" value={volatility} style={inputStyle} onChange={(e) => setVolatility(parseFloat(e.target.value))} />
                            <input type="number" value={annualGrowthRate} style={inputStyle} onChange={(e) => setAnnualGrowthRate(parseFloat(e.target.value))} />
                            <input type="number" value={dividendYield} style={inputStyle} onChange={(e) => setDividendYield(parseFloat(e.target.value))} />
                            <input type="number" value={riskFreeRate} style={inputStyle} onChange={(e) => setRiskFreeRate(parseFloat(e.target.value))} />
                            
                        </div>
                        
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default OptionsCalculator;
