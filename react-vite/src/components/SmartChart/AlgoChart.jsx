import React, { useEffect, useRef } from 'react';

const indicatorMapping = {
  sma: 'MASimple@tv-basicstudies',
  rsi: 'RSI@tv-basicstudies',
  macd: 'MACD@tv-basicstudies',
  bollinger_bands: 'BB@tv-basicstudies',
  stochastic: 'Stochastic@tv-basicstudies',
  parabolic_sar: 'ParabolicSAR@tv-basicstudies',
  atr: 'ATR@tv-basicstudies',
  cci: 'CCI@tv-basicstudies',
  williams_r: 'WilliamsR@tv-basicstudies',
  ichimoku_cloud : 'IchimokuCloud@tv-basicstudies'
};

const AlgoTradingViewWidget = ({ symbol, studies }) => {
  const widgetRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      if (window.TradingView) {
        widgetRef.current = new window.TradingView.widget({
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
          hide_side_toolbar: true,
          allow_symbol_change: false,
          save_image: false,
          studies: [indicatorMapping[studies]],
        });

        widgetRef.current.onChartReady(() => {
          const chart = widgetRef.current.chart();
          chart.removeAllStudies();
          studies.forEach(study => {
            if (indicatorMapping[study]) {
              chart.createStudy(indicatorMapping[study], false, false);
            }
          });
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      if (widgetRef.current) {
        widgetRef.current.remove();
        widgetRef.current = null;
      }
      document.body.removeChild(script);
    };
  }, [symbol]);

  useEffect(() => {
    if (widgetRef.current) {
      const chart = widgetRef.current.chart();
      chart.removeAllStudies();
      studies.forEach(study => {
        if (indicatorMapping[study]) {
          chart.createStudy(indicatorMapping[study], false, false);
        }
      });
    }
  }, [studies]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <div id="tradingview_widget" style={{ height: '800px', width: '700px', margin: '10px' }} />
    </div>
  );
};

export default AlgoTradingViewWidget;
