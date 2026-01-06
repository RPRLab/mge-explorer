import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Calendar, Users, Info, ClipboardList } from "lucide-react";
import HeroSection from "@/components/workshop/HeroSection";
import OverviewTab from "@/components/workshop/OverviewTab";
import ProgramTab from "@/components/workshop/ProgramTab";
import SpeakersTab from "@/components/workshop/SpeakersTab";
import PracticalInfoTab from "@/components/workshop/PracticalInfoTab";
import RegistrationTab from "@/components/workshop/RegistrationTab";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection />

      {/* Main Content with Tabs */}
      <main className="container mx-auto px-4 py-12">
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="flex flex-wrap h-auto gap-2 bg-transparent justify-center">
            <TabsTrigger 
              value="overview" 
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <BookOpen className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="program"
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Calendar className="w-4 h-4" />
              Program
            </TabsTrigger>
            <TabsTrigger 
              value="speakers"
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Users className="w-4 h-4" />
              Speakers
            </TabsTrigger>
            <TabsTrigger 
              value="practical"
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Info className="w-4 h-4" />
              Practical Info
            </TabsTrigger>
            <TabsTrigger 
              value="registration"
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
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

          <TabsContent value="practical">
            <PracticalInfoTab />
          </TabsContent>

          <TabsContent value="registration">
            <RegistrationTab />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p className="mb-2">
            Mobile Genetic Elements Computational Workshop 2026
          </p>
          <p>
            Organized by the Section of Microbiology, University of Copenhagen
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
