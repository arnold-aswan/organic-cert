# Agro-Organic 🌱

A comprehensive organic farm certification management system built with the MERN stack. The application enables agronomists to register farmers, manage farms, fields, inspections, and issue organic certificates through a streamlined digital workflow.

## 🔗 Live Demo & Repository

- Live Application: https://agro-organic.vercel.app/
- API Documentation: https://organic-cert.onrender.com/api-docs/#/
- GitHub Repository: https://github.com/arnold-aswan/organic-cert

## 📸 Screenshots

![Dashboard](https://github.com/user-attachments/assets/c1348727-7e0f-4dcd-83ef-0b48c48ed3b9)

Main dashboard showing system overview and quick stats

![Farmers](https://github.com/user-attachments/assets/dfce4bff-2f67-4d5f-b6f5-4394903db9d9)

Farmers listing and management interface

![Farms](https://github.com/user-attachments/assets/018cd743-f843-4350-bac4-a26786097221)

Farms listing and management interface

![Fields](https://github.com/user-attachments/assets/4c26fbb8-1a65-4a40-9181-b2d6526b1000)

Fields listing and management interface

![Inspections-Table](https://github.com/user-attachments/assets/dc57f253-4b01-4ac5-8ed0-b0ee606957b9)

Inspections listing and management interface

![Inspections-Form](https://github.com/user-attachments/assets/fc519a05-a198-4551-8dd7-cfee881c6225)

Inspections and compliance form

![Certificates](https://github.com/user-attachments/assets/5a45a911-4c28-4b43-b1c8-2cc2126cca79)

Certificates listing and management interface

![Agronomists](https://github.com/user-attachments/assets/b908c35a-3137-4dba-99f1-eccd112362b8)

Agronomists listing and management interface

## 🚀 Features

- **Farmer Management**: Register and manage farmer profiles with contact information
- **Farm Management**: Add and manage farms with detailed location and area information
- **Field Management**: Track individual fields with crop and area details
- **Digital Inspections**: Conduct inspections using standardized checklists
- **Automated Scoring**: Calculate compliance scores based on inspection responses
- **PDF Certificates**: Generate and download official organic certificates
- **Certificate Management**: Track certificate status, issue dates, and expiry

## 🛠️ Tech Stack

### Frontend

- **React.js** - User interface framework
- **TailwindCSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **PDFKit** - PDF generation library
- **CORS** - Cross-origin resource sharing

## 🔍 Inspection Checklist

The system uses a standardized 5-point checklist:

1. **Synthetic Inputs**: Any synthetic inputs used in the last 36 months?
2. **Buffer Zones**: Are adequate buffer zones maintained?
3. **Organic Seeds**: Are organic seeds or permitted exceptions used?
4. **Soil Management**: Is compost/soil fertility managed organically?
5. **Record Keeping**: Are proper recordkeeping and logs available?

**Compliance Score Calculation**: Percentage of "Yes" answers
**Certification Threshold**: ≥80% compliance score required

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Clone Repository

```bash
git clone https://github.com/arnold-aswan/organic-cert.git
cd organic-cert
```

### Backend Setup

```bash
cd server
npm install
```

Create `.env` file in backend directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/agro-organic
PDF_STORAGE_PATH=./uploads/certificates
```

Start the backend server:

```bash
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
```

Create `.env` file in frontend directory:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend development server:

```bash
npm start
```

## 👥 User Stories

### 1. Farmer Registration

As an agronomist, I can register farmers with their contact information and location details to maintain a database of organic farming candidates.

### 2. Farm & Field Management

As an agronomist, I can add farms and fields to farmer profiles, tracking crop types and area measurements for comprehensive farm records.

### 3. Inspection Workflow

As an agronomist, I can conduct inspections using the standardized checklist, with the system automatically calculating compliance scores based on responses.

### 4. Certificate Generation

As an agronomist, I can approve inspections with ≥80% compliance score and automatically generate official organic certificates with all required information.

### 5. Certificate Management

As an agronomist, I can view, download, and manage organic certificates, tracking their validity and expiry dates.

## 📄 Certificate Features

Generated PDF certificates include:

- ✅ Farmer name and contact information
- ✅ Farm details (name, location, area)
- ✅ Inspection compliance score
- ✅ Unique certificate number
- ✅ Issue and expiry dates (1-year validity)
- ✅ "Certified Organic" badge/logo
- ✅ Inspector signature placeholder
- ✅ Official formatting and branding

## 🔧 Development Scripts

### Backend

```bash
npm run dev      # Start development server with nodemon
npm start        # Start production server
npm run test     # Run test suites
```

### Frontend

```bash
npm start        # Start development server
npm run build    # Build for production
npm run test     # Run test suites
npm run eject    # Eject from Create React App
```

## 🌐 Deployment

### Backend (Heroku/Railway)

1. Set environment variables
2. Configure MongoDB connection
3. Deploy with build scripts

### Frontend (Vercel/Netlify)

1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `build/`
4. Configure environment variables

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
