
import React from 'react';
import { Helmet } from 'react-helmet';
import AdminAccess from './admin/AdminAccess';

const AdminAccessPage = () => {
  return (
    <>
      <Helmet>
        <title>GPO Admin Access - Secured Area</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <AdminAccess />
    </>
  );
};

export default AdminAccessPage;
