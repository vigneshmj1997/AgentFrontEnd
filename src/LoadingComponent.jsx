import React, { useState, useEffect } from 'react';

const LoadingComponent = () => {
  const [loadingState, setLoadingState] = useState('initial');

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setLoadingState('fetching');
    }, 2000);

    const timer2 = setTimeout(() => {
      setLoadingState('analyzing');
    }, 2000);

    const timer3 = setTimeout(() => {
      setLoadingState('inferring');
    }, 1500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  };

  const loadingStyle = {
    textAlign: 'center',
    fontSize: '18px',
    fontWeight: 'bold',
  };

  if (loadingState === 'initial' || loadingState === 'fetching') {
    return (
      <div style={containerStyle}>
        <div style={loadingStyle}>
          <p>جارٍ استرداد البيانات من قاعدة البيانات......</p>
        </div>
      </div>
    );
  } else if (loadingState === 'analyzing') {
    return (
      <div style={containerStyle}>
        <div style={loadingStyle}>
          <p>جارٍ تحليل الاستجابة......</p>
        </div>
      </div>
    );
  } else if (loadingState === 'inferring') {
    return (
      <div style={containerStyle}>
        <div style={loadingStyle}>
          <p>استنتاج المعلومات.......</p>
        </div>
      </div>
    );
  }

  // If loading is complete, return null or your actual content
  return null;
};

export default LoadingComponent;
