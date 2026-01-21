export interface songInfoDatas {
  lyric: string[] | undefined;
  album: string | undefined;
  title: string | undefined;
  singers: string[];
}

export interface artistInfo {
  name: string;
  profile: string;
  albums: {
    name: string;
    img: string;
  }[];
}

export interface aiRecommendation {
  status: number;
  contents: string;
}
