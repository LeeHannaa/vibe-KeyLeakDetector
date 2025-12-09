import React from 'react';

const UrlInput = ({ url, setUrl, isLoading }) => {
  return (
    <div className="url-input-container">
      <label htmlFor="github-url" className="url-label">
        GitHub URL 입력
      </label>
      <input
        id="github-url"
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://github.com/username/repo/blob/main/file.js"
        className="url-input"
        disabled={isLoading}
      />
      <p className="url-hint">
        ⚠️ 리포지토리 URL(.git)이 아닌 <strong>파일 URL</strong>을 입력하세요<br/>
        예: https://github.com/username/repo/blob/main/file.js<br/>
        또는: https://raw.githubusercontent.com/username/repo/branch/file.js
      </p>
    </div>
  );
};

export default UrlInput;

