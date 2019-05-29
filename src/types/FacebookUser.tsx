export interface FacebookUserImage {
  data: { url: string };
}

export interface FacebookUser {
  id: number;
  name: string;
  picture: FacebookUserImage;
  accessToken?: string;
}
