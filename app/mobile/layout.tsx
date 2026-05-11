import { MobileBottomNav } from '@/components/navigation/MobileBottomNav';

export default function MobileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row bg-background">
      {/* The Desktop Sidebar & Mobile Bottom Nav Component */}
      <MobileBottomNav />
      
      {/* Main Content Area */}
      {/* On desktop, add left margin for the sidebar. On mobile, add padding bottom for bottom nav. */}
      <main className="flex-1 w-full md:ml-64 pb-16 md:pb-0">
        {children}
      </main>
    </div>
  );
}
