import { ExternalLink, MapPin, GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const speakers = [
  {
    name: "Antônio P. Camargo",
    title: "Professor",
    institution: "Department of Biochemistry, University of São Paulo",
    location: "São Paulo, Brazil",
    initials: "AC",
    color: "bg-primary",
    bio: "Expert in computational biology and bioinformatics with focus on mobile genetic elements and microbial genomics.",
  },
  {
    name: "Susanna Grigson",
    title: "Postdoctoral Researcher",
    institution: "Joint Genome Institute (JGI)",
    location: "Berkeley, CA, USA",
    initials: "SG",
    color: "bg-accent",
    bio: "Researcher specializing in metagenomics and the computational detection of viral elements in environmental samples.",
  },
  {
    name: "Yunha Hwang",
    title: "Professor",
    institution: "Department of Biology, MIT",
    location: "Cambridge, MA, USA",
    initials: "YH",
    color: "bg-genome-green",
    bio: "Leading researcher in the application of machine learning and language models to genomic sequence analysis.",
  },
  {
    name: "Pau Piera",
    title: "Postdoctoral Researcher",
    institution: "Section of Microbiology, University of Copenhagen",
    location: "Copenhagen, Denmark",
    initials: "PP",
    color: "bg-bio-blue",
    bio: "Specialist in phage biology and the computational analysis of phage-host interactions in complex microbial communities.",
  },
  {
    name: "Leighton J Payne",
    title: "Postdoctoral Researcher",
    institution: "Section of Microbiology, University of Copenhagen",
    location: "Copenhagen, Denmark",
    initials: "LP",
    color: "bg-science-navy",
    bio: "Researcher focused on defense systems in bacteria and the evolutionary dynamics of mobile genetic elements.",
  },
  {
    name: "Mario R Mestre",
    title: "PhD Student",
    institution: "Section of Microbiology, University of Copenhagen",
    location: "Copenhagen, Denmark",
    initials: "MM",
    color: "bg-primary",
    bio: "Researcher in computational approaches for mobile genetic element discovery and annotation. Workshop co-organizer.",
  },
];

const SpeakersTab = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Guest Speakers</h2>
        <p className="text-muted-foreground">
          Learn from leading experts in computational biology and mobile genetic elements research
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {speakers.map((speaker) => (
          <Card key={speaker.name} className="overflow-hidden hover:shadow-lg transition-shadow">
            {/* Header with gradient */}
            <div className={`h-20 ${speaker.color} relative`}>
              <div className="absolute -bottom-10 left-6">
                <Avatar className="w-20 h-20 border-4 border-card shadow-lg">
                  <AvatarFallback className={`${speaker.color} text-white text-xl font-bold`}>
                    {speaker.initials}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
            
            <CardHeader className="pt-14 pb-2">
              <div>
                <h3 className="text-lg font-bold text-foreground">{speaker.name}</h3>
                <p className="text-sm text-primary font-medium">{speaker.title}</p>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <GraduationCap className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{speaker.institution}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>{speaker.location}</span>
              </div>
              
              <p className="text-sm text-muted-foreground pt-2 border-t">
                {speaker.bio}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Note about more speakers */}
      <div className="p-4 rounded-lg bg-muted/50 border text-center">
        <p className="text-sm text-muted-foreground">
          Additional speakers and session chairs may be announced. Check back for updates.
        </p>
      </div>
    </div>
  );
};

export default SpeakersTab;
