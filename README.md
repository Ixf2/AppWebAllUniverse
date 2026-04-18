#  AllWebAllUniverse

##  Description

**AllWebAllUniverse** is a web application focused on exploring the universe. It provides structured information about different cosmic elements such as planets, stars, nebulae, and black holes, along with their characteristics and curiosities.

The platform also includes a missions section that highlights important space explorations and a commemorative tribute dedicated to the animals whose sacrifice contributed to humanity's progress in space exploration.

 **Live Demo:** https://appweballuniverse.web.app

---
##  Screenshots

###  Home
![Home](./screenshot/home.png)

### Footer
![Footer](./screenshot/footer.png)

### About
![About](./screenshot/about.png)

###  Elements
![Elements](./screenshot/elements.png)
![Elements ](./screenshot/elements1.png)
![Elements](./screenshot/elements2.png)


###  Missions
![Missions](./screenshot/missions.png)
![Missions](./screenshot/missions1.png)

### LoadingScreen
![LoadingScreen](./screenshot/loadinscreen.png)

### Legal
![Legal](./screenshot/legal.png)

### Terms
![Terms](./screenshot/terms.png)



---

##  Features

-  Exploration of universe elements:
  - Planets
  - Stars
  - Nebulae
  - Black holes

-  Space missions section with historical content

-  Tribute page dedicated to alls animals, like Laika, Félicette, and Ham

-  Data management:
  - Import data in **JSON, XML, CSV, TXT, XLSX, and HTML**
  - Export data in **JSON, XML, CSV, TXT, HTML, XLSX, and PDF**
  - Direct integration with **Firebase Firestore**

-  News system with categorized articles per cosmic element and mission type

-  **About Us** page with team profiles, project mission, and a project timeline

-  Custom **404 Not Found** page with background video

-  Video modal popup — inline tribute video player for the Pioneers tribute

-  Dynamic content loading

-  Custom **Loading Screen** built with CSS

-  Legal and Terms pages

---

##  Technologies Used

- **Frontend**
  - React
  - Vite
  - React Router DOM
  - React Icons

- **Backend / Services**
  - Firebase
  - Firebase Firestore
  - Firebase Hosting

- **Data Handling**
  - JSON
  - XML (via `xml2js` and `DOMParser`)
  - CSV (via `papaparse`)
  - XLSX (via `xlsx`)
  - TXT
  - HTML (via `autotable`)
  - PDF export (via `jspdf` + `jspdf-autotable`)

- **Development Tools**
  - ESLint

---

##  Project Structure
```
└───src
    ├───components
    │   ├───card
    │   ├───footer
    │   ├───header
    │   ├───import-elements
    │   ├───import-missions
    │   ├───loadingscreen
    │   ├───news-elements
    │   ├───news-missions
    │   ├───scroll-to-top
    │   ├───scroll-to-top-button
    │   └───windows-modal
    ├───data
    │   ├───images
    │   └───video
    ├───pages
    │   ├───aboutus
    │   ├───elements
    │   ├───home
    │   ├───legal
    │   ├───missions
    │   └───notfound
    ├───services
    │   └───firebase
    ├───utils-elements
    └───utils-missions
```

Additionally, the repository includes an `examples/` folder with sample files for both import and export:

```
examples/
├───export-examples/       # Sample exported files (planets, stars, nebulae, black_hole, missions)
│   └─── *.csv / *.json / *.xml
└───import-examples/       # Template files for importing data
    └─── *.csv / *.json / *.xml / *.txt / *.html
```

---

---

##  Installation & Setup

1. Clone the repository:

```bash
git clone https://github.com/Ixf2/AppWebAllUniverse.git
```

2. Move into the project folder:
```bash
cd AppWebAllUniverse
```

3. Set up environment variables:
```bash
cp .envi.example .env
```
Fill in your Firebase project credentials in `.env`.

4. Install dependencies:
```bash
npm install
```

5. Run the development server:
```bash
npm run dev
```

---
## Build for Production
```bash
npm run build
```
Preview the production build:
```bash
npm run preview
```

## Deployment
This project is fully deployed using Firebase Hosting.
To deploy manually:
```bash
firebase deploy --only hosting
```

## Data Source
All data is stored and managed using:
- Firebase Firestore

The application supports importing structured data in the following formats:
- JSON
- XML
- CSV
- TXT
- XLSX
- HTML

And exporting in:
- JSON
- XML
- CSV
- TXT
- HTML
- XLSX
- PDF

## Purpose
The main goal of this project is to:
- Provide educational content about the universe.
- Demonstrate integration of modern web technologies.
- Practice data handling and cloud-based storage (Firebase).
- Honor the historical contribution of animals in space exploration.

---
## License
This project is licensed under the ISC License

---

## Authors
- Developed by Ixf2
GitHub: https://github.com/Ixf2

- Developed by SdVictorvergara
GitHub: https://github.com/sdvictorvergara


---
##  References

###  Technologies & Documentation
- React Documentation: https://react.dev/
- Vite Documentation: https://vitejs.dev/
- Firebase Documentation: https://firebase.google.com/docs
- Firebase Firestore: https://firebase.google.com/docs/firestore
- React Router DOM: https://reactrouter.com/
- React Icons: https://react-icons.github.io/react-icons/
- PapaParse (CSV): https://www.papaparse.com/
- DOMParser (XML): https://developer.mozilla.org/es/docs/Web/API/DOMParser
- xml2js: https://github.com/Leonidas-from-XIV/node-xml2js
- SheetJS / xlsx: https://sheetjs.com/
- jsPDF: https://github.com/parallax/jsPDF
- jsPDF-AutoTable: https://github.com/simonbengtsson/jsPDF-AutoTable

###  Design
- Figma: https://www.figma.com/

###  Space & Astronomy Sources
- NASA Official Website: https://www.nasa.gov/
- ESA (European Space Agency): https://www.esa.int/
- Hubble Space Telescope: https://hubblesite.org/
- NASA Solar System Exploration: https://solarsystem.nasa.gov/

##  Tribute & Historical References
This project includes a tribute to the animals that contributed to space exploration.
- NASA – The Story of Ham (first chimpanzee in space):  
  https://www.nasa.gov/mission_pages/mercury/missions/ham.html

- NASA – Early Human Spaceflight (context including animal missions):  
  https://www.nasa.gov/mission_pages/mercury/

- Laika (first dog in orbit – Sputnik 2):  
  https://en.wikipedia.org/wiki/Laika

- Félicette (first cat in space):  
  https://en.wikipedia.org/wiki/F%C3%A9licette

- Animals in Space (general overview):  
  https://en.wikipedia.org/wiki/Animals_in_space

- National Air and Space Museum – Animals in Space:  
  https://airandspace.si.edu/explore/stories/animals-space

## Videos
- Credits for Astronova [https://www.tiktok.com/@astronovas_?lang=es-419]