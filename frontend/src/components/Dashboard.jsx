import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HomeIcon,
  DocumentTextIcon,
  DocumentMagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  UserGroupIcon,
  CalendarIcon,
  ChartBarIcon,
  BellIcon,
  Cog6ToothIcon,
  MagnifyingGlassIcon,
  SparklesIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import {
  HomeIcon as HomeSolidIcon,
  DocumentTextIcon as DocumentTextSolidIcon,
  DocumentMagnifyingGlassIcon as DocumentMagnifyingGlassSolidIcon,
  QuestionMarkCircleIcon as QuestionMarkCircleSolidIcon,
  UserGroupIcon as UserGroupSolidIcon,
  CalendarIcon as CalendarSolidIcon,
  ChartBarIcon as ChartBarSolidIcon,
} from '@heroicons/react/24/solid';

const RecruiterDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(5);

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: HomeIcon,
      iconSolid: HomeSolidIcon,
      description: 'Overview & Analytics',
    },
    {
      id: 'jd-generator',
      label: 'JD Generator',
      icon: DocumentTextIcon,
      iconSolid: DocumentTextSolidIcon,
      description: 'AI-Powered Job Descriptions',
      badge: 'AI',
    },
    {
      id: 'cv-parsing',
      label: 'CV Parsing',
      icon: DocumentMagnifyingGlassIcon,
      iconSolid: DocumentMagnifyingGlassSolidIcon,
      description: 'Extract & Analyze Resumes',
      badge: 'AI',
    },
    {
      id: 'question-generation',
      label: 'Question Generator',
      icon: QuestionMarkCircleIcon,
      iconSolid: QuestionMarkCircleSolidIcon,
      description: 'Smart Interview Questions',
      badge: 'AI',
    },
    {
      id: 'candidates',
      label: 'Candidates',
      icon: UserGroupIcon,
      iconSolid: UserGroupSolidIcon,
      description: 'Manage Applications',
    },
    {
      id: 'interviews',
      label: 'Interviews',
      icon: CalendarIcon,
      iconSolid: CalendarSolidIcon,
      description: 'Schedule & Track',
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: ChartBarIcon,
      iconSolid: ChartBarSolidIcon,
      description: 'Reports & Insights',
    },
  ];

  const navigate = useNavigate()

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardContent />;
      case 'jd-generator':
        return navigate('/jd-generator');
      case 'cv-parsing':
        return <CVParsingContent />;
      case 'question-generation':
        return <QuestionGeneratorContent />;
      case 'candidates':
        return <CandidatesContent />;
      case 'interviews':
        return <InterviewsContent />;
      case 'analytics':
        return <AnalyticsContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-full mx-auto px-4 lg:px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo & Brand */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                {mobileMenuOpen ? (
                  <XMarkIcon className="w-6 h-6 text-gray-600" />
                ) : (
                  <Bars3Icon className="w-6 h-6 text-gray-600" />
                )}
              </button>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg">
                  <SparklesIcon className="w-6 h-6 text-white" />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold text-gray-900">
                    RecruitAI Pro
                  </h1>
                  <p className="text-xs text-gray-500">Smart Hiring Platform</p>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-xl mx-6">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search candidates, jobs, interviews..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 lg:gap-4">
              {/* Mobile Search Icon */}
              <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg">
                <MagnifyingGlassIcon className="w-6 h-6 text-gray-600" />
              </button>

              {/* Notifications */}
              <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                <BellIcon className="w-6 h-6 text-gray-600" />
                {notifications > 0 && (
                  <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-semibold">
                    {notifications}
                  </span>
                )}
              </button>

              {/* Settings */}
              <button className="hidden sm:block p-2 hover:bg-gray-100 rounded-lg">
                <Cog6ToothIcon className="w-6 h-6 text-gray-600" />
              </button>

              {/* User Profile */}
              <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-gray-300">
                <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  AD
                </div>
                <div className="hidden lg:block">
                  <p className="text-sm font-semibold text-gray-900">Admin User</p>
                  <p className="text-xs text-gray-500">Recruiter</p>
                </div>
              </div>

              {/* Logout */}
              <button className="hidden sm:block p-2 hover:bg-red-50 rounded-lg text-red-600">
                <ArrowRightOnRectangleIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Navigation Menu */}
        <div className="border-t border-gray-200 bg-white">
          <div className="max-w-full mx-auto px-4 lg:px-6">
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-2">
              {navigationItems.map((item) => {
                const Icon = activeTab === item.id ? item.iconSolid : item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                      activeTab === item.id
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                        activeTab === item.id
                          ? 'bg-white/20 text-white'
                          : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setMobileMenuOpen(false)}>
          <div className="bg-white w-80 h-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                  AD
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Admin User</p>
                  <p className="text-sm text-gray-500">admin@recruitai.com</p>
                </div>
              </div>

              <div className="space-y-1">
                {navigationItems.map((item) => {
                  const Icon = activeTab === item.id ? item.iconSolid : item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        activeTab === item.id
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <div className="flex-1 text-left">
                        <p className="font-medium text-sm">{item.label}</p>
                        <p className={`text-xs ${activeTab === item.id ? 'text-white/80' : 'text-gray-500'}`}>
                          {item.description}
                        </p>
                      </div>
                      {item.badge && (
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                          activeTab === item.id
                            ? 'bg-white/20 text-white'
                            : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                  <Cog6ToothIcon className="w-5 h-5" />
                  <span className="font-medium">Settings</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg mt-1">
                  <ArrowRightOnRectangleIcon className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-full mx-auto px-4 lg:px-6 py-6">
        {renderContent()}
      </main>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

// Dashboard Content Component
const DashboardContent = () => (
  <div className="space-y-6">
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
      <h2 className="text-2xl font-bold mb-2">Welcome to RecruitAI Pro</h2>
      <p className="text-indigo-100">
        Manage jobs, CVs, interviews, schedules, reports, and analytics from one unified platform.
      </p>
    </div>
    {/* Add your dashboard content here */}
  </div>
);

// JD Generator Content Component
const JDGeneratorContent = () => (
  <div className="space-y-6">
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-indigo-100 rounded-lg">
          <DocumentTextIcon className="w-6 h-6 text-indigo-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">AI Job Description Generator</h2>
          <p className="text-gray-600">Create comprehensive job descriptions in seconds</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-2">
          <SparklesIcon className="w-5 h-5 text-indigo-600 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-gray-900">Feature:</p>
            <p className="text-sm text-gray-700">
              Enter a job title or paste a JD. AI can create a complete JD (responsibilities, must-have skills, good-to-have).
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Title
          </label>
          <input
            type="text"
            placeholder="e.g., Senior Java Developer, Full Stack Engineer..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all">
          <SparklesIcon className="w-5 h-5" />
          Generate JD with AI
        </button>
      </div>
    </div>
  </div>
);

// CV Parsing Content Component
const CVParsingContent = () => (
  <div className="space-y-6">
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-green-100 rounded-lg">
          <DocumentMagnifyingGlassIcon className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">AI CV Parser</h2>
          <p className="text-gray-600">Extract and analyze candidate information instantly</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-2">
          <SparklesIcon className="w-5 h-5 text-green-600 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-gray-900">Feature:</p>
            <p className="text-sm text-gray-700">
              Upload resume files (PDF, DOCX) and AI will automatically extract skills, experience, education, and contact details.
            </p>
          </div>
        </div>
      </div>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-green-500 transition-colors cursor-pointer">
        <DocumentMagnifyingGlassIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Drop CV files here or click to browse
        </h3>
        <p className="text-sm text-gray-600">
          Supports PDF, DOCX formats • Max 10MB
        </p>
        <button className="mt-4 px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-emerald-700">
          Select Files
        </button>
      </div>
    </div>
  </div>
);

// Question Generator Content Component
const QuestionGeneratorContent = () => (
  <div className="space-y-6">
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-purple-100 rounded-lg">
          <QuestionMarkCircleIcon className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Smart Question Generator</h2>
          <p className="text-gray-600">Generate tailored interview questions based on JD + CV</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-2">
          <SparklesIcon className="w-5 h-5 text-purple-600 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-gray-900">Feature:</p>
            <p className="text-sm text-gray-700">
              AI analyzes the job description and candidate's CV to generate personalized interview questions covering technical skills, behavioral aspects, and role-specific scenarios.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Job Description
          </label>
          <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
            <option>Senior Java Developer</option>
            <option>Full Stack Engineer</option>
            <option>Data Scientist</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Candidate CV
          </label>
          <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
            <option>Rahul Sharma - Java Developer</option>
            <option>Priya Patel - Full Stack Dev</option>
            <option>Amit Kumar - Data Scientist</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Question Type
          </label>
          <div className="flex flex-wrap gap-2">
            {['Technical', 'Behavioral', 'Situational', 'Problem Solving'].map((type) => (
              <button
                key={type}
                className="px-4 py-2 border border-purple-300 text-purple-700 rounded-lg hover:bg-purple-50 transition-colors"
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all">
          <SparklesIcon className="w-5 h-5" />
          Generate Interview Questions
        </button>
      </div>
    </div>
  </div>
);

// Candidates Content Component
const CandidatesContent = () => (
  <div className="bg-white rounded-xl shadow-lg p-6">
    <h2 className="text-2xl font-bold text-gray-900 mb-4">Candidate Management</h2>
    <p className="text-gray-600">View and manage all candidate applications</p>
  </div>
);

// Interviews Content Component
const InterviewsContent = () => (
  <div className="bg-white rounded-xl shadow-lg p-6">
    <h2 className="text-2xl font-bold text-gray-900 mb-4">Interview Scheduling</h2>
    <p className="text-gray-600">Schedule and track all interviews</p>
  </div>
);

// Analytics Content Component
const AnalyticsContent = () => (
  <div className="bg-white rounded-xl shadow-lg p-6">
    <h2 className="text-2xl font-bold text-gray-900 mb-4">Analytics & Reports</h2>
    <p className="text-gray-600">View recruitment metrics and insights</p>
  </div>
);

export default RecruiterDashboard;
