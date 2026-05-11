'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import {
  Moon,
  Bell,
  Lock,
  Users,
  HelpCircle,
  LogOut,
  ChevronRight,
  Globe,
  FileText,
} from 'lucide-react';

interface SettingItem {
  label: string;
  description?: string;
  icon: React.ReactNode;
  action?: () => void;
  toggle?: boolean;
  defaultToggle?: boolean;
  href?: string;
}

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [privateProfile, setPrivateProfile] = useState(false);

  const accountSettings: SettingItem[] = [
    {
      label: 'Edit Profile',
      description: 'Update your personal information',
      icon: <Users className="w-5 h-5" />,
      href: '/mobile/profile/edit',
    },
    {
      label: 'Privacy Settings',
      description: 'Control who can see your profile',
      icon: <Lock className="w-5 h-5" />,
      href: '#',
    },
  ];

  const notificationSettings: SettingItem[] = [
    {
      label: 'Push Notifications',
      description: 'Get notified on your device',
      icon: <Bell className="w-5 h-5" />,
      toggle: true,
      defaultToggle: pushNotifications,
    },
    {
      label: 'Email Notifications',
      description: 'Receive email digests',
      icon: <Globe className="w-5 h-5" />,
      toggle: true,
      defaultToggle: emailNotifications,
    },
  ];

  const displaySettings: SettingItem[] = [
    {
      label: 'Dark Mode',
      description: 'Easy on the eyes',
      icon: <Moon className="w-5 h-5" />,
      toggle: true,
      defaultToggle: darkMode,
    },
  ];

  const supportSettings: SettingItem[] = [
    {
      label: 'Help & Support',
      description: 'Get help with MediConnect',
      icon: <HelpCircle className="w-5 h-5" />,
      href: '#',
    },
    {
      label: 'Terms of Service',
      description: 'Read our terms',
      icon: <FileText className="w-5 h-5" />,
      href: '#',
    },
    {
      label: 'Privacy Policy',
      description: 'Learn how we protect your data',
      icon: <Lock className="w-5 h-5" />,
      href: '#',
    },
  ];

  const renderSettingSection = (title: string, items: SettingItem[]) => (
    <div className="mb-6">
      <h2 className="text-sm font-semibold text-foreground mb-3 px-4">{title}</h2>
      <Card className="border-0 divide-y divide-border overflow-hidden">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-3 flex-1">
              <div className="text-muted-foreground">{item.icon}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                {item.description && (
                  <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                )}
              </div>
            </div>

            {item.toggle ? (
              <Switch
                checked={
                  item.label === 'Dark Mode'
                    ? darkMode
                    : item.label === 'Push Notifications'
                    ? pushNotifications
                    : emailNotifications
                }
                onCheckedChange={(checked) => {
                  if (item.label === 'Dark Mode') setDarkMode(checked);
                  if (item.label === 'Push Notifications') setPushNotifications(checked);
                  if (item.label === 'Email Notifications') setEmailNotifications(checked);
                }}
              />
            ) : (
              <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            )}
          </div>
        ))}
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-card border-b border-border p-4">
        <h1 className="text-xl font-bold text-foreground">Settings</h1>
        <p className="text-xs text-muted-foreground mt-1">Manage your preferences</p>
      </div>

      {/* Settings Content */}
      <div className="px-4 py-4 max-w-2xl mx-auto">
        {renderSettingSection('Account', accountSettings)}
        {renderSettingSection('Notifications', notificationSettings)}
        {renderSettingSection('Display', displaySettings)}
        {renderSettingSection('Support & About', supportSettings)}

        {/* Danger Zone */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-foreground mb-3 px-4">Danger Zone</h2>
          <Card className="border-0 border-error/20 bg-error/5 p-4">
            <Button
              variant="destructive"
              className="w-full"
              onClick={() => console.log('Sign out')}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
            <p className="text-xs text-muted-foreground mt-3">
              You&apos;ll be signed out from all devices.
            </p>
          </Card>
        </div>

        {/* App Info */}
        <div className="text-center py-4 text-xs text-muted-foreground">
          <p>MediConnect v1.0.0</p>
          <p>© 2024 MediConnect. All rights reserved.</p>
        </div>
      </div>

      {/* Bottom Navigation */}
    </div>
  );
}
