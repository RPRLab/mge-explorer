import { ExternalLink, MapPin, GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const speakers = [
  {
    name: "Antônio Pedro Camargo",
    title: "Research Scientist",
    institution: "DOE Joint Genome Institute, Lawrence Berkeley National Laboratory",
    location: "Berkeley, CA, USA",
    initials: "AC",
    color: "bg-primary",
    bio: "Developer of geNomad, a tool for identifying mobile genetic elements in sequencing data. PhD from UNICAMP (Brazil), specialist in computational methods for plasmid and virus detection in metagenomes.",
  },
  {
    name: "Susanna R. Grigson",
    title: "PhD Researcher",
    institution: "Flinders Accelerator for Microbiome Exploration (FAME), Flinders University",
    location: "Adelaide, Australia",
    initials: "SG",
    color: "bg-accent",
    bio: "Researcher in the Edwards Lab specializing in computational viromics, metagenomic binning, and phage genomics. Co-author of publications on solving genomic puzzles in metagenomics.",
  },
  {
    name: "Yunha Hwang",
    title: "Assistant Professor",
    institution: "MIT (Biology, EECS & Schwarzman College of Computing)",
    location: "Cambridge, MA, USA",
    initials: "YH",
    color: "bg-genome-green",
    bio: "Samuel A. Goldblith Career Development Professor at MIT. Co-founder of Tatta Bio. Combines machine learning and experimentation to study biochemistry, ecology and evolution of microbial systems. PhD from Harvard.",
  },
  {
    name: "Pau Piera Líndez",
    title: "PhD Researcher",
    institution: "Section of Microbiology, University of Copenhagen",
    location: "Copenhagen, Denmark",
    initials: "PP",
    color: "bg-bio-blue",
    bio: "Computational biologist working on plasmid reconstruction from metagenomics data using machine learning and graph-based methods. Developer of tools for mobile genetic element detection.",
  },
  {
    name: "Leighton J. Payne",
    title: "Postdoctoral Researcher",
    institution: "Pinilla-Redondo Lab, Section of Microbiology, University of Copenhagen",
    location: "Copenhagen, Denmark",
    initials: "LP",
    color: "bg-science-navy",
    bio: "PhD from University of Otago (New Zealand), specialized in identifying and characterizing bacterial defenses against phages. Passionate about microbial immunity. Enjoys hiking, climbing, and fly fishing.",
  },
  {
    name: "Mario Rodríguez Mestre",
    title: "PhD Researcher",
    institution: "Section of Microbiology, University of Copenhagen (currently at JGI, Berkeley)",
    location: "Copenhagen, Denmark / Berkeley, CA, USA",
    initials: "MM",
    color: "bg-primary",
    bio: "Computational biologist from Andalucía, Spain. Focuses on mobile genetic elements and anti-phage defense systems, especially reverse transcriptase-containing ones. Expert in interactive data visualization. Currently on research stay at Joint Genome Institute.",
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
