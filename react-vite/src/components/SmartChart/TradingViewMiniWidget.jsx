import React, { useEffect } from 'react';

const TradingViewMiniWidget = ({ symbol, containerId }) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/tv.js';
        script.async = true;
        script.onload = () => {
            if (window.TradingView) {
                new window.TradingView.widget({
                    symbol: symbol,
                    container_id: containerId,
                    interval: 'D', // Set the interval to 1-day
                    autosize: true,
                    theme: 'light',
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
    }, [symbol, containerId]);

    return <div id={containerId} style={{ height: '300px', width: '500px' }} />;
};

export default TradingViewMiniWidget;
