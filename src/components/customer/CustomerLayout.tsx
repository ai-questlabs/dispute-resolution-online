
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { CustomerSidebar } from './CustomerSidebar';
import { Separator } from '@/components/ui/separator';

interface CustomerLayoutProps {
  children: React.ReactNode;
}

export function CustomerLayout({ children }: CustomerLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <CustomerSidebar />
        <SidebarInset className="flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="text-lg font-semibold">Tax Litigation Services</h1>
          </header>
          <main className="flex-1 p-4">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
