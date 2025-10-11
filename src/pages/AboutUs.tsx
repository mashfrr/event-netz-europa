import React from 'react';

const AboutUs = () => {
  const handleCommunityClick = () => {
    window.open("https://chat.whatsapp.com/B73TpR6gGumIGsb0fSRZ0q", "_blank");
  };

  const handleChannelClick = () => {
    window.open("https://whatsapp.com/channel/0029Va8izXXFcow89AjyaH3l", "_blank");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* WhatsApp Buttons */}
      <div className="flex justify-center space-x-4 mb-12">
        <button 
          onClick={handleCommunityClick}
          style={{ backgroundColor: '#41919C' }}
          className="text-white px-8 py-3 rounded-full font-medium hover:opacity-90 transition-colors"
        >
          WhatsApp Community
        </button>
        <button 
          onClick={handleChannelClick}
          style={{ backgroundColor: '#41919C' }}
          className="text-white px-8 py-3 rounded-full font-medium hover:opacity-90 transition-colors"
        >
          WhatsApp Channel
        </button>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Über uns</h2>
        <div className="prose text-gray-700 leading-relaxed space-y-4">
          <p>
            Wir möchten den Zugang zu Bildungsveranstaltungen und Beteiligungsmöglichkeiten für junge Menschen und Fachkräfte 
            durch Engagement in der Jugendarbeit vereinfachen. Somit unterstützen wir unseren Vereinsauftrag zur Bekämpfung der 
            Ungleichheit in diesem Bereich.
          </p>
          <p>
            Die Veranstaltungen für Event Netz Europa werden von einem Redaktionsteam recherchiert und aufbereitet. Unabhängig 
            davon, ob wir bei Event über die Teilnahme in Datenbankern sind Sachzusammenhang über dabei über Redaktionen und 
            sozialen Medien informiert werden möchten. Zusätzlich können die bei Interesse die Werbematerialien über unsere 
            Teilnehmerkanäle unabhängig von persönlichen Einstimmung.
          </p>
          <p>
            Träger der Plattform ist der Verein für die vernetzte Gesellschaft. Wenn du mehr über unsere Arbeit erfahren möchtest, kannst 
            <span 
              onClick={() => window.open("https://www.vernetzte-gesellschaft.org", "_blank")}
              className="ml-1 cursor-pointer"
            >
              du uns auf unserer Website besuchen
            </span>.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Unsere Mission</h2>
        <div className="prose text-gray-700 leading-relaxed">
          <p>
            Wir sehen ein Europa, in dem jeder junge Mensch die gleichen Chancen auf Bildung, Engagement und Weiterentwicklung hat. 
            Viele Jugendliche haben auf dem Veranstaltungsmarkt, sei es in clubs, einem offenen oder, so richtig, andere nicht die 
            Möglichkeit allein teilzunehmen, sich über Event Netz Europa schaffen wir Transparenz. Zugang sind ein lokales Netzwerk, in dem junge Menschen die Zukunft aktiv 
            mitgestalten und sich gemeinsam auf ein gemeinsames Ziel hinbewegen.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Von einer Chat-Gruppe zur Community mit mehr als 2000 Mitgliedern</h2>
        <p className="text-gray-600 mb-8">Die Geschichte hinter Event Netz Europa</p>

        {/* Roadmap Container */}
        <div className="relative">
          {/* Central Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 border-l-4 border-dashed border-black"></div>
          
          {/* Roadmap Items */}
          <div className="space-y-12">
            {/* 2020 - Start */}
            <div className="relative flex items-start">
              <div className="relative z-10 flex items-center justify-center w-16 h-8 bg-background px-2">
                <div className="text-black font-bold text-sm">2020</div>
              </div>
              <div className="ml-8 flex-1">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">🚀 Chat-Gruppe mit Veranstaltungstipps entsteht</h3>
                  <p className="text-black leading-relaxed">
                    Von mehreren jungen Menschen, die sich über Veranstaltungen wie die 
                    JugendPolitikTage kennengelernt haben, wird eine einfache WhatsApp-
                    Gruppe mit dem Titel "Veranstaltungstipps" gegründet. Zu diesem 
                    Zeitpunkt hat die Gruppe noch eine zweistellige Mitgliederzahl.
                  </p>
                  <div className="mt-3 flex items-center text-sm text-gray-600 font-medium">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                    Gründung der Community
                  </div>
                </div>
              </div>
            </div>

            {/* 09/2021 - Professionalisierung */}
            <div className="relative flex items-start">
              <div className="relative z-10 flex items-center justify-center w-16 h-8 bg-background px-2">
                <div className="text-black font-bold text-sm">09/2021</div>
              </div>
              <div className="ml-8 flex-1">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">⚡ Professionalisierung</h3>
                  <p className="text-black leading-relaxed">
                    Aus der mittlerweile auf mehrere hundert Jugendpolitikinteressierte 
                    Gruppe findet sich erstmals ein Redaktionsteam zusammen, das mit der 
                    Unterstützung einer bundesweit tätigen NGO regelmäßig Termine 
                    Veranstaltungen recherchiert und weitere Social-Media-Kanäle aufbaut.
                  </p>
                  <div className="mt-3 flex items-center text-sm text-gray-600 font-medium">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                    Erste Strukturierung
                  </div>
                </div>
              </div>
            </div>

            {/* 10/2023 - Trägerverein */}
            <div className="relative flex items-start">
              <div className="relative z-10 flex items-center justify-center w-16 h-8 bg-background px-2">
                <div className="text-black font-bold text-sm">10/2023</div>
              </div>
              <div className="ml-8 flex-1">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">🏛️ Wechsel des Trägervereins</h3>
                  <p className="text-black leading-relaxed">
                    Während der Umbruchzeit ist V. auch mittlerweile mehr 
                    auf Präsenzveranstaltungen zu Schulung fokussiert, gründen einige 
                    Mitglieder den Verein für die vernetzte Gesellschaft e. V. - abgekürzt 
                    "NeGes", um sich auf die strukturelle Vernetzung von 
                    Jugendengagement zu fokussieren. Der neu gegründete Verein übernimmt 
                    kurz darauf die Communitas "Event Netz Europa" und 
                    "Veranstaltungstipps" und führt sie in einem neuen Zusammen.
                  </p>
                  <div className="mt-3 flex items-center text-sm text-gray-600 font-medium">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                    Neue Organisationsstruktur
                  </div>
                </div>
              </div>
            </div>

            {/* 2024 - Wachstum */}
            <div className="relative flex items-start">
              <div className="relative z-10 flex items-center justify-center w-16 h-8 bg-background px-2">
                <div className="text-black font-bold text-sm">2024</div>
              </div>
              <div className="ml-8 flex-1">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">📈 Wachstum und Präsenz auf Events</h3>
                  <p className="text-black leading-relaxed">
                    Während das Redaktionsteam kontinuierlich die Qualität der Community 
                    steigert und die Zahl der geteilten Angebote sukzessive stark wächst, 
                    baut das Team an dem Projekt auch die Mitgliederzahl stetig auf. 
                    Zusammenarbeit mit verschiedenen Organisationen wie dem 
                    Jugendpolitik.com-Team fördert die EU-Jugendpolitik beim Deutschen 
                    Bundesjugendring wird die Präsenz auf regionalen und nationalen 
                    Veranstaltungen verstärkt, um mehr junge Menschen außerhalb der 
                    bestehenden Blase zu erreichen.
                  </p>
                  <div className="mt-3 flex items-center text-sm text-gray-600 font-medium">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                    Expansion & Kooperationen
                  </div>
                </div>
              </div>
            </div>

            {/* 01/2025 - Neues Team */}
            <div className="relative flex items-start">
              <div className="relative z-10 flex items-center justify-center w-16 h-8 bg-background px-2">
                <div className="text-black font-bold text-sm">01/2025</div>
              </div>
              <div className="ml-8 flex-1">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">👥 Neues Team findet sich zusammen</h3>
                  <p className="text-black leading-relaxed">
                    Auf der Veranstaltung "Change! Vom Thema zur Action" in Berlin, die 
                    als Spin-off der JugendPolitikTage vom Deutsche 
                    dem Paxi-Leader-Internationale e. V. organisiert wird, trifft Kari vom 
                    NetGes e. V. auf Maria, Amira und Jakub, die bereits überlegt hatten, eine 
                    ähnliche Plattform neu aufzubauen. Kurz darauf treffen sie sich digital 
                    noch einmal und planen zusammen den Ausbau der Community.
                  </p>
                  <div className="mt-3 flex items-center text-sm text-gray-600 font-medium">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                    Team-Erweiterung
                  </div>
                </div>
              </div>
            </div>

            {/* Sommer 2025 - Skalierung */}
            <div className="relative flex items-start">
              <div className="relative z-10 flex items-center justify-center w-24 h-8 bg-background px-2">
                <div className="text-black font-bold text-sm whitespace-nowrap">Sommer 2025</div>
              </div>
              <div className="ml-8 flex-1">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">🎯 Skalierung des Projekts</h3>
                  <p className="text-black leading-relaxed">
                    Mittlerweile ist die Community auf mehr als 2000 Mitglieder 
                    Die Zahl der Angebote steigt immer weiter und zahlreiche Träger schicken 
                    ihre Ausschreibungen direkt an das Redaktionsteam, um Teilnehmende für 
                    ihre Projekte zu gewinnen.
                  </p>
                  <div className="mt-3 flex items-center text-sm text-gray-600 font-medium">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                    2000+ Mitglieder erreicht
                  </div>
                </div>
              </div>
            </div>

            {/* Heute - Weiterentwicklung */}
            <div className="relative flex items-start">
              <div className="relative z-10 flex items-center justify-center w-16 h-8 bg-background px-2">
                <div className="text-black font-bold text-sm">heute</div>
              </div>
              <div className="ml-8 flex-1">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">🚀 Weiterentwicklung der Formate und Ausbau der Präsenz auf Events</h3>
                  <p className="text-black leading-relaxed">
                    Um das Projekt zu stärken, arbeitet das Projektteam stärker an 
                    einer stärkeren Präsenz auf Events in Form von eigenen Infoständen und 
                    Workshops. Parallel wird an der Website und den verschiedenen Social-
                    Media-Kanälen gefeilt, um diese übersichtlicher und attraktiver zu machen.
                  </p>
                  <div className="mt-3 flex items-center text-sm text-gray-600 font-medium">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                    Aktuelle Entwicklung
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Unser Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Team Member 1 */}
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-500 text-sm">Foto</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Vorname Nachname</h3>
            <p className="text-sm text-gray-600">
              Kurze Beschreibung der Person und ihrer Rolle im Team.
            </p>
          </div>

          {/* Team Member 2 */}
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-500 text-sm">Foto</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Vorname Nachname</h3>
            <p className="text-sm text-gray-600">
              Kurze Beschreibung der Person und ihrer Rolle im Team.
            </p>
          </div>

          {/* Team Member 3 */}
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-500 text-sm">Foto</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Vorname Nachname</h3>
            <p className="text-sm text-gray-600">
              Kurze Beschreibung der Person und ihrer Rolle im Team.
            </p>
          </div>

          {/* Team Member 4 */}
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-500 text-sm">Foto</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Vorname Nachname</h3>
            <p className="text-sm text-gray-600">
              Kurze Beschreibung der Person und ihrer Rolle im Team.
            </p>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Unsere Partner</h2>
        <div className="flex flex-wrap justify-center items-center gap-8">
          {/* Partner 1 - TEILHABER IM Netzwerk */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-[500px] h-48 flex items-center justify-center">
              <img 
                src="/teilhaber-real-logo.svg" 
                alt="TEILHABER IM Netzwerk Stiftungen und Bildung Logo" 
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <a 
              href="https://www.netzwerk-stiftungen-bildung.de" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-lg font-semibold text-gray-900 mt-3 text-center hover:text-[#41919C] transition-colors cursor-pointer"
            >
              Teilhaber im Netzwerk Stiftungen und Bildung
            </a>
          </div>

          {/* Partner 2 - Umsetzungspartner Update Deutschland */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-[500px] h-48 flex items-center justify-center">
              <img 
                src="/update-deutschland-logo.svg" 
                alt="Update Deutschland Logo" 
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <a 
              href="https://www.update-deutschland.de" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-lg font-semibold text-gray-900 mt-3 text-center hover:text-[#41919C] transition-colors cursor-pointer"
            >
              Update Deutschland
            </a>
          </div>

          {/* Partner 3 - NIEDERSACHSEN HÄLT ZUSAMMEN */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-[500px] h-48 flex items-center justify-center">
              <img 
                src="/niedersachsen-real-logo.svg" 
                alt="Niedersachsen hält zusammen Logo" 
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <a 
              href="https://www.niedersachsen.de/startseite/politik_staat/landesregierung_ministerien/landesregierung_2013_2017/2013_bis_2017_gute_jahre_fur_das_land/niedersachsen_halt_zusammen/niedersachsen-haelt-zusammen--155274.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-lg font-semibold text-gray-900 mt-3 text-center hover:text-[#41919C] transition-colors cursor-pointer"
            >
              Niedersachsen hält zusammen
            </a>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default AboutUs;