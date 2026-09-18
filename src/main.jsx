import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { LanguageProvider } from './LanguageContext.jsx'
import App from './App.jsx'
import AboutSection from './About.jsx'
import Dasturlar from './Dasturlar.jsx'
import Apply from './Apply.jsx'
import Sport from './Sport.jsx'
import AqlVaIjod from './AqlVaIjod.jsx'
import Farovonlik from './Farovonlik.jsx'
import Routine from './Routine.jsx'
import Gallery from './Gallery.jsx'
import Xavfsizlik from './Xavfsizlik.jsx'
import Comments from './Comments.jsx'
import Contact from './Contact.jsx'
import Footer from './Footer.jsx'

function HomePage() {
  return (
    <>
      <App />
      <AboutSection />
      <Dasturlar />
      <Sport />
      <AqlVaIjod />
      <Farovonlik />
      <Routine />
      <Gallery />
      <Xavfsizlik />
      <Comments />
      <Contact />
      <Footer />
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/apply" element={<Apply />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  </StrictMode>,
)