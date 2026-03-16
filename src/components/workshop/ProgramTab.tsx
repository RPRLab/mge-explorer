import { Sun, Wrench, Download, Calendar, Coffee, UtensilsCrossed, Users, Presentation } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface ScheduleEntry {
  time: string;
  title: string;
  type: "coffee" | "talk" | "lunch" | "practical" | "intro" | "presentation";
}

interface DaySchedule {
  day: string;
  date: string;
  title: string;
  entries: ScheduleEntry[];
}

const scheduleData: DaySchedule[] = [
  {
    day: "Day 1",
    date: "Wednesday, March 18",
    title: "Introduction & Assembly",
    entries: [
      { time: "8:30–9:00", title: "☕ Coffee & informal chats", type: "coffee" },
      { time: "9:00–9:30", title: "Introduction: course overview, groups, speaker presentations & resources", type: "intro" },
      { time: "9:30–10:45", title: "Talk 1: Introduction to MGEs", type: "talk" },
      { time: "10:45–11:00", title: "☕ Coffee break", type: "coffee" },
      { time: "11:00–12:15", title: "Talk 2: Assembly of MGEs from metagenomes — Pau Piera", type: "talk" },
      { time: "12:15–1:30", title: "🍽️ Lunch", type: "lunch" },
      { time: "1:30–2:00", title: "Introduction to datasets & computational environment", type: "intro" },
      { time: "2:00–5:00", title: "Work in groups", type: "practical" },
    ],
  },
  {
    day: "Day 2",
    date: "Thursday, March 19",
    title: "Prediction, Annotation & Visualization",
    entries: [
      { time: "8:30–9:00", title: "☕ Coffee & informal chats", type: "coffee" },
      { time: "9:00–9:15", title: "Day intro: recap, additional resources & comments", type: "intro" },
      { time: "9:15–10:30", title: "Talk 1: Prediction of MGEs from assembled genomes — Antonio P. Camargo", type: "talk" },
      { time: "10:30–10:45", title: "☕ Coffee break", type: "coffee" },
      { time: "10:45–12:00", title: "Talk 2: Introduction to annotation of defense systems — Leighton Payne", type: "talk" },
      { time: "12:00–1:00", title: "🍽️ Lunch", type: "lunch" },
      { time: "1:00–2:15", title: "Talk 3: Synteny plots & comparative genomics — Mario R. Mestre", type: "talk" },
      { time: "2:15–5:00", title: "Work in groups", type: "practical" },
    ],
  },
  {
    day: "Day 3",
    date: "Friday, March 20",
    title: "AI Methods, Presentations & Dinner",
    entries: [
      { time: "8:30–9:00", title: "☕ Coffee & informal chats", type: "coffee" },
      { time: "9:00–9:15", title: "Day intro: recap, additional resources & comments", type: "intro" },
      { time: "9:15–10:30", title: "Talk 1: Introduction to AI methods for MGE annotation — Susie Grigson", type: "talk" },
      { time: "10:30–10:45", title: "☕ Coffee break", type: "coffee" },
      { time: "10:45–12:00", title: "Talk 2: Introduction to Gaia and SeqHub — Yunha Hwang", type: "talk" },
      { time: "12:00–1:00", title: "🍽️ Lunch", type: "lunch" },
      { time: "1:00–4:00", title: "Work in groups + Slides preparation", type: "practical" },
      { time: "4:00–5:00", title: "Final group presentations", type: "presentation" },
    ],
  },
];

const entryStyles: Record<ScheduleEntry["type"], string> = {
  coffee: "bg-muted/50 text-muted-foreground",
  talk: "bg-primary/5 border-l-2 border-l-primary",
  lunch: "bg-muted/50 text-muted-foreground",
  practical: "bg-accent/10 border-l-2 border-l-accent",
  intro: "bg-secondary/50",
  presentation: "bg-primary/10 border-l-2 border-l-primary",
};

const ProgramTab = () => {
  const handleDownloadSchedule = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//MGE Workshop//EN
BEGIN:VEVENT
DTSTART:20260318T083000
DTEND:20260318T170000
SUMMARY:MGE Workshop - Day 1: Introduction & Assembly
LOCATION:Universitetsparken 2, Teaching Room 10.4.469, Copenhagen
DESCRIPTION:Talks on Introduction to MGEs and Assembly of MGEs from metagenomes. Afternoon group work.
END:VEVENT
BEGIN:VEVENT
DTSTART:20260319T083000
DTEND:20260319T170000
SUMMARY:MGE Workshop - Day 2: Prediction, Annotation & Visualization
LOCATION:Universitetsparken 2, Teaching Room 10.4.469, Copenhagen
DESCRIPTION:Talks on MGE prediction, defense system annotation, and synteny plots. Afternoon group work.
END:VEVENT
BEGIN:VEVENT
DTSTART:20260320T083000
DTEND:20260320T170000
SUMMARY:MGE Workshop - Day 3: AI Methods, Presentations & Dinner
LOCATION:Universitetsparken 2, Teaching Room 10.4.469, Copenhagen
DESCRIPTION:Talks on AI methods and SeqHub. Afternoon presentations and dinner.
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Workshop Schedule</h2>
          <p className="text-muted-foreground">Three days of lectures, hands-on sessions & group presentations</p>
        </div>
        <Button onClick={handleDownloadSchedule} className="gap-2">
          <Download className="w-4 h-4" />
          Add to Calendar
        </Button>
      </div>

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
              <div className="space-y-2 pt-4">
                {day.entries.map((entry, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-4 px-4 py-3 rounded-lg ${entryStyles[entry.type]}`}
                  >
                    <span className="text-sm font-mono font-medium text-muted-foreground whitespace-nowrap min-w-[100px]">
                      {entry.time}
                    </span>
                    <span className="text-sm text-foreground">{entry.title}</span>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default ProgramTab;
