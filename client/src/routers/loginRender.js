import React from 'react';
import loginHtml from '../../public/index.html';

function LoginPage() {
  return <div dangerouslySetInnerHTML={{ __html: loginHtml }} />;
}

export default LoginPage;