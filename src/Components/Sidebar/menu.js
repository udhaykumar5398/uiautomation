import React from 'react';
import { Link } from 'react-router-dom';

import AIcon1 from '../../images/AIcon1.png';
import AIcon2 from '../../images/AIcon2.png';
import AIcon3 from '../../images/AIcon3.png';
import AIcon4 from '../../images/AIcon4.png';
import DashboardClient from '../../images/dashboardClient.png';
import InitialSetup from '../../images/initial_setupClient.png';
import ViewInvestorReport from '../../images/view-investor-reportClient.png';
import LoanDataTape from '../../images/loan-data-tape-reportClient.png';
import DownloadServicer from '../../images/download-servicer-dataClient.png';

const OrgName = localStorage.getItem('OrgName');

export const AdminUser = [
  {
    'linkto': '/admin/dashboard',
    'title': 'Admin Dashboard',
    'icon': AIcon1,
  },
  {
    'linkto': '/admin/processordashboard',
    'title': 'Processor Dashboard',
    'icon': AIcon2,
  },
  {
    'linkto': '/admin/fields',
    'title': 'Fields Dashboard',
    'icon': AIcon3,
  },
  {
    'linkto': '/admin/issueCertificate',
    'title': 'Issue Certificate Dashboard',
    'icon': AIcon4,
  },
];

export  const Processor = [
  {
    'linkto': '/processor/dashboard',
    'title': 'Processor Dashboard',
    'icon': AIcon1,
  },
];

const TrusteeMenu = [
  {
    'linkto': '/report/trusteedeal/dashboard',
    'title': 'Dashboard ',
    'icon': DashboardClient,
    'subitems': [
      {
        'linkto': '/report/trusteedeal/dashboard',
        'title': 'Dashboard',
        'icon': DashboardClient,
      },
    ],
  },
  {
    'linkto': '/report/trusteedeal/initial-setup',
    'title': 'initial-setup ',
    'icon': InitialSetup,
    'subitems': [
      {
        'linkto': '/report/trusteedeal/initial-setup',
        'title': 'Initial Setup',
        'icon': InitialSetup,
      },
      {
        'linkto': '/report/trusteedeal/add-new',
        'title': 'Add New',
        'icon': InitialSetup,
      },
      {
        'linkto': '/report/trusteedeal/view-servicer-mongodb-data',
        'title': 'View Servicer Data From Database',
        'icon': InitialSetup,
      },
      {
        'linkto': '/report/trusteedeal/validate-monthly-inputs',
        'title': 'Validate Monthly Inputs',
        'icon': InitialSetup,
      },
      {
        'linkto': '/report/trusteedeal/view-servicer-blockchain-data',
        'title': 'View Servicer Data From Network',
        'icon': InitialSetup,
      },
      {
        'linkto': '/report/trusteedeal/generate-investor-report',
        'title': 'Generate Trustee Report',
        'icon': InitialSetup,
      },
      {
        'linkto': '/report/trusteedeal/customize-investor-report',
        'title': 'Customize Trustee Report',
        'icon': InitialSetup,
      },
      {
        'linkto': '/report/trusteedeal/view-loan-data-tape/monthly-trustee-report',
        'title': 'View Trustee Report',
        'icon': ViewInvestorReport,
      },
    ],
  },
  {
    'linkto': '/report/trusteedeal/view-loan-data-tape/loan-strat-analytics',
    'title': 'Loan Strat Report ',
    'icon': LoanDataTape,
    'subitems': [
      {
        'linkto': '/report/trusteedeal/view-loan-data-tape/loan-strat-analytics',
        'title': 'Loan Strat Report',
        'icon': LoanDataTape,
      },
    ],
  },
  {
    'linkto': '/report/trusteedeal/download-servicer-data',
    'title': 'Servicer Data ',
    'icon': DownloadServicer,
    'subitems': [
      {
        'linkto': '/report/trusteedeal/download-servicer-data',
        'title': 'Download Servicer Data',
        'icon': DownloadServicer,
      },
    ],
  },
];

const renderMenu = (menu) => (
  menu.map(item => (
    <li key={item.linkto}>
      <Link to={item.linkto}>
        <img src={item.icon} alt={item.title} />
        {item.title}
      </Link>
      {item.subitems && (
        <ul>
          {renderMenu(item.subitems)}
        </ul>
      )}
    </li>
  ))
);

const Menu = () => (
  <div>
    <h2>Admin User Menu</h2>
    <ul>{renderMenu(AdminUser)}</ul>
    
    <h2>Processor Menu</h2>
    <ul>{renderMenu(Processor)}</ul>
    
    <h2>Trustee Menu</h2>
    <ul>{renderMenu(TrusteeMenu)}</ul>
  </div>
);

export default Menu;
