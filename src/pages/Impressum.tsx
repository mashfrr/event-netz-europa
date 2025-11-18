import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Impressum = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-8 sm:px-6 md:px-8 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)} 
          className="mb-6 hover:bg-muted"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Zurück
        </Button>

        {/* Content */}
        <div className="prose prose-gray max-w-none">
          <h1 className="text-3xl font-bold text-foreground mb-8">Impressum</h1>
          
          <div className="space-y-8 text-foreground">
            <section>
              <h2 className="text-xl font-semibold mb-4">Angaben gemäß § 5 TMG:</h2>
              <div className="space-y-1">
                <p>Verein für die vernetzte Gesellschaft e. V.</p>
                <p>Anne-Frank-Platz 4</p>
                <p>26123 Oldenburg</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Kontakt</h2>
              <div className="space-y-1">
                <p>E-Mail: <a href="mailto:info@netges.org" className="text-primary hover:underline">info@netges.org</a></p>
                <p>Telefon: <a href="tel:+4944118154920" className="text-primary hover:underline">+49 441 1815 4920</a></p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Vereinsregister</h2>
              <p>eingetragen beim Amtsgericht Oldenburg unter der Nummer 202600</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Vertretung</h2>
              <div className="space-y-4">
                <p>
                  Der Verein wird durch den geschäftsführenden Vorstand vertreten. 
                  Alle Mitglieder des geschäftsführenden Vorstands sind gleichberechtigt 
                  alleinvertretungsberechtigt. Bei Rechtsgeschäften, deren Geschäftswert 
                  10.000,00 € übersteigt, ist die gemeinschaftliche Vertretung durch zwei 
                  Vorstandsmitglieder erforderlich.
                </p>
                <div className="space-y-1">
                  <p>Karl Grotheer</p>
                  <p>Marvin de Buhr</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Verantwortlich für journalistisch-redaktionelle Inhalte bzw. inhaltlich verantwortlich:</h2>
              <div className="space-y-1">
                <p>Karl Grotheer</p>
                <p>Billungerweg 22</p>
                <p>26131 Oldenburg</p>
                <br />
                <p>E-Mail: <a href="mailto:karl.grotheer@netges.org" className="text-primary hover:underline">karl.grotheer@netges.org</a></p>
                <p>Mobil: <a href="tel:+4915170895458" className="text-primary hover:underline">+49 1517 0895458</a></p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Impressum;