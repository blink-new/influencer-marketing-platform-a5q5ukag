import { useState, useEffect } from 'react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Slider } from '../components/ui/slider'
import { 
  Search, 
  Filter, 
  MapPin, 
  Users, 
  Heart, 
  MessageCircle,
  TrendingUp,
  Star,
  Instagram,
  Youtube,
  Twitter,
  DollarSign,
  Calendar,
  Target,
  Linkedin
} from 'lucide-react'
import { blink } from '../blink/client'

interface Influencer {
  id: string
  fullName: string
  email: string
  location: string
  linkedinUrl: string
  niche: string
  bio: string
  yearsOfExperience: number
  ratePerPost: number
  status: string
  verified: boolean
  createdAt: string
}

export function DiscoveryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [followerRange, setFollowerRange] = useState([10000])
  const [showFilters, setShowFilters] = useState(false)
  const [registeredInfluencers, setRegisteredInfluencers] = useState<Influencer[]>([])
  const [loading, setLoading] = useState(true)

  const fetchRegisteredInfluencers = async () => {
    try {
      const influencers = await blink.db.influencers.list({
        orderBy: { createdAt: 'desc' }
      })
      setRegisteredInfluencers(influencers)
    } catch (error) {
      console.error('Error fetching influencers:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRegisteredInfluencers()
  }, [])

  // Mock data for LinkedIn influencers
  const influencers = [
    {
      id: 1,
      name: 'Sarah Chen',
      username: 'sarah-chen-marketing',
      avatar: 'SC',
      followers: 85000,
      connections: 12000,
      engagement: 6.8,
      category: 'Marketing',
      location: 'San Francisco, CA',
      rate: 3500,
      bio: 'B2B Marketing Director sharing insights on digital transformation and growth strategies.',
      verified: true,
      yearsExperience: 8
    },
    {
      id: 2,
      name: 'David Kumar',
      username: 'david-kumar-tech',
      avatar: 'DK',
      followers: 120000,
      connections: 18000,
      engagement: 5.2,
      category: 'Technology',
      location: 'Austin, TX',
      rate: 4200,
      bio: 'CTO and tech thought leader. Helping companies navigate AI and cloud adoption.',
      verified: true,
      yearsExperience: 12
    },
    {
      id: 3,
      name: 'Lisa Thompson',
      username: 'lisa-thompson-hr',
      avatar: 'LT',
      followers: 67000,
      connections: 9500,
      engagement: 7.1,
      category: 'HR & Leadership',
      location: 'New York, NY',
      rate: 2800,
      bio: 'Chief People Officer sharing insights on remote work, culture, and talent management.',
      verified: true,
      yearsExperience: 10
    },
    {
      id: 4,
      name: 'Michael Rodriguez',
      username: 'michael-rodriguez-finance',
      avatar: 'MR',
      followers: 95000,
      connections: 15000,
      engagement: 4.9,
      category: 'Finance',
      location: 'Chicago, IL',
      rate: 3800,
      bio: 'CFO and financial strategist helping businesses optimize their financial operations.',
      verified: true,
      yearsExperience: 15
    }
  ]

  // Mock data for campaigns (for influencers)
  const campaigns = [
    {
      id: 1,
      brand: 'EcoWear',
      title: 'Sustainable Fashion Campaign',
      budget: '$5,000 - $10,000',
      duration: '2 weeks',
      category: 'Fashion',
      description: 'Looking for lifestyle influencers to showcase our new eco-friendly clothing line.',
      requirements: ['50K+ followers', 'Lifestyle/Fashion niche', 'High engagement'],
      deadline: '2024-02-15'
    },
    {
      id: 2,
      brand: 'TechFlow',
      title: 'Smart Home Product Review',
      budget: '$3,000 - $7,000',
      duration: '1 week',
      category: 'Technology',
      description: 'Seeking tech reviewers to create authentic content about our smart home devices.',
      requirements: ['Tech niche', 'Video content', 'Previous tech reviews'],
      deadline: '2024-02-20'
    },
    {
      id: 3,
      brand: 'FitLife',
      title: 'Fitness App Launch',
      budget: '$2,000 - $5,000',
      duration: '3 weeks',
      category: 'Fitness',
      description: 'Partner with fitness influencers to promote our new workout app.',
      requirements: ['Fitness niche', 'Active community', 'Story + Post'],
      deadline: '2024-02-25'
    }
  ]

  const categories = ['All', 'Marketing', 'Technology', 'Finance', 'HR & Leadership', 'Sales', 'Consulting', 'Healthcare', 'Real Estate']

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram': return <Instagram className="w-4 h-4" />
      case 'youtube': return <Youtube className="w-4 h-4" />
      case 'twitter': return <Twitter className="w-4 h-4" />
      default: return null
    }
  }

  const formatFollowers = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
    if (count >= 1000) return `${(count / 1000).toFixed(0)}K`
    return count.toString()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Discover LinkedIn Influencers
          </h1>
          <p className="text-muted-foreground">
            Find professional content creators and thought leaders for your B2B marketing campaigns
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search LinkedIn influencers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category.toLowerCase()}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </Button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <Card className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Followers Range</label>
                  <div className="space-y-2">
                    <Slider
                      value={followerRange}
                      onValueChange={setFollowerRange}
                      max={1000000}
                      min={1000}
                      step={1000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>1K</span>
                      <span>{formatFollowers(followerRange[0])}</span>
                      <span>1M+</span>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Experience Level</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Any Experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any Experience</SelectItem>
                      <SelectItem value="junior">1-3 years</SelectItem>
                      <SelectItem value="mid">4-7 years</SelectItem>
                      <SelectItem value="senior">8+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Location</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Any Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any Location</SelectItem>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Results */}
        {loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading influencers...</p>
          </div>
        ) : (
          <>
            {/* Registered Influencers Section */}
            {registeredInfluencers.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">New Registered Influencers</h2>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {registeredInfluencers.length} New
                  </Badge>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {registeredInfluencers.map((influencer) => (
                    <Card key={influencer.id} className="hover:shadow-lg transition-shadow border-green-200">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-12 w-12">
                              <AvatarFallback className="bg-green-100 text-green-800">
                                {influencer.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center space-x-1">
                                <h3 className="font-semibold">{influencer.fullName}</h3>
                                <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                                  NEW
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{influencer.email}</p>
                            </div>
                          </div>
                          <Badge variant="secondary">{influencer.niche}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">{influencer.bio}</p>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <span>{influencer.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Linkedin className="w-4 h-4 text-muted-foreground" />
                            <span>LinkedIn</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <TrendingUp className="w-4 h-4 text-muted-foreground" />
                            <span>{influencer.yearsOfExperience} years exp.</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <DollarSign className="w-4 h-4 text-muted-foreground" />
                            <span>${influencer.ratePerPost || 'TBD'}/post</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-sm text-muted-foreground">
                            Status: <span className="capitalize text-orange-600">{influencer.status}</span>
                          </div>
                          <Button size="sm">
                            <MessageCircle className="w-4 h-4 mr-1" />
                            Contact
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Mock Influencers Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Featured Influencers</h2>
                <Badge variant="secondary">Verified</Badge>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {influencers.map((influencer) => (
                  <Card key={influencer.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src="" alt={influencer.name} />
                            <AvatarFallback>{influencer.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center space-x-1">
                              <h3 className="font-semibold">{influencer.name}</h3>
                              {influencer.verified && (
                                <Star className="w-4 h-4 fill-accent text-accent" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{influencer.username}</p>
                          </div>
                        </div>
                        <Badge variant="secondary">{influencer.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">{influencer.bio}</p>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span>{formatFollowers(influencer.followers)} followers</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span>{formatFollowers(influencer.connections)} connections</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="w-4 h-4 text-muted-foreground" />
                          <span>{influencer.engagement}% engagement</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="w-4 h-4 text-muted-foreground" />
                          <span>${influencer.rate}/post</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          {influencer.yearsExperience} years exp.
                        </div>
                        <Button size="sm">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          Contact
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Results
          </Button>
        </div>
      </div>
    </div>
  )
}