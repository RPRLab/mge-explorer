import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Calendar, Users, Info, ClipboardList, UserCog } from "lucide-react";
import HeroSection from "@/components/workshop/HeroSection";
import OverviewTab from "@/components/workshop/OverviewTab";
import ProgramTab from "@/components/workshop/ProgramTab";
import SpeakersTab from "@/components/workshop/SpeakersTab";
import PracticalInfoTab from "@/components/workshop/PracticalInfoTab";
import RegistrationTab from "@/components/workshop/RegistrationTab";
import MatrixBackground from "@/components/workshop/MatrixBackground";
import OrganizersTab from "@/components/workshop/OrganizersSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Full-page Matrix background with 4 sections */}
      <MatrixBackground />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Main Content with Tabs */}
      <main className="container mx-auto px-4 -mt-12 pb-6 relative z-10">
        <Tabs defaultValue="overview" className="space-y-8">
          <div className="flex justify-center">
            <TabsList className="inline-flex flex-wrap h-auto gap-2 bg-card/80 backdrop-blur-sm p-2 rounded-full border border-border/50 shadow-lg">
            <TabsTrigger 
              value="overview" 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/25"
            >
              <BookOpen className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="program"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/25"
            >
              <Calendar className="w-4 h-4" />
              Program
            </TabsTrigger>
            <TabsTrigger 
              value="speakers"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/25"
            >
              <Users className="w-4 h-4" />
              Speakers
            </TabsTrigger>
            <TabsTrigger 
              value="organizers"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/25"
            >
              <UserCog className="w-4 h-4" />
              Organizers
            </TabsTrigger>
            <TabsTrigger 
              value="practical"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/25"
            >
              <Info className="w-4 h-4" />
              Practical Info
            </TabsTrigger>
            <TabsTrigger 
              value="registration"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/25"
            >
              <ClipboardList className="w-4 h-4" />
              Registration
            </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="flex justify-center">
            <div className="p-6 rounded-3xl bg-card/95 backdrop-blur-sm border border-border/50 shadow-lg w-full max-w-5xl">
              <OverviewTab />
            </div>
          </TabsContent>

          <TabsContent value="program" className="flex justify-center">
            <div className="p-6 rounded-3xl bg-card/95 backdrop-blur-sm border border-border/50 shadow-lg w-full max-w-5xl">
              <ProgramTab />
            </div>
          </TabsContent>

          <TabsContent value="speakers" className="flex justify-center">
            <div className="p-6 rounded-3xl bg-card/95 backdrop-blur-sm border border-border/50 shadow-lg w-full max-w-5xl">
              <SpeakersTab />
            </div>
          </TabsContent>

          <TabsContent value="organizers" className="flex justify-center">
            <div className="p-6 rounded-3xl bg-card/95 backdrop-blur-sm border border-border/50 shadow-lg w-full max-w-5xl">
              <OrganizersTab />
            </div>
          </TabsContent>

          <TabsContent value="practical" className="flex justify-center">
            <div className="p-6 rounded-3xl bg-card/95 backdrop-blur-sm border border-border/50 shadow-lg w-full max-w-5xl">
              <PracticalInfoTab />
            </div>
          </TabsContent>

          <TabsContent value="registration" className="flex justify-center">
            <div className="p-6 rounded-3xl bg-card/95 backdrop-blur-sm border border-border/50 shadow-lg w-full max-w-xl">
              <RegistrationTab />
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card/90 backdrop-blur-sm py-10">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground space-y-2">
          <p className="font-semibold text-foreground">
            Mobile Genetic Elements Computational Workshop 2026
          </p>
          <p className="text-xs text-muted-foreground/70">
            Funded by the Microbiology Cluster, Department of Biology, University of Copenhagen
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
