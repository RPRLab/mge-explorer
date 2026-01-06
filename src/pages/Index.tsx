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
      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="flex flex-wrap h-auto gap-3 bg-card/50 backdrop-blur-sm p-3 rounded-full border border-border/50 shadow-lg justify-center">
            <TabsTrigger 
              value="overview" 
              className="flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/25"
            >
              <BookOpen className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="program"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/25"
            >
              <Calendar className="w-4 h-4" />
              Program
            </TabsTrigger>
            <TabsTrigger 
              value="speakers"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/25"
            >
              <Users className="w-4 h-4" />
              Speakers
            </TabsTrigger>
            <TabsTrigger 
              value="organizers"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/25"
            >
              <UserCog className="w-4 h-4" />
              Organizers
            </TabsTrigger>
            <TabsTrigger 
              value="practical"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/25"
            >
              <Info className="w-4 h-4" />
              Practical Info
            </TabsTrigger>
            <TabsTrigger 
              value="registration"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/25"
            >
              <ClipboardList className="w-4 h-4" />
              Registration
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <OverviewTab />
          </TabsContent>

          <TabsContent value="program">
            <ProgramTab />
          </TabsContent>

          <TabsContent value="speakers">
            <SpeakersTab />
          </TabsContent>

          <TabsContent value="organizers">
            <OrganizersTab />
          </TabsContent>

          <TabsContent value="practical">
            <PracticalInfoTab />
          </TabsContent>

          <TabsContent value="registration">
            <RegistrationTab />
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
