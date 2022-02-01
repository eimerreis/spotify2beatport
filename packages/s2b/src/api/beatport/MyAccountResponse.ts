// Generated by https://quicktype.io

export interface MyAccountResponse {
    id:                            number;
    add_by:                        number;
    add_date:                      string;
    bypass_fraud_service:          boolean;
    change_by:                     number;
    change_date:                   string;
    decline_transactions:          boolean;
    dj_profile:                    DjProfile;
    email:                         string;
    email_confirmed:               boolean;
    enabled:                       boolean;
    exclude_purchases_from_charts: boolean;
    failed_login_count:            number;
    first_name:                    string;
    forgot_password_status:        boolean;
    last_login:                    string;
    last_name:                     string;
    name:                          string;
    person_id:                     number;
    phone_number:                  null;
    phone_primary:                 null;
    preferences:                   Preferences;
    register_country_id:           number;
    register_ip_address:           string;
    registration_date:             string;
    source_type:                   SourceType;
    total_orders:                  number;
    username:                      string;
}

export interface DjProfile {
    associated_artist:         null;
    id:                        number;
    bio:                       string;
    enabled:                   boolean;
    is_indexed:                boolean;
    image:                     Image;
    facebook_comments_enabled: boolean;
    name:                      string;
    genres:                    SourceType[];
    person:                    string;
    slug:                      string;
    soundcloud_id:             string;
    soundcloud_mode:           boolean;
}

export interface SourceType {
    id:    number;
    name:  string;
    slug?: string;
    url:   string;
}

export interface Image {
    guid:      string;
    id:        number;
    media_url: string;
    url:       string;
}

export interface Preferences {
    audio_format_id:     number;
    default_cart_name:   string;
    language:            string;
    person:              number;
    filename_convention: string;
}
