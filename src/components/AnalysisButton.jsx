import React from 'react';

const AnalysisButton = ({ onClick, isLoading, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`analysis-button ${isLoading ? 'loading' : ''}`}
    >
      {isLoading ? (
        <>
          <span className="spinner"></span>
          분석 중...
        </>
      ) : (
        '🔍 API 키 검사 시작'
      )}
    </button>
  );
};

export default AnalysisButton;

