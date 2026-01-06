import { Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const organizers = [
  {
    name: "Mario R Mestre",
    title: "PhD Student",
    institution: "Section of Microbiology, University of Copenhagen",
    initials: "MM",
  },
  {
    name: "Dana Ronin",
    title: "PhD",
    institution: "Section of Microbiology, University of Copenhagen",
    initials: "DR",
  },
  {
    name: "Leighton J Payne",
    title: "Postdoctoral Researcher",
    institution: "Section of Microbiology, University of Copenhagen",
    initials: "LP",
  },
];

const OrganizersSection = () => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          Workshop Organizers
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid sm:grid-cols-3 gap-6">
          {organizers.map((organizer) => (
            <div key={organizer.name} className="flex items-center gap-4">
              <Avatar className="w-12 h-12 border-2 border-primary/20">
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {organizer.initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-foreground">{organizer.name}</p>
                <p className="text-sm text-muted-foreground">{organizer.title}</p>
                <p className="text-xs text-muted-foreground">{organizer.institution}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 rounded-2xl bg-muted/50 border border-border/50">
          <p className="text-sm text-muted-foreground text-center">
            This workshop is organized thanks to funds provided by the{" "}
            <strong className="text-foreground">Microbiology Cluster</strong> of the{" "}
            <strong className="text-foreground">Department of Biology</strong>,{" "}
            University of Copenhagen.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrganizersSection;