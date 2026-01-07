import { ExternalLink, MapPin, GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const speakers = [
  {
    name: "Antônio Pedro Camargo",
    title: "Research Scientist",
    institution: "Institute of Biology, University of Campinas (UNICAMP)",
    location: "Campinas, Brazil",
    initials: "AC",
    color: "bg-primary",
    bio: "Develops computational methods for mobile genetic element detection in metagenomes. Creator of geNomad, a widely-used tool for plasmid and virus identification.",
  },
  {
    name: "Susanna R. Grigson",
    title: "Researcher",
    institution: "DOE Joint Genome Institute, Lawrence Berkeley National Laboratory",
    location: "Berkeley, CA, USA",
    initials: "SG",
    color: "bg-accent",
    bio: "Specializes in computational viromics and metagenomic binning. Develops methods for phage genomics and sequence analysis in complex microbial communities.",
  },
  {
    name: "Yunha Hwang",
    title: "Assistant Professor",
    institution: "MIT (Biology, EECS & Schwarzman College of Computing)",
    location: "Cambridge, MA, USA",
    initials: "YH",
    color: "bg-genome-green",
    bio: "Combines machine learning with experimentation to study microbial systems. Co-founder of Tatta Bio, focused on advancing genomic AI for biological discovery.",
  },
  {
    name: "Pau Piera Líndez",
    title: "PhD Researcher",
    institution: "Section of Microbiology, University of Copenhagen",
    location: "Copenhagen, Denmark",
    initials: "PP",
    color: "bg-bio-blue",
    bio: "Develops machine learning and graph-based methods for plasmid reconstruction from metagenomics data. Builds tools for mobile genetic element detection.",
  },
  {
    name: "Leighton J. Payne",
    title: "Postdoctoral Researcher",
    institution: "Pinilla-Redondo Lab, Section of Microbiology, University of Copenhagen",
    location: "Copenhagen, Denmark",
    initials: "LP",
    color: "bg-science-navy",
    bio: "Researches bacterial defense systems against phages. Specializes in discovering and characterizing novel anti-phage immune mechanisms.",
  },
  {
    name: "Mario Rodríguez Mestre",
    title: "PhD Researcher",
    institution: "Section of Microbiology, University of Copenhagen",
    location: "Copenhagen, Denmark",
    initials: "MM",
    color: "bg-primary",
    bio: "Focuses on mobile genetic elements and anti-phage defense systems, especially reverse transcriptase-containing ones. Develops computational tools for defense system discovery.",
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
      <div className="p-4 rounded-3xl bg-card/95 backdrop-blur-sm border border-border/50 shadow-lg text-center">
        <p className="text-sm text-muted-foreground">
          Additional speakers and session chairs may be announced. Check back for updates.
        </p>
      </div>
    </div>
  );
};

export default SpeakersTab;
