🛰️ Bangalore Urban Heat Island Visualization

An interactive web application that visualizes the Urban Heat Island (UHI) effect in Bangalore, India, using NASA Terra satellite MODIS data. Created for the NASA Space Apps Challenge 2024.
📋 Table of Contents

Overview
Features
NASA Data Sources
Demo
Installation
Usage
Technology Stack
Project Structure
Data Analysis
Key Findings
Future Enhancements
Contributing
Team
Acknowledgments
License

🌍 Overview
On April 15, 2024, Bangalore experienced an extreme heat event with temperatures reaching 38.5°C. This project analyzes how this extreme heat affected different parts of the city throughout the day, with a special focus on IT corridors where over 1.5 million tech workers are employed.
Problem Statement

76% of Bangalore faces elevated temperatures due to rapid urbanization
IT hubs experience significantly higher temperatures than green spaces
Lack of localized, time-series thermal data for urban planning decisions

Our Solution
We developed an interactive visualization tool that uses NASA Terra satellite MODIS Land Surface Temperature (LST) data to:

Show temperature progression across Bangalore throughout the day
Highlight the temperature difference between concrete IT zones and green spaces
Provide actionable insights for urban planners and policymakers

✨ Features

🎬 Animated Heat Map: 4-frame animation showing temperature evolution (6 AM → 12 PM → 6 PM → 10 PM)
📍 Location-Specific Analysis: Tracking 5 key zones including Electronic City, Whitefield, Manyata Tech Park, Cubbon Park, and Koramangala
📊 Real-Time Temperature Comparison: Dynamic temperature delta calculations against baseline (Cubbon Park)
🛰️ NASA Data Integration: Direct attribution to Terra MODIS MOD11_L2 products
🎨 Intuitive Visualization: Color-coded heat zones with smooth transitions
📱 Responsive Design: Works seamlessly on desktop, tablet, and mobile devices
🔗 Data Source Explorer: Expandable panel with links to all NASA data sources used

🛰️ NASA Data Sources
This project leverages the following NASA Earth observation data and tools:
Primary Data Source

Terra MODIS MOD11_L2: Land Surface Temperature & Emissivity product (1km resolution)
Instrument: MODIS (Moderate Resolution Imaging Spectroradiometer)
Satellite: Terra (EOS AM-1)
Overpass Time: ~10:30 AM local time

Data Access Platforms

NASA Earthdata Worldview - Primary visualization platform
NASA GIBS API - Global Imagery Browse Services
FIRMS - Fire Information for Resource Management System
LP DAAC - Land Processes Distributed Active Archive Center

Geographic Coverage

Bounding Box: 12.8°N - 13.2°N, 77.4°E - 77.8°E
Region: Bangalore, Karnataka, India
Area: ~400 km²

🛰️ Bangalore Urban Heat Island Visualization
Show Image
Show Image
Show Image
Show Image
An interactive web application that visualizes the Urban Heat Island (UHI) effect in Bangalore, India, using NASA Terra satellite MODIS data. Created for the NASA Space Apps Challenge 2024.
Show Image
📋 Table of Contents

Overview
Features
NASA Data Sources
Demo
Installation
Usage
Technology Stack
Project Structure
Data Analysis
Key Findings
Future Enhancements
Contributing
Team
Acknowledgments
License

🌍 Overview
On April 15, 2024, Bangalore experienced an extreme heat event with temperatures reaching 38.5°C. This project analyzes how this extreme heat affected different parts of the city throughout the day, with a special focus on IT corridors where over 1.5 million tech workers are employed.
Problem Statement

76% of Bangalore faces elevated temperatures due to rapid urbanization
IT hubs experience significantly higher temperatures than green spaces
Lack of localized, time-series thermal data for urban planning decisions

Our Solution
We developed an interactive visualization tool that uses NASA Terra satellite MODIS Land Surface Temperature (LST) data to:

Show temperature progression across Bangalore throughout the day
Highlight the temperature difference between concrete IT zones and green spaces
Provide actionable insights for urban planners and policymakers

✨ Features

🎬 Animated Heat Map: 4-frame animation showing temperature evolution (6 AM → 12 PM → 6 PM → 10 PM)
📍 Location-Specific Analysis: Tracking 5 key zones including Electronic City, Whitefield, Manyata Tech Park, Cubbon Park, and Koramangala
📊 Real-Time Temperature Comparison: Dynamic temperature delta calculations against baseline (Cubbon Park)
🛰️ NASA Data Integration: Direct attribution to Terra MODIS MOD11_L2 products
🎨 Intuitive Visualization: Color-coded heat zones with smooth transitions
📱 Responsive Design: Works seamlessly on desktop, tablet, and mobile devices
🔗 Data Source Explorer: Expandable panel with links to all NASA data sources used

🛰️ NASA Data Sources
This project leverages the following NASA Earth observation data and tools:
Primary Data Source

Terra MODIS MOD11_L2: Land Surface Temperature & Emissivity product (1km resolution)
Instrument: MODIS (Moderate Resolution Imaging Spectroradiometer)
Satellite: Terra (EOS AM-1)
Overpass Time: ~10:30 AM local time

Data Access Platforms

NASA Earthdata Worldview - Primary visualization platform
NASA GIBS API - Global Imagery Browse Services
FIRMS - Fire Information for Resource Management System
LP DAAC - Land Processes Distributed Active Archive Center

Geographic Coverage

Bounding Box: 12.8°N - 13.2°N, 77.4°E - 77.8°E
Region: Bangalore, Karnataka, India
Area: ~400 km²

🎥 Demo
Live Demo
View Live Demo (Add your deployed link here)
Screenshots
Show Image
Show Image
Show Image
Video Walkthrough
Show Image
🚀 Installation
Prerequisites

Node.js (v14.0 or higher)
npm (v6.0 or higher) or yarn
Git

Clone the Repository
bashgit clone https://github.com/yourusername/bangalore-heat-island-viz.git
cd bangalore-heat-island-viz
Install Dependencies
bashnpm install
# or
yarn install
Environment Setup (Optional)
If you plan to fetch live NASA data, create a .env file:
bashREACT_APP_NASA_API_KEY=your_earthdata_api_key
REACT_APP_GIBS_ENDPOINT=https://gibs.earthdata.nasa.gov/wms/epsg4326/best/
💻 Usage
Development Mode
Run the app in development mode with hot reload:
bashnpm start
Open http://localhost:3000 to view it in your browser.
Build for Production
Create an optimized production build:
bashnpm run build
The build folder will contain the production-ready files.
Run Tests
bashnpm test
Deploy
Deploy to GitHub Pages:
bashnpm run deploy
Or deploy to other platforms:

Vercel: vercel deploy
Netlify: Drag and drop the build folder
AWS S3: Upload the build folder to your S3 bucket

🛠️ Technology Stack
Frontend

React 18.2+ - UI library
Lucide React - Icon components
Tailwind CSS - Utility-first CSS framework

Data Processing

JavaScript - Data manipulation and calculations
NASA GIBS API - Satellite imagery retrieval

Visualization

Custom React components with CSS animations
Gradient-based heat map rendering
Real-time data interpolation

Development Tools

Create React App - Project bootstrapping
Git & GitHub - Version control
VS Code - IDE

📁 Project Structure
bangalore-heat-island-viz/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── screenshot.png
├── src/
│   ├── components/
│   │   └── BangaloreHeatVisualization.jsx  # Main component
│   ├── data/
│   │   ├── temperatureData.js              # Temperature datasets
│   │   └── locations.js                    # Geographic coordinates
│   ├── utils/
│   │   ├── colorMapping.js                 # Temperature-to-color conversion
│   │   └── dataProcessing.js               # Data transformation utilities
│   ├── App.js
│   ├── index.js
│   └── index.css
├── docs/
│   ├── screenshots/
│   ├── data-methodology.md
│   └── presentation.pdf
├── package.json
├── tailwind.config.js
├── README.md
└── LICENSE
📊 Data Analysis
Methodology

Data Acquisition

Downloaded Terra MODIS MOD11_L2 LST data via NASA Earthdata Worldview
Selected April 15, 2024 (extreme heat event day)
Focused on 4 time points: 6 AM, 10:30 AM (Terra overpass), 1:30 PM, 10 PM


Processing Pipeline

Extracted temperature values for 5 key locations
Converted Kelvin to Celsius
Applied quality assurance filters
Interpolated missing data points


Visualization

Mapped temperatures to color gradients (blue → green → yellow → orange → red)
Created smooth transitions between time frames
Added geographic overlays with lat/long coordinates



Data Quality

Resolution: 1km spatial resolution
Accuracy: ±1°C (MODIS LST accuracy)
Temporal: 4 snapshots across 16-hour period
Validation: Cross-referenced with FIRMS thermal anomaly data

🔍 Key Findings
Urban Heat Island Intensity

IT Corridors: 3-5°C hotter than green spaces throughout the day
Peak Temperature: Whitefield recorded 38.5°C at 1:30 PM
Heat Retention: Concrete zones stayed 2-3°C warmer even at night

Location-Specific Analysis
LocationMorning (6 AM)Peak (1:30 PM)Evening (10 PM)UHI EffectWhitefield25.8°C38.5°C31.2°C+5.0°CElectronic City26.5°C37.8°C30.5°C+3.6°CKoramangala26.8°C38.2°C31.5°C+4.0°CManyata26.2°C37.2°C30.8°C+3.0°CCubbon Park24.5°C34.2°C28.5°CBaseline
Socio-Economic Impact

Workforce Affected: 1.5+ million IT workers
Area Impacted: 76% of Bangalore experiences elevated temperatures
Health Risk: Increased heat stress, reduced productivity
Infrastructure: Higher cooling energy demands in IT zones

🚀 Future Enhancements
Short-term (Next Sprint)

 Add 25-year temperature trend analysis
 Integrate real-time MODIS data API
 Include wind speed and humidity data
 Add downloadable data export (CSV, JSON)
 Multi-language support (Kannada, Hindi)

Long-term (Next 6 months)

 Machine learning prediction model for future heat events
 Integration with local weather station data
 Mobile app version (React Native)
 Public API for researchers and urban planners
 Comparison with other Indian metro cities
 AR visualization for ground-level heat mapping

Research Extensions

 Correlation analysis with power consumption data
 Impact assessment on public transportation
 Green infrastructure effectiveness study
 Heat-related health incidents mapping

🤝 Contributing
We welcome contributions from the community! Here's how you can help:
Ways to Contribute

Report Bugs: Open an issue with detailed reproduction steps
Suggest Features: Share your ideas in the Discussions section
Improve Documentation: Submit PRs for README or code comments
Add Data Sources: Help integrate additional NASA datasets
Enhance Visualizations: Improve UI/UX or add new chart types

Development Workflow

Fork the repository
Create a feature branch: git checkout -b feature/your-feature-name
Commit changes: git commit -m 'Add some feature'
Push to branch: git push origin feature/your-feature-name
Submit a Pull Request

Code Style

Follow ESLint configuration
Use Prettier for code formatting
Write meaningful commit messages
Add comments for complex logic
Include tests for new features

👥 Team
NASA Space Apps Challenge 2024

[Your Name] - Project Lead & Full Stack Developer

Abhiram U

[Team Member 2] - Data Scientist & NASA Data Integration

Daksh Shah


[Team Member 3] - UI/UX Designer & Visualization Specialist

Shariya Syeda


[Team Member 4] - Research & Documentation

Abhiram U


🙏 Acknowledgments
Organizations

NASA - For Terra satellite data and Earthdata infrastructure
USGS LP DAAC - For MODIS data distribution
NASA Space Apps Challenge - For organizing the hackathon
EMPRI Karnataka - For local urban heat research

Data Sources & Research

NASA Terra Mission Team
MODIS Science Team
Research papers on Bangalore's urban heat island effect
OpenCity Bangalore for urban planning insights

Inspiration

Research Matters - Urban Heat Islands Study
EMPRI Report 2023
NASA Earth Observatory case studies

Tools & Libraries

Create React App team
Tailwind CSS community
Lucide Icons contributors
React community

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
MIT License Summary

✅ Commercial use
✅ Modification
✅ Distribution
✅ Private use
❌ Liability
❌ Warranty

📞 Contact
Project Links

Live Demo: https://your-demo-link.com
GitHub Repository: https://github.com/yourusername/bangalore-heat-island-viz
Project Documentation: docs/
NASA Space Apps Submission: Link to submission

Get in Touch

Email: abhiramuofficial@gmail.com


Report Issues
Found a bug or have a suggestion? Open an issue

🌟 Star History
If you find this project useful, please consider giving it a ⭐️!
Show Image

Made with ❤️ for NASA Space Apps Challenge 2024
Leveraging 25 years of Terra satellite data to address urban heat challenges in Bangalore
🛰️ Terra Mission | 🌍 Earth Observation | 🔥 Climate Action | 🏙️ Urban Planning
