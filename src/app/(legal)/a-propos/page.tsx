import Link from "next/link";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/layout/LegalPage";
import { legalConfig, siteConfig } from "@/lib/config";
import { EmailLink } from "@/components/layout/EmailLink";

export const metadata: Metadata = pageMetadata({
  title: "À propos de Keurbook",
  description: "Qui édite Keurbook, ce que vous y trouvez, comment les livres sont choisis, et comment le site se finance (liens Amazon, publicité).",
  path: "/a-propos",
});

export default function AboutPage() {
  const l = legalConfig;
  return (
    <LegalPage title="À propos de Keurbook" updated="16 novembre 2026">
      <p>
        {siteConfig.name} est un site en français consacré aux écrivains d&apos;Afrique subsaharienne et de leur diaspora :
        leurs vies, leurs œuvres et leurs livres, du roman à la bande dessinée. Il s&apos;adresse à toute personne curieuse,
        sans qu&apos;il soit nécessaire de connaître déjà cette littérature.
      </p>

      <h2>Qui édite le site</h2>
      <p>
        Le site est publié par {l.companyName}, société par actions simplifiée exerçant sous le nom commercial {l.tradeName},
        dont le directeur de la publication est {l.director}. Le siège, l&apos;immatriculation et l&apos;hébergeur sont
        indiqués dans les <Link href="/mentions-legales">mentions légales</Link>.
      </p>

      <h2>Ce que vous trouverez ici</h2>
      <ul>
        <li>
          Des <Link href="/livres">fiches de livres</Link> et de <Link href="/bd">bandes dessinées</Link> : un résumé sans
          révéler la fin, quelques raisons de lire, les thèmes abordés.
        </li>
        <li>
          Des fiches d&apos;<Link href="/auteurs">auteurs</Link> et de <Link href="/pays">pays</Link>, reliées entre elles.
        </li>
        <li>
          Des <Link href="/top-10">sélections Top 10</Link> et des <Link href="/conseils">conseils de lecture</Link>, par
          exemple pour savoir par quel livre commencer.
        </li>
        <li>
          Des <Link href="/actus">actus du livre africain</Link> (prix, sorties, salons). Chaque article est rédigé par
          Keurbook à partir de sources citées en fin de page.
        </li>
        <li>
          Une <Link href="/pile-a-lire">pile à lire</Link>, gardée uniquement dans votre navigateur.
        </li>
      </ul>

      <h2>Comment les livres sont choisis</h2>
      <p>
        Le choix repose sur l&apos;intérêt littéraire des œuvres, pas sur le montant des commissions. Les textes (résumés,
        biographies, présentations des pays, articles) sont écrits par l&apos;éditeur et non recopiés d&apos;une quatrième de
        couverture ou d&apos;un autre site. Les couvertures affichées sont des illustrations créées par intelligence
        artificielle pour le site : ce ne sont pas celles des éditions en vente, et chaque fiche le précise. Une erreur ?
        Signalez-la, nous la corrigeons.
      </p>

      <h2>Liens Amazon et publicité</h2>
      <p>
        {siteConfig.name} est gratuit et se finance de deux façons. Les boutons « Voir sur Amazon » sont des liens
        d&apos;affiliation du programme Partenaires d&apos;Amazon.fr : si vous achetez après un clic, le site peut percevoir
        une commission, sans que le prix change pour vous. Le site ne vend aucun livre lui-même. Certaines pages affichent
        aussi des annonces Google AdSense, toujours signalées par la mention « Publicité » et séparées des contenus. Le détail
        figure dans les <Link href="/mentions-legales">mentions légales</Link> et la{" "}
        <Link href="/confidentialite">politique de confidentialité</Link>.
      </p>

      <h2>Nous contacter</h2>
      <p>
        Une remarque, une correction, une suggestion de livre ? Écrivez-nous à{" "}
        <EmailLink email={siteConfig.contactEmail} />.
      </p>
    </LegalPage>
  );
}
