import React from 'react'
import HeroSection from './components/HeroSection'
import GatewaySection from './components/GatewaySection'
import FeaturedSection from './components/FeaturedSection'
import WhySection from './components/WhySection'
import TeamSection from './components/TeamSection'
import ReviewsSection from './components/ReviewsSection'
import BranchesSection from './components/BranchesSection'
import FinalCTA from './components/FinalCTA'

export default function Home() {
  return (
    <>
      <HeroSection />
      <GatewaySection />
      <FeaturedSection />
      <WhySection />
      <TeamSection />
      <ReviewsSection />
      <BranchesSection />
      <FinalCTA />
    </>
  )
}
