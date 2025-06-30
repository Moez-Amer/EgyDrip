# Staff Login and Admin Dashboard

## Overview
EgyDrip includes a staff login system that allows designated staff members to access an admin dashboard for managing brand applications.

## Staff Login Setup
Staff credentials are configured through environment variables for security:
- Set `VITE_STAFF_EMAIL` in your .env file
- Set `VITE_STAFF_PASSWORD` in your .env file

⚠️ **Never commit actual credentials to version control**

## Features

### Staff Login
- The staff login is hardcoded into the authentication system
- If the staff account doesn't exist in Firebase, it will be automatically created on first login
- Staff members are automatically granted admin privileges

### Admin Dashboard
- Accessible via `/admin` route or through the "Admin" link in the navigation bar (visible only to admin users)
- Shows comprehensive statistics of all brand applications
- Displays all brand applications with detailed information
- Allows filtering by status (All, Pending, Approved, Rejected)
- Provides functionality to update brand application statuses

### Real-time Status Updates
- When staff update a brand's status, the changes are immediately reflected in the brand's dashboard
- Brand dashboards auto-refresh every 30 seconds to check for status updates
- Brands can also manually refresh their status using the refresh button

## Navigation
- Admin users will see an "Admin" link in the navigation bar
- The admin dashboard is protected by authentication - only logged-in admin users can access it
- Non-admin users are redirected to the contact page when trying to access admin routes

## Brand Dashboard Enhancements
- Auto-refresh functionality (every 30 seconds)
- Manual refresh button
- Display of complete brand information
- Status change notifications
- Real-time status updates from staff actions

## Technical Implementation
- Staff email is added to the `adminEmails` array in `adminService`
- Authentication system handles automatic account creation for staff
- Status updates are logged for analytics and audit trails
- Real-time synchronization between admin actions and brand views

## Usage
1. Log in using the staff credentials on the Contact page
2. Navigate to the Admin dashboard (automatically redirected or use navigation)
3. View and manage all brand applications
4. Update statuses as needed - changes will be reflected immediately for brands
