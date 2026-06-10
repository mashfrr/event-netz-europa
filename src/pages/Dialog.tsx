import React, { useEffect } from 'react';
import AnimatedSection from '@/components/AnimatedSection';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const defaultDocumentTitle =
  'Event Netz Europa – Finde dein nächstes Event, das dich weiterbringt.';

const goals = [
  { emoji: '🤝', text: 'Demokratieverständnis und Diskursfähigkeit stärken' },
  { emoji: '🏡', text: 'Möglichkeiten für lokales Engagement (z. B. in Vereinen oder der Schule) aufzeigen' },
  { emoji: '📢', text: 'Wirksamkeit und Legitimität von Engagement begreifen' },
  {
    emoji: '👥',
    text: 'Anregen, sich alleine oder als Gruppe für nationale oder internationale Bildungs- und Beteiligungsveranstaltungen anzumelden',
  },
];

const references = [
  'Deutscher Bundesjugendring (EU-Jugenddialog)',
  'Young European Professionals',
  'Bundeszentrale für politische Bildung (bpb)',
  'Landesnetzwerk Bürgerschaftliches Engagement Bayern',
  'Bayerische Landeszentrale für politische Bildung',
  'Amt für regionale Landesentwicklung Weser-Ems',
  'Stiftung Bildung',
  'Bundesschülerkonferenz',
  'SV-Bildungswerk',
  'Pädagogisches Institut München',
  'Münchner Haus der Schüler*innen',
  'Münchner Schüler*innenbüro',
  'Zentrum für soziale Innovation (umgedacht e. V.)',
  'Zentrum für Umwelt und Kultur Benediktbeuern',
  'Verbraucherzentrale Bundesverband',
  'START-Stiftung gGmbH',
  'Stadt Dortmund',
];

const faqItems = [
  {
    question: 'Wie finanziert sich das Projekt?',
    answer: (
      <>
        <p className="mb-3">
          Um die Zugänglichkeit unabhängig vom Budget zu gewährleisten, versuchen wir nach einer Interessenbekundung
          seitens der Schule/des Trägers, lokale Fördermöglichkeiten zu akquirieren, die die Kosten für das Projekt
          abdecken. Somit fällt in der Regel kein Eigenanteil an. Je nach Förderer kann es hilfreich sein, wenn Schulen
          über einen Förderverein verfügen, der Mittel entgegennehmen kann.
        </p>
        <p className="mb-3">
          Der Trägerverein hinter Event Netz Europa ist als gemeinnützig anerkannt, sodass die Workshops zum
          Selbstkostenpreis angeboten werden.
        </p>
        <p>
          Sollten Sie über eigene Mittel (z. B. Startchancen-Programm oder Budget für Prävention/Schulsozialarbeit)
          verfügen, können wir Ihnen auch gerne ein individuelles und an Ihren Bedarf angepasstes Angebot erstellen.
        </p>
      </>
    ),
  },
  {
    question: 'Für welche Altersgruppe bzw. Bildungsorte ist das Projekt geeignet?',
    answer: (
      <p>
        Die Workshops sind didaktisch für Schüler*innen weiterführender Schulen ab der zehnten Jahrgangsstufe optimiert
        und ggf. auch für leistungsstarke Klassen ab der achten Jahrgangsstufe geeignet. Gerne besuchen wir auch
        interessierte BBS-Klassen, Jugendorganisationen oder Veranstaltungen mit Workshops verschiedener Organisationen.
      </p>
    ),
  },
  {
    question: 'Welche Methoden werden im Projekt verwendet?',
    answer: (
      <>
        <p className="mb-3">
          Didaktisch orientieren wir uns u. a. an Materialien aus dem Projekt einmischen.org des LBE Bayern und der
          Bayerischen Landeszentrale für politische Bildung, um mit erprobten Inhalten ein praktisches Verständnis von
          demokratischer Beteiligung zu schaffen. Somit fördern wir die Diskursfähigkeit der Teilnehmenden und wirken
          populistischen und extremistischen Tendenzen entgegen.
        </p>
        <p className="mb-3">
          Dazu zählen neben Übungen zum Thema Kompromissfindung auch vermittelnde Übungen zum Themenkomplex Legitimität
          und Wirksamkeit von Engagement: „Was ist erlaubt und was überschreitet den Rahmen unserer gemeinsamen
          demokratischen Werte?“ Außerdem führen wir mithilfe verschiedener Rollenkarten einen Privilegiencheck durch, um
          die Teilnehmenden für Hürden und Barrieren im Kontext des ehrenamtlichen Engagements zu sensibilisieren.
        </p>
        <p>
          Darüber hinaus beschäftigen wir uns in Gruppenübungen damit, wie sich die Teilnehmenden selbst im Schulkontext
          und darüber hinaus im Sinne des demokratischen Engagements für ihre Herzensthemen einsetzen können und zeigen
          passend dazu auch konkrete Ideen und Beteiligungsveranstaltungen auf.
        </p>
      </>
    ),
  },
  {
    question: 'Wer steht hinter dem Projekt?',
    answer: (
      <>
        <p className="mb-3">
          Wir als Event Netz Europa haben uns zur Aufgabe gemacht, den Zugang zu Bildungs- und Vernetzungsmöglichkeiten im
          Jugendbereich zu verbessern und uns für inklusivere Zugänge zu Veranstaltungen einzusetzen, indem wir{' '}
          <strong>Angebote diverser gemeinnütziger Träger</strong> aus ganz Europa kritisch prüfen und übersichtlich online
          aufbereiten. Unsere Community ist seit der Gründung im Jahr 2021 stark gewachsen und umfasst mittlerweile{' '}
          <strong>mehr als 7000 junge Menschen</strong> aus dem deutschsprachigen Raum.
        </p>
        <p className="mb-3">
          Unser Kernteam besteht aktuell aus vier jungen Menschen, von denen zwei gerade ihr Abitur abschließen und zwei im
          Studium sind. Die Geschichte zur Entstehung des Projektes lässt sich auf unserer Website{' '}
          <a
            href="https://eventnetz-europa.eu/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#41919C] hover:text-[#0F2D49] underline"
          >
            eventnetz-europa.eu
          </a>{' '}
          anhand eines Zeitstrahls nachlesen. Seit einem erfolgreichen Pilotprojekt Ende 2025 in Delmenhorst bieten wir auch
          Workshops zu Demokratie und inklusiver Beteiligung an.
        </p>
        <p>
          Seit seiner Gründung im Jahr 2023 hat der Verein für die vernetzte Gesellschaft – kurz NetGes e. V. – die
          Trägerschaft des Projektes übernommen. NetGes unterstützt ehrenamtliches Engagement und bietet diverse Formate zur
          Bildung und Beteiligung von jungen Menschen in einer demokratischen Gesellschaft an.
        </p>
      </>
    ),
  },
  {
    question: 'Wer leitet die Workshops?',
    answer: (
      <p>
        Wir arbeiten nach dem Peer-to-peer-Prinzip und setzen entsprechend junge Referierende ein. Die Mitglieder unseres
        Pools an Referierenden sind erfahren in der Jugendbildungsarbeit und verfügen über fundierte Erfahrungen aus sehr
        unterschiedlichen Kontexten (siehe Frage zu Referenzen). Durch verpflichtende Feedback-Prozesse und regelmäßige
        Supervision wird die Qualität unserer Workshops gesichert.
      </p>
    ),
  },
  {
    question: 'Welche Referenzen bringen die Referierenden jeweils mit?',
    answer: (
      <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 list-none p-0 m-0">
        {references.map((ref) => (
          <li key={ref} className="text-gray-700 text-sm sm:text-base">
            {ref}
          </li>
        ))}
      </ul>
    ),
  },
];

const Dialog = () => {
  useEffect(() => {
    document.title = 'Beteiligungswerkstatt | Event Netz Europa';
    return () => {
      document.title = defaultDocumentTitle;
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-8 sm:px-6 md:px-8 py-8">
        <AnimatedSection>
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Beteiligungswerkstatt – Demokratie erleben &amp; verstehen
            </h2>
            <div className="prose text-gray-700 leading-relaxed text-left">
              <p>
                Workshop-Programm der Jugendbeteiligungsplattform Event Netz Europa für Jugendliche zu den Themen
                Demokratie, Engagement &amp; Inklusion
              </p>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={60}>
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Ausgangslage</h2>
            <div className="prose text-gray-700 leading-relaxed space-y-4 text-left">
              <p>
                Als Betreiber einer Online-Community, in der ausgewählte Bildungs- und Beteiligungsformate nationaler und
                internationaler Organisationen geteilt werden, stellen wir immer wieder fest, dass viele junge Menschen von
                entsprechenden Formaten nicht erreicht werden, da lokale Anknüpfungspunkte zu den Themen Demokratie und
                Engagement fehlen. Besonders in Kombination mit dem Erstarken rechtsextremer Kräfte in strukturschwachen
                Gebieten birgt dies die Gefahr, dass junge Menschen sich von populistischen Erzählungen leiten lassen,
                menschenfeindliche Äußerungen reproduzieren und im schlimmsten Fall selbst radikalisieren.
              </p>
              <p>
                Daher haben wir uns entschlossen, jungen Menschen in Workshops Möglichkeiten aufzuzeigen, auf dem Boden der
                freiheitlich-demokratischen Grundordnung zu diskutieren und sich gegen Diskriminierung und andere
                gesellschaftliche Probleme einzusetzen, statt diese stillschweigend hinzunehmen.
              </p>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Ziele &amp; Wirkung</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {goals.map(({ emoji, text }) => (
                <div
                  key={text}
                  className="interactive-card bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-3xl shrink-0" aria-hidden>
                      {emoji}
                    </span>
                    <p className="text-gray-700 text-left leading-relaxed m-0">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={140}>
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Zeitrahmen</h2>
            <div className="prose text-gray-700 leading-relaxed space-y-4 text-left">
              <p>
                Die Workshops sind in der Regel für einen Tag pro Gruppe (sechs bis acht Schulstunden) ausgelegt. Es sind
                nach Absprache aber auch kürzere oder längere Angebote möglich, z. B. auch mit der Erarbeitung eines
                eigenen lokalen Projektes, das die Gruppe über einen längeren Zeitraum umsetzt.
              </p>
              <p>
                Idealerweise lassen sich mehrere Workshops in einer Region bündeln, um Reisekosten zu reduzieren.
              </p>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={180}>
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Häufig gestellte Fragen</h2>
            <Accordion type="single" collapsible className="w-full space-y-6 text-left">
              {faqItems.map(({ question, answer }, index) => (
                <AccordionItem
                  key={question}
                  value={`faq-${index}`}
                  className="interactive-card bg-white rounded-lg shadow-md border-0"
                >
                  <div className="px-4 sm:px-5 md:px-6">
                    <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 hover:text-gray-900 hover:no-underline py-4 [&[data-state=open]]:text-gray-900">
                      {question}
                    </AccordionTrigger>
                    <AccordionContent className="prose text-gray-700 leading-relaxed max-w-none pb-4 pt-0">
                      {answer}
                    </AccordionContent>
                  </div>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={220}>
          <section className="mb-12 text-left">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Kontakt</h2>
            <div className="interactive-card bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6">
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <div className="flex items-start gap-3">
                  <span className="text-3xl shrink-0" aria-hidden>
                    💌
                  </span>
                  <p className="m-0">
                    <a
                      href="mailto:info@eventnetz-europa.eu"
                      className="text-[#41919C] hover:text-[#0F2D49] underline font-medium"
                    >
                      info@eventnetz-europa.eu
                    </a>
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-3xl shrink-0" aria-hidden>
                    ☎️
                  </span>
                  <p className="m-0">
                    <a href="tel:+4915170895458" className="hover:text-[#41919C] transition-colors">
                      +49 151 70895458
                    </a>{' '}
                    (Karl Grotheer) oder{' '}
                    <a href="tel:+491637642554" className="hover:text-[#41919C] transition-colors">
                      +49 163 7642554
                    </a>{' '}
                    (Jakob Steinborn)
                  </p>
                </div>
                <div className="flex items-start gap-3 pt-2">
                  <span className="text-3xl shrink-0" aria-hidden>
                    📍
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900 m-0">Beteiligungsprojekt Event Netz Europa</p>
                    <p className="m-0">NetGes – Verein für die vernetzte Gesellschaft e. V.</p>
                    <p className="m-0">Anne-Frank-Platz 4 | 26123 Oldenburg</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>
    </div>
  );
};

export default Dialog;
