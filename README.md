<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/DJAVDH/Bibliotheek-Project">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Bibliotheek Project</h3>

  <p align="center">
    Een bibliotheekbeheersysteem gebouwd met het Symfony-framework
    <br />
    <a href="https://github.com/DJAVDH/Bibliotheek-Project"><strong>Verken de documentatie »</strong></a>
    <br />
    <br />
    <a href="https://github.com/DJAVDH/Bibliotheek-Project">Demo bekijken</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Inhoudsopgave</summary>
  <ol>
    <li>
      <a href="#over-het-project">Over Het Project</a>
      <ul>
        <li><a href="#gebouwd-met">Gebouwd Met</a></li>
      </ul>
    </li>
    <li>
      <a href="#aan-de-slag">Aan De Slag</a>
      <ul>
        <li><a href="#vereisten">Vereisten</a></li>
        <li><a href="#installatie">Installatie</a></li>
      </ul>
    </li>
    <li><a href="#gebruik">Gebruik</a></li>
    <li><a href="#routekaart">Routekaart</a></li>
    <li><a href="#bijdragen">Bijdragen</a></li>
    <li><a href="#licentie">Licentie</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#dankbetuigingen">Dankbetuigingen</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## Over Het Project

Het Bibliotheek Project is een uitgebreid bibliotheekbeheersysteem dat is ontwikkeld met behulp van het Symfony-framework. Het biedt functionaliteit voor het beheren van bibliotheekcollecties, bladeren door boeken op genre en efficiënt organiseren van bibliotheekbronnen.

Dit project toont de integratie van moderne webtechnologieën met een robuust backend-framework, met een op Twig gebaseerd sjablonensysteem en Doctrine ORM voor databasebeheer.

<p align="right">(<a href="#readme-top">terug naar boven</a>)</p>



### Gebouwd Met

* [![Symfony][Symfony-badge]][Symfony-url]
* [![PHP][PHP-badge]][PHP-url]
* [![Doctrine ORM][Doctrine-badge]][Doctrine-url]
* [![Twig][Twig-badge]][Twig-url]

<p align="right">(<a href="#readme-top">terug naar boven</a>)</p>



<!-- GETTING STARTED -->
## Aan De Slag

Volg deze stappen om een lokale kopie uit te voeren.

### Vereisten

Je hebt het volgende nodig om dit project uit te voeren:
* PHP >= 8.2
* Composer
* MySQL of een ander ondersteunde database
* Git

<p align="right">(<a href="#readme-top">terug naar boven</a>)</p>



### Installatie

1. Clone de repository
   ```sh
   git clone https://github.com/DJAVDH/Bibliotheek-Project.git
   cd Bibliotheek-Project/bibliotheek-symfony
   ```

2. Installeer PHP-afhankelijkheden met behulp van Composer
   ```sh
   composer install
   ```

3. Maak een `.env.local` bestand aan en configureer je databaseverbinding
   ```sh
   cp .env .env.local
   # Bewerk .env.local met je databasegegevens
   ```

4. Maak de database aan
   ```sh
   php bin/console doctrine:database:create
   ```

5. Voer migraties uit (indien beschikbaar)
   ```sh
   php bin/console doctrine:migrations:migrate
   ```

6. Start de Symfony-ontwikkelingsserver
   ```sh
   symfony server:start
   ```
   
   Of gebruik de ingebouwde PHP-server:
   ```sh
   php -S localhost:8000 -t public
   ```

7. Open je browser en navigeer naar `http://localhost:8000`

<p align="right">(<a href="#readme-top">terug naar boven</a>)</p>



<!-- USAGE EXAMPLES -->
## Gebruik

### Functies

- **Startpagina**: Blader door de hoofdinterface van de bibliotheek met genreoverzichten
- **Genrebeheer**: Bekijk en beheer verschillende boekgenres
- **Bibliotheekbeheer**: Beheerinterface voor het beheren van bibliotheekbronnen
- **Responsief Ontwerp**: Schoon en intuïtief gebruikersinterface

### Voorbeeldroutes

- `/home` - Startpagina van de bibliotheek met genreoverzichten
- `/library` - Bibliotheekbeheerinterface
- `/genre` - Bladeren door boeken per genre

_Voor meer voorbeelden, raadpleeg de [projectrepository](https://github.com/DJAVDH/Bibliotheek-Project)_

<p align="right">(<a href="#readme-top">terug naar boven</a>)</p>



<!-- ROADMAP -->
## Routekaart

- [ ] Voltooi databaseschema en entiteitmodellen
- [ ] Implementeer zoekfunctionaliteit voor boeken
- [ ] Voeg gebruikersauthenticatiesysteem toe
- [ ] Maak beheerdashboard
- [ ] Implementeer systeem voor uitlenen van boeken
- [ ] Voeg gebruikersprofielbeheer toe
- [ ] Maak API-eindpunten
- [ ] Voeg testsuites toe

Zie de [openstaande problemen](https://github.com/DJAVDH/Bibliotheek-Project/issues) voor een volledige lijst met voorgestelde functies (en bekende problemen).

<p align="right">(<a href="#readme-top">terug naar boven</a>)</p>

### Bijdragers

Hieronder kun je vinden wie aan dit project heeft gewerkt

<a href="https://github.com/DJAVDH/Bibliotheek-Project/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=DJAVDH/Bibliotheek-Project" alt="contrib.rocks image" />
</a>

<p align="right">(<a href="#readme-top">terug naar boven</a>)</p>

<!-- CONTACT -->
## Contact

Voor vragen, suggesties of feedback over dit project, open alstublieft een issue in de repository of neem contact op met de projectbeheerders.

Project Link: [https://github.com/DJAVDH/Bibliotheek-Project](https://github.com/DJAVDH/Bibliotheek-Project)

<p align="right">(<a href="#readme-top">terug naar boven</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Dankbetuigingen

* [Symfony Documentatie](https://symfony.com/doc)
* [Doctrine ORM Documentatie](https://www.doctrine-project.org/)
* [Twig Template Engine](https://twig.symfony.com/)

<p align="right">(<a href="#readme-top">terug naar boven</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/DJAVDH/Bibliotheek-Project.svg?style=for-the-badge
[contributors-url]: https://github.com/DJAVDH/Bibliotheek-Project/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/DJAVDH/Bibliotheek-Project.svg?style=for-the-badge
[forks-url]: https://github.com/DJAVDH/Bibliotheek-Project/network/members
[stars-shield]: https://img.shields.io/github/stars/DJAVDH/Bibliotheek-Project.svg?style=for-the-badge
[stars-url]: https://github.com/DJAVDH/Bibliotheek-Project/stargazers
[issues-shield]: https://img.shields.io/github/issues/DJAVDH/Bibliotheek-Project.svg?style=for-the-badge
[issues-url]: https://github.com/DJAVDH/Bibliotheek-Project/issues
[license-shield]: https://img.shields.io/github/license/DJAVDH/Bibliotheek-Project.svg?style=for-the-badge
[license-url]: https://github.com/DJAVDH/Bibliotheek-Project/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/
[product-screenshot]: images/screenshot.png
[Symfony-badge]: https://img.shields.io/badge/Symfony-7.4-black?style=for-the-badge&logo=symfony&logoColor=white
[Symfony-url]: https://symfony.com
[PHP-badge]: https://img.shields.io/badge/PHP-%3E%3D8.2-777BB4?style=for-the-badge&logo=php&logoColor=white
[PHP-url]: https://www.php.net
[Doctrine-badge]: https://img.shields.io/badge/Doctrine-ORM-2.17-red?style=for-the-badge&logo=doctrine
[Doctrine-url]: https://www.doctrine-project.org/
[Twig-badge]: https://img.shields.io/badge/Twig-Template-90C53F?style=for-the-badge&logo=twig&logoColor=white
[Twig-url]: https://twig.symfony.com/
