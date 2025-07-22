import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, Users, TrendingUp, Zap, Star, Target, Globe, Rocket, User, Mail, MapPin, Briefcase, CheckCircle } from "lucide-react"
import { ScrollReveal } from "@/components/ScrollReveal"
import { ParallaxElement } from "@/components/ParallaxElement"
import { blink } from "@/blink/client"

export function LandingPage() {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    location: '',
    linkedinUrl: '',
    niche: '',
    bio: '',
    yearsOfExperience: '',
    ratePerPost: ''
  })

  const niches = [
    'Marketing', 'Technology', 'Finance', 'HR & Leadership', 'Sales', 
    'Consulting', 'Healthcare', 'Real Estate', 'Legal', 'Education'
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const influencerData = {
        id: `inf_${Date.now()}`,
        fullName: formData.fullName,
        email: formData.email,
        location: formData.location,
        linkedinUrl: formData.linkedinUrl,
        niche: formData.niche,
        bio: formData.bio,
        yearsOfExperience: parseInt(formData.yearsOfExperience) || 0,
        ratePerPost: parseInt(formData.ratePerPost) || 0,
        status: 'pending',
        verified: false
      }

      await blink.db.influencers.create(influencerData)
      setIsSubmitted(true)
      setFormData({
        fullName: '',
        email: '',
        location: '',
        linkedinUrl: '',
        niche: '',
        bio: '',
        yearsOfExperience: '',
        ratePerPost: ''
      })
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('There was an error submitting your application. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <ParallaxElement speed={-0.3}>
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-pink-900/20" />
        </ParallaxElement>
        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:py-32">
          <div className="text-center space-y-8">
            <ScrollReveal direction="scale" delay={200}>
              <Badge className="gradient-primary text-white px-6 py-2 text-lg font-bold animate-pulse-glow">
                🚀 WE ARE NOT JUST GLOBAL, WE ARE PLANETARY!
              </Badge>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={400}>
              <h1 className="text-hero gradient-text max-w-5xl mx-auto">
                MONETIZE YOUR 
                <br />
                <span className="text-accent">PASSION</span>
                <br />
                EARN WITH EVERY POST
              </h1>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={600}>
              <p className="text-xl sm:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                The ULTIMATE platform for creators to connect with top brands, 
                streamline collaborations, and turn your influence into income.
              </p>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={800}>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
                <Button className="btn-gradient text-xl px-12 py-6 rounded-2xl group">
                  START EARNING NOW
                  <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" className="btn-outline-gradient text-xl px-12 py-6 rounded-2xl">
                  WATCH DEMO
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-800/50 relative">
        <ParallaxElement speed={0.2}>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/10 to-purple-900/10" />
        </ParallaxElement>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "1M+", label: "CREATORS" },
              { number: "50+", label: "COUNTRIES" },
              { number: "500+", label: "CITIES" },
              { number: "25+", label: "LANGUAGES" }
            ].map((stat, index) => (
              <ScrollReveal key={index} direction="scale" delay={index * 100}>
                <div className="space-y-2">
                  <div className="text-6xl font-black gradient-text">{stat.number}</div>
                  <div className="text-slate-400 font-medium">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Main Value Proposition */}
      <section className="py-32 relative">
        <ParallaxElement speed={-0.1}>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/5 via-pink-900/5 to-indigo-900/5" />
        </ParallaxElement>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center space-y-16">
            <ScrollReveal direction="up">
              <h2 className="text-section gradient-text">
                THE ULTIMATE
                <br />
                <span className="text-white">SCROLL-STOPPER</span>
              </h2>
            </ScrollReveal>
            
            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  icon: Target,
                  title: "Still making your WAY to get noticed by top",
                  highlight: "BRANDS?",
                  description: "InfluenceHub's global reach is your backstage pass to connect with big-name brands, opening doors you didn't even know existed!",
                  direction: "left" as const
                },
                {
                  icon: Zap,
                  title: "Too much",
                  highlight: "TO HANDLE?",
                  description: "InfluenceHub simplifies the chaos by streamlining partnerships/collaborations so you can skip the stress and focus on what you do best: creating.",
                  direction: "up" as const
                },
                {
                  icon: TrendingUp,
                  title: "Worried about being",
                  highlight: "UNDERVALUED?",
                  description: "InfluenceHub audience credibility tools put your engagement front and center, turning you into a must-have for brands looking for real impact!",
                  direction: "right" as const
                }
              ].map((item, index) => (
                <ScrollReveal key={index} direction={item.direction} delay={index * 200}>
                  <Card className="bg-slate-800 border-slate-700 p-8 hover:bg-slate-700 transition-all duration-500 hover:scale-105 glow-primary group">
                    <CardContent className="space-y-6 p-0">
                      <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <item.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold">
                        {item.title}
                        <br />
                        <span className="gradient-text">{item.highlight}</span>
                      </h3>
                      <p className="text-slate-400 text-lg">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Creator Journey */}
      <section className="py-32 bg-slate-800/30 relative">
        <ParallaxElement speed={0.15}>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/10 via-purple-900/10 to-pink-900/10" />
        </ParallaxElement>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center space-y-16">
            <ScrollReveal direction="up">
              <h2 className="text-section">
                THE <span className="gradient-text">INFLUENCEHUB</span>
                <br />
                CREATOR JOURNEY
              </h2>
            </ScrollReveal>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {[
                {
                  step: "01",
                  title: "Sign Up & Set Your Profile",
                  description: "Start your journey by creating your InfluenceHub profile. Highlight your niche, audience insights, and past collaborations to attract the perfect brand partnerships."
                },
                {
                  step: "02", 
                  title: "Discover & Pitch for BRAND DEALS",
                  description: "Browse a curated list of brand campaigns tailored just for you. Pitch directly to your favorite brands or let them reach out to you through the platform."
                },
                {
                  step: "03",
                  title: "Lock Campaigns in a CLICK",
                  description: "No endless back-and-forth emails—confirm collaborations and lock deals with ease. From scripting to approvals, everything's streamlined in one place."
                },
                {
                  step: "04",
                  title: "Create, Share, & Get PAID",
                  description: "Upload your content for quick feedback and approvals from brands. Track revisions, deadlines, and guidelines seamlessly without any confusion."
                }
              ].map((item, index) => (
                <ScrollReveal key={index} direction="up" delay={index * 150}>
                  <Card className="bg-slate-800 border-slate-700 p-6 hover:bg-slate-700 transition-all duration-500 hover:scale-105 group">
                    <CardContent className="space-y-4 p-0">
                      <div className="text-4xl font-black gradient-text group-hover:scale-110 transition-transform duration-300">
                        Step {item.step}
                      </div>
                      <h3 className="text-xl font-bold text-white">{item.title}</h3>
                      <p className="text-slate-400">{item.description}</p>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>

            {/* Registration Form Section */}
            <ScrollReveal direction="up" delay={600}>
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold gradient-text mb-4">
                    READY TO START YOUR JOURNEY?
                  </h3>
                  <p className="text-xl text-slate-300">
                    Join thousands of creators already earning with InfluenceHub
                  </p>
                </div>

                {!showRegistrationForm ? (
                  <div className="text-center">
                    <Button 
                      onClick={() => setShowRegistrationForm(true)}
                      className="btn-gradient text-xl px-12 py-6 rounded-2xl group hover:scale-110 transition-all duration-300"
                    >
                      <User className="mr-2 h-6 w-6" />
                      REGISTER AS INFLUENCER
                      <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                ) : isSubmitted ? (
                  <Card className="bg-slate-800 border-slate-700 p-8 text-center">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-8 h-8 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Application Submitted!</h3>
                    <p className="text-slate-300 mb-6">
                      Thank you for joining InfluenceHub! We'll review your application and get back to you within 2-3 business days.
                    </p>
                    <Button 
                      onClick={() => {
                        setIsSubmitted(false)
                        setShowRegistrationForm(false)
                      }}
                      variant="outline"
                      className="btn-outline-gradient"
                    >
                      Submit Another Application
                    </Button>
                  </Card>
                ) : (
                  <Card className="bg-slate-800 border-slate-700 p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="text-sm font-medium mb-2 block text-white flex items-center">
                            <User className="w-4 h-4 mr-2" />
                            Full Name *
                          </label>
                          <Input
                            value={formData.fullName}
                            onChange={(e) => handleInputChange('fullName', e.target.value)}
                            placeholder="Your full name"
                            required
                            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block text-white flex items-center">
                            <Mail className="w-4 h-4 mr-2" />
                            Email *
                          </label>
                          <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="your.email@example.com"
                            required
                            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="text-sm font-medium mb-2 block text-white flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            Location *
                          </label>
                          <Input
                            value={formData.location}
                            onChange={(e) => handleInputChange('location', e.target.value)}
                            placeholder="City, State, Country"
                            required
                            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block text-white flex items-center">
                            <Briefcase className="w-4 h-4 mr-2" />
                            Industry/Niche *
                          </label>
                          <Select value={formData.niche} onValueChange={(value) => handleInputChange('niche', value)}>
                            <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                              <SelectValue placeholder="Select your niche" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-700 border-slate-600">
                              {niches.map((niche) => (
                                <SelectItem key={niche} value={niche} className="text-white hover:bg-slate-600">
                                  {niche}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block text-white">
                          LinkedIn Profile URL *
                        </label>
                        <Input
                          value={formData.linkedinUrl}
                          onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                          placeholder="https://linkedin.com/in/yourprofile"
                          required
                          className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block text-white">
                          Professional Bio *
                        </label>
                        <Textarea
                          value={formData.bio}
                          onChange={(e) => handleInputChange('bio', e.target.value)}
                          placeholder="Tell us about your professional background and expertise..."
                          rows={4}
                          required
                          className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="text-sm font-medium mb-2 block text-white">
                            Years of Experience
                          </label>
                          <Input
                            type="number"
                            value={formData.yearsOfExperience}
                            onChange={(e) => handleInputChange('yearsOfExperience', e.target.value)}
                            placeholder="e.g. 5"
                            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block text-white">
                            Rate per Post ($)
                          </label>
                          <Input
                            type="number"
                            value={formData.ratePerPost}
                            onChange={(e) => handleInputChange('ratePerPost', e.target.value)}
                            placeholder="e.g. 500"
                            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowRegistrationForm(false)}
                          className="btn-outline-gradient flex-1"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          disabled={isSubmitting || !formData.fullName || !formData.email || !formData.location || !formData.niche || !formData.linkedinUrl || !formData.bio}
                          className="btn-gradient flex-1"
                        >
                          {isSubmitting ? 'Submitting...' : 'Submit Application'}
                        </Button>
                      </div>
                    </form>
                  </Card>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-32 relative">
        <ParallaxElement speed={-0.2}>
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/10 via-purple-900/10 to-pink-900/10" />
        </ParallaxElement>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center space-y-16">
            <ScrollReveal direction="up">
              <h2 className="text-section">
                HOW <span className="gradient-text">INFLUENCEHUB</span>
                <br />
                ADDS A <span className="text-accent">CRAZYYY</span> VALUE?
              </h2>
            </ScrollReveal>
            
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
              {[
                { icon: Globe, title: "Global Recognition" },
                { icon: Users, title: "Global & Local Deals" },
                { icon: Star, title: "Credibility Tools" },
                { icon: Zap, title: "Simplified Campaigns" },
                { icon: TrendingUp, title: "Revenue Tracking" }
              ].map((item, index) => (
                <ScrollReveal key={index} direction="scale" delay={index * 100}>
                  <Card className="bg-slate-800 border-slate-700 p-6 hover:bg-slate-700 transition-all duration-500 hover:scale-110 animate-float group" style={{ animationDelay: `${index * 0.2}s` }}>
                    <CardContent className="space-y-4 p-0 text-center">
                      <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto group-hover:rotate-12 transition-transform duration-300">
                        <item.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-white">{item.title}</h3>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI Powered Section */}
      <section className="py-32 bg-slate-800/50 relative">
        <ParallaxElement speed={0.1}>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-indigo-900/20 to-pink-900/20" />
        </ParallaxElement>
        <div className="relative max-w-7xl mx-auto px-4 text-center space-y-12">
          <ScrollReveal direction="up">
            <h2 className="text-section">
              WHAT MAKES IT ALL
              <br />
              <span className="gradient-text">POSSIBLE?</span>
            </h2>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={200}>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-slate-300 leading-relaxed">
                InfluenceHub is powered by advanced AI and machine learning, designed to understand 
                and match your unique creator profile with the perfect opportunities. This tech-driven 
                edge ensures a smoother, smarter experience! It's the ultimate go-to for creators who 
                want a hassle-free way to grow, connect, and thrive in the ever-evolving creator economy.
              </p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal direction="scale" delay={400}>
            <div className="pt-8">
              <Button className="btn-gradient text-xl px-12 py-6 rounded-2xl group hover:scale-110 transition-all duration-300">
                <Rocket className="mr-2 h-6 w-6 group-hover:rotate-12 transition-transform" />
                GET STARTED NOW
                <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <ParallaxElement speed={-0.3}>
          <div className="absolute inset-0 gradient-primary opacity-10" />
        </ParallaxElement>
        <div className="relative max-w-7xl mx-auto px-4 text-center space-y-12">
          <ScrollReveal direction="up">
            <h2 className="text-section">
              READY TO
              <br />
              <span className="gradient-text">INFLUENCE IT?</span>
            </h2>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={200}>
            <p className="text-2xl text-slate-300 max-w-3xl mx-auto">
              Join thousands of creators who are already earning with every post. 
              Your audience is waiting, and brands are ready to pay.
            </p>
          </ScrollReveal>
          
          <ScrollReveal direction="scale" delay={400}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <Button className="btn-gradient text-2xl px-16 py-8 rounded-2xl group hover:scale-110 transition-all duration-300">
                START YOUR JOURNEY
                <ArrowRight className="ml-2 h-8 w-8 group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}