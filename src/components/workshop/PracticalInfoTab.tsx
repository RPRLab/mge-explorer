import { useState } from "react";
import { MapPin, Coffee, Utensils, ClipboardCheck, Info, Building, Navigation, X, MessageCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/vnLJhVvviU7UYNUcA";

const PracticalInfoTab = () => {
  const [showDirections, setShowDirections] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Practical Information</h2>
        <p className="text-muted-foreground">Everything you need to know before attending</p>
      </div>

      {/* Directions Modal */}
      {showDirections && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => setShowDirections(false)}>
          <div className="relative max-w-4xl w-full max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-12 right-0 text-white hover:bg-white/20"
              onClick={() => setShowDirections(false)}
            >
              <X className="w-6 h-6" />
            </Button>
            <img
              src={`${import.meta.env.BASE_URL}images/directions.png`}
              alt="Directions to Teaching Room 10.4.469"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      )}

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
                <p className="font-medium text-foreground">Teaching Room 10.4.469</p>
                <p className="text-sm text-muted-foreground">Universitetsparken 2, Building 10</p>
                <p className="text-sm text-muted-foreground">2100 København, Denmark</p>
              </div>
            </div>

            {/* Google Maps embed */}
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block aspect-video rounded-lg overflow-hidden border hover:opacity-90 transition-opacity"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d549.2899676158808!2d12.561178501802237!3d55.70258157420436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46525257021706ab%3A0xe24032b1fefb9869!2sSchool%20of%20Pharmaceutical%20Sciences%2C%20University%20of%20Copenhagen!5e1!3m2!1ses!2ses!4v1773657421422!5m2!1ses!2ses"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Workshop location map"
              />
            </a>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 gap-2" asChild>
                <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer">
                  <MapPin className="w-4 h-4" />
                  Open in Maps
                </a>
              </Button>
              <Button variant="outline" className="flex-1 gap-2" onClick={() => setShowDirections(true)}>
                <Navigation className="w-4 h-4" />
                How to Get There
              </Button>
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
            <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/5">
              <Utensils className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Vegetarian Lunch</p>
                <p className="text-sm text-muted-foreground">Provided each day of the workshop</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/10">
              <Coffee className="w-5 h-5 text-accent mt-0.5" />
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
