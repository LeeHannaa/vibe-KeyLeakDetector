import React from 'react';

const ResultCard = ({ result }) => {
  const getLevelColor = (level) => {
    switch (level) {
      case 'high':
        return '#ef4444';
      case 'medium':
        return '#f59e0b';
      case 'low':
        return '#3b82f6';
      default:
        return '#6b7280';
    }
  };

  const getLevelText = (level) => {
    switch (level) {
      case 'high':
        return '높음';
      case 'medium':
        return '중간';
      case 'low':
        return '낮음';
      default:
        return '알 수 없음';
    }
  };

  return (
    <div className="result-card">
      <div className="result-header">
        <h3 className="result-type">{result.type}</h3>
        <span
          className="result-level"
          style={{ backgroundColor: getLevelColor(result.level) }}
        >
          {getLevelText(result.level)}
        </span>
      </div>
      
      <div className="result-content">
        <div className="result-value">
          <strong>발견된 키:</strong>
          <code className="key-value">{result.value.substring(0, 30)}...</code>
        </div>
        
        {result.line && (
          <div className="result-line">
            <strong>라인:</strong> {result.line}
          </div>
        )}
        
        <div className="result-risks">
          <strong>⚠️ 위험:</strong>
          <p>{result.risks || '보안 위험이 있을 수 있습니다.'}</p>
        </div>
        
        {result.actions && result.actions.length > 0 && (
          <div className="result-actions">
            <strong>✅ 조치 사항:</strong>
            <ul>
              {result.actions.map((action, idx) => (
                <li key={idx}>{action}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultCard;

