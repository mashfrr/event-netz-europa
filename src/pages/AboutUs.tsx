import React from 'react';
import { Mail, Phone } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const AboutUs = () => {
  const handleCommunityClick = () => {
    window.open("https://chat.whatsapp.com/B73TpR6gGumIGsb0fSRZ0q", "_blank");
  };

  const handleChannelClick = () => {
    window.open("https://whatsapp.com/channel/0029Va8izXXFcow89AjyaH3l", "_blank");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8">
      {/* WhatsApp Buttons */}
      <div className="flex flex-row justify-center gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-12">
        <button 
          onClick={handleCommunityClick}
          style={{ backgroundColor: '#41919C' }}
          className="text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-medium hover:opacity-90 transition-colors text-sm sm:text-base"
        >
          WhatsApp Community
        </button>
        <button 
          onClick={handleChannelClick}
          style={{ backgroundColor: '#41919C' }}
          className="text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-medium hover:opacity-90 transition-colors text-sm sm:text-base"
        >
          WhatsApp Channel
        </button>
      </div>

      <section className="mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Über uns</h2>
        <div className="prose prose-sm sm:prose-base max-w-none text-gray-700 leading-relaxed space-y-3 sm:space-y-4">
          <p className="max-w-none">
            Wir möchten den Zugang zu Bildungsveranstaltungen und Beteiligungsmöglichkeiten für junge Menschen und Fachkräfte 
            sowie Engagierte in der Jugendarbeit vereinfachen. Somit unterstützen wir sowohl Veranstalter bei der Bekanntmachung 
            ihrer Events als auch die Teilnehmenden bei ihrer persönlichen Vernetzung und Weiterbildung.
          </p>
          <p className="max-w-none">
            Die Veranstaltungen für Event Netz Europa werden von einem Redaktionsteam recherchiert und aufbereitet. Unabhängig 
            davon, ob wir auf die Events über die Recherche in Datenbanken und Suchmaschinen oder direkt über Nutzer*innen und 
            Kooperationspartner aufmerksam werden, achten wir besonders auf die Qualität der Veranstaltungen sowie auf faire 
            Teilnahmechancen unabhängig vom persönlichen Einkommen.
          </p>
          <p className="max-w-none">
            Träger der Plattform ist der Verein für die vernetzte Gesellschaft. Wenn du mehr über unsere Arbeit erfahren möchtest, kannst 
            <span 
              onClick={() => window.open("https://netges.org/", "_blank")}
              className="ml-1 cursor-pointer text-[#41919C] hover:text-[#0F2D49] underline"
            >
              du uns auf unserer Website besuchen
            </span>.
          </p>
        </div>
      </section>

      <section className="mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Unsere Mission</h2>
        <div className="prose prose-sm sm:prose-base max-w-none text-gray-700 leading-relaxed">
          <p className="max-w-none">
            Wir sehen ein Europa, in dem jeder junge Mensch die gleichen Chancen auf Bildung, Engagement und Weiterentwicklung hat. 
            Viele Jugendliche haben auf dem Veranstaltungsmarkt, sei es in clubs, einem offenen oder, so richtig, andere nicht die 
            Möglichkeit allein teilzunehmen, sich über Event Netz Europa schaffen wir Transparenz. Zugang sind ein lokales Netzwerk, in dem junge Menschen die Zukunft aktiv 
            mitgestalten und sich gemeinsam auf ein gemeinsames Ziel hinbewegen.
          </p>
        </div>
      </section>

      <section className="mb-8 sm:mb-12">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Von einer Chat-Gruppe zur Community mit mehr als 2000 Mitgliedern</h2>
        <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">Die Geschichte hinter Event Netz Europa</p>

        {/* Roadmap Container */}
        <div className="relative">
          {/* Central Timeline Line */}
          <div className="absolute left-4 sm:left-6 md:left-8 top-0 bottom-0 w-0.5 border-l-2 sm:border-l-4 border-dashed border-black"></div>
          
          {/* Roadmap Items */}
          <div className="space-y-8 sm:space-y-10 md:space-y-12">
            {/* Chat-Gruppe mit Veranstaltungstipps entsteht */}
            <div className="relative flex items-start">
              <div className="relative z-10 flex items-center justify-center w-12 sm:w-14 md:w-16 h-6 sm:h-7 md:h-8 bg-background px-1 sm:px-2">
                <div className="text-black font-bold text-xs sm:text-sm">2020</div>
              </div>
              <div className="ml-4 sm:ml-6 md:ml-8 flex-1">
                <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3">🚀 Chat-Gruppe mit Veranstaltungstipps entsteht</h3>
                  <p className="text-black leading-relaxed text-sm sm:text-base max-w-none sm:max-w-3xl">
                    Von mehreren jungen Menschen, die sich über Veranstaltungen wie die 
                    JugendPolitikTage kennengelernt haben, wird eine einfache WhatsApp-
                    Gruppe mit dem Titel "Veranstaltungstipps" gegründet. Zu diesem 
                    Zeitpunkt hat die Gruppe noch eine zweistellige Mitgliederzahl.
                  </p>
                </div>
              </div>
            </div>

            {/* Professionalisierung */}
            <div className="relative flex items-start">
              <div className="relative z-10 flex items-center justify-center w-12 sm:w-14 md:w-16 h-6 sm:h-7 md:h-8 bg-background px-1 sm:px-2">
                <div className="text-black font-bold text-xs sm:text-sm">09/2021</div>
              </div>
              <div className="ml-4 sm:ml-6 md:ml-8 flex-1">
                <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3">⚡ Professionalisierung</h3>
                  <p className="text-black leading-relaxed text-sm sm:text-base max-w-none sm:max-w-3xl">
                    Aus der mittlerweile auf mehrere hundert Mitglieder angewachsenen Gruppe findet sich erstmals ein Redaktionsteam zusammen, das mit der Unterstützung einer bundesweit tätigen Stiftung passende Veranstaltungen recherchiert und weitere Social-Media-Kanäle aufbaut.
                  </p>
                </div>
              </div>
            </div>

            {/* Marke "Event Netz Europa" entsteht */}
            <div className="relative flex items-start">
              <div className="relative z-10 flex items-center justify-center w-12 sm:w-14 md:w-16 h-6 sm:h-7 md:h-8 bg-background px-1 sm:px-2">
                <div className="text-black font-bold text-xs sm:text-sm">09/2021</div>
              </div>
              <div className="ml-4 sm:ml-6 md:ml-8 flex-1">
                <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3">🌟 Marke "Event Netz Europa" entsteht</h3>
                  <p className="text-black leading-relaxed text-sm sm:text-base max-w-none sm:max-w-3xl">
                    Parallel zu der bestehenden Veranstaltungstipps-Community entwickeln Jannik und Karl, die mit anderen Engagierten den umgedacht e. V. (auch bekannt als Zentrum für soziale Innovation - kurz "ZFSI") gegründet haben, eine Website mit dem Titel "Event Netz Europa" und die dazugehörige Social-Media-Community. Neben nationalen Angeboten werden hier insbesondere internationale Projekte geteilt.
                  </p>
                </div>
              </div>
            </div>

            {/* Wechsel des Trägervereins */}
            <div className="relative flex items-start">
              <div className="relative z-10 flex items-center justify-center w-12 sm:w-14 md:w-16 h-6 sm:h-7 md:h-8 bg-background px-1 sm:px-2">
                <div className="text-black font-bold text-xs sm:text-sm">10/2023</div>
              </div>
              <div className="ml-4 sm:ml-6 md:ml-8 flex-1">
                <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3">🏛️ Wechsel des Trägervereins</h3>
                  <p className="text-black leading-relaxed text-sm sm:text-base max-w-none sm:max-w-3xl">
                    Während der umgedacht e. V. sich mittlerweile mehr auf <a href="https://nein-zur-digitalen-gewalt.de" target="_blank" rel="noopener noreferrer" className="text-[#41919C] hover:text-[#0F2D49] underline">Präventionsworkshops an Schulen</a> fokussiert, gründen einige Mitglieder den <a href="https://netges.org" target="_blank" rel="noopener noreferrer" className="text-[#41919C] hover:text-[#0F2D49] underline">Verein für die vernetzte Gesellschaft e. V.</a> - abgekürzt "NetGes", um sich auf die strukturelle Unterstützung von Jugendengagement zu fokussieren. Der neu gegründete Verein übernimmt kurz darauf die Communities "Event Netz Europa" und "Veranstaltungstipps" und führt sie in einem Projekt zusammen.
                  </p>
                </div>
              </div>
            </div>

            {/* Wachstum und Präsenz auf Events */}
            <div className="relative flex items-start">
              <div className="relative z-10 flex items-center justify-center w-12 sm:w-14 md:w-16 h-6 sm:h-7 md:h-8 bg-background px-1 sm:px-2">
                <div className="text-black font-bold text-xs sm:text-sm">2024</div>
              </div>
              <div className="ml-4 sm:ml-6 md:ml-8 flex-1">
                <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3">📈 Wachstum und Präsenz auf Events</h3>
                  <p className="text-black leading-relaxed text-sm sm:text-base max-w-none sm:max-w-3xl">
                    Während das Projektteam von NetGes mit personellen Engpässen zu kämpfen hat und die Zahl der geteilten Angebote zeitweise sinkt, wächst das Interesse an dem Projekt und die Mitgliederzahl stetig. In Zusammenarbeit mit verschiedenen Organisationen wie dem Jugendmultiplikatoren-Team für den EU-Jugenddialog beim Deutschen Bundesjugendring wird die Präsenz auf regionalen und nationalen Veranstaltungen verstärkt, um mehr junge Menschen außerhalb der bestehenden Bubble zu erreichen.
                  </p>
                </div>
              </div>
            </div>

            {/* Neues Team findet sich zusammen */}
            <div className="relative flex items-start">
              <div className="relative z-10 flex items-center justify-center w-12 sm:w-14 md:w-16 h-6 sm:h-7 md:h-8 bg-background px-1 sm:px-2">
                <div className="text-black font-bold text-xs sm:text-sm">01/2025</div>
              </div>
              <div className="ml-4 sm:ml-6 md:ml-8 flex-1">
                <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3">👥 Neues Team findet sich zusammen</h3>
                  <p className="text-black leading-relaxed text-sm sm:text-base max-w-none sm:max-w-3xl">
                    Auf der Veranstaltung "<a href="https://gennow.de/gesellschaft/change-youth-empowerment-hub/" target="_blank" rel="noopener noreferrer" className="text-[#41919C] hover:text-[#0F2D49] underline">Change! Youth Empowerment Hub</a>" in Berlin, die vom <a href="https://gennow.de/" target="_blank" rel="noopener noreferrer" className="text-[#41919C] hover:text-[#0F2D49] underline">Projekt "gen now" der Bertelsmann Stiftung</a> in Kooperation mit dem <a href="https://peerleader.org/" target="_blank" rel="noopener noreferrer" className="text-[#41919C] hover:text-[#0F2D49] underline">Peer-Leader-International e. V.</a> organisiert wird, trifft Karl vom NetGes e. V. auf Maria, Amira und Jakob, die bereits überlegt hatten, eine ähnliche Plattform neu aufzubauen. Kurz darauf treffen sie sich digital noch einmal und planen zusammen den Ausbau der Community.
                  </p>
                </div>
              </div>
            </div>

            {/* Skalierung des Projekts */}
            <div className="relative flex items-start">
              <div className="relative z-10 flex items-center justify-center w-12 sm:w-14 md:w-16 h-6 sm:h-7 md:h-8 bg-background px-1 sm:px-2">
                <div className="text-black font-bold text-xs sm:text-sm">Sommer 2025</div>
              </div>
              <div className="ml-4 sm:ml-6 md:ml-8 flex-1">
                <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3">🎯 Skalierung des Projekts</h3>
                  <p className="text-black leading-relaxed text-sm sm:text-base max-w-none sm:max-w-3xl">
                    Mittlerweile ist die Community auf mehr als 2000 Mitglieder gewachsen. Die Zahl der Angebote steigt immer weiter und zahlreiche Träger schicken ihre Ausschreibungen direkt an das Redaktionsteam, um Teilnehmende für ihre Projekte zu gewinnen.
                  </p>
                </div>
              </div>
            </div>

            {/* Weiterentwicklung der Formate und Ausbau der Präsenz auf Events */}
            <div className="relative flex items-start">
              <div className="relative z-10 flex items-center justify-center w-12 sm:w-14 md:w-16 h-6 sm:h-7 md:h-8 bg-background px-1 sm:px-2">
                <div className="text-black font-bold text-xs sm:text-sm">heute</div>
              </div>
              <div className="ml-4 sm:ml-6 md:ml-8 flex-1">
                <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3">🚀 Weiterentwicklung der Formate und Ausbau der Präsenz auf Events</h3>
                  <p className="text-black leading-relaxed text-sm sm:text-base max-w-none sm:max-w-3xl">
                    Um die Bekanntheit des Projekts zu stärken, arbeitet das Projektteam an einer stärkeren Präsenz auf Events in Form von eigenen Infoständen und Workshops. Parallel wird an der Website und den verschiedenen Social-Media-Kanälen gefeilt, um diese übersichtlicher und attraktiver zu machen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">Unser Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Team Member 1 */}
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
              <img 
                src="/karl.png" 
                alt="Karl Grotheer" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Karl Grotheer</h3>
            <div className="flex items-center justify-center gap-3 mb-3">
              <a
                href="https://www.linkedin.com/in/karlgrotheer/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0077b5] hover:text-[#005885] transition-colors"
                aria-label="Karl Grotheer LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  aria-hidden="true"
                  fill="currentColor"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    className="text-gray-600 hover:text-[#41919C] transition-colors"
                    aria-label="Email anzeigen"
                  >
                    <Mail className="h-5 w-5" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-3">
                  <a 
                    href="mailto:karl.grotheer@netges.org"
                    className="text-sm font-medium hover:text-[#41919C] transition-colors"
                  >
                    karl.grotheer@netges.org
                  </a>
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    className="text-gray-600 hover:text-[#41919C] transition-colors"
                    aria-label="Telefonnummer anzeigen"
                  >
                    <Phone className="h-5 w-5" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-3">
                  <a 
                    href="tel:+4915170895458"
                    className="text-sm font-medium hover:text-[#41919C] transition-colors"
                  >
                    +49 1517 0895458
                  </a>
                </PopoverContent>
              </Popover>
            </div>
            <ul className="text-sm text-gray-600 text-left list-disc list-inside space-y-1">
              <li>24 Jahre alt, bundesweiter Projektmanager.</li>
              <li>Mitgründer des Projekts und verantwortlich für die Gesamtkoordination. Zuständig für die Planung und Abstimmung aller Projektprozesse, die Recherche relevanter Veranstaltungen sowie für den Aufbau und die Pflege von Kooperationen.</li>
            </ul>
          </div>

          {/* Team Member 2 */}
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
              <img 
                src="/Jakob.jpeg" 
                alt="Jakob Steinborn" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Jakob Steinborn</h3>
            <div className="flex items-center justify-center gap-3 mb-3">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  // TODO: Add LinkedIn URL here when available
                }}
                className="text-[#0077b5] hover:text-[#005885] transition-colors opacity-50 cursor-not-allowed"
                aria-label="Jakob Steinborn LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  aria-hidden="true"
                  fill="currentColor"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    className="text-gray-600 hover:text-[#41919C] transition-colors"
                    aria-label="Email anzeigen"
                  >
                    <Mail className="h-5 w-5" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-3">
                  <a 
                    href="mailto:jakob.steinborn@netges.org"
                    className="text-sm font-medium hover:text-[#41919C] transition-colors"
                  >
                    jakob.steinborn@netges.org
                  </a>
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    className="text-gray-600 hover:text-[#41919C] transition-colors"
                    aria-label="Telefonnummer anzeigen"
                  >
                    <Phone className="h-5 w-5" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-3">
                  <a 
                    href="tel:+491637642554"
                    className="text-sm font-medium hover:text-[#41919C] transition-colors"
                  >
                    +49 163 7642554
                  </a>
                </PopoverContent>
              </Popover>
            </div>
            <ul className="text-sm text-gray-600 text-left list-disc list-inside space-y-1">
              <li>20 Jahre alt, Student in Leipzig.</li>
              <li>Seit Januar 2025 verantwortlich für die Betreuung der WhatsApp-Community, die Öffentlichkeitsarbeit sowie die Kommunikation mit Teilnehmenden und Veranstaltenden.</li>
            </ul>
          </div>

          {/* Team Member 3 */}
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
              <img 
                src="/Maria Frolovskaya.jpg" 
                alt="Maria Frolovskaya" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Maria Frolovskaya</h3>
            <div className="flex items-center justify-center gap-3 mb-3">
              <a
                href="https://www.linkedin.com/in/maria-frolovskaya-a88a97299"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0077b5] hover:text-[#005885] transition-colors"
                aria-label="Maria Frolovskaya LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  aria-hidden="true"
                  fill="currentColor"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    className="text-gray-600 hover:text-[#41919C] transition-colors"
                    aria-label="Email anzeigen"
                  >
                    <Mail className="h-5 w-5" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-3">
                  <a 
                    href="mailto:maria.frolovskaya@netges.org"
                    className="text-sm font-medium hover:text-[#41919C] transition-colors"
                  >
                    maria.frolovskaya@netges.org
                  </a>
                </PopoverContent>
              </Popover>
            </div>
            <ul className="text-sm text-gray-600 text-left list-disc list-inside space-y-1">
              <li>19 Jahre alt, Abitur in München.</li>
              <li>Seit Januar 2025 verantwortlich für die IT sowie den Aufbau und die Betreuung der Web-Plattform. Zuständig für die Recherche von Veranstaltungen sowie für die Öffentlichkeitsarbeit.</li>
            </ul>
          </div>

          {/* Team Member 4 */}
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-500 text-sm">Foto</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Amira Benkhedda</h3>
            <div className="flex items-center justify-center gap-3 mb-3">
              <a
                href="https://www.linkedin.com/in/amira-b-7448a231a/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0077b5] hover:text-[#005885] transition-colors"
                aria-label="Amira Benkhedda LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  aria-hidden="true"
                  fill="currentColor"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    className="text-gray-600 hover:text-[#41919C] transition-colors"
                    aria-label="Email anzeigen"
                  >
                    <Mail className="h-5 w-5" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-3">
                  <a 
                    href="mailto:amira.benkhedda@netges.org"
                    className="text-sm font-medium hover:text-[#41919C] transition-colors"
                  >
                    amira.benkhedda@netges.org
                  </a>
                </PopoverContent>
              </Popover>
            </div>
            <p className="text-sm text-gray-600">
              Kurze Beschreibung der Person und ihrer Rolle im Team.
            </p>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">Unsere Partner</h2>
        <div className="flex flex-row justify-start items-center gap-4 sm:gap-6 md:gap-8 flex-wrap">
          {/* Partner 1 - DSEE */}
          <div className="flex flex-col items-center justify-center flex-1 min-w-[200px] max-w-[300px]">
            <div className="w-full h-24 sm:h-32 md:h-40 flex items-center justify-center">
              <img 
                src="/2023_DSEE_Logo_3zlg_RGB_Basis_580x180.png" 
                alt="DSEE Logo" 
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <a 
              href="https://www.deutsche-stiftung-engagement-und-ehrenamt.de" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm sm:text-base font-semibold text-gray-900 mt-2 text-center hover:text-[#41919C] transition-colors cursor-pointer px-2"
            >
              DSEE
            </a>
          </div>

          {/* Partner 2 - TEILHABER IM Netzwerk */}
          <div className="flex flex-col items-center justify-center flex-1 min-w-[200px] max-w-[300px]">
            <div className="w-full h-24 sm:h-32 md:h-40 flex items-center justify-center">
              <img 
                src="/NSB.png" 
                alt="TEILHABER IM Netzwerk Stiftungen und Bildung Logo" 
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <a 
              href="https://www.netzwerk-stiftungen-bildung.de" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm sm:text-base font-semibold text-gray-900 mt-2 text-center hover:text-[#41919C] transition-colors cursor-pointer px-2"
            >
              Teilhaber im Netzwerk Stiftungen und Bildung
            </a>
          </div>

          {/* Partner 3 - Umsetzungspartner Update Deutschland */}
          <div className="flex flex-col items-center justify-center flex-1 min-w-[200px] max-w-[300px]">
            <div className="w-full h-24 sm:h-32 md:h-40 flex items-center justify-center">
              <img 
                src="/Update.png" 
                alt="Update Deutschland Logo" 
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <a 
              href="https://www.update-deutschland.de" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm sm:text-base font-semibold text-gray-900 mt-2 text-center hover:text-[#41919C] transition-colors cursor-pointer px-2"
            >
              Update Deutschland
            </a>
          </div>

          {/* Partner 4 - NIEDERSACHSEN HÄLT ZUSAMMEN */}
          <div className="flex flex-col items-center justify-center flex-1 min-w-[200px] max-w-[300px]">
            <div className="w-full h-24 sm:h-32 md:h-40 flex items-center justify-center">
              <img 
                src="/niedersachen_haelt_zusammen_logo.png" 
                alt="Niedersachsen hält zusammen Logo" 
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <a 
              href="https://www.niedersachsen.de/startseite/politik_staat/landesregierung_ministerien/landesregierung_2013_2017/2013_bis_2017_gute_jahre_fur_das_land/niedersachsen_halt_zusammen/niedersachsen-haelt-zusammen--155274.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm sm:text-base font-semibold text-gray-900 mt-2 text-center hover:text-[#41919C] transition-colors cursor-pointer px-2"
            >
              Niedersachsen hält zusammen
            </a>
          </div>

          {/* Partner 5 - Meet and Code */}
          <div className="flex flex-col items-center justify-center flex-1 min-w-[200px] max-w-[300px]">
            <div className="w-full h-24 sm:h-32 md:h-40 flex items-center justify-center">
              <img 
                src="/RGB_Meet_and_Code_Logo@4x.png" 
                alt="Meet and Code Logo" 
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <a 
              href="https://www.meet-and-code.org/at/de/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm sm:text-base font-semibold text-gray-900 mt-2 text-center hover:text-[#41919C] transition-colors cursor-pointer px-2"
            >
              Meet and Code
            </a>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default AboutUs;