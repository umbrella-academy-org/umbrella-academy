'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { 
  Plus, 
  Download, 
  Share2, 
  Eye, 
  Edit, 
  Trash2, 
  Code, 
  Palette, 
  Briefcase, 
  Award,
  Calendar,
  ExternalLink,
  Image as ImageIcon,
  FileText,
  Video,
  Star
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  type: 'web' | 'mobile' | 'design' | 'other';
  image: string;
  technologies: string[];
  link?: string;
  github?: string;
  completedAt: string;
  featured: boolean;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedAt: string;
  level: 'bronze' | 'silver' | 'gold' | 'platinum';
}

export default function PortfolioPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'projects' | 'achievements' | 'skills'>('projects');
  const [showAddProject, setShowAddProject] = useState(false);

  // Sample data - in real app, this would come from backend
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with payment integration',
      type: 'web',
      image: '/projects/ecommerce.jpg',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      link: 'https://demo-ecommerce.com',
      github: 'https://github.com/user/ecommerce',
      completedAt: '2024-01-15',
      featured: true
    },
    {
      id: '2',
      title: 'Mobile Banking App',
      description: 'React Native banking application with biometric auth',
      type: 'mobile',
      image: '/projects/banking.jpg',
      technologies: ['React Native', 'Firebase', 'Redux'],
      link: 'https://appbanking.com',
      completedAt: '2024-02-20',
      featured: false
    },
    {
      id: '3',
      title: 'Brand Identity Design',
      description: 'Complete brand redesign for tech startup',
      type: 'design',
      image: '/projects/brand.jpg',
      technologies: ['Figma', 'Illustrator', 'Photoshop'],
      completedAt: '2024-03-10',
      featured: true
    }
  ]);

  const [achievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'First Project Complete',
      description: 'Successfully completed your first project',
      icon: 'trophy',
      earnedAt: '2024-01-15',
      level: 'bronze'
    },
    {
      id: '2',
      title: 'Code Master',
      description: 'Submitted 10+ coding projects',
      icon: 'code',
      earnedAt: '2024-02-20',
      level: 'silver'
    },
    {
      id: '3',
      title: 'Design Excellence',
      description: 'Received 5-star rating on design projects',
      icon: 'palette',
      earnedAt: '2024-03-10',
      level: 'gold'
    }
  ]);

  const [skills] = useState([
    { name: 'React.js', level: 90, category: 'Frontend' },
    { name: 'Node.js', level: 75, category: 'Backend' },
    { name: 'UI/UX Design', level: 85, category: 'Design' },
    { name: 'MongoDB', level: 70, category: 'Database' },
    { name: 'TypeScript', level: 80, category: 'Frontend' },
    { name: 'Figma', level: 88, category: 'Design' }
  ]);

  if (!isAuthenticated) {
    router.push('/auth/login');
    return null;
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'web': return <Code className="w-5 h-5" />;
      case 'mobile': return <Briefcase className="w-5 h-5" />;
      case 'design': return <Palette className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'bronze': return 'text-amber-600 bg-amber-50';
      case 'silver': return 'text-gray-600 bg-gray-50';
      case 'gold': return 'text-yellow-600 bg-yellow-50';
      case 'platinum': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getLevelBorder = (level: string) => {
    switch (level) {
      case 'bronze': return 'border-amber-200';
      case 'silver': return 'border-gray-200';
      case 'gold': return 'border-yellow-200';
      case 'platinum': return 'border-purple-200';
      default: return 'border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Portfolio</h1>
              <p className="text-sm text-gray-500">Showcase your work and achievements</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button 
                onClick={() => setShowAddProject(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Project
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'projects', label: 'Projects', count: projects.length },
              { id: 'achievements', label: 'Achievements', count: achievements.length },
              { id: 'skills', label: 'Skills', count: skills.length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
                <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  {/* Project Image */}
                  <div className="aspect-video bg-gray-100 relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
                      {getTypeIcon(project.type)}
                      <span className="text-xs font-medium capitalize">{project.type}</span>
                    </div>
                    {project.featured && (
                      <div className="absolute top-3 right-3 bg-yellow-500 text-white px-2 py-1 rounded-lg flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        <span className="text-xs font-medium">Featured</span>
                      </div>
                    )}
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-white font-semibold text-lg">{project.title}</h3>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="p-4">
                    <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(project.completedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {project.link && (
                          <button className="p-1 text-gray-400 hover:text-blue-600">
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        )}
                        {project.github && (
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <Code className="w-4 h-4" />
                          </button>
                        )}
                        <button className="p-1 text-gray-400 hover:text-blue-600">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement) => (
              <div key={achievement.id} className={`bg-white rounded-lg border ${getLevelBorder(achievement.level)} p-6 hover:shadow-md transition-shadow`}>
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg ${getLevelColor(achievement.level)} flex items-center justify-center`}>
                    <Award className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${getLevelColor(achievement.level)}`}>
                        {achievement.level.charAt(0).toUpperCase() + achievement.level.slice(1)}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(achievement.earnedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <div className="space-y-6">
            {skills.map((skill, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{skill.name}</h3>
                    <p className="text-sm text-gray-500">{skill.category}</p>
                  </div>
                  <span className="text-2xl font-bold text-blue-600">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Project Modal */}
      {showAddProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Project</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Title</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="web">Web Development</option>
                    <option value="mobile">Mobile Development</option>
                    <option value="design">Design</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Technologies</label>
                  <input type="text" placeholder="React, Node.js, MongoDB..." className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Link</label>
                    <input type="url" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">GitHub Repository</label>
                    <input type="url" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="featured" className="rounded border-gray-300" />
                  <label htmlFor="featured" className="text-sm text-gray-700">Feature this project</label>
                </div>
                <div className="flex gap-3 pt-4">
                  <button 
                    type="button"
                    onClick={() => setShowAddProject(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Add Project
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
