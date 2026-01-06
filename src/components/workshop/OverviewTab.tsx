import { CheckCircle2, BookOpen, Users, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const learningObjectives = [
  "Understand the biological diversity and evolutionary significance of mobile genetic elements (MGEs)",
  "Detect MGEs directly from raw sequencing reads and from assembled contigs and genomes",
  "Annotate MGEs using sequence-, domain-, and context-based computational approaches",
  "Apply protein and genomic language models to MGE annotation and discovery",
  "Critically evaluate strengths and limitations of different computational strategies",
  "Work collaboratively on a focused computational analysis project and present results",
];

const OverviewTab = () => {
  return (
    <div className="space-y-8">
      {/* Course Description */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Course Description
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">
            This three-day intensive workshop focuses on computational methods for the detection, 
            analysis, and annotation of mobile genetic elements (MGEs) across different stages of 
            genomic data processing. The course progresses from raw sequencing reads to assembled 
            genomes and, finally, to modern language-model-based approaches for functional annotation 
            and discovery. Each day combines conceptual lectures in the morning with hands-on practical 
            sessions in the afternoon, allowing participants to apply methods to real datasets.
          </p>
        </CardContent>
      </Card>

      {/* Learning Objectives */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Learning Objectives
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">By the end of the course, participants will be able to:</p>
          <ul className="space-y-3">
            {learningObjectives.map((objective, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-foreground">{objective}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Prerequisites & Target Audience */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Prerequisites
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                No prior experience in mobile genetic elements or advanced bioinformatics required
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                Basic familiarity with biology is assumed
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                Basic bioinformatic skills are desired
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Course Format
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                <strong className="text-foreground">Morning:</strong> Lectures by invited speakers
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                <strong className="text-foreground">Afternoon:</strong> Hands-on practical work in small groups
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                <strong className="text-foreground">Final Day:</strong> Group presentations synthesizing analyses
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Note for advanced participants */}
      <div className="p-4 rounded-3xl bg-card/95 backdrop-blur-sm border border-accent/20 shadow-lg">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">Note for advanced participants:</strong> Those with more advanced 
          computational backgrounds will have opportunities to explore more complex analyses during group work.
        </p>
      </div>
    </div>
  );
};

export default OverviewTab;
