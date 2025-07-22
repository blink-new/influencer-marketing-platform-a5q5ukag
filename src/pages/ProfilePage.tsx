import { useState } from 'react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Label } from '../components/ui/label'
import { Switch } from '../components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { 
  Camera, 
  MapPin, 
  Link as LinkIcon, 
  Instagram, 
  Youtube, 
  Twitter,
  Star,
  Users,
  TrendingUp,
  DollarSign,
  Edit,
  Save,
  X,
  Plus,
  Trash2,
  Shield,
  Bell,
  CreditCard,
  Eye
} from 'lucide-react'

export function ProfilePage() {
  // For now, default to 'brand' type since this is a brand-focused platform
  // TODO: Implement proper user type detection based on user profile/role
  const userType = 'brand'
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: 'TechFlow Inc.',
    username: '@techflow',
    email: 'user@example.com',
    bio: 'Leading technology company focused on B2B software solutions and digital transformation.',
    location: 'San Francisco, CA',
    website: 'https://techflow.com',
    category: 'Technology',
    followers: 0,
    engagement: 0,
    rate: 0
  })

  const [socialLinks, setSocialLinks] = useState([
    { platform: 'Instagram', url: 'https://instagram.com/emmalifestyle', followers: 125000 },
    { platform: 'YouTube', url: 'https://youtube.com/emmalifestyle', followers: 89000 },
    { platform: 'Twitter', url: 'https://twitter.com/emmalifestyle', followers: 45000 }
  ])

  const [portfolio, setPortfolio] = useState([
    {
      id: 1,
      title: 'Sustainable Fashion Campaign',
      brand: 'EcoWear',
      type: 'Instagram Post + Stories',
      reach: 450000,
      engagement: 5.2,
      image: null
    },
    {
      id: 2,
      title: 'Wellness Product Review',
      brand: 'HealthyLife',
      type: 'YouTube Video',
      reach: 280000,
      engagement: 6.8,
      image: null
    }
  ])

  const handleSave = () => {
    setIsEditing(false)
    // Here you would save to the backend
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset form data
  }

  const addSocialLink = () => {
    setSocialLinks([...socialLinks, { platform: '', url: '', followers: 0 }])
  }

  const removeSocialLink = (index: number) => {
    setSocialLinks(socialLinks.filter((_, i) => i !== index))
  }

  const formatFollowers = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
    if (count >= 1000) return `${(count / 1000).toFixed(0)}K`
    return count.toString()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Profile Settings</h1>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleCancel}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          )}
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="social">Social Links</TabsTrigger>
            {userType === 'influencer' && <TabsTrigger value="portfolio">Portfolio</TabsTrigger>}
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Update your profile information and public details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar */}
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="" alt={profileData.name} />
                    <AvatarFallback className="text-lg">
                      {profileData.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button variant="outline" size="sm">
                      <Camera className="w-4 h-4 mr-2" />
                      Change Photo
                    </Button>
                  )}
                </div>

                {/* Form Fields */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      {userType === 'brand' ? 'Company Name' : 'Full Name'}
                    </Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={profileData.username}
                      onChange={(e) => setProfileData({...profileData, username: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                      disabled={!isEditing}
                      placeholder="City, State/Country"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={profileData.website}
                      onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                      disabled={!isEditing}
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">
                      {userType === 'brand' ? 'Industry' : 'Niche'}
                    </Label>
                    <Select 
                      value={profileData.category} 
                      onValueChange={(value) => setProfileData({...profileData, category: value})}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                        <SelectItem value="Fashion">Fashion</SelectItem>
                        <SelectItem value="Fitness">Fitness</SelectItem>
                        <SelectItem value="Food">Food</SelectItem>
                        <SelectItem value="Travel">Travel</SelectItem>
                        <SelectItem value="Beauty">Beauty</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">
                    {userType === 'brand' ? 'Company Description' : 'Bio'}
                  </Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    disabled={!isEditing}
                    rows={4}
                    placeholder={userType === 'brand' 
                      ? 'Tell brands about your company...'
                      : 'Tell brands about yourself and your content...'
                    }
                  />
                </div>

                {userType === 'influencer' && (
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="rate">Rate per Post ($)</Label>
                      <Input
                        id="rate"
                        type="number"
                        value={profileData.rate}
                        onChange={(e) => setProfileData({...profileData, rate: parseInt(e.target.value)})}
                        disabled={!isEditing}
                        placeholder="2500"
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Stats Card (for influencers) */}
            {userType === 'influencer' && (
              <Card>
                <CardHeader>
                  <CardTitle>Performance Stats</CardTitle>
                  <CardDescription>
                    Your overall performance metrics across all platforms
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-1">
                        {formatFollowers(profileData.followers)}
                      </div>
                      <div className="text-sm text-muted-foreground">Total Followers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-1">
                        {profileData.engagement}%
                      </div>
                      <div className="text-sm text-muted-foreground">Avg. Engagement</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-1">
                        ${profileData.rate}
                      </div>
                      <div className="text-sm text-muted-foreground">Rate per Post</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Social Links Tab */}
          <TabsContent value="social" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Social Media Links</CardTitle>
                    <CardDescription>
                      Connect your social media accounts to showcase your reach
                    </CardDescription>
                  </div>
                  {isEditing && (
                    <Button onClick={addSocialLink} size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Platform
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {socialLinks.map((link, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <div className="flex-1 grid md:grid-cols-3 gap-4">
                      <Select 
                        value={link.platform} 
                        onValueChange={(value) => {
                          const newLinks = [...socialLinks]
                          newLinks[index].platform = value
                          setSocialLinks(newLinks)
                        }}
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Platform" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Instagram">Instagram</SelectItem>
                          <SelectItem value="YouTube">YouTube</SelectItem>
                          <SelectItem value="Twitter">Twitter</SelectItem>
                          <SelectItem value="TikTok">TikTok</SelectItem>
                          <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        placeholder="Profile URL"
                        value={link.url}
                        onChange={(e) => {
                          const newLinks = [...socialLinks]
                          newLinks[index].url = e.target.value
                          setSocialLinks(newLinks)
                        }}
                        disabled={!isEditing}
                      />
                      <Input
                        placeholder="Followers"
                        type="number"
                        value={link.followers}
                        onChange={(e) => {
                          const newLinks = [...socialLinks]
                          newLinks[index].followers = parseInt(e.target.value)
                          setSocialLinks(newLinks)
                        }}
                        disabled={!isEditing}
                      />
                    </div>
                    {isEditing && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => removeSocialLink(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                    {!isEditing && (
                      <Badge variant="secondary">
                        {formatFollowers(link.followers)}
                      </Badge>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Portfolio Tab (Influencers only) */}
          {userType === 'influencer' && (
            <TabsContent value="portfolio" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Portfolio</CardTitle>
                      <CardDescription>
                        Showcase your best work and campaign results
                      </CardDescription>
                    </div>
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Project
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {portfolio.map((project) => (
                    <div key={project.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">{project.title}</h4>
                          <p className="text-sm text-muted-foreground">{project.brand}</p>
                        </div>
                        <Badge variant="outline">{project.type}</Badge>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Eye className="w-4 h-4 text-muted-foreground" />
                          <span>{formatFollowers(project.reach)} reach</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="w-4 h-4 text-muted-foreground" />
                          <span>{project.engagement}% engagement</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose what notifications you want to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Email Notifications</div>
                    <div className="text-sm text-muted-foreground">
                      Receive updates about campaigns and messages
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Campaign Updates</div>
                    <div className="text-sm text-muted-foreground">
                      Get notified about campaign status changes
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">New Messages</div>
                    <div className="text-sm text-muted-foreground">
                      Instant notifications for new messages
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>
                  Control your profile visibility and data sharing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Public Profile</div>
                    <div className="text-sm text-muted-foreground">
                      Make your profile visible in search results
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Show Analytics</div>
                    <div className="text-sm text-muted-foreground">
                      Display performance metrics on your profile
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Actions</CardTitle>
                <CardDescription>
                  Manage your account and data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="w-4 h-4 mr-2" />
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Billing Settings
                </Button>
                <Button variant="destructive" className="w-full justify-start">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}