export interface TeamMember {
  id: number;
  name: string;
  role: 'physicist' | 'mathematician' | 'engineer' | 'statistician';
  specialties: string[];
  image?: string;
}

export interface Technology {
  name: string;
  category: 'frontend' | 'backend' | 'cloud' | 'ai' | 'data';
}
