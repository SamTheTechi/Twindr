interface Bio {
  drink?: boolean;
  smoke?: boolean;
  workout?: string;
  relationType?: string;
  education?: string;
  interests?: string[];
  photos?: string[];
}

export interface SetProfileRequest {
  name: string;
  age: string;
  contact: string;
  gender: string;
  bio: Bio;
}

export interface SetProfileResponse {
  id: string;
  name: string;
  age: string;
  contact: string;
  gender: string;
  bio: Bio;
}
