import React from 'react'
import '../styles/typography.css'
import '../styles/animations.css'
import '../styles/cambodian-luxury-theme.css'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { LanguageProvider } from '../context/LanguageContext'
import Navigation from '../componets/Navbar/nav'
import HeroBanner from '../componets/hero/hero'
import FeaturedCollections from '../componets/Frature/featuredcollections'
import ProductShowcase from '../componets/productshowcase/productshowcase'
import ProductSpotlight from '../componets/productspotlight/productspotlight'
import NewReleases from '../componets/newreleases/newreleases'
import FragranceHighlights from '../componets/fragrancehighlights/fragrancehighlights'
import Testimonials from '../componets/testimonials/testimonials'
import NewsletterLuxury from '../newsshelter/newsletterluxury'
import Footer from '../componets/footer/footer'
import PromiseSection from '../componets/promise/PromiseSection'
import MostWantedSection from '../componets/mostwantedsection/MostWantedSection'
import MostWantedGallery from '../componets/Mostgallery/MostWantedgallery'
import CollectionSlider from '../componets/NineCollectionSection/NineCollectionSection'
import ClientOnly from '../componets/ClientOnly'

const index = () => {
  useScrollAnimation();
  return (
    <LanguageProvider>
      <Navigation />
      <HeroBanner />
      <PromiseSection/>
       <NewReleases />
       <MostWantedSection/>
       <ClientOnly><MostWantedGallery/></ClientOnly>
      <CollectionSlider/>
     
      {/* <FragranceHighlights/> */}
      <NewsletterLuxury />
      <Testimonials />
      <Footer />
    </LanguageProvider>
  )
}

export default index
