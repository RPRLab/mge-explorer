import { MapPin, GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const organizers = [
  {
    name: "Mario R. Mestre",
    title: "Postdoctoral Researcher",
    institution: "Section of Microbiology, University of Copenhagen",
    location: "Copenhagen, Denmark",
    initials: "MM",
    color: "bg-primary",
    bio: "Expert in prokaryotic defense systems, reverse transcriptases, and retrons. Co-author of research on UG/Abi defense systems. Previously at Universidad Autónoma de Madrid.",
  },
  {
    name: "Dana Ronin",
    title: "PhD Researcher",
    institution: "Section of Microbiology, University of Copenhagen",
    location: "Copenhagen, Denmark",
    initials: "DR",
    color: "bg-accent",
    bio: "Specialist in microbial genomics and bioinformatics analysis of mobile genetic elements and bacterial communities.",
  },
  {
    name: "Leighton J. Payne",
    title: "Postdoctoral Researcher",
    institution: "Section of Microbiology, University of Copenhagen",
    location: "Copenhagen, Denmark",
    initials: "LP",
    color: "bg-genome-green",
    bio: "Researches how bacteria adapt to threats posed by mobile genetic elements like bacteriophages and plasmids. Expert in bacterial defense systems and CRISPR-Cas biology.",
  },
];

const OrganizersTab = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Workshop Organizers</h2>
        <p className="text-muted-foreground">
          Meet the team organizing this computational biology workshop
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {organizers.map((organizer) => (
          <Card key={organizer.name} className="overflow-hidden hover:shadow-lg transition-shadow">
            {/* Header with gradient */}
            <div className={`h-20 ${organizer.color} relative`}>
              <div className="absolute -bottom-10 left-6">
                <Avatar className="w-20 h-20 border-4 border-card shadow-lg">
                  <AvatarFallback className={`${organizer.color} text-white text-xl font-bold`}>
                    {organizer.initials}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
            
            <CardHeader className="pt-14 pb-2">
              <div>
                <h3 className="text-lg font-bold text-foreground">{organizer.name}</h3>
                <p className="text-sm text-primary font-medium">{organizer.title}</p>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <GraduationCap className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{organizer.institution}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>{organizer.location}</span>
              </div>
              
              <p className="text-sm text-muted-foreground pt-2 border-t">
                {organizer.bio}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Funding acknowledgment */}
      <div className="p-6 rounded-3xl bg-card/95 backdrop-blur-sm border border-primary/20 shadow-lg text-center">
        <p className="text-muted-foreground">
          This workshop is organized thanks to funds provided by the{" "}
          <strong className="text-foreground">Microbiology Cluster</strong> of the{" "}
          <strong className="text-foreground">Department of Biology</strong>,{" "}
          University of Copenhagen.
        </p>
      </div>
    </div>
  );
};

export default OrganizersTab;