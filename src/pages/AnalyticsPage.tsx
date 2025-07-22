import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Eye, 
  Heart, 
  MessageCircle,
  Share2,
  DollarSign,
  Target,
  Calendar,
  Download
} from 'lucide-react'

export function AnalyticsPage() {
  // For now, default to 'brand' type since this is a brand-focused platform
  // TODO: Implement proper user type detection based on user profile/role
  const userType = 'brand'
  // Mock analytics data
  const overviewStats = {
    brand: {
      totalSpend: 45600,
      totalReach: 8500000,
      avgEngagement: 5.2,
      campaigns: 12,
      roi: 340
    },
    influencer: {
      totalEarnings: 18400,
      totalReach: 2100000,
      avgEngagement: 6.8,
      collaborations: 8,
      growthRate: 15.2
    }
  }

  const campaignPerformance = [
    {
      name: 'Summer Collection',
      reach: 1250000,
      engagement: 4.2,
      clicks: 8500,
      conversions: 340,
      spend: 15000,
      revenue: 51000,
      roi: 340
    },
    {
      name: 'Tech Review Series',
      reach: 890000,
      engagement: 5.8,
      clicks: 12400,
      conversions: 520,
      spend: 8000,
      revenue: 31200,
      roi: 390
    },
    {
      name: 'Fitness Challenge',
      reach: 2100000,
      engagement: 6.1,
      clicks: 18900,
      conversions: 780,
      spend: 12000,
      revenue: 46800,
      roi: 390
    }
  ]

  const topInfluencers = [
    {
      name: 'Emma Rodriguez',
      avatar: 'ER',
      reach: 450000,
      engagement: 4.8,
      conversions: 180,
      roi: 420
    },
    {
      name: 'Tech Mike',
      avatar: 'TM',
      reach: 320000,
      engagement: 6.2,
      conversions: 240,
      roi: 380
    },
    {
      name: 'Fitness Sarah',
      avatar: 'FS',
      reach: 280000,
      engagement: 7.1,
      conversions: 160,
      roi: 350
    }
  ]

  const contentPerformance = [
    {
      type: 'Instagram Post',
      posts: 24,
      avgReach: 85000,
      avgEngagement: 5.2,
      avgClicks: 420
    },
    {
      type: 'Instagram Story',
      posts: 48,
      avgReach: 45000,
      avgEngagement: 8.1,
      avgClicks: 180
    },
    {
      type: 'YouTube Video',
      posts: 8,
      avgReach: 180000,
      avgEngagement: 4.8,
      avgClicks: 1200
    },
    {
      type: 'TikTok Video',
      posts: 12,
      avgReach: 220000,
      avgEngagement: 9.2,
      avgClicks: 890
    }
  ]

  const stats = userType === 'brand' ? overviewStats.brand : overviewStats.influencer

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`
    return num.toString()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
            <p className="text-muted-foreground">
              {userType === 'brand' 
                ? 'Track your campaign performance and ROI'
                : 'Monitor your content performance and growth'
              }
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Select defaultValue="30days">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="1year">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {userType === 'brand' ? 'Total Spend' : 'Total Earnings'}
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${userType === 'brand' ? stats.totalSpend.toLocaleString() : stats.totalEarnings.toLocaleString()}
              </div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12% from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(stats.totalReach)}</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="w-3 h-3 mr-1" />
                +8% from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Engagement</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgEngagement}%</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="w-3 h-3 mr-1" />
                +0.5% from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {userType === 'brand' ? 'Campaigns' : 'Collaborations'}
              </CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {userType === 'brand' ? stats.campaigns : stats.collaborations}
              </div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="w-3 h-3 mr-1" />
                +3 from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {userType === 'brand' ? 'Avg. ROI' : 'Growth Rate'}
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {userType === 'brand' ? `${stats.roi}%` : `+${stats.growthRate}%`}
              </div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="w-3 h-3 mr-1" />
                +15% from last month
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Campaign Performance */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>
                  {userType === 'brand' ? 'Campaign Performance' : 'Content Performance'}
                </CardTitle>
                <CardDescription>
                  {userType === 'brand' 
                    ? 'Track the success of your recent campaigns'
                    : 'See how your content is performing across platforms'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userType === 'brand' ? (
                    campaignPerformance.map((campaign, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold">{campaign.name}</h4>
                          <Badge variant="secondary">ROI: {campaign.roi}%</Badge>
                        </div>
                        <div className="grid grid-cols-4 gap-4 text-sm">
                          <div>
                            <div className="text-muted-foreground">Reach</div>
                            <div className="font-medium">{formatNumber(campaign.reach)}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Engagement</div>
                            <div className="font-medium">{campaign.engagement}%</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Conversions</div>
                            <div className="font-medium">{campaign.conversions}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Revenue</div>
                            <div className="font-medium">${formatNumber(campaign.revenue)}</div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    contentPerformance.map((content, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold">{content.type}</h4>
                          <Badge variant="secondary">{content.posts} posts</Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <div className="text-muted-foreground">Avg. Reach</div>
                            <div className="font-medium">{formatNumber(content.avgReach)}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Avg. Engagement</div>
                            <div className="font-medium">{content.avgEngagement}%</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Avg. Clicks</div>
                            <div className="font-medium">{content.avgClicks}</div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Performers */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>
                  {userType === 'brand' ? 'Top Influencers' : 'Recent Achievements'}
                </CardTitle>
                <CardDescription>
                  {userType === 'brand' 
                    ? 'Your best performing influencer partners'
                    : 'Your latest milestones and achievements'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                {userType === 'brand' ? (
                  <div className="space-y-4">
                    {topInfluencers.map((influencer, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium text-primary">
                              {influencer.avatar}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-sm">{influencer.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {formatNumber(influencer.reach)} reach
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{influencer.roi}% ROI</div>
                          <div className="text-xs text-muted-foreground">
                            {influencer.engagement}% eng.
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="border rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="font-medium text-sm">Follower Milestone</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Reached 100K followers on Instagram
                      </p>
                    </div>
                    <div className="border rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <Heart className="w-4 h-4 text-red-500" />
                        <span className="font-medium text-sm">Viral Content</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Your latest reel got 500K+ views
                      </p>
                    </div>
                    <div className="border rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <DollarSign className="w-4 h-4 text-green-500" />
                        <span className="font-medium text-sm">Earnings Record</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Highest monthly earnings: $4,200
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Report
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Target className="w-4 h-4 mr-2" />
                  Set Goals
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Engagement Trends */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Engagement Trends</CardTitle>
            <CardDescription>
              Track your engagement patterns over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Interactive chart would be displayed here
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Showing engagement trends, reach patterns, and performance metrics
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}