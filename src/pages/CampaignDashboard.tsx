import { useState } from 'react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Progress } from '../components/ui/progress'
import { 
  Plus, 
  Calendar, 
  DollarSign, 
  Users, 
  TrendingUp,
  MessageCircle,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  Heart,
  Share2,
  MoreHorizontal,
  Linkedin
} from 'lucide-react'

export function CampaignDashboard() {
  const [activeTab, setActiveTab] = useState('active')

  // Mock LinkedIn campaign data
  const campaigns = [
    {
      id: 1,
      title: 'B2B SaaS Product Launch',
      status: 'active',
      progress: 65,
      budget: 25000,
      spent: 16250,
      influencers: 6,
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      posts: 18,
      reach: 850000,
      engagement: 6.8,
      description: 'Launching our new CRM platform with B2B thought leaders on LinkedIn.',
      deliverables: ['LinkedIn Articles', 'Video Posts', 'Carousel Posts'],
      niche: 'Technology'
    },
    {
      id: 2,
      title: 'HR Tech Solution Awareness',
      status: 'pending',
      progress: 25,
      budget: 15000,
      spent: 3750,
      influencers: 4,
      startDate: '2024-02-01',
      endDate: '2024-02-28',
      posts: 12,
      reach: 420000,
      engagement: 7.2,
      description: 'Building awareness for our AI-powered HR analytics platform.',
      deliverables: ['LinkedIn Posts', 'Case Studies', 'Live Sessions'],
      niche: 'HR & Leadership'
    },
    {
      id: 3,
      title: 'Financial Services Thought Leadership',
      status: 'completed',
      progress: 100,
      budget: 20000,
      spent: 19800,
      influencers: 8,
      startDate: '2023-12-01',
      endDate: '2024-01-01',
      posts: 24,
      reach: 1200000,
      engagement: 5.9,
      description: 'Establishing thought leadership in fintech and digital banking.',
      deliverables: ['LinkedIn Articles', 'Video Content', 'Industry Reports'],
      niche: 'Finance'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500'
      case 'pending': return 'bg-yellow-500'
      case 'completed': return 'bg-blue-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <Badge className="bg-green-500">Active</Badge>
      case 'pending': return <Badge className="bg-yellow-500">Pending</Badge>
      case 'completed': return <Badge className="bg-blue-500">Completed</Badge>
      default: return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Campaign Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage and track your LinkedIn influencer marketing campaigns
            </p>
          </div>
          <Button className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>New Campaign</span>
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Campaigns
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                +2 from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Spend
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$39,800</div>
              <p className="text-xs text-muted-foreground">
                +18% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Reach
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.5M</div>
              <p className="text-xs text-muted-foreground">
                LinkedIn impressions
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Engagement</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6.6%</div>
              <p className="text-xs text-muted-foreground">
                +1.2% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Campaigns List */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-6">
            {campaigns
              .filter(campaign => campaign.status === activeTab)
              .map((campaign) => (
                <Card key={campaign.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Linkedin className="w-5 h-5 text-blue-600" />
                          <CardTitle className="text-xl">{campaign.title}</CardTitle>
                        </div>
                        <CardDescription className="mt-1">
                          {campaign.description}
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{campaign.niche}</Badge>
                        {getStatusBadge(campaign.status)}
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Progress */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Campaign Progress</span>
                        <span className="text-sm text-muted-foreground">{campaign.progress}%</span>
                      </div>
                      <Progress value={campaign.progress} className="h-2" />
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{campaign.influencers}</div>
                        <div className="text-xs text-muted-foreground">Influencers</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{campaign.posts}</div>
                        <div className="text-xs text-muted-foreground">Posts</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                          {(campaign.reach / 1000000).toFixed(1)}M
                        </div>
                        <div className="text-xs text-muted-foreground">Reach</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{campaign.engagement}%</div>
                        <div className="text-xs text-muted-foreground">Engagement</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                          ${(campaign.spent / 1000).toFixed(0)}K
                        </div>
                        <div className="text-xs text-muted-foreground">Spent</div>
                      </div>
                    </div>

                    {/* Budget */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Budget Usage</span>
                        <span className="text-sm text-muted-foreground">
                          ${campaign.spent.toLocaleString()} / ${campaign.budget.toLocaleString()}
                        </span>
                      </div>
                      <Progress value={(campaign.spent / campaign.budget) * 100} className="h-2" />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{campaign.startDate} - {campaign.endDate}</span>
                        <div className="flex items-center space-x-1">
                          {campaign.deliverables.map((deliverable, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {deliverable}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          Messages
                        </Button>
                        <Button size="sm">View Details</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
        </Tabs>

        {/* Empty State */}
        {campaigns.filter(c => c.status === activeTab).length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                No {activeTab} campaigns
              </h3>
              <p className="text-muted-foreground mb-4">
                Create your first LinkedIn influencer campaign to start building professional relationships.
              </p>
              <Button>
                Create Campaign
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}