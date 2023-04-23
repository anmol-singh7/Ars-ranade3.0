export const userTypeMap = {
    'Admin': { userType: 'Admin', pages: ['Users', 'Systems', 'Manufacturers', 'Clients', 'Headings','Reports'], permissions: ['Edit', 'Delete', 'CreateNew'] },
    'Approver': { userType: 'Approver', pages: ['Reports'], permissions: ['View1'] },
    'Checker': { userType: 'Checker', pages: ['Reports'], permissions: ['View1'] },
    'Creator': { userType: 'Creator', pages: ['Reports'], permissions: ['Edit', 'Delete', 'CreateNew'] },
    'Viewer': { userType: 'Viewer', pages: ['Reports'], permissions: ['View2'] },
  };