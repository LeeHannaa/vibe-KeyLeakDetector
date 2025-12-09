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
        GitHub 레포지토리의 파일 URL 또는 Raw 파일 URL을 입력하세요
      </p>
    </div>
  );
};

export default UrlInput;

