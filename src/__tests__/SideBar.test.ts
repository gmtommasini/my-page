// // import React from 'react';
// import { render, screen } from '@testing-library/react';
// import { mainListItems, secondaryListItems } from 'components/SideBar';

// describe('ListItem', () => {
//   test('renders main list items', () => {
//     render(mainListItems);
    
//     // Verify that all main list items are present
//     expect(screen.getByText('Dashboard')).toBeInTheDocument();
//     expect(screen.getByText('Orders')).toBeInTheDocument();
//     expect(screen.getByText('Customers')).toBeInTheDocument();
//     expect(screen.getByText('Reports')).toBeInTheDocument();
//     expect(screen.getByText('Integrations')).toBeInTheDocument();
//   });
  
//   test('renders secondary list items', () => {
//     render(secondaryListItems);
    
//     // Verify that the subheader and all secondary list items are present
//     expect(screen.getByText('Saved reports')).toBeInTheDocument();
//     expect(screen.getByText('Current month')).toBeInTheDocument();
//     expect(screen.getByText('Last quarter')).toBeInTheDocument();
//     expect(screen.getByText('Year-end sale')).toBeInTheDocument();
//   });
// });