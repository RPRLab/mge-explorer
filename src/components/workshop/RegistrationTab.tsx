import { XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const RegistrationTab = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-destructive/20">
        <CardContent className="pt-12 pb-12 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-destructive/10 flex items-center justify-center">
            <XCircle className="w-8 h-8 text-destructive" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Registration Closed</h2>
          <p className="text-muted-foreground mb-4">
            Registration for the Mobile Genetic Elements Computational Workshop 2026 is now closed.
          </p>
          <p className="text-sm text-muted-foreground">
            If you have any questions, please contact the organizers directly.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationTab;
