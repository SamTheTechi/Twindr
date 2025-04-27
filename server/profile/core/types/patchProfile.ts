interface Bio {
  drink?: boolean;
  smoke?: boolean;
  workout?: string;
  relationType?: string;
  education?: string;
  interests?: string[];
  photos?: string[];
}

export interface PatchProfileRequest extends Bio { }

export interface PatchProfileResponse {
  id: string;
  name: string;
  age: string;
  contact: string;
  gender: string;
  bio: Bio;
}
