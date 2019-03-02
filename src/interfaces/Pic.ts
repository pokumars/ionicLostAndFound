import {Tag} from "./tag";

export interface Pic {
  file_id: number;
  filename: string;
  filesize: number;
  title: string;
  description: string;
  user_id: number;
  media_type: string;
  mime_type: string;
  time_added: string;
  screenshot: string;
  thumbnails: {
    w160: string;
    w320: string;
    w640: string;
  }
  tags?: Tag[];
  resolvedStatus?: boolean;
  backgroundColor?: string;
  color?: string;
}

export interface TagsResponse{
  tag_id: number;
  file_id: number;
  tag: string;
  filename: string;
  filesize: string;
  title: string;
  description: string;
  user_id: number;
  media_type: string;
  mime_type: string;
  time_added: string;
}
