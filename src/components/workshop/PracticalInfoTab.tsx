import { MapPin, Coffee, Utensils, ClipboardCheck, Info, Building } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PracticalInfoTab = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Practical Information</h2>
        <p className="text-muted-foreground">Everything you need to know before attending</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Location */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Location
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <Building className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Uni-parken 2</p>
                <p className="text-sm text-muted-foreground">Und.lokale 14, Bygn. 10.4.469</p>
                <p className="text-sm text-muted-foreground">Copenhagen, Denmark</p>
              </div>
            </div>
            
            {/* Map placeholder */}
            <div className="aspect-video rounded-lg bg-muted flex items-center justify-center border">
              <div className="text-center text-muted-foreground">
                <MapPin className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">University of Copenhagen Campus</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Catering */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Utensils className="w-5 h-5 text-primary" />
              Catering
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-genome-green-light">
              <Utensils className="w-5 h-5 text-genome-green mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Vegetarian Lunch</p>
                <p className="text-sm text-muted-foreground">Provided each day of the workshop</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 rounded-lg bg-bio-blue-light">
              <Coffee className="w-5 h-5 text-bio-blue mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Coffee & Tea</p>
                <p className="text-sm text-muted-foreground">Available throughout the workshop</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              Please indicate any dietary restrictions or allergies in your registration form.
            </p>
          </CardContent>
        </Card>

        {/* Assessment */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardCheck className="w-5 h-5 text-primary" />
              Assessment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-muted-foreground">
              There is no formal exam. Evaluation is based on:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span className="text-foreground">Active participation in lectures and practical sessions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span className="text-foreground">A short group presentation on the final day</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* What to Bring */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="w-5 h-5 text-primary" />
              What to Bring
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                <span className="text-foreground">Laptop with terminal/SSH access for practical sessions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                <span className="text-foreground">Notebook for taking notes during lectures</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                <span className="text-foreground">Power adapter (EU plug type C/F)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                <span className="text-foreground">Curiosity and enthusiasm!</span>
              </li>
            </ul>
            <p className="text-sm text-muted-foreground pt-2 border-t">
              Detailed setup instructions will be sent to registered participants one week before the workshop.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PracticalInfoTab;
