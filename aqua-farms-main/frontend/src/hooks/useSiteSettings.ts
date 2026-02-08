import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

export interface SiteSettings {
    site_name?: string;
    contact_email?: string;
    contact_phone?: string;
    address_street?: string;
    address_city?: string;
    address_state?: string;
    address_pincode?: string;
    social_facebook?: string;
    social_instagram?: string;
    social_twitter?: string;
    [key: string]: string | undefined;
}

export const useSiteSettings = () => {
    const [settings, setSettings] = useState<SiteSettings>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const data = await api.getSiteSettings();
                setSettings(data || {});
            } catch (error) {
                console.error('Failed to fetch site settings:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    return { settings, loading };
};
