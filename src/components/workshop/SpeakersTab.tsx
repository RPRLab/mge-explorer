import { ExternalLink, MapPin, GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const speakers = [
  {
    name: "Antônio Pedro Camargo",
    title: "Assistant Professor",
    institution: "Institute of Biology, University of Campinas (UNICAMP)",
    location: "Campinas, Brazil",
    initials: "AC",
    color: "bg-primary",
    bio: "Maintainer of IMG/VR, JGI's database of viral genomes from metagenomes. Creator of geNomad for plasmid and virus identification.",
  },
  {
    name: "Susanna R. Grigson",
    title: "Postdoctoral Researcher",
    institution: "DOE Joint Genome Institute, Lawrence Berkeley National Laboratory",
    location: "Berkeley, CA, USA",
    initials: "SG",
    color: "bg-accent",
    bio: "Developer of Phynteny, a tool that uses synteny-based deep learning to annotate hypothetical phage genes. Specializes in computational viromics.",
  },
  {
    name: "Yunha Hwang",
    title: "Assistant Professor",
    institution: "MIT (Biology, EECS & Schwarzman College of Computing)",
    location: "Cambridge, MA, USA",
    initials: "YH",
    color: "bg-genome-green",
    bio: "Developer of Gaia for context-aware protein search and gLM2, the first mixed-modality genomic language model. Co-founder of Tatta Bio.",
  },
  {
    name: "Pau Piera Líndez",
    title: "Postdoctoral Researcher",
    institution: "Section of Microbiology, University of Copenhagen",
    location: "Copenhagen, Denmark",
    initials: "PP",
    color: "bg-bio-blue",
    bio: "Developer of PlasMAAG, a tool for plasmid reconstruction from metagenomics data using graph-based methods. Focuses on mobile genetic element detection.",
  },
  {
    name: "Leighton J. Payne",
    title: "Postdoctoral Researcher",
    institution: "Section of Microbiology, University of Copenhagen",
    location: "Copenhagen, Denmark",
    initials: "LP",
    color: "bg-science-navy",
    bio: "Developer of PADLOC, a tool for identification and classification of antiviral defense systems in bacteria and archaea. Discovers novel anti-phage mechanisms.",
  },
  {
    name: "Mario Rodríguez Mestre",
    title: "PhD Student",
    institution: "Section of Microbiology, University of Copenhagen",
    location: "Copenhagen, Denmark",
    initials: "MM",
    color: "bg-primary",
    bio: "Developer of Hoodini, an interactive tool for gene neighborhood visualization and exploration. Focuses on mobile genetic elements and defense systems.",
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
