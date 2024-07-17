import React, { useEffect } from 'react';

const DashboardTradingViewWidget = ({ symbol }) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/tv.js';
        script.async = true;
        script.onload = () => {
            if (window.TradingView) {
                new window.TradingView.widget({
                    symbol: symbol,
                    container_id: 'tradingview_widget',
                    interval: 'D', 
                    autosize: true,
                    theme: 'dark',
                    style: '1',
                    locale: 'en',
                    toolbar_bg: '#f1f3f6',
                    enable_publishing: false,
                    withdateranges: true,
                    hide_side_toolbar: false,
                    allow_symbol_change: true,
                    save_image: false,
                });
            }
        };
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [symbol]);

    return <div id="tradingview_widget" style={{ height: '500px', width: '100%' }} />;
};

export default DashboardTradingViewWidget;
