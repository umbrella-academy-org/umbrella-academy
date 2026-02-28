'use client';

import { ArrowRight, Award, BookOpen, Camera, Clock, Code, Eye, Globe, GraduationCap, Heart, MapPin, MessageSquare, Monitor, Play, Shield, Sparkles, Star, Target, Trophy, TrendingUp, Users, X, Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import Image from 'next/image';
import { useState } from 'react';
import { dashboardData } from '@/data/dashboard';

export default function Home() {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  
  const { videos, courses, stats, features, journeySteps, navigation, hero } = dashboardData;

  return (
    <div className="w-full bg-white text-black h-screen overflow-y-auto">
      {/* Video Modal */}
      {selectedVideo !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videos[selectedVideo].videoId}?autoplay=1`}
              title={videos[selectedVideo].title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors z-10"
              aria-label="Close video"
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-2">
              <Logo size="md" />
            </div>

            <div className="hidden md:flex items-center gap-8">
              {navigation.main.map((item) => (
                <a key={item.href} href={item.href} className="text-sm font-medium hover:text-gray-700 transition-colors text-black">
                  {item.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4">
              {navigation.auth.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={
                    item.variant === 'primary'
                      ? 'gap-2 bg-black text-white hover:bg-gray-800 px-4 py-2 rounded-lg inline-flex items-center'
                      : 'text-sm font-medium hover:text-gray-700 transition-colors text-black'
                  }
                >
                  {item.label}
                  {item.variant === 'primary' && <ArrowRight className="h-4 w-4" />}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12 sm:py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-gray-200/30 blur-3xl" />
          <div className="absolute -right-40 -bottom-40 h-80 w-80 rounded-full bg-gray-300/30 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-gray-200/20 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 border border-gray-300 mb-6">
                {hero.badge.icon === 'sparkles' && <Sparkles className="h-4 w-4 text-gray-700" />}
                <span className="text-sm font-medium text-gray-800">{hero.badge.text}</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-balance leading-tight text-amber-600">
                {hero.title}
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-gray-600 text-balance leading-relaxed">
                {hero.subtitle}
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {hero.ctas.map((cta, index) => (
                  <a
                    key={index}
                    href={cta.href}
                    className={
                      cta.variant === 'primary'
                        ? 'w-full sm:w-auto gap-2 shadow-lg hover:shadow-xl bg-black text-white hover:bg-gray-800 px-6 py-3 rounded-lg inline-flex items-center justify-center'
                        : 'w-full sm:w-auto border-gray-300 text-gray-800 hover:bg-gray-100 px-6 py-3 rounded-lg inline-flex items-center justify-center'
                    }
                  >
                    {cta.label}
                    {cta.variant === 'primary' && cta.icon === 'arrow-right' && <ArrowRight className="h-5 w-5" />}
                  </a>
                ))}
              </div>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-3 gap-6 pt-8 border-t border-gray-300">
                {stats.slice(0, 3).map((stat, index) => (
                  <div key={index}>
                    <p className="text-2xl font-bold text-black">{stat.value}</p>
                    <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Visual Trust Indicators */}
              <div className="mt-8 flex flex-wrap gap-4">
                {features.slice(0, 3).map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                    <div className={`w-2 h-2 bg-${feature.color}-500 rounded-full`}></div>
                    <span>{feature.title}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200/30 to-gray-300/30 rounded-2xl blur-2xl" />

              {/* Main Image */}
              <div className="relative rounded-2xl shadow-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&h=500&fit=crop&crop=center"
                  alt="Learn from industry experts"
                  width={500}
                  height={500}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-3 border border-gray-200 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Trophy className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-900">Success Stories</p>
                    <p className="text-xs text-gray-600">200+ Placements</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-3 border border-gray-200 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-900">Active Community</p>
                    <p className="text-xs text-gray-600">24/7 Support</p>
                  </div>
                </div>
              </div>

              <div className="absolute top-1/2 -left-8 bg-white rounded-xl shadow-lg p-3 border border-gray-200 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Star className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-900">Top Rated</p>
                    <p className="text-xs text-gray-600">4.9/5 Stars</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="journey" className="py-12 sm:py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl text-black">Your Learning Journey</h2>
            <p className="mt-4 text-lg text-gray-600">
              Four simple steps to transform your career
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {journeySteps.map((step, idx) => (
              <div key={step.id} className={`group relative cursor-pointer transform transition-all duration-500 hover:scale-105 hover:-translate-y-2`}>
                <div className={`absolute inset-0 bg-gradient-to-r ${step.color} ${step.borderColor} rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300`}></div>
                <div className={`relative bg-gradient-to-br ${step.color} ${step.hoverBg} rounded-2xl p-6 border ${step.borderColor} shadow-lg group-hover:shadow-2xl transition-all duration-300`}>
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gray-200/50 to-transparent rounded-full -mr-12 -mt-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                  <div className={`relative flex items-center justify-center h-16 w-16 rounded-2xl ${step.iconBg} mb-6 shadow-xl group-hover:rotate-6 transition-transform duration-300`}>
                    {step.icon === 'target' && <Target className="h-8 w-8" />}
                    {step.icon === 'users' && <Users className="h-8 w-8" />}
                    {step.icon === 'book-open' && <BookOpen className="h-8 w-8" />}
                    {step.icon === 'zap' && <Zap className="h-8 w-8" />}
                  </div>

                  <div className="flex items-start gap-3 mb-4">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gradient-to-br from-black to-gray-800 text-white text-sm font-bold shadow-lg">
                      {idx + 1}
                    </div>
                    <h3 className="font-bold text-lg text-black group-hover:text-gray-800 transition-colors">{step.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors">{step.description}</p>

                  <div className="mt-4 flex items-center gap-2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Click to explore</span>
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Fields */}
      <section id="fields" className="py-12 sm:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl text-black">Learning Fields</h2>
            <p className="mt-4 text-lg text-gray-600">
              Explore diverse learning paths with industry leaders
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {[
              {
                field: 'Technology',
                color: 'from-gray-50 to-white',
                borderColor: 'border-gray-200',
                icon: <Monitor className="h-5 w-5 text-gray-700" />,
                description: 'Build the future with cutting-edge tech skills',
                stats: { courses: '12+', students: '800+', companies: '1' },
                image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=250&h=180&fit=crop&crop=center',
                companies: [
                  { name: 'Dreamize Africa', focus: 'Full-stack Development & Cloud Architecture' }
                ]
              },
              {
                field: 'Visual & Audio Communication',
                color: 'from-white to-gray-50',
                borderColor: 'border-gray-200',
                icon: <Camera className="h-5 w-5 text-gray-700" />,
                description: 'Create compelling stories through visual media',
                stats: { courses: '8+', students: '300+', companies: '1' },
                image: 'https://images.unsplash.com/photo-1596724686228-3a9f7b0bb3b1?w=250&h=180&fit=crop&crop=center',
                companies: [
                  { name: 'Green Land Film & TV School', focus: 'Media Production & Storytelling' }
                ]
              }
            ].map((category, idx) => (
              <div key={idx} className="group cursor-pointer transform transition-all duration-300 hover:scale-105">
                <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br border border-gray-200 hover:border-gray-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.field}
                      width={250}
                      height={180}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                    <div className="absolute top-2 right-2">
                      <div className="w-10 h-10 rounded-lg bg-white/90 backdrop-blur flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                        {category.icon}
                      </div>
                    </div>

                    <div className="absolute bottom-2 left-2 right-2">
                      <h3 className="text-lg font-bold text-white mb-1">{category.field}</h3>
                      <p className="text-white/80 text-xs">{category.description}</p>
                    </div>

                    <div className="absolute top-2 left-2 flex gap-1">
                      <div className="bg-white/20 backdrop-blur px-1.5 py-0.5 rounded-full">
                        <span className="text-white text-xs font-semibold">{category.stats.courses} Courses</span>
                      </div>
                      <div className="bg-white/20 backdrop-blur px-1.5 py-0.5 rounded-full">
                        <span className="text-white text-xs font-semibold">{category.stats.students} Students</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-white">
                    <div className="flex items-center gap-1.5 mb-2">
                      <div className="w-4 h-4 rounded-lg bg-gradient-to-br from-black to-gray-800 flex items-center justify-center">
                        <Trophy className="h-2 w-2 text-white" />
                      </div>
                      <span className="text-xs font-semibold text-gray-800">Partner Company</span>
                    </div>

                    <div className="space-y-2">
                      {category.companies.map((company, cidx) => (
                        <div key={cidx} className="group/card">
                          <div className="p-2.5 rounded-lg bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300 cursor-pointer">
                            <div className="flex items-start gap-2">
                              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-black to-gray-800 flex items-center justify-center flex-shrink-0 group-hover/card:scale-110 transition-transform">
                                <Monitor className="h-3.5 w-3.5 text-white" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-bold text-xs text-black mb-1 group-hover/card:text-gray-800 transition-colors">{company.name}</h4>
                                <p className="text-gray-600 text-xs leading-relaxed">{company.focus}</p>

                                <div className="mt-1.5 flex items-center gap-1.5">
                                  <div className="flex items-center gap-0.5">
                                    <Star className="h-2 w-2 text-yellow-500 fill-yellow-500" />
                                    <span className="text-xs font-semibold text-gray-700">4.9</span>
                                  </div>
                                  <div className="flex items-center gap-0.5 text-xs text-gray-500">
                                    <BookOpen className="h-2 w-2" />
                                    <span>Expert-led</span>
                                  </div>
                                </div>

                                <div className="mt-1.5">
                                  <a href="#courses" className="inline-flex items-center gap-0.5 text-xs font-medium text-black hover:text-gray-700 transition-colors">
                                    Explore Programs <ArrowRight className="h-2 w-2 group-hover:translate-x-1 transition-transform" />
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses and Companies Section */}
      <section id="courses" className="py-12 sm:py-24 bg-gradient-to-b from-card to-background relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -left-40 -bottom-40 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl">Explore Our Courses</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Learn from industry-leading companies offering specialized programs
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
            {courses.map((course, idx) => (
              <div key={idx} className="group cursor-pointer transform transition-all duration-300 hover:scale-105">
                <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 bg-white">
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={course.image}
                      alt={course.title}
                      width={400}
                      height={250}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute top-2 right-2 bg-black px-2 py-0.5 rounded-full text-white text-xs font-bold shadow-md flex items-center gap-1">
                      <Code className="h-2.5 w-2.5" />
                      {course.level}
                    </div>
                    <div className="absolute bottom-2 left-2">
                      <div className="flex items-center gap-1 text-white/90 text-xs">
                        <Clock className="h-2.5 w-2.5" />
                        <span>{course.duration}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 relative">
                    <div className="absolute -top-4 left-3 w-8 h-8 rounded-lg bg-black flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
                      <Code className="h-4 w-4" />
                    </div>

                    <div className="pt-2">
                      <h3 className="font-bold text-sm mb-1 group-hover:text-black transition-colors text-black line-clamp-2">{course.title}</h3>
                      <p className="text-gray-600 mb-2 flex items-center gap-1 text-xs">
                        <MapPin className="h-2.5 w-2.5 text-gray-500" />
                        {course.company}
                      </p>

                      <div className="flex items-center justify-between mb-2">
                        <div className="text-lg font-bold text-black">{course.price}</div>
                        <div className="text-xs text-gray-500">{course.duration}</div>
                      </div>

                      <a href="/auth/signup" className="w-full gap-1 shadow-sm hover:shadow-md bg-black hover:bg-gray-800 text-white px-2 py-1.5 rounded-md inline-flex items-center justify-center transition-all duration-300 text-xs">
                        Enroll Now <ArrowRight className="h-2.5 w-2.5 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Companies Section */}
          <div className="bg-white rounded-3xl shadow-lg p-8 sm:p-12 border border-gray-200">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 border border-gray-300 mb-4">
                <Trophy className="h-4 w-4 text-gray-700" />
                <span className="text-sm font-medium text-gray-800">Trusted Partners</span>
              </div>
              <h3 className="text-3xl font-bold mb-4 text-black">Our Partner Companies</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">Collaborate with industry leaders to deliver world-class learning experiences</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                {
                  company: 'Dreamize Africa',
                  field: 'Technology & Innovation',
                  courses: ['Full-Stack', 'DevOps', 'Mobile Apps', 'UI/UX'],
                  icon: <Code className="h-10 w-10" />,
                  description: 'Leading tech education in Africa',
                  stats: { students: '500+', courses: '12+', rating: '4.9' }
                },
                {
                  company: 'Green Land Film & TV',
                  field: 'Visual & Audio Communication',
                  courses: ['Video Production', 'Audio Engineering', 'Motion Graphics', 'Film Direction'],
                  icon: <Camera className="h-10 w-10" />,
                  description: 'Premier media production school',
                  stats: { students: '300+', courses: '8+', rating: '4.8' }
                }
              ].map((item, idx) => (
                <div key={idx} className="group h-full">
                  <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-gray-300 overflow-hidden h-full flex flex-col">
                    {/* Icon Header */}
                    <div className="relative h-28 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex-shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent"></div>

                      <div className="relative h-full flex items-center justify-center">
                        <div className="w-16 h-16 rounded-xl bg-black flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
                          <div className="text-white">
                            {item.icon}
                          </div>
                        </div>
                      </div>

                      <div className="absolute top-3 right-3">
                        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/90 backdrop-blur border border-gray-200 shadow-sm">
                          <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                          <span className="text-black text-xs font-bold">{item.stats.rating}</span>
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="mb-3">
                        <h4 className="text-lg font-bold mb-1 group-hover:text-gray-800 transition-colors text-black">{item.company}</h4>
                        <p className="text-xs text-gray-600 mb-2">{item.field}</p>
                        <p className="text-xs text-gray-500">{item.description}</p>
                      </div>

                      {/* Course Tags */}
                      <div className="mb-3">
                        <div className="flex flex-wrap gap-1">
                          {item.courses.map((course, cidx) => (
                            <span key={cidx} className="px-2 py-1 rounded-md bg-gray-50 text-gray-700 text-xs font-medium border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer">
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Stats & CTA */}
                      <div className="mt-auto pt-3 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 text-xs">
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3 text-gray-500" />
                              <span className="text-gray-600">{item.stats.students}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <BookOpen className="h-3 w-3 text-gray-500" />
                              <span className="text-gray-600">{item.stats.courses}</span>
                            </div>
                          </div>
                          <a href="/auth/signup" className="inline-flex items-center gap-1 text-xs font-medium text-black hover:text-gray-700 transition-colors group/link">
                            Learn More
                            <ArrowRight className="h-3 w-3 group-hover/link:translate-x-1 transition-transform" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Browse All Courses */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Looking for more courses?</p>
            <Button size="lg" variant="secondary" className="gap-2 border-gray-300 text-gray-800 hover:bg-gray-100">
              Browse All Courses <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>


      {/* Features Section */}
      <section id="features" className="py-12 sm:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200/30 to-gray-300/30 rounded-2xl blur-2xl" />

              {/* Feature Images Grid */}
              <div className="relative grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=300&h=200&fit=crop&crop=center"
                      alt="Personalized learning paths"
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <p className="text-white text-sm font-semibold">Personalized Learning</p>
                    </div>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop&crop=center"
                      alt="Live mentorship sessions"
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <p className="text-white text-sm font-semibold">Expert Mentorship</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="relative rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1596724686228-3a9f7b0bb3b1?w=300&h=200&fit=crop&crop=center"
                      alt="Real-world projects"
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <p className="text-white text-sm font-semibold">Hands-on Projects</p>
                    </div>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=300&h=200&fit=crop&crop=center"
                      alt="Community support"
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <p className="text-white text-sm font-semibold">Community Support</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold sm:text-4xl text-balance text-black">Everything You Need to Succeed</h2>
              <p className="mt-4 text-lg text-gray-600">
                Our platform provides all the tools and support to accelerate your learning journey.
              </p>

              <div className="mt-12 space-y-6">
                {[
                  {
                    title: 'Personalized Learning Paths',
                    description: 'Customized curriculum based on your goals and learning pace',
                    icon: <Target className="h-6 w-6" />
                  },
                  {
                    title: 'Live Mentorship Sessions',
                    description: 'Direct access to industry experts for guidance and feedback',
                    icon: <Users className="h-6 w-6" />
                  },
                  {
                    title: 'Real-World Projects',
                    description: 'Build portfolio pieces with practical industry experience',
                    icon: <BookOpen className="h-6 w-6" />
                  },
                  {
                    title: 'Community Support',
                    description: 'Connect with peers, share knowledge, and grow together',
                    icon: <Sparkles className="h-6 w-6" />
                  }
                ].map((feature, idx) => (
                  <div key={idx} className="flex gap-4 group">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-black text-white group-hover:scale-110 transition-transform">
                        {feature.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-black group-hover:text-gray-800 transition-colors">{feature.title}</h3>
                      <p className="text-gray-600 mt-1">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-12 sm:py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl text-black">Trusted by Learners</h2>
            <p className="mt-4 text-lg text-gray-600">
              See what our community has achieved
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "The mentorship I received was transformative. I went from beginner to landing my first tech role in 6 months.",
                author: 'Sarah K.',
                role: 'Full-Stack Developer',
                field: 'Technology',
                gradient: 'from-gray-100 to-gray-50',
                icon: <Trophy className="h-6 w-6" />
              },
              {
                quote: "Umbrella Academy's approach to project-based learning helped me build a professional portfolio quickly.",
                author: 'Marcus T.',
                role: 'UI/UX Designer',
                field: 'Visual Communication',
                gradient: 'from-gray-50 to-white',
                icon: <Award className="h-6 w-6" />
              },
              {
                quote: "The connections I made with mentors and peers opened doors I didn't expect. Highly recommend!",
                author: 'Amara O.',
                role: 'DevOps Engineer',
                field: 'Technology',
                gradient: 'from-gray-100 to-gray-50',
                icon: <Star className="h-6 w-6" />
              }
            ].map((testimonial, idx) => (
              <div key={idx} className={`rounded-2xl shadow-lg hover:shadow-xl bg-gradient-to-br ${testimonial.gradient} p-8 transition-all duration-300 group flex flex-col`}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-black text-black" />
                    ))}
                  </div>
                  <div className="text-black">
                    {testimonial.icon}
                  </div>
                </div>
                <p className="text-black mb-8 italic leading-relaxed flex-1">"{testimonial.quote}"</p>
                <div className="pt-6 border-t border-gray-300 flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold">
                      {testimonial.author.charAt(0)}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-black group-hover:text-gray-800 transition-colors">{testimonial.author}</p>
                    <p className="text-sm text-gray-600 mt-1">{testimonial.role}</p>
                    <span className="inline-block mt-3 px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-medium border border-gray-300">
                      {testimonial.field}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials Section */}
      <section id="videos" className="py-12 sm:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Play className="h-6 w-6 text-black" />
              <h2 className="text-3xl font-bold sm:text-4xl text-black">Hear From Our Graduates</h2>
            </div>
            <p className="mt-4 text-lg text-gray-600">
              Watch real student success stories and transformations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {videos.map((video, idx) => (
              <div key={idx} className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer bg-white" onClick={() => setSelectedVideo(idx)}>
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={video.image}
                    alt={video.title}
                    width={400}
                    height={225}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-black/60 px-3 py-1 rounded-full text-white text-xs font-semibold flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {video.duration}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-3 group-hover:text-black transition-colors line-clamp-2 text-black">{video.title}</h3>
                  <div className="space-y-2 pb-4 border-b border-gray-200">
                    <p className="text-sm font-semibold text-black flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-black" />
                      {video.speaker}
                    </p>
                    <p className="text-xs text-gray-600 flex items-center gap-2">
                      <Award className="h-3 w-3 text-black" />
                      {video.role}
                    </p>
                    <p className="text-xs text-gray-600 flex items-center gap-2">
                      <Eye className="h-3 w-3 text-black" />
                      {video.views}
                    </p>
                  </div>
                  <Button className="w-full mt-4 gap-2 bg-black text-white hover:bg-gray-800" size="sm" onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                    setSelectedVideo(idx);
                  }}>
                    Watch Now
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Video Highlights */}
          <div className="bg-gradient-to-r from-gray-100 to-gray-50 rounded-2xl border border-gray-300 p-8 sm:p-12 text-center">
            <h3 className="text-2xl font-bold mb-4 text-black">Why Watch Our Student Stories?</h3>
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white font-bold mb-4">
                  ✓
                </div>
                <p className="font-semibold mb-2 text-black">Authentic Experiences</p>
                <p className="text-sm text-gray-600">Hear directly from graduates about their real journey and challenges overcome</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white font-bold mb-4">
                  ✓
                </div>
                <p className="font-semibold mb-2 text-black">Career Outcomes</p>
                <p className="text-sm text-gray-600">See the types of roles and companies our alumni now work for</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white font-bold mb-4">
                  ✓
                </div>
                <p className="font-semibold mb-2 text-black">Real Inspiration</p>
                <p className="text-sm text-gray-600">Get motivated by stories of transformation and personal growth</p>
              </div>
            </div>
            <Button size="lg" className="mt-8 gap-2 bg-black text-white hover:bg-gray-800">
              See All Video Testimonials <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-12 sm:py-16 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-gray-900/50"></div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl text-white leading-tight">
                Ready to Transform Your Career?
              </h2>
              <p className="text-lg text-gray-300 max-w-xl">
                Join thousands advancing their skills with Umbrella Academy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/auth/signup" className="gap-2 shadow-lg hover:shadow-xl bg-white text-black hover:bg-gray-100 px-8 py-3 rounded-lg inline-flex items-center justify-center font-medium">
                  Enroll Now <ArrowRight className="h-5 w-5" />
                </a>
                <a href="/auth/signup" className="border-gray-400 text-white hover:bg-white hover:text-black px-8 py-3 rounded-lg inline-flex items-center justify-center font-medium">
                  Learn More
                </a>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <Image
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=300&fit=crop&crop=center"
                alt="Transform your career with mentorship"
                width={400}
                height={300}
                className="rounded-2xl shadow-2xl object-cover w-full h-auto"
              />
              <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg border border-gray-300 max-w-xs">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="h-5 w-5 text-black" />
                  <p className="font-semibold text-black text-sm">Success Stories</p>
                </div>
                <p className="text-xs text-gray-600">Our alumni have secured roles at top tech companies and media production studios worldwide.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-300 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4 text-black flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Product
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-black transition-colors">Programs</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Mentors</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Learning Fields</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-black flex items-center gap-2">
                <Users className="h-4 w-4" />
                Company
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-black transition-colors">About</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-black flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Support
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-black transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-black transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-black flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Legal
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-black transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-300 pt-8 flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 sm:mb-0">
              <Logo size="sm" />
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span>Global Learning</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span>Growth Focused</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>Community Driven</span>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              © 2024 Umbrella Academy. All rights reserved. Transforming careers through mentorship.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
