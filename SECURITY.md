# Security Guidelines for EgyDrip

## 🔐 Environment Variables

### Required Environment Variables
All sensitive configuration should be stored in environment variables, never hardcoded in source code.

**Client (.env in client/ directory):**
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## 🛡️ Firebase Security Rules

### Firestore Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Brands collection - admins only can write
    match /brands/{brandId} {
      allow read: if true; // Public read
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "admin";
    }
    
    // Products collection - admins only can write
    match /products/{productId} {
      allow read: if true; // Public read
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "admin";
    }
  }
}
```

### Authentication Security Rules
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## 🔒 Authentication Security

### Password Requirements
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character

### Admin User Creation
Admins should be created through Firebase Console, not through the application.

## 🌐 Deployment Security

### Environment Variables in Production

**Vercel:**
1. Go to Project Settings > Environment Variables
2. Add all VITE_* variables
3. Set for Production environment

**Netlify:**
1. Go to Site Settings > Environment Variables
2. Add all VITE_* variables

**Firebase Hosting:**
Use Firebase Functions for server-side environment variables.

## 🔍 Security Checklist

### Before Pushing to GitHub:
- [ ] .env files are in .gitignore
- [ ] No hardcoded API keys in source code
- [ ] All sensitive data uses environment variables
- [ ] .env.example is updated with placeholder values
- [ ] README includes security setup instructions

### Before Deployment:
- [ ] Firebase security rules are configured
- [ ] Environment variables are set in hosting platform
- [ ] HTTPS is enabled
- [ ] Authentication is properly configured
- [ ] Admin users are created securely

### Regular Maintenance:
- [ ] Update dependencies regularly
- [ ] Monitor Firebase usage and costs
- [ ] Review security rules periodically
- [ ] Rotate API keys if compromised
- [ ] Monitor authentication logs

## 🚨 Security Incident Response

### If API Keys Are Compromised:
1. Immediately regenerate all Firebase API keys
2. Update environment variables in all deployments
3. Review Firebase logs for unauthorized access
4. Update security rules if necessary
5. Notify users if data was compromised

### If Admin Access Is Compromised:
1. Immediately revoke admin privileges
2. Change admin passwords
3. Review all recent admin actions
4. Check for unauthorized data changes
5. Implement additional security measures

## 📞 Security Contacts

For security issues, please email: [your-security-email@domain.com]

**DO NOT** open public GitHub issues for security vulnerabilities.

## 🔗 Additional Resources

- [Firebase Security Documentation](https://firebase.google.com/docs/rules)
- [React Security Best Practices](https://owasp.org/www-project-top-ten/)
- [Environment Variables Best Practices](https://12factor.net/config)
