export interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
  stripe_customer_id: string | null;
  plan: 'free' | 'solo' | 'pro' | 'agency';
  created_at: string;
}

export interface Project {
  id: string;
  dev_id: string;
  name: string;
  client_name: string | null;
  client_email: string | null;
  website_url: string | null;
  preview_type: 'website' | 'android' | 'ios';
  apk_url: string | null;
  status: 'active' | 'in_review' | 'completed' | 'archived';
  magic_token: string;
  created_at: string;
}

export interface Annotation {
  id: string;
  project_id: string;
  author_type: 'dev' | 'client';
  author_name: string | null;
  x_percent: number;
  y_percent: number;
  page_url: string | null;
  status: 'open' | 'in_progress' | 'resolved';
  created_at: string;
  comments?: Comment[];
  comment_count?: number;
}

export interface Comment {
  id: string;
  annotation_id: string;
  author_type: 'dev' | 'client';
  author_name: string | null;
  body: string;
  created_at: string;
}

export interface Message {
  id: string;
  project_id: string;
  author_type: 'dev' | 'client';
  author_name: string | null;
  body: string;
  created_at: string;
}

export interface Invoice {
  id: string;
  project_id: string;
  dev_id: string;
  amount_cents: number;
  currency: string;
  description: string | null;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  stripe_payment_link: string | null;
  due_date: string | null;
  paid_at: string | null;
  created_at: string;
}
