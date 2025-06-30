# EgyDrip - Egyptian Local Apparel Platform

A modern e-commerce platform showcasing Egypt's best local apparel brands with a clean, minimalist design.

## 🚀 Features

- **Modern UI/UX**: Clean black and white theme with responsive design
- **Brand Management**: Admin dashboard for managing brands and products
- **User Authentication**: Secure Firebase authentication system
- **Product Showcase**: Dynamic product display with filtering capabilities
- **Admin Panel**: Comprehensive admin dashboard for brand management
- **Responsive Design**: Works seamlessly on all device sizes

## 🛠️ Tech Stack

- **Frontend**: React + Vite
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Styling**: CSS3 with modern features
- **Routing**: React Router
- **Deployment**: Ready for Vercel/Netlify

## 🔐 Security Setup

### Environment Variables

This project requires environment variables for Firebase configuration. Create a `.env` file in the `client` directory:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
VITE_FIREBASE_PROJECT_ID=your_project_id_here
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id_here
VITE_FIREBASE_APP_ID=your_app_id_here
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id_here
```

### Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (Email/Password)
3. Create a Firestore database
4. Add your domain to authorized domains
5. Copy your config values to the `.env` file

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/egydrip.git
   cd egydrip
   ```

2. **Install client dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your Firebase configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 🏗️ Project Structure

```
egydrip/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── routes/        # Route configurations
│   ├── public/            # Static assets
│   └── .env.example       # Environment template
├── backend/               # Backend services (if applicable)
└── README.md
```

## 🎨 Design Features

- **Home Page**: Animated typing effect with feature showcase
- **Shop Page**: Product grid with filtering and search
- **Admin Dashboard**: Brand management with CRUD operations
- **Authentication**: Secure login/signup with Firebase
- **Responsive**: Mobile-first design approach

## 🚀 Deployment

### Vercel Deployment

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Firebase Hosting

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Build: `npm run build`
5. Deploy: `firebase deploy`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Security Notes

- Never commit `.env` files to version control
- Use environment variables for all sensitive data
- Regularly update dependencies for security patches
- Enable Firebase security rules for production
- Use HTTPS in production environments

## 📞 Support

For support and questions, please open an issue on GitHub.

---

Made with ❤️ for Egyptian local brands
