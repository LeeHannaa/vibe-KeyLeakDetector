// API 키 패턴 정의
export const KEY_PATTERNS = [
  {
    type: 'AWS Access Key',
    pattern: /AKIA[0-9A-Z]{16}/g,
    description: 'AWS Access Key ID'
  },
  {
    type: 'AWS Secret Key',
    pattern: /aws_secret_access_key\s*=\s*['"]?([A-Za-z0-9/+=]{40})['"]?/gi,
    description: 'AWS Secret Access Key'
  },
  {
    type: 'GitHub Token',
    pattern: /ghp_[A-Za-z0-9]{36}/g,
    description: 'GitHub Personal Access Token'
  },
  {
    type: 'GitHub OAuth Token',
    pattern: /gho_[A-Za-z0-9]{36}/g,
    description: 'GitHub OAuth Token'
  },
  {
    type: 'Google API Key',
    pattern: /AIza[0-9A-Za-z\-_]{35}/g,
    description: 'Google API Key'
  },
  {
    type: 'Google OAuth Client ID',
    pattern: /[0-9]+-[0-9A-Za-z_]{32}\.apps\.googleusercontent\.com/g,
    description: 'Google OAuth Client ID'
  },
  {
    type: 'Stripe API Key',
    pattern: /sk_live_[0-9a-zA-Z]{24,}/g,
    description: 'Stripe Live API Key'
  },
  {
    type: 'Stripe Test Key',
    pattern: /sk_test_[0-9a-zA-Z]{24,}/g,
    description: 'Stripe Test API Key'
  },
  {
    type: 'Stripe Publishable Key',
    pattern: /pk_live_[0-9a-zA-Z]{24,}/g,
    description: 'Stripe Publishable Key'
  },
  {
    type: 'Slack Token',
    pattern: /xox[baprs]-[0-9a-zA-Z\-]{10,48}/g,
    description: 'Slack API Token'
  },
  {
    type: 'Twitter API Key',
    pattern: /[tT][wW][iI][tT][tT][eE][rR].*[1-9][0-9a-zA-Z]{25,34}/g,
    description: 'Twitter API Key'
  },
  {
    type: 'Facebook Access Token',
    pattern: /EAABwzLixnjYBO[0-9A-Za-z]+/g,
    description: 'Facebook Access Token'
  },
  {
    type: 'Heroku API Key',
    pattern: /[hH][eE][rR][oO][kK][uU].*[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}/gi,
    description: 'Heroku API Key'
  },
  {
    type: 'Generic API Key',
    pattern: /(api[_-]?key|apikey|api_key)\s*[=:]\s*['"]?([A-Za-z0-9\-_]{20,})['"]?/gi,
    description: 'Generic API Key Pattern'
  },
  {
    type: 'JWT Token',
    pattern: /eyJ[A-Za-z0-9-_=]+\.eyJ[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*/g,
    description: 'JSON Web Token'
  },
  {
    type: 'MongoDB Connection String',
    pattern: /mongodb\+srv:\/\/[^:]+:[^@]+@[^\s'"]+/g,
    description: 'MongoDB Connection String with credentials'
  },
  {
    type: 'PostgreSQL Connection String',
    pattern: /postgres:\/\/[^:]+:[^@]+@[^\s'"]+/g,
    description: 'PostgreSQL Connection String with credentials'
  },
  {
    type: 'Redis Connection String',
    pattern: /redis:\/\/:[^@]+@[^\s'"]+/g,
    description: 'Redis Connection String with password'
  },
  {
    type: 'SendGrid API Key',
    pattern: /SG\.[A-Za-z0-9\-_]{22}\.[A-Za-z0-9\-_]{43}/g,
    description: 'SendGrid API Key'
  },
  {
    type: 'Twilio API Key',
    pattern: /SK[0-9a-fA-F]{32}/g,
    description: 'Twilio API Key'
  },
  {
    type: 'Mailgun API Key',
    pattern: /key-[0-9a-zA-Z]{32}/g,
    description: 'Mailgun API Key'
  }
];

// 보안 레벨 판단 (기본값)
export const getSecurityLevel = (keyType) => {
  const highRiskTypes = [
    'AWS Secret Key',
    'Stripe API Key',
    'GitHub Token',
    'MongoDB Connection String',
    'PostgreSQL Connection String',
    'Redis Connection String'
  ];
  
  if (highRiskTypes.includes(keyType)) {
    return 'high';
  }
  
  const mediumRiskTypes = [
    'AWS Access Key',
    'Google API Key',
    'Slack Token',
    'Facebook Access Token'
  ];
  
  if (mediumRiskTypes.includes(keyType)) {
    return 'medium';
  }
  
  return 'low';
};

// 위험 설명
export const getRiskDescription = (keyType) => {
  const descriptions = {
    'AWS Secret Key': 'AWS 계정 전체에 대한 완전한 접근 권한을 제공합니다. 즉시 폐기해야 합니다.',
    'AWS Access Key': 'AWS 리소스에 접근할 수 있는 키입니다. Secret Key와 함께 사용되면 위험합니다.',
    'Stripe API Key': '결제 정보에 접근할 수 있어 매우 위험합니다.',
    'GitHub Token': 'GitHub 레포지토리와 계정에 접근할 수 있습니다.',
    'MongoDB Connection String': '데이터베이스에 직접 접근할 수 있습니다.',
    'PostgreSQL Connection String': '데이터베이스에 직접 접근할 수 있습니다.',
    'Redis Connection String': '캐시 및 세션 데이터에 접근할 수 있습니다.',
    'Google API Key': 'Google 서비스 사용량이 증가할 수 있습니다.',
    'Slack Token': 'Slack 워크스페이스에 접근할 수 있습니다.',
    'Facebook Access Token': 'Facebook 계정 및 페이지에 접근할 수 있습니다.'
  };
  
  return descriptions[keyType] || 'API 키가 노출되었을 수 있습니다. 보안 검토가 필요합니다.';
};

// 조치 사항
export const getActionSteps = (keyType) => {
  return [
    '즉시 해당 키를 폐기하세요',
    '새로운 키를 생성하세요',
    '키가 사용된 모든 서비스에서 업데이트하세요',
    'Git 히스토리에서 키를 제거하세요 (git filter-branch 또는 BFG Repo-Cleaner 사용)',
    '보안 감사 로그를 확인하여 키가 사용되었는지 확인하세요'
  ];
};

