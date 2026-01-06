import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const RegistrationTab = () => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    institution: "",
    experienceLevel: "",
    dietaryRequirements: "",
    motivation: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.institution) {
      toast({
        title: "Please fill in all required fields",
        description: "Name, email, and institution are required.",
        variant: "destructive",
      });
      return;
    }

    // Simulate form submission
    console.log("Registration submitted:", formData);
    setIsSubmitted(true);
    toast({
      title: "Registration Submitted!",
      description: "We'll be in touch with confirmation details.",
    });
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="border-primary/20">
          <CardContent className="pt-12 pb-12 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Registration Received!</h2>
            <p className="text-muted-foreground mb-6">
              Thank you for registering for the Mobile Genetic Elements Computational Workshop.
              We'll send confirmation details to <strong>{formData.email}</strong> shortly.
            </p>
            <Button variant="outline" onClick={() => setIsSubmitted(false)}>
              Submit Another Registration
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Workshop Registration</CardTitle>
          <CardDescription>
            Fill out the form below to register for the MGE Computational Workshop.
            Fields marked with * are required.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name fields */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@institution.edu"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </div>

            {/* Institution */}
            <div className="space-y-2">
              <Label htmlFor="institution">Institution / Affiliation *</Label>
              <Input
                id="institution"
                placeholder="University or organization name"
                value={formData.institution}
                onChange={(e) => handleInputChange("institution", e.target.value)}
                required
              />
            </div>

            {/* Experience Level */}
            <div className="space-y-2">
              <Label htmlFor="experienceLevel">Bioinformatics Experience Level</Label>
              <Select
                value={formData.experienceLevel}
                onValueChange={(value) => handleInputChange("experienceLevel", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner — New to bioinformatics</SelectItem>
                  <SelectItem value="intermediate">Intermediate — Some experience with command line tools</SelectItem>
                  <SelectItem value="advanced">Advanced — Comfortable with programming and pipelines</SelectItem>
                  <SelectItem value="expert">Expert — Research-level computational biology experience</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Dietary Requirements */}
            <div className="space-y-2">
              <Label htmlFor="dietaryRequirements">Dietary Requirements (Optional)</Label>
              <Input
                id="dietaryRequirements"
                placeholder="e.g., Vegan, gluten-free, allergies..."
                value={formData.dietaryRequirements}
                onChange={(e) => handleInputChange("dietaryRequirements", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Vegetarian lunch is provided by default. Please specify any additional requirements.
              </p>
            </div>

            {/* Motivation */}
            <div className="space-y-2">
              <Label htmlFor="motivation">Why are you interested in this workshop? (Optional)</Label>
              <Textarea
                id="motivation"
                placeholder="Tell us briefly about your research interests or what you hope to learn..."
                value={formData.motivation}
                onChange={(e) => handleInputChange("motivation", e.target.value)}
                rows={3}
              />
            </div>

            {/* Submit button */}
            <Button type="submit" className="w-full gap-2" size="lg">
              <Send className="w-4 h-4" />
              Submit Registration
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              By registering, you confirm your intention to attend all three days of the workshop.
              Confirmation and further details will be sent via email.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationTab;
