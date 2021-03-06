// Generated by https://quicktype.io

export interface SearchTrackResponse {
    results:  TrackResponse[];
    next:     null;
    previous: null;
    count:    number;
    page:     string;
    per_page: number;
}

export interface TrackResponse {
    artists:                    Release[];
    publish_status:             string;
    available_worldwide:        boolean;
    bpm:                        number;
    catalog_number:             string;
    current_status:             CurrentStatus;
    encoded_date:               string;
    exclusive:                  boolean;
    free_downloads:             any[];
    free_download_start_date:   null;
    free_download_end_date:     null;
    genre:                      CurrentStatus;
    id:                         number;
    image:                      Image | null;
    is_available_for_streaming: boolean;
    isrc:                       string;
    key:                        Key;
    label_track_identifier:     string;
    length:                     string;
    length_ms:                  number;
    mix_name:                   string;
    name:                       string;
    new_release_date:           string;
    pre_order:                  boolean;
    pre_order_date:             null | string;
    price:                      Price;
    publish_date:               string;
    release:                    Release;
    remixers:                   Release[];
    sale_type:                  CurrentStatus;
    sample_url:                 string;
    sample_start_ms:            number;
    sample_end_ms:              number;
    slug:                       string;
    sub_genre:                  null;
    url:                        string;
    is_hype:                    boolean;
}

export interface Release {
    id:     number;
    image:  Image;
    name:   string;
    slug:   string;
    url?:   string;
    label?: Release;
}

export interface Image {
    id:          number;
    uri:         string;
    dynamic_uri: string;
}

export interface CurrentStatus {
    id:    number;
    name:  string;
    url:   string;
    slug?: string;
}

export interface Key {
    camelot_number: number;
    camelot_letter: string;
    chord_type:     CurrentStatus;
    id:             number;
    is_sharp:       boolean;
    is_flat:        boolean;
    letter:         string;
    name:           string;
    url:            string;
}

export interface Price {
    code:    string;
    symbol:  string;
    value:   number;
    display: string;
}
