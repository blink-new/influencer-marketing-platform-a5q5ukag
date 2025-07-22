import { useState } from 'react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Badge } from '../components/ui/badge'
import { 
  ArrowLeft, 
  Zap, 
  CheckCircle, 
  Linkedin,
  User,
  Briefcase,
  DollarSign,
  Globe,
  FileText
} from 'lucide-react'
import { blink } from '../blink/client'

type Page = 'landing' | 'discovery' | 'campaigns' | 'analytics' | 'profile' | 'influencer-register'

interface InfluencerRegisterPageProps {
  onPageChange: (page: Page) => void
}

export function InfluencerRegisterPage({ onPageChange }: InfluencerRegisterPageProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    email: '',
    phone: '',
    location: '',
    
    // LinkedIn Profile
    linkedinUrl: '',
    linkedinFollowers: '',
    linkedinConnections: '',
    
    // Professional Information
    niche: '',
    bio: '',
    yearsOfExperience: '',
    
    // Content & Engagement
    contentTypes: [] as string[],
    averageEngagementRate: '',
    postingFrequency: '',
    
    // Rates & Availability
    ratePerPost: '',
    ratePerCampaign: '',
    availability: '',
    
    // Portfolio
    portfolioLinks: '',
    sampleContentUrls: '',
    
    // Additional Info
    languages: [] as string[],
    targetAudience: '',
    previousCollaborations: ''
  })

  const niches = [
    'Marketing', 'Technology', 'Finance', 'HR & Leadership', 'Sales', 
    'Consulting', 'Healthcare', 'Real Estate', 'Legal', 'Education',
    'Manufacturing', 'Retail', 'Hospitality', 'Non-profit'
  ]

  const contentTypes = [
    'Articles', 'Video Content', 'Infographics', 'Carousel Posts', 
    'Live Streams', 'Polls', 'Case Studies', 'Industry Reports'
  ]

  const languages = [
    'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese',
    'Chinese', 'Japanese', 'Korean', 'Arabic', 'Hindi', 'Russian'
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleArrayChange = (field: string, value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...(prev[field as keyof typeof prev] as string[]), value]
        : (prev[field as keyof typeof prev] as string[]).filter(item => item !== value)
    }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    try {
      // Create influencer record in database
      const influencerData = {
        id: `inf_${Date.now()}`,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        linkedinUrl: formData.linkedinUrl,
        linkedinFollowers: parseInt(formData.linkedinFollowers) || 0,
        linkedinConnections: parseInt(formData.linkedinConnections) || 0,
        niche: formData.niche,
        bio: formData.bio,
        yearsOfExperience: parseInt(formData.yearsOfExperience) || 0,
        contentTypes: JSON.stringify(formData.contentTypes),
        averageEngagementRate: parseFloat(formData.averageEngagementRate) || 0,
        postingFrequency: formData.postingFrequency,
        ratePerPost: parseInt(formData.ratePerPost) || 0,
        ratePerCampaign: parseInt(formData.ratePerCampaign) || 0,
        availability: formData.availability,
        portfolioLinks: formData.portfolioLinks,
        sampleContentUrls: formData.sampleContentUrls,
        languages: JSON.stringify(formData.languages),
        targetAudience: formData.targetAudience,
        previousCollaborations: formData.previousCollaborations,
        status: 'pending',
        verified: false
      }

      await blink.db.influencers.create(influencerData)
      setIsSubmitted(true)
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('There was an error submitting your application. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardHeader>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Application Submitted!</CardTitle>
            <CardDescription>
              Thank you for your interest in joining our LinkedIn influencer network.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              We'll review your application and get back to you within 2-3 business days. 
              You'll receive an email confirmation shortly.
            </p>
            <Button onClick={() => onPageChange('landing')} className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button 
              onClick={() => onPageChange('landing')}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold">InfluenceHub</span>
            </button>
            
            <Button variant="ghost" onClick={() => onPageChange('landing')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep 
                    ? 'bg-primary text-white' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {step}
                </div>
                {step < 4 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step < currentStep ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Join Our LinkedIn Influencer Network</h1>
            <p className="text-muted-foreground">
              Step {currentStep} of 4: {
                currentStep === 1 ? 'Personal Information' :
                currentStep === 2 ? 'Professional Profile' :
                currentStep === 3 ? 'Content & Rates' :
                'Portfolio & Experience'
              }
            </p>
          </div>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {currentStep === 1 && <User className="w-5 h-5" />}
              {currentStep === 2 && <Briefcase className="w-5 h-5" />}
              {currentStep === 3 && <DollarSign className="w-5 h-5" />}
              {currentStep === 4 && <FileText className="w-5 h-5" />}
              <span>
                {currentStep === 1 && 'Personal Information'}
                {currentStep === 2 && 'Professional Profile'}
                {currentStep === 3 && 'Content & Rates'}
                {currentStep === 4 && 'Portfolio & Experience'}
              </span>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Full Name *</label>
                    <Input
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email *</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Phone</label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Location *</label>
                    <Input
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="City, State, Country"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block flex items-center space-x-2">
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn Profile URL *</span>
                  </label>
                  <Input
                    value={formData.linkedinUrl}
                    onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                    placeholder="https://linkedin.com/in/yourprofile"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">LinkedIn Followers</label>
                    <Input
                      type="number"
                      value={formData.linkedinFollowers}
                      onChange={(e) => handleInputChange('linkedinFollowers', e.target.value)}
                      placeholder="e.g. 25000"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">LinkedIn Connections</label>
                    <Input
                      type="number"
                      value={formData.linkedinConnections}
                      onChange={(e) => handleInputChange('linkedinConnections', e.target.value)}
                      placeholder="e.g. 5000"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Professional Profile */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Industry/Niche *</label>
                  <Select value={formData.niche} onValueChange={(value) => handleInputChange('niche', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your primary niche" />
                    </SelectTrigger>
                    <SelectContent>
                      {niches.map((niche) => (
                        <SelectItem key={niche} value={niche}>
                          {niche}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Professional Bio *</label>
                  <Textarea
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    placeholder="Tell us about your professional background, expertise, and what makes you unique..."
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Years of Experience *</label>
                  <Input
                    type="number"
                    value={formData.yearsOfExperience}
                    onChange={(e) => handleInputChange('yearsOfExperience', e.target.value)}
                    placeholder="e.g. 5"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Target Audience</label>
                  <Textarea
                    value={formData.targetAudience}
                    onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                    placeholder="Describe your typical audience (job titles, industries, company sizes, etc.)"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Languages</label>
                  <div className="grid grid-cols-3 gap-2">
                    {languages.map((language) => (
                      <label key={language} className="flex items-center space-x-2 text-sm">
                        <input
                          type="checkbox"
                          checked={formData.languages.includes(language)}
                          onChange={(e) => handleArrayChange('languages', language, e.target.checked)}
                          className="rounded"
                        />
                        <span>{language}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Content & Rates */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Content Types You Create</label>
                  <div className="grid grid-cols-2 gap-2">
                    {contentTypes.map((type) => (
                      <label key={type} className="flex items-center space-x-2 text-sm">
                        <input
                          type="checkbox"
                          checked={formData.contentTypes.includes(type)}
                          onChange={(e) => handleArrayChange('contentTypes', type, e.target.checked)}
                          className="rounded"
                        />
                        <span>{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Average Engagement Rate (%)</label>
                    <Input
                      type="number"
                      step="0.1"
                      value={formData.averageEngagementRate}
                      onChange={(e) => handleInputChange('averageEngagementRate', e.target.value)}
                      placeholder="e.g. 4.5"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Posting Frequency</label>
                    <Select value={formData.postingFrequency} onValueChange={(value) => handleInputChange('postingFrequency', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="How often do you post?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="3-4-times-week">3-4 times per week</SelectItem>
                        <SelectItem value="2-3-times-week">2-3 times per week</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Rate per Post ($)</label>
                    <Input
                      type="number"
                      value={formData.ratePerPost}
                      onChange={(e) => handleInputChange('ratePerPost', e.target.value)}
                      placeholder="e.g. 500"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Rate per Campaign ($)</label>
                    <Input
                      type="number"
                      value={formData.ratePerCampaign}
                      onChange={(e) => handleInputChange('ratePerCampaign', e.target.value)}
                      placeholder="e.g. 2500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Availability</label>
                  <Select value={formData.availability} onValueChange={(value) => handleInputChange('availability', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="When are you available for campaigns?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediately">Available immediately</SelectItem>
                      <SelectItem value="1-week">Available in 1 week</SelectItem>
                      <SelectItem value="2-weeks">Available in 2 weeks</SelectItem>
                      <SelectItem value="1-month">Available in 1 month</SelectItem>
                      <SelectItem value="flexible">Flexible scheduling</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Step 4: Portfolio & Experience */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Portfolio Links</label>
                  <Textarea
                    value={formData.portfolioLinks}
                    onChange={(e) => handleInputChange('portfolioLinks', e.target.value)}
                    placeholder="Share links to your best LinkedIn posts, articles, or other professional content (one per line)"
                    rows={4}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Sample Content URLs</label>
                  <Textarea
                    value={formData.sampleContentUrls}
                    onChange={(e) => handleInputChange('sampleContentUrls', e.target.value)}
                    placeholder="Links to your most engaging content that showcases your expertise (one per line)"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Previous Brand Collaborations</label>
                  <Textarea
                    value={formData.previousCollaborations}
                    onChange={(e) => handleInputChange('previousCollaborations', e.target.value)}
                    placeholder="Tell us about any previous brand partnerships, sponsored content, or professional collaborations"
                    rows={4}
                  />
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">What happens next?</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• We'll review your application within 2-3 business days</li>
                    <li>• Our team may reach out for additional information</li>
                    <li>• Once approved, you'll be added to our influencer directory</li>
                    <li>• Brands will be able to discover and contact you for campaigns</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              
              {currentStep < 4 ? (
                <Button onClick={nextStep}>
                  Next
                  <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit}
                  disabled={isSubmitting || !formData.fullName || !formData.email || !formData.linkedinUrl || !formData.niche || !formData.bio}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}