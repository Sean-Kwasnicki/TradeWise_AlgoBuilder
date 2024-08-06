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
                    interval: 'D',
                    autosize: true,
                    theme: 'dark',
                    style: '1',
                    locale: 'en',
                    // toolbar_bg: '#f1f3f6',
                    enable_publishing: false,
                    withdateranges: true,
                    hide_side_toolbar: true,
                    allow_symbol_change: false,
                    save_image: false,
                });
            }
        };
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [symbol, containerId]);

    return <div id={containerId} style={{ height: '500px', width: 'auto' }} />;
};

export default TradingViewMiniWidget;
