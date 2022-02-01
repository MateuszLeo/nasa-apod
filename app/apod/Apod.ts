import type { ResourceState } from '../resource';

export interface Apod {
    date: string;
    explanation: string;
    hdurl: string;
    media_type: 'video' | 'image' | 'other';
    service_version: string;
    title: string;
    url: string;
}

export type ApodState =
    | { data: Apod; state: Extract<ResourceState, 'idle'> }
    | { data: null; state: Extract<ResourceState, 'loading'> }
    | { message: string; state: Extract<ResourceState, 'error'> };
