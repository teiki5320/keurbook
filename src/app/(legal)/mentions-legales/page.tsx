import Link from "next/link";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/layout/LegalPage";
import { AMAZON_DISCLOSURE } from "@/lib/amazon";
import { legalConfig, siteConfig } from "@/lib/config";

export const metadata: Metadata = pageMetadata({
  title: "Mentions légales",
  description: "Éditeur et hébergeur du site Keurbook, données personnelles, liens Amazon, illustrations et limites de responsabilité.",
  path: "/mentions-legales",
});

export default function LegalNoticePage() {
  const l = legalConfig;
  return (
    <LegalPage title="Mentions légales" updated="1er octobre 2026">
      <p>
        Informations sur l&apos;éditeur et l&apos;hébergeur du site, l&apos;usage de vos données et les limites des
        informations publiées (loi n° 2004-575 du 21 juin 2004 pour la confiance dans l&apos;économie numérique).
      </p>

      <h2>Éditeur du site</h2>
      <ul>
        <li>
          Éditeur : {l.companyName}, société par actions simplifiée (SAS) au capital de 200 €, exerçant sous le nom
          commercial {l.tradeName}, qui publie le site {siteConfig.name}.
        </li>
        <li>Siège social : {l.address}.</li>
        <li>Immatriculation : {l.rcs} (SIRET {l.siret}).</li>
        <li>N° de TVA intracommunautaire : {l.vat}.</li>
        <li>Directeur de la publication : {l.director}.</li>
        {l.phone && <li>Téléphone : {l.phone}.</li>}
        <li>
          Contact : <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
        </li>
      </ul>

      <h2>Hébergeur</h2>
      <p>{l.host}.</p>

      <h2>Données personnelles et cookies</h2>
      <ul>
        <li>Aucun cookie n&apos;est déposé par le site, et aucun compte n&apos;est nécessaire.</li>
        <li>
          Votre pile à lire est mémorisée dans le stockage local de votre navigateur, uniquement sur votre appareil, pour la
          retrouver à votre prochaine visite. Elle n&apos;est transmise à personne. Vous pouvez l&apos;effacer en vidant les
          données du site dans votre navigateur.
        </li>
        <li>
          Le bouton « Partager ma liste » place les titres choisis dans l&apos;adresse de la page : ils ne sont transmis
          qu&apos;aux personnes à qui vous envoyez ce lien.
        </li>
        <li>Les polices, les images et le code du site sont servis par le site lui-même, sans service tiers ni mesure d&apos;audience.</li>
        <li>L&apos;hébergeur peut enregistrer des journaux techniques (adresse IP, date, page demandée) pour la sécurité du service.</li>
        <li>
          Conformément au RGPD, vous pouvez exercer vos droits d&apos;accès, de rectification et d&apos;effacement auprès de
          l&apos;éditeur, à l&apos;adresse de contact ci-dessus. Le détail figure dans la{" "}
          <Link href="/confidentialite">politique de confidentialité</Link>.
        </li>
      </ul>

      <h2>Liens sponsorisés (Amazon)</h2>
      <p>
        Les boutons « Acheter sur Amazon » des fiches livres, des fiches auteurs, des conseils et de la pile à lire sont des
        liens d&apos;affiliation du programme Partenaires d&apos;Amazon.fr. {AMAZON_DISCLOSURE} Le prix payé est le même pour
        l&apos;acheteur. Le site ne vend aucun livre : la vente, la livraison et le service client relèvent d&apos;Amazon ou
        du vendeur tiers. Aucun prix n&apos;est garanti : seul le prix affiché sur Amazon au moment de l&apos;achat fait foi.
        Le choix des livres repose sur leur intérêt littéraire, pas sur le montant des commissions. Un clic sur ces liens vous
        fait quitter le site : Amazon applique alors sa propre politique de confidentialité et de cookies.
      </p>

      <h2>Propriété intellectuelle et images</h2>
      <ul>
        <li>
          Les textes du site (résumés, biographies, présentations des pays, articles) sont rédigés par l&apos;éditeur, ainsi
          que le logo de {siteConfig.name} : ils sont la propriété de l&apos;éditeur, sauf mention contraire. Toute reproduction
          sans autorisation est interdite.
        </li>
        <li>
          Les couvertures affichées sont des <strong>illustrations créées par intelligence artificielle</strong> pour{" "}
          {siteConfig.name}, à partir de nos propres résumés, avec le titre et le nom de l&apos;auteur posés par le site. Ce
          ne sont pas les couvertures des éditions vendues, qui ont chacune la leur ; la fiche de chaque livre le précise.
        </li>
        <li>
          Les portraits d&apos;auteurs proviennent de Wikimedia Commons, sous licence libre (Creative Commons ou domaine
          public) ; l&apos;auteur et la licence de chaque photo sont indiqués sous le portrait, sur la fiche de l&apos;auteur.
        </li>
        <li>
          Les titres des œuvres et les courtes citations restent la propriété de leurs auteurs et éditeurs ; les citations
          sont reproduites au titre du droit de courte citation, avec mention de l&apos;auteur et de l&apos;œuvre.
        </li>
        <li>Pour toute demande de retrait ou de correction, écrivez à l&apos;adresse de contact.</li>
      </ul>

      <h2>Limites de responsabilité</h2>
      <p>
        Les informations sur les livres et les auteurs (dates, éditeurs, prix littéraires, éditions disponibles) sont
        vérifiées avec soin, mais peuvent comporter des erreurs ou évoluer : seules font foi les informations affichées sur
        Amazon au moment de l&apos;achat. N&apos;hésitez pas à nous signaler une erreur à l&apos;adresse de contact.
      </p>
    </LegalPage>
  );
}
