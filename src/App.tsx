import { useState, useEffect } from 'react'
import { blink } from './blink/client'
import { Toaster } from './components/ui/toaster'
import { Navigation } from './components/layout/Navigation'
import { LandingPage } from './pages/LandingPage'
import { DiscoveryPage } from './pages/DiscoveryPage'
import { CampaignDashboard } from './pages/CampaignDashboard'
import { AnalyticsPage } from './pages/AnalyticsPage'
import { ProfilePage } from './pages/ProfilePage'
import { InfluencerRegisterPage } from './pages/InfluencerRegisterPage'

type Page = 'landing' | 'discovery' | 'campaigns' | 'analytics' | 'profile' | 'influencer-register'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState<Page>('landing')

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading InfluenceHub...</p>
        </div>
      </div>
    )
  }

  if (!user && currentPage !== 'influencer-register') {
    return (
      <>
        <LandingPage onPageChange={setCurrentPage} />
        <Toaster />
      </>
    )
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'discovery':
        return <DiscoveryPage />
      case 'campaigns':
        return <CampaignDashboard />
      case 'analytics':
        return <AnalyticsPage />
      case 'profile':
        return <ProfilePage />
      case 'influencer-register':
        return <InfluencerRegisterPage onPageChange={setCurrentPage} />
      default:
        return <LandingPage onPageChange={setCurrentPage} />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {currentPage !== 'influencer-register' && (
        <Navigation 
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          user={user}
        />
      )}
      <main className={currentPage !== 'influencer-register' ? 'pt-16' : ''}>
        {renderPage()}
      </main>
      <Toaster />
    </div>
  )
}

export default App