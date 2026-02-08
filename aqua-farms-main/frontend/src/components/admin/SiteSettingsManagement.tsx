import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const SiteSettingsManagement = () => {
    const [settings, setSettings] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const data = await api.getSiteSettings();
            setSettings(data);
        } catch (error) {
            console.error('Failed to fetch settings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (key: string, value: string) => {
        setSettings((prev: any) => ({ ...prev, [key]: value }));
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await api.updateSiteSettings(settings);
            alert('Settings updated successfully!');
        } catch (error) {
            console.error('Failed to update settings:', error);
            alert('Failed to update settings');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div>Loading settings...</div>;

    return (
        <div className="max-w-4xl">
            <h2 className="text-xl font-semibold mb-6">Site Settings</h2>
            <form onSubmit={handleSave} className="space-y-8 bg-white p-6 rounded-lg shadow">

                {/* General Information */}
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 border-b pb-2">General Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="site_name">Site Name</Label>
                            <Input
                                id="site_name"
                                value={settings.site_name || ''}
                                onChange={(e) => handleChange('site_name', e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Contact Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="contact_email">Support Email</Label>
                            <Input
                                id="contact_email"
                                type="email"
                                value={settings.contact_email || ''}
                                onChange={(e) => handleChange('contact_email', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="contact_phone">Support Phone</Label>
                            <Input
                                id="contact_phone"
                                value={settings.contact_phone || ''}
                                onChange={(e) => handleChange('contact_phone', e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Address */}
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Address</h3>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="address_street">Street Address</Label>
                            <Input
                                id="address_street"
                                value={settings.address_street || ''}
                                onChange={(e) => handleChange('address_street', e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="address_city">City</Label>
                                <Input
                                    id="address_city"
                                    value={settings.address_city || ''}
                                    onChange={(e) => handleChange('address_city', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address_state">State</Label>
                                <Input
                                    id="address_state"
                                    value={settings.address_state || ''}
                                    onChange={(e) => handleChange('address_state', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address_pincode">Pincode</Label>
                                <Input
                                    id="address_pincode"
                                    value={settings.address_pincode || ''}
                                    onChange={(e) => handleChange('address_pincode', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* About Us */}
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 border-b pb-2">About Us Content</h3>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="about_subtitle">Hero Subtitle</Label>
                            <Input
                                id="about_subtitle"
                                value={settings.about_subtitle || ''}
                                onChange={(e) => handleChange('about_subtitle', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="about_mission">Our Mission</Label>
                            <Input
                                id="about_mission"
                                value={settings.about_mission || ''}
                                onChange={(e) => handleChange('about_mission', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="about_vision">Our Vision (Subtitle)</Label>
                            <Input
                                id="about_vision"
                                value={settings.about_vision || ''}
                                onChange={(e) => handleChange('about_vision', e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Team Management */}
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Team Management</h3>
                    <div className="space-y-4">
                        {(function () {
                            let team = [];
                            try {
                                team = settings.about_team ? JSON.parse(settings.about_team) : [];
                            } catch (e) {
                                team = [];
                            }

                            const updateTeam = (newTeam: any[]) => {
                                handleChange('about_team', JSON.stringify(newTeam));
                            };

                            const addMember = () => {
                                updateTeam([...team, { name: '', role: '', image: '' }]);
                            };

                            const removeMember = (index: number) => {
                                const newTeam = [...team];
                                newTeam.splice(index, 1);
                                updateTeam(newTeam);
                            };

                            const updateMember = (index: number, field: string, value: string) => {
                                const newTeam = [...team];
                                newTeam[index] = { ...newTeam[index], [field]: value };
                                updateTeam(newTeam);
                            };

                            return (
                                <div className="space-y-4">
                                    {team.map((member: any, index: number) => (
                                        <div key={index} className="flex gap-4 items-start bg-gray-50 p-4 rounded-lg">
                                            <div className="flex-1 space-y-2">
                                                <Input
                                                    placeholder="Name"
                                                    value={member.name}
                                                    onChange={(e) => updateMember(index, 'name', e.target.value)}
                                                />
                                                <Input
                                                    placeholder="Role"
                                                    value={member.role}
                                                    onChange={(e) => updateMember(index, 'role', e.target.value)}
                                                />
                                                <Input
                                                    placeholder="Image URL"
                                                    value={member.image}
                                                    onChange={(e) => updateMember(index, 'image', e.target.value)}
                                                />
                                            </div>
                                            <Button
                                                type="button"
                                                className="bg-[#0078D4] hover:bg-[#006cbd] text-white"
                                                onClick={() => removeMember(index)}
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    ))}
                                    <Button type="button" onClick={addMember} variant="outline" className="w-full">
                                        + Add Team Member
                                    </Button>
                                </div>
                            );
                        })()}
                    </div>
                </div>

                {/* Social Media */}
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Social Media Links</h3>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="social_facebook">Facebook URL</Label>
                            <Input
                                id="social_facebook"
                                value={settings.social_facebook || ''}
                                onChange={(e) => handleChange('social_facebook', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="social_instagram">Instagram URL</Label>
                            <Input
                                id="social_instagram"
                                value={settings.social_instagram || ''}
                                onChange={(e) => handleChange('social_instagram', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="social_twitter">Twitter/X URL</Label>
                            <Input
                                id="social_twitter"
                                value={settings.social_twitter || ''}
                                onChange={(e) => handleChange('social_twitter', e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <Button type="submit" disabled={saving}>
                        {saving ? 'Saving...' : 'Save Settings'}
                    </Button>
                </div>
            </form>
        </div>
    );
};
