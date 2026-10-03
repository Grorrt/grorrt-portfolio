export interface ProjectKeyDetails {
  tools_count?: string;
  pipeline?: string;
  export?: string;
  architecture?: string;
  flow?: string;
  test_output?: string;
  design?: string;
  setup?: string;
  use_case?: string;
  capabilities?: string;
  test_suite?: string;
  api_flow?: string;
  live_demo?: string;
  last_commit?: string;
}

export interface ProjectItem {
  id: number;
  name: string;
  display_name?: string;
  full_name: string;
  description: string | null;
  custom_description: string;
  language: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  created_at?: string;
  topics?: string[];
  key_details: ProjectKeyDetails;
  featured?: boolean;
  image_alias?: string;
  is_live_api?: boolean;
}

export interface GitHubRepoApiResponse {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  language: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  created_at: string;
  topics?: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  metaDescription: string;
  projectRef?: string;
  content: Array<{
    type: 'paragraph' | 'heading' | 'list' | 'code';
    level?: number;
    text?: string;
    items?: string[];
    language?: string;
    code?: string;
  }>;
}

export interface ContactFormState {
  name: string;
  email: string;
  company: string;
  projectInterest: 'Home' | 'Malware Analysis Toolkit' | 'Atlas Core' | 'LeadForge MCP' | 'VerityQA' | 'Other';
  message: string;
}

export interface SentNotificationRecord {
  id: string;
  timestamp: string;
  recipient: string;
  subject: string;
  body: string;
  senderName: string;
  senderEmail: string;
  company: string;
  projectInterest: string;
  deliveryStatus: 'delivered' | 'simulated';
}
