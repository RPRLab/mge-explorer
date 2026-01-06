import { Sun, Wrench, Download, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const scheduleData = [
  {
    day: "Day 1",
    date: "Wednesday, March 18",
    title: "Detecting MGEs in Raw Reads",
    morning: {
      title: "Lectures",
      topics: [
        "Overview of mobile genetic elements: plasmids, phages, integrative elements, and transposons",
        "Sequencing technologies and raw-read data characteristics",
        "Computational strategies for detecting MGEs from raw reads",
        "k-mer–based approaches",
        "Read classification and mapping strategies",
        "Strengths and limitations of read-level detection",
      ],
    },
    afternoon: {
      title: "Practical Sessions",
      topics: [
        "Introduction to datasets and computational environment",
        "Hands-on detection of MGEs from raw sequencing reads",
        "Evaluation of detection performance and discussion of biases",
      ],
    },
  },
  {
    day: "Day 2",
    date: "Thursday, March 19",
    title: "Detecting MGEs in Assembled Genomes and Contigs",
    morning: {
      title: "Lectures",
      topics: [
        "Genome and metagenome assembly concepts relevant to MGEs",
        "Identification of MGEs in contigs and complete genomes",
        "Comparative genomics of MGEs",
        "Annotation of MGE-associated genes and functional modules",
      ],
    },
    afternoon: {
      title: "Practical Sessions",
      topics: [
        "Running MGE detection and annotation pipelines on assembled data",
        "Exploring genomic context, synteny, and modular organization",
        "Comparative analysis across samples or environments",
      ],
    },
  },
  {
    day: "Day 3",
    date: "Friday, March 20",
    title: "Language Models and AI-Based Methods",
    morning: {
      title: "Lectures",
      topics: [
        "Introduction to protein and genomic language models (pLMs and gLMs)",
        "Applications of language models to gene and MGE annotation",
        "Case studies: AI-driven discovery and classification of MGEs",
        "Opportunities and challenges of AI-based approaches",
      ],
    },
    afternoon: {
      title: "Practical Sessions",
      topics: [
        "Hands-on exploration of embedding-based analyses",
        "Using language-model-derived features for annotation and clustering",
        "Finalization of group analyses and preparation of presentations",
      ],
    },
  },
];

const ProgramTab = () => {
  const handleDownloadSchedule = () => {
    // Generate ICS calendar file
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//MGE Workshop//EN
BEGIN:VEVENT
DTSTART:20260318T080000
DTEND:20260318T170000
SUMMARY:MGE Workshop - Day 1: Detecting MGEs in Raw Reads
LOCATION:Uni-parken 2, Und.lokale 14, Bygn. 10.4.469, Copenhagen
DESCRIPTION:Morning: Lectures on MGE overview and detection strategies. Afternoon: Hands-on practical sessions.
END:VEVENT
BEGIN:VEVENT
DTSTART:20260319T080000
DTEND:20260319T170000
SUMMARY:MGE Workshop - Day 2: Detecting MGEs in Assembled Genomes
LOCATION:Uni-parken 2, Und.lokale 14, Bygn. 10.4.469, Copenhagen
DESCRIPTION:Morning: Lectures on genome assembly and MGE identification. Afternoon: Hands-on practical sessions.
END:VEVENT
BEGIN:VEVENT
DTSTART:20260320T080000
DTEND:20260320T170000
SUMMARY:MGE Workshop - Day 3: Language Models and AI Methods
LOCATION:Uni-parken 2, Und.lokale 14, Bygn. 10.4.469, Copenhagen
DESCRIPTION:Morning: Lectures on pLMs and gLMs. Afternoon: Group presentations.
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'mge-workshop-2026.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header with download button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Workshop Schedule</h2>
          <p className="text-muted-foreground">Three days of lectures and hands-on practical sessions</p>
        </div>
        <Button onClick={handleDownloadSchedule} className="gap-2">
          <Download className="w-4 h-4" />
          Add to Calendar
        </Button>
      </div>

      {/* Schedule accordion */}
      <Accordion type="multiple" defaultValue={["day-1", "day-2", "day-3"]} className="space-y-4">
        {scheduleData.map((day, index) => (
          <AccordionItem 
            key={day.day} 
            value={`day-${index + 1}`}
            className="border rounded-lg overflow-hidden bg-card"
          >
            <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50">
              <div className="flex items-center gap-4 text-left">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg text-foreground">{day.day}</span>
                    <span className="text-sm text-muted-foreground">— {day.date}</span>
                  </div>
                  <p className="text-primary font-medium">{day.title}</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="grid md:grid-cols-2 gap-6 pt-4">
                {/* Morning */}
                <Card className="border-l-4 border-l-primary">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Sun className="w-4 h-4 text-primary" />
                      Morning — {day.morning.title}
                    </CardTitle>
                    <CardDescription>8:00 AM – 12:00 PM</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {day.morning.topics.map((topic, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Afternoon */}
                <Card className="border-l-4 border-l-accent">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Wrench className="w-4 h-4 text-accent" />
                      Afternoon — {day.afternoon.title}
                    </CardTitle>
                    <CardDescription>1:00 PM – 5:00 PM</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {day.afternoon.topics.map((topic, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default ProgramTab;
