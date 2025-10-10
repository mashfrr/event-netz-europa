import React from 'react';

const Dialog = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Interaktive Workshops & Infostände Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Interaktive Workshops & Infostände für Jugendliche und Fachkräfte
          </h2>
          <div className="prose text-gray-700 leading-relaxed space-y-4">
            <p>
              Ob Jugendkongress, Schulworkshop oder Festival: Wir kommen zu euch und sprechen über europäische Themen, die junge Menschen bewegen.
            </p>
            <p>
              Unser Team besteht aus jungen Referierenden, die selbst an zahlreichen europäischen Bildungs- und Beteiligungsevents teilgenommen haben und ihr Wissen nun weitergeben möchten.
            </p>
          </div>
        </section>

        {/* Was uns auszeichnet Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Was uns auszeichnet
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-lg" style={{ backgroundColor: 'rgba(245, 207, 71, 0.24)' }}>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Praxisorientiert
              </h3>
              <p className="text-gray-700">
                Unser Fokus liegt auf direkt anwendbarem Wissen und konkreten Beteiligungsmöglichkeiten
              </p>
            </div>
            
            <div className="p-6 rounded-lg" style={{ backgroundColor: 'rgba(245, 207, 71, 0.24)' }}>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Peer-Learning
              </h3>
              <p className="text-gray-700">
                Wir fördern den Erfahrungsaustausch zwischen den Teilnehmenden
              </p>
            </div>
            
            <div className="p-6 rounded-lg" style={{ backgroundColor: 'rgba(245, 207, 71, 0.24)' }}>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Niedrigschwelliger Zugang
              </h3>
              <p className="text-gray-700">
                Unsere Workshops und Infostände sind so konzipiert, dass sie unabhängig von Vorkenntnissen zugänglich sind
              </p>
            </div>
            
            <div className="p-6 rounded-lg" style={{ backgroundColor: 'rgba(245, 207, 71, 0.24)' }}>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Nachhaltige Vernetzung
              </h3>
              <p className="text-gray-700">
                Über unsere Community können die Teilnehmenden vernetzen und gemeinsam weitere Events besuchen
              </p>
            </div>
          </div>
        </section>

        {/* Workshopangebot Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Workshopangebot
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-lg" style={{ backgroundColor: 'rgba(245, 207, 71, 0.24)' }}>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Inklusive Beteiligung
              </h3>
              <p className="text-gray-700">
                Wie können wir einfach zugängliche Bildungs- und Vernetzungsmöglichkeiten im In- und Ausland schaffen?
              </p>
            </div>
            
            <div className="p-6 rounded-lg" style={{ backgroundColor: 'rgba(245, 207, 71, 0.24)' }}>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Lobbyarbeit & Forderungen
              </h3>
              <p className="text-gray-700">
                Was muss sich zum Beispiel ändern, damit öffentliche Verkehrsmittel noch attraktiver werden? Wie können wir Entscheidungsträger*innen aus Politik und Wirtschaft beeinflussen, um Veränderungen vor Ort anzustoßen?
              </p>
            </div>
            
            <div className="p-6 rounded-lg" style={{ backgroundColor: 'rgba(245, 207, 71, 0.24)' }}>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Projektfinanzierung & Kooperation
              </h3>
              <p className="text-gray-700 mb-3">
                Ihr wollt ein Projekt umsetzen, aber ihr wisst nicht, wer euch unterstützen könnte und wie ihr eure Idee finanzieren könnt?
              </p>
              <ul className="text-gray-700 space-y-2">
                <li>• Zusammen steigen wir in die Grundlagen der Fördermittel-Welt ein und klären rechtliche Fallstricke.</li>
                <li>• Anschließend sammeln wir passende Finanzierungsquellen und schauen uns an, welcher Kooperationspartner für eure Idee in Frage kommen.</li>
              </ul>
            </div>
            
            <div className="p-6 rounded-lg" style={{ backgroundColor: 'rgba(245, 207, 71, 0.24)' }}>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Verbraucherschutz auf Reisen
              </h3>
              <p className="text-gray-700 mb-3">
                Wir zeigen dir, wie du bei Problemen auf Reisen entspannt bleiben und kompetent reagieren kannst.
              </p>
              <p className="text-gray-700 mb-3">
                Zum Thema EU-Fahrgastrechte sind leider viele Mythen und Falschinformationen im Umlauf. Wir klären anhand von alltagsnahen Beispielen auf, unter welchen Voraussetzungen du zusätzliche Ausgaben erstattet bekommst und was du dabei beachten musst. Was viele nicht wissen: Die wichtigsten Fahrgastrechte greifen auch bei vergünstigten Tickets wie dem Deutschlandticket und nicht nur bei Fernreisen.
              </p>
              <p className="text-gray-700">
                Außerdem geben wir dir benutzerfreundliche Tools an die Hand, mit denen du zum Bahn-Profi wirst und manchmal schneller Bescheid weißt als das Zugpersonal.
              </p>
            </div>
          </div>
        </section>

        {/* An wen richtet sich das Angebot Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            An wen richtet sich das Angebot?
          </h2>
          <div className="prose text-gray-700 leading-relaxed">
            <p>
              Junge Menschen, die bisher noch keine Berührungspunkte mit Engagement und Beteiligung hatten, Ehrenamtliche aus Jugendorganisationen oder Fachkräfte der Jugendarbeit: Wir haben verschiedene Methoden zur Auswahl und können uns somit der jeweiligen Zielgruppe anpassen; Weiterführende Schulen, ab 14 Jahren
            </p>
          </div>
        </section>

        {/* Kontakt und Anfragen Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Kontakt und Anfragen
          </h2>
          <div className="prose text-gray-700 leading-relaxed space-y-4">
            <p>
              Sie haben Interesse an einem unserer Workshops oder möchten ein maßgeschneidertes Angebot erhalten? Kontaktieren Sie uns unter:
            </p>
            <div className="space-y-2">
              <p>
                <strong>E-Mail:</strong> workshops@eventnetz-europa.eu
              </p>
              <p>
                <strong>Telefon:</strong> 0151 70895458
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dialog;
